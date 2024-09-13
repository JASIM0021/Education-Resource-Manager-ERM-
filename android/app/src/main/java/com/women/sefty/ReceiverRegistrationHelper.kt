package com.women.sefty

import android.content.BroadcastReceiver

import android.content.Context
import android.content.IntentFilter

class ReceiverRegistrationHelper {

    companion object {
        fun registerReceiver(context: Context, receiver: BroadcastReceiver) {
            val filter = IntentFilter()
            filter.addAction(NotificationService.ACTION_SAFE)
            filter.addAction(NotificationService.ACTION_NOT_SAFE)
            context.registerReceiver(receiver, filter)
        }
    }
}