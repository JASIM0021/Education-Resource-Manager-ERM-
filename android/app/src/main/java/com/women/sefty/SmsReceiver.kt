package com.women.sefty

import android.content.BroadcastReceiver
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.os.Bundle
import android.telephony.SmsMessage
import android.widget.Toast

class SmsReceiver : BroadcastReceiver() {

    private lateinit var sharedPreferencesModule: SharedPreferencesModule

    override fun onReceive(context: Context, intent: Intent) {
        Toast.makeText(context, "Sms received", Toast.LENGTH_SHORT).show()
        val bundle = intent.extras
        if (bundle != null) {
            val pdus = bundle.get("pdus") as Array<*>?
            if (pdus != null) {
                for (pdu in pdus) {
                    val smsMessage = SmsMessage.createFromPdu(pdu as ByteArray)
                    val sender = smsMessage.displayOriginatingAddress
                    val messageBody = smsMessage.messageBody
                    // Display the SMS details in a toast
                    Toast.makeText(context, "SMS Received\nSender: $sender\nMessage: $messageBody", Toast.LENGTH_LONG).show()

                    sharedPreferencesModule = SharedPreferencesModule(context)

                    val number = sharedPreferencesModule.getString("@secret_phone", "")
                    val secretMessage = sharedPreferencesModule.getString("@secret_code", "")

                    val packageManager = context.packageManager
                    val componentName = ComponentName(packageManager.toString(), "com.women.sefty.MainActivity")

                    if (messageBody.contains(secretMessage)) {
                        if (messageBody.contains(Constants.SmsTask.LOCATION)) {
                            try {
                                SmsTask.getCurrentLocation(context, object : SmsTask.LocationCallback {
                                    override fun onLocationReceived(location: Location?) {
                                        if (location != null) {
                                            val mapLink = SmsTask.generateMapLink(location.latitude, location.longitude)
                                            SmsTask.sendSMS(number, "Your Device current location is: $mapLink")
                                        }
                                    }
                                })
                            } catch (e: SecurityException) {
                                e.printStackTrace()
                                SmsTask.sendSMS(number, "Location permission denied")
                            }
                        }

                        if (messageBody.contains(Constants.SmsTask.RING)) {
                            val ringtonePlayer = RingtonePlayer()
                            ringtonePlayer.playDefaultRingtone(context)
                        }
                    }
                }
            }
        }
    }
}
