package com.women.safety

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.widget.Toast

class NotificationActionReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val action = intent.action

        if (action != null) {
            when (action) {
                "com.safetyapp.ACTION_SAFE" ->                     // Handle the "I am safe" button click
                    Toast.makeText(context, "Safe button clicked", Toast.LENGTH_SHORT).show()

                "com.safetyapp.ACTION_NOT_SAFE" ->                     // Handle the "Not safe" button click
                    Toast.makeText(context, "Not safe button clicked", Toast.LENGTH_SHORT).show()

                "com.safetyapp.ACTION_COMPLETE" ->                     // Handle the "Safety complete" button click
                    Toast.makeText(context, "Safety complete button clicked", Toast.LENGTH_SHORT)
                        .show()

                Intent.ACTION_VIEW ->                     // Handle the notification click
                    Toast.makeText(context, "Notification clicked", Toast.LENGTH_SHORT).show()

                else -> {}
            }
        }
    }
}