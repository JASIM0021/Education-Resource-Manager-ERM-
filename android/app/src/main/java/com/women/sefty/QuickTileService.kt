package com.women.sefty

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.graphics.drawable.Icon
import android.os.Build
import android.service.quicksettings.Tile
import android.service.quicksettings.TileService
import android.util.Log
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.women.safety.NotificationActionReceiver
import com.women.sefty.R // Ensure your R class is correctly imported

@RequiresApi(Build.VERSION_CODES.N)
class QuickTileService : TileService() {

    private val TAG = "QUICKTILE"
    private lateinit var smsReciver: SmsReceiver
    override fun onTileAdded() {
        super.onTileAdded()
        Log.d(TAG, "Tile added to the quick settings")
        // Set the initial state of the tile
        qsTile.state = Tile.STATE_INACTIVE
        qsTile.icon = Icon.createWithResource(this, R.drawable.ic_safe_inactive) // Use your inactive icon
        qsTile.updateTile()

    }

    override fun onStartListening() {
        super.onStartListening()
        // Start listening for tile taps
        Log.d(TAG, "Tile is listening")
        // Register broadcast receiver to listen for updates
        val filter = IntentFilter("com.women.sefty.UPDATE_TILE_STATE")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            registerReceiver(tileStateReceiver, filter,RECEIVER_EXPORTED)
        }
        smsReciver = SmsReceiver();
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onClick() {
        super.onClick()
// Register broadcast receiver to listen for updates


        Log.d(TAG, "onClick: QuickTile clicked")
        // Toggle the tile state and start the notification service
        if (qsTile.state == Tile.STATE_INACTIVE) {

            qsTile.state = Tile.STATE_ACTIVE
            qsTile.icon = Icon.createWithResource(this, R.drawable.ic_safe_active) // Use your active icon
            startNotificationService()

            val smsFilter = IntentFilter().apply {

            }
            registerReceiver(smsReciver,smsFilter,RECEIVER_EXPORTED)
        }

        else {
            qsTile.state = Tile.STATE_INACTIVE
            qsTile.icon = Icon.createWithResource(this, R.drawable.ic_safe_inactive) // Use your inactive icon
            stopNotificationService()

            val intent = Intent(this, PasswordPromptActivity::class.java)
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            startActivity(intent)
        }
        qsTile.updateTile()
        // Update the tile to reflect the new state

    }

//    @RequiresApi(Build.VERSION_CODES.O)
//    private fun startNotificationService() {
//
//
//
//        // Start the NotificationService to trigger the notification
////        startNotificationService()
//        val notificationIntent = Intent(this, NotificationService::class.java)
//        startForegroundService(notificationIntent)
////        startService(notificationIntent)
//        Log.d(TAG, "Notification Service started")
//    }
    @RequiresApi(Build.VERSION_CODES.O)
    private fun startNotificationService() {
        val notificationIntent = Intent(this, NotificationService::class.java)
        startForegroundService(notificationIntent)
        Log.d(TAG, "Notification Service started")
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun stopNotificationService() {
        var notificationReceiver = NotificationActionReceiver()
        val filter = IntentFilter().apply {
            addAction(NotificationService.ACTION_SAFE)
            addAction(NotificationService.ACTION_NOT_SAFE)
            addAction(NotificationService.ACTION_COMPLETE)
            addAction(Intent.ACTION_VIEW)
        }
        // Registering the receiver when the tile is clicked
        registerReceiver(notificationReceiver, filter,RECEIVER_EXPORTED)
        val notificationIntent = Intent(this, NotificationService::class.java)
//
        stopService(notificationIntent)
        Log.d(TAG, "Notification Service stopped")
    }
    private val tileStateReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val state = intent.getStringExtra("state")
            Log.d(TAG, "onReceive: Tile change state "+state)
            Toast.makeText(context, "Tile changed success", Toast.LENGTH_SHORT).show()


            when (state) {
                "active" -> {
                    qsTile.state = Tile.STATE_ACTIVE
                    qsTile.icon = Icon.createWithResource(this@QuickTileService, R.drawable.ic_safe_active) // Use your active icon
                }
                "inactive" -> {
                    qsTile.state = Tile.STATE_INACTIVE
                    qsTile.icon = Icon.createWithResource(this@QuickTileService, R.drawable.ic_safe_inactive) // Use your inactive icon
                }
            }
            qsTile.updateTile()
        }
    }
}
