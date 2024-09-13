package com.women.safety

import android.Manifest
import android.app.Activity
import android.app.AlarmManager
import android.app.AlertDialog
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.provider.Settings
import android.telephony.SmsManager
import android.util.Log
import android.widget.EditText
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import com.women.sefty.Constants
import com.women.sefty.NotificationService
import com.women.sefty.PasswordForegroundService
import com.women.sefty.PasswordPromptActivity
import com.women.sefty.R
import com.women.sefty.SharedPreferencesModule
import com.women.sefty.SmsTask
import org.json.JSONArray

class NotificationReceiver : BroadcastReceiver() {
    private  val REQUEST_SMS_PERMISSION = 123

    override fun onReceive(context: Context, intent: Intent) {
        Log.d("NotificationReceiver", "Received action: ${intent.action}")

        when (intent.action) {
            NotificationService.ACTION_SAFE -> {
                Log.d("NotificationReceiver", "I am safe clicked")
                val sharedPref = SharedPreferencesModule(context)
               sharedPref.saveString(Constants.SAFE_KEY, Constants.SAFE_NOW)
//                promptForPassword(context)
                promptForPasswordActivity(context)
//                rescheduleNotification(context);

            }
            NotificationService.ACTION_NOT_SAFE -> {
//                Log.d("NotificationReceiver", "Not safe clicked")
//                sendEmergencySms(context)

                    Log.d("NotificationReceiver", "Not safe clicked")
                    checkAndRequestSmsPermission(context)

            }
            NotificationService.ACTION_COMPLETE -> {
                Log.d("NotificationReceiver", "Safety complete clicked")
                Toast.makeText(context, "Safety procedure complete!", Toast.LENGTH_SHORT).show()
//                promptForPassword(context)
                promptForPasswordActivity(context)
            }
        }

        NotificationManagerCompat.from(context).cancel(NotificationService.NOTIFICATION_ID)
    }

    private fun promptForPasswordActivity(context: Context) {

        if (Build.VERSION.SDK_INT >= 33 ) {
            promptForPassworusingService(context)
//            showPasswordPromptNotification(context)

        }else {
            val intent = Intent(context, PasswordPromptActivity::class.java)
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK )
            context.startActivity(intent)
        }

    }

    private fun showPasswordPromptNotification(context: Context) {
        val notificationIntent = Intent(context, PasswordPromptActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            context, 0, notificationIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val notification = NotificationCompat.Builder(context, "password_prompt_channel")
            .setContentTitle("Enter Secret Password")
            .setContentText("Tap to enter the secret password")
            .setSmallIcon(R.drawable.ic_safe)
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)
            .build()

        if (ActivityCompat.checkSelfPermission(
                context,
                Manifest.permission.POST_NOTIFICATIONS
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return
        }
        NotificationManagerCompat.from(context).notify(2, notification)
    }


    private fun promptForPassworusingService(context: Context) {
        val serviceIntent = Intent(context, PasswordForegroundService::class.java)
        serviceIntent.putExtra("launch_activity", true)
        ContextCompat.startForegroundService(context, serviceIntent)
    }
    private fun promptForPassword(context: Context) {
        val input = EditText(context)
        input.hint = "Enter Secret Password"

        val activity = context as? Activity ?: return

        val dialog = AlertDialog.Builder(activity)
            .setTitle("Enter Secret Password")
            .setView(input)
            .setPositiveButton("OK") { _, _ ->
                val enteredPassword = input.text.toString()
                val sharedPref = context.getSharedPreferences("safetyAppPrefs", Context.MODE_PRIVATE)
                val savedPassword = sharedPref.getString("@secret_code", "") ?: ""

                if (enteredPassword == savedPassword) {
                    val serviceIntent = Intent(context, NotificationService::class.java)
                    ContextCompat.startForegroundService(context, serviceIntent)
                } else {
                    sendEmergencySms(context)
                }
            }
            .setNegativeButton("Cancel", null)
            .setCancelable(false)
            .create()

        dialog.show()
    }

    private fun sendEmergencySms(context: Context) {
//        val location = SmsTask.getCurrentLocation(context)
        val emergencyNumbers = getEmergencyNumbers(context) // Updated to use the list of emergency numbers

        if ( emergencyNumbers.isNotEmpty()) {
            SmsTask.getCurrentLocation(
                context
            ) { location ->
                if (location != null) {
                    val mapLink = SmsTask.generateMapLink(
                        location.latitude,
                        location.longitude
                    )
                    val message = "EMERGENCY ALERT! This is an urgent request for help.  My location \n  https://www.google.com/maps?q=${location.latitude},${location.longitude}"

                    for (number in emergencyNumbers) {

                        SmsTask.sendSMS(number,message)
                    }
                }
            }



            Toast.makeText(context, "Emergency SMS sent to all numbers!", Toast.LENGTH_SHORT).show()
        } else {
            Toast.makeText(context, "Failed to send SMS. Location or emergency number is missing.", Toast.LENGTH_SHORT).show()
        }
    }


    private fun checkAndRequestSmsPermission(context: Context) {
        if (ContextCompat.checkSelfPermission(context, Manifest.permission.SEND_SMS)
            != PackageManager.PERMISSION_GRANTED) {

            if (context is Activity) {
                ActivityCompat.requestPermissions(
                    context,
                    arrayOf(Manifest.permission.SEND_SMS),
                    REQUEST_SMS_PERMISSION
                )
            } else {
                Toast.makeText(context, "SMS permission is required to send emergency alerts.", Toast.LENGTH_SHORT).show()
                // Consider starting an Activity to handle permission requests
            }
        } else {
            sendEmergencySms(context)
        }
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
