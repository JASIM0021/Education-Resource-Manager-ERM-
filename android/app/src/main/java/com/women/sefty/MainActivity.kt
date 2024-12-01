package com.women.sefty

import android.Manifest
import android.app.Activity
import android.app.AlarmManager
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.women.safety.NotificationReceiver
import expo.modules.ReactActivityDelegateWrapper


class MainActivity : ReactActivity() {
    private lateinit var notificationReceiver: NotificationReceiver
    private lateinit var smsReciver: SmsReceiver
    private  val REQUEST_SMS_PERMISSION = 123
    private val LOCATION_PERMISSION_REQUEST_CODE = 1002
    private  val REQUEST_POST_NOTIFICATION_PERMISSION = 1001
private val REQUEST_CODE_LOCATION_PERMISSIONS = 20000



    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    override fun onCreate(savedInstanceState: Bundle?) {


//        requestPostNotificationPermission(this);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED ||
                ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED ||
                ActivityCompat.checkSelfPermission(this, Manifest.permission.FOREGROUND_SERVICE_LOCATION) != PackageManager.PERMISSION_GRANTED) {

                ActivityCompat.requestPermissions(
                    this,
                    arrayOf(
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.ACCESS_COARSE_LOCATION,
                        Manifest.permission.FOREGROUND_SERVICE_LOCATION
                    ),
                    REQUEST_CODE_LOCATION_PERMISSIONS
                )
            }
        } else {
            // For Android versions below S, just request the usual location permissions
            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED ||
                ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {

                ActivityCompat.requestPermissions(
                    this,
                    arrayOf(
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.ACCESS_COARSE_LOCATION
                    ),
                    REQUEST_CODE_LOCATION_PERMISSIONS
                )
            }
        }

        notificationReceiver = NotificationReceiver()

        smsReciver = SmsReceiver();
        val alarmManager = this.getSystemService(Context.ALARM_SERVICE) as AlarmManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) { // Android 12 and above
            if (alarmManager.canScheduleExactAlarms()) {
                // Code to schedule exact alarms
            } else {
                // Ask the user to grant permission to schedule exact alarms
                val intent = Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM)
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                startActivity(intent)

                // Optionally, show a message to the user explaining why this permission is needed
                Toast.makeText(
                    this,
                    "Please allow the app to schedule exact alarms in the settings for it to function properly.",
                    Toast.LENGTH_LONG
                ).show()
            }
        } else {
            // For Android versions below 12
            // Code to schedule alarms without needing exact alarm permission
        }


        val smsFilter = IntentFilter().apply {

        }


//        notificationReceiver.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

//        ReceiverRegistrationHelper.registerReceiver(this,notificationReceiver)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ActivityCompat.checkSelfPermission(
                    this,
                    Manifest.permission.POST_NOTIFICATIONS
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                // Request the permission from the user
                ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.POST_NOTIFICATIONS), 101)
            }
        }
        val filter = IntentFilter().apply {
            addAction(NotificationService.ACTION_SAFE)
            addAction(NotificationService.ACTION_NOT_SAFE)
        }
        registerReceiver(notificationReceiver,filter, RECEIVER_NOT_EXPORTED)
        registerReceiver(smsReciver,smsFilter, RECEIVER_NOT_EXPORTED)
//        registerReceiver(notificationReceiver, filter)
        requestLocationPermissions()
        setTheme(R.style.AppTheme)
        super.onCreate(null)
    }


    // Function to request POST_NOTIFICATION permission


    override fun getMainComponentName(): String = "main"

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return ReactActivityDelegateWrapper(
            this,
            BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
            object : DefaultReactActivityDelegate(
                this,
                mainComponentName,
                fabricEnabled
            ) {})
    }

    fun requestPostNotificationPermission(activity: Activity) {
        // Check if the device is running Android 13 (API level 33) or higher
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            // Check if the POST_NOTIFICATION permission is already granted
            if (ContextCompat.checkSelfPermission(
                    activity,
                    Manifest.permission.POST_NOTIFICATIONS
                ) == PackageManager.PERMISSION_GRANTED
            ) {
                // Permission already granted
                Toast.makeText(activity, "Notification permission already granted", Toast.LENGTH_SHORT).show()
            } else {
                // Permission not granted, request it
                ActivityCompat.requestPermissions(
                    activity,
                    arrayOf(Manifest.permission.POST_NOTIFICATIONS),
                    REQUEST_POST_NOTIFICATION_PERMISSION
                )
            }
        } else {
            // For devices below Android 13, no need to request notification permission
            Toast.makeText(activity, "Notification permission not required for this Android version", Toast.LENGTH_SHORT).show()
        }
    }

    override fun invokeDefaultOnBackPressed() {
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
            if (!moveTaskToBack(false)) {
                super.invokeDefaultOnBackPressed()
            }
            return
        }
        super.invokeDefaultOnBackPressed()
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            REQUEST_SMS_PERMISSION -> {
                if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                    // Permission granted, proceed with sending the SMS

                }

                else  if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
                    if (grantResults.size > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                        startLocationService()
                    }
                }

                else {
                    Toast.makeText(this, "Permission denied. Cannot send emergency SMS.", Toast.LENGTH_SHORT).show()
                }
            }
            REQUEST_CODE_LOCATION_PERMISSIONS -> {
                requestLocationPermissions()
            }
        }
    }


    private fun requestLocationPermissions() {
        if (ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(
                this, arrayOf<String>(
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION,
                    Manifest.permission.FOREGROUND_SERVICE_LOCATION
                ), LOCATION_PERMISSION_REQUEST_CODE
            )
        } else {
            startLocationService()
        }
    }

    private fun startLocationService() {
        val serviceIntent = Intent(
            this,
            NotificationService::class.java
        )
        startService(serviceIntent)
    }



}
