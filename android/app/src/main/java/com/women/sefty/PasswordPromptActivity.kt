package com.women.sefty

import android.app.AlarmManager
import androidx.appcompat.app.AlertDialog
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import org.json.JSONArray

class PasswordPromptActivity : AppCompatActivity() {
    private lateinit var sharedPreferencesModule: SharedPreferencesModule

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_password_prompt) // Set the XML layout

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


                } else {
                    sendEmergencySms() // Call this function if code does not match
                }
            }


        }

        btnCancel.setOnClickListener {
            finish() // Close the activity if canceled
        }



    }




    override fun onBackPressed() {
        // Call your custom function here
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

//    override fun onDestroy() {
//        AlertDialog.Builder(this)
//            .setTitle("Are you sure you want to leave?")
//            .setMessage("If you leave this screen without entering the password, a notification will be rescheduled automatically.")
//            .setPositiveButton("Yes") { _, _ ->
//                rescheduleNotification(this) // Reschedule notification
//                super.onDestroy()// Close the activity
//            }
//            .setNegativeButton("No") { dialog, _ ->
//                dialog.dismiss() // Dismiss the dialog and stay on the activity
//            }
//            .setCancelable(false) // Optional: Prevent the dialog from being dismissed by tapping outside
//            .show()
//
//
//    }

    private fun stopNotification() {

        val intent = Intent("com.women.sefty.UPDATE_TILE_STATE")
        intent.putExtra("state", "inactive")
        sendBroadcast(intent)

        Toast.makeText(this, "Thank you for using W-SEFTY . We care your safty", Toast.LENGTH_SHORT).show()
//        finish() // Close the activity

        val serviceIntent = Intent(this, NotificationService::class.java)

        stopService(serviceIntent)
        finish()
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
