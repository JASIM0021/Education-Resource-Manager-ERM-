package com.women.sefty
import android.app.Service
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import com.women.sefty.PasswordPromptActivity
import com.women.sefty.R

// Replace with your actual package name for resources


class PasswordForegroundService : Service() {
private val TAG = "PasswordForegroundService"
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d(TAG, "onStartCommand:Started" )
        if (intent?.getBooleanExtra("launch_activity", false) == true) {

            Log.d(TAG, "onStartCommand: Lunch from service" )
            // Launch the PasswordPromptActivity
            val activityIntent = Intent(applicationContext, PasswordPromptActivity::class.java)
            activityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            startActivity(activityIntent)
        }

        // Stop the service after launching the activity
//        stopSelf()

        return START_NOT_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onCreate() {
        super.onCreate()


        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "password_service_channel"
            val channelName = "Password Service Channel"
            val importance = NotificationManager.IMPORTANCE_LOW
            val notificationChannel = NotificationChannel(channelId, channelName, importance)
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(notificationChannel)
        }

        val notificationIntent = Intent(applicationContext, PasswordPromptActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            applicationContext, 0, notificationIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        // Create a notification for the foreground service
        val notification = NotificationCompat.Builder(this, "password_service_channel")
            .setContentTitle("Enter Secret Password")
            .setContentText("Tap to enter the secret password")
            .setSmallIcon(R.drawable.ic_safe)
            .setContentIntent(pendingIntent)
//            .setAutoCancel(true)
//            .setSmallIcon(R.drawable.ic_safe_active)
            .build()

        startForeground(100, notification)  // New unique ID

    }
}
