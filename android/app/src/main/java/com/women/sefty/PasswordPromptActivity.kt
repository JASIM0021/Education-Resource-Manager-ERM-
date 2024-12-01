package com.women.sefty

import android.Manifest
import android.app.AlarmManager
import android.app.NotificationManager
import androidx.appcompat.app.AlertDialog
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import org.json.JSONArray
import kotlin.system.exitProcess

class PasswordPromptActivity : AppCompatActivity() {
    private lateinit var sharedPreferencesModule: SharedPreferencesModule

    private  var ALERM_TASK_REQ_CODE = 102;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_password_prompt) // Set the XML layout
//        showPasswordPromptNotification(applicationContext);
        val input = findViewById<EditText>(R.id.passwordInput)
        val btnOk = findViewById<Button>(R.id.btnOk)
        val btnCancel = findViewById<Button>(R.id.btnCancel)

        sharedPreferencesModule = SharedPreferencesModule(this)
        val secretCode = sharedPreferencesModule.getString("@secret_code", "")

        btnOk.setOnClickListener {
            val enteredPassword = input.text.toString()

            if (enteredPassword.isEmpty()){

                Toast.makeText(this, "Please Enter your code", Toast.LENGTH_SHORT).show()

            }else{
                val isSafe = sharedPreferencesModule.getString(Constants.SAFE_KEY, "Constants.SAFE_NOW")
                if (enteredPassword == secretCode) {
                    if (isSafe == Constants.SAFE_NOW) {
                        rescheduleNotification(this)
                    }else{
                        stopNotification() // Call this function if code matches
                    }
                    finish()

                } else {
                    sendEmergencySms() // Call this function if code does not match
                    finish()
                }
            }


        }

        btnCancel.setOnClickListener {
            sendEmergencySms()
            onClose(); // Close the activity if canceled
        }



    }




    override fun onBackPressed() {
        // Call your custom function here
        onClose();

    }

    fun onClose(){
        AlertDialog.Builder(this)
            .setTitle("Are you sure you want to leave?")
            .setMessage("If you leave this screen without entering the password, a notification will be rescheduled automatically.")
            .setPositiveButton("Yes") { _, _ ->
                sendEmergencySms()
                rescheduleNotification(this) // Reschedule notification
                finish() // Close the activity
            }
            .setNegativeButton("No") { dialog, _ ->
                dialog.dismiss() // Dismiss the dialog and stay on the activity
            }
            .setCancelable(false) // Optional: Prevent the dialog from being dismissed by tapping outside
            .show()
    }

    override fun onDestroy() {
        super.onDestroy()
//        onClose();
        rescheduleNotification(this)


    }

    override fun onPause() {
        super.onPause()
//        onClose();
        rescheduleNotification(this)
    }

    private fun stopNotification() {

        stopAllTasksAndExit()
//        // Stop all services
//        val serviceIntent1 = Intent(this, NotificationService::class.java)
//        val serviceIntent2 = Intent(this, PasswordForegroundService::class.java)
//        stopService(serviceIntent1)
//        stopService(serviceIntent2)
//
//
//
//
//
//        val intent = Intent("com.women.sefty.UPDATE_TILE_STATE")
//        intent.putExtra("state", "inactive")
//        sendBroadcast(intent)

    }

    private fun sendEmergencySms() {
        // Add your SMS sending logic here
        val emergencyNumbers = getEmergencyNumbers() // Updated to use the list of emergency numbers

        if ( emergencyNumbers.isNotEmpty()) {
            SmsTask.getCurrentLocation(
                this
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



            Toast.makeText(this, "Emergency SMS sent to all numbers!", Toast.LENGTH_SHORT).show()
        } else {
            Toast.makeText(this, "Failed to send SMS. Location or emergency number is missing.", Toast.LENGTH_SHORT).show()
        }
        Toast.makeText(this, "Emergency SMS sent", Toast.LENGTH_SHORT).show()
//        finish() // Close the activity
    }

    private fun getEmergencyNumbers(): List<String> {
        val sharedPref = SharedPreferencesModule(this)
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
            Toast.makeText(this, "Failed to parse emergency numbers.", Toast.LENGTH_SHORT).show()
        }

        return emergencyNumbers
    }

    fun stopAllTasksAndExit() {
        // Cancel the alarm task
        cancelAlarmTask(this)

        // Stop services
        val serviceIntent = Intent(this, NotificationService::class.java)
        stopService(serviceIntent)

        // Remove all notifications
        val notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.cancelAll()

        // Clear any pending tasks
        Handler(Looper.getMainLooper()).removeCallbacksAndMessages(null)

        // Send broadcast to update tile state
        val tileIntent = Intent("com.women.sefty.UPDATE_TILE_STATE")
        tileIntent.putExtra("state", "inactive")
        sendBroadcast(tileIntent)

        // Show exit message
        Toast.makeText(this, "Thank you for using W-SEFTY. We care about your safety.", Toast.LENGTH_SHORT).show()

//        // Finish and exit
        finishAffinity()
        exitProcess(0)
    }

    fun cancelAlarmTask(context: Context) {
        val serviceIntent = Intent(context, NotificationService::class.java)

        val pendingIntent = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            PendingIntent.getForegroundService(
                context,
                ALERM_TASK_REQ_CODE,
                serviceIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
        } else {
            PendingIntent.getService(
                context,
                ALERM_TASK_REQ_CODE,
                serviceIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
        }

        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        alarmManager.cancel(pendingIntent)
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
                ALERM_TASK_REQ_CODE,
                serviceIntent,

                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
        } else {
            PendingIntent.getService(
                context,
                ALERM_TASK_REQ_CODE,
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

}
