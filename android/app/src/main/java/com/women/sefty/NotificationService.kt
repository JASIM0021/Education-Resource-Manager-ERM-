package com.women.sefty

import android.Manifest
import android.app.*
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.content.pm.ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.provider.Settings
import android.util.Log
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.women.safety.NotificationReceiver
import org.json.JSONArray
import java.util.concurrent.Executors
import java.util.concurrent.ScheduledExecutorService
import java.util.concurrent.TimeUnit

class NotificationService : Service() {

    companion object {
        const val CHANNEL_ID = "safety_app_channel"
        const val NOTIFICATION_ID = 2
        const val ACTION_SAFE = "com.safetyapp.ACTION_SAFE"
        const val ACTION_NOT_SAFE = "com.safetyapp.ACTION_NOT_SAFE"
        const val ACTION_COMPLETE = "com.safetyapp.ACTION_COMPLETE"
        const val INTERVAL_MILLIS = 5 * 60 * 1000L // Interval in minutes
    }
    private val handler = Handler(Looper.getMainLooper())
    private val runnable = object : Runnable {
        override fun run() {
            // Call the function you want to run every 5 minutes
            performScheduledTask()
            // Schedule the next execution
            handler.postDelayed(this, INTERVAL_MILLIS)
        }
    }
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
    }

    @RequiresApi(Build.VERSION_CODES.Q)
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // Start the service in the foreground
//        startForeground(NOTIFICATION_ID, createNotification(), FOREGROUND_SERVICE_TYPE_LOCATION)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S &&
            ActivityCompat.checkSelfPermission(this, Manifest.permission.FOREGROUND_SERVICE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            Toast.makeText(this, "Foreground service location permission is required", Toast.LENGTH_SHORT).show()
        } else {
            // Start the foreground service safely
           try {
               if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                   // For Android 12 and above
                   startForeground(NOTIFICATION_ID, createNotification(), FOREGROUND_SERVICE_TYPE_LOCATION)
               } else {
                   // For Android 11 and below
                   startForeground(NOTIFICATION_ID, createNotification())
               }
           }catch (error:Error){
               error.printStackTrace()
           }
        }


        scheduleNotification()
        val sharedPref = SharedPreferencesModule(applicationContext)
        sharedPref.saveString(Constants.SAFE_KEY,Constants.SAFE_NOW)
        // Start the repeating task
        handler.post(runnable)
        return START_STICKY
    }


    private fun performScheduledTask() {
        // Place your code here that should be executed every 5 minutes
//        rescheduleNotification(this)
        val sharedPref = SharedPreferencesModule(applicationContext)


        val emergencyNumbers = getEmergencyNumbers(applicationContext)
        val isSafe = sharedPref.getString(Constants.SAFE_KEY,Constants.NOT_SAFE)
        if (isSafe == Constants.NOT_SAFE) {
            if (emergencyNumbers.isNotEmpty()) {
                SmsTask.getCurrentLocation(
                    applicationContext
                ) { location ->
                    if (location != null) {
                        val mapLink = SmsTask.generateMapLink(
                            location.latitude,
                            location.longitude
                        )
                        val message =
                            "EMERGENCY ALERT! This is an urgent request for help.  My location \n  https://www.google.com/maps?q=${location.latitude},${location.longitude}"

                        for (number in emergencyNumbers) {

                            SmsTask.sendSMS(number, message)
                        }
                    }
                }



                Toast.makeText(
                    applicationContext,
                    "Emergency SMS sent to all numbers!",
                    Toast.LENGTH_SHORT
                ).show()
            } else {
                Toast.makeText(
                    applicationContext,
                    "Failed to send SMS. Location or emergency number is missing.",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
        Log.d("TAG", "performScheduledTask: Timmer running")
        sharedPref.saveString(Constants.SAFE_KEY,Constants.NOT_SAFE)
    }
    @RequiresApi(Build.VERSION_CODES.O)
    private fun createNotificationChannel() {
        val channel = NotificationChannel(
            CHANNEL_ID,
            "Safety App Notifications",
            NotificationManager.IMPORTANCE_HIGH
        ).apply {
            description = "Channel for Safety App"
        }

        val notificationManager: NotificationManager =
            getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.createNotificationChannel(channel)
    }

    private fun getEmergencyNumbers(context: Context): List<String> {
        val sharedPref = SharedPreferencesModule(context)
        val emgListJson = sharedPref.getString("@emergency_numbers", "[]") ?: "[]"
        val emergencyNumbers = mutableListOf<String>()

        try {
            val jsonArray = JSONArray(emgListJson)
            for (i in 0 until jsonArray.length()) {
                val number = jsonArray.optString(i)
                if (number.isNotEmpty()) {
                    emergencyNumbers.add(number)
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(context, "Failed to parse emergency numbers.", Toast.LENGTH_SHORT).show()
        }

        return emergencyNumbers
    }

    private fun createNotification(): Notification {
        val safeIntent = Intent(this, NotificationReceiver::class.java).apply {
            action = ACTION_SAFE
        }
        val safePendingIntent: PendingIntent =
            PendingIntent.getBroadcast(this, 0, safeIntent, PendingIntent.FLAG_IMMUTABLE)

        val notSafeIntent = Intent(this, NotificationReceiver::class.java).apply {
            action = ACTION_NOT_SAFE
        }
        val notSafePendingIntent: PendingIntent =
            PendingIntent.getBroadcast(this, 1, notSafeIntent, PendingIntent.FLAG_IMMUTABLE)

        val completeIntent = Intent(this, NotificationReceiver::class.java).apply {
            action = ACTION_COMPLETE
        }
        val completePendingIntent: PendingIntent =
            PendingIntent.getBroadcast(this, 2, completeIntent, PendingIntent.FLAG_IMMUTABLE)

        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle("Are you safe?")
            .setContentText("Please confirm your safety status.")
            .setPriority(NotificationCompat.PRIORITY_MAX)
            .addAction(R.drawable.ic_safe, "Safe", safePendingIntent)
            .addAction(R.drawable.ic_not_safe, "Not Safe", notSafePendingIntent)
            .addAction(R.drawable.ic_complete, "Complete", completePendingIntent)
            .build()
    }

    private fun scheduleNotification() {
        // If you want to show the notification immediately
        with(NotificationManagerCompat.from(this)) {
            if (ActivityCompat.checkSelfPermission(
                    applicationContext,
                    Manifest.permission.POST_NOTIFICATIONS
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                return
            }
            notify(NOTIFICATION_ID, createNotification())
        }
//        rescheduleNotification(this)
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    fun rescheduleNotification(context: Context) {
        val serviceIntent = Intent(context, NotificationService::class.java)


//
        context.stopService(serviceIntent)
        // Add any extras if needed
//        serviceIntent.action = NotificationService.ACTION_SAFE

        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val triggerAt = System.currentTimeMillis() + 10 * 60 * 1000 // 1 minute

        val pendingIntent = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            PendingIntent.getForegroundService(
                context,
                102,
                serviceIntent,

                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
        } else {
            PendingIntent.getService(
                context,
                102,
                serviceIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            if (alarmManager.canScheduleExactAlarms()) {
                alarmManager.setExact(AlarmManager.RTC_WAKEUP, triggerAt, pendingIntent)
            } else {
                val intent = Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM)
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(intent)
            }
        } else {
            alarmManager.setExact(AlarmManager.RTC_WAKEUP, triggerAt, pendingIntent)
        }
    }
}
