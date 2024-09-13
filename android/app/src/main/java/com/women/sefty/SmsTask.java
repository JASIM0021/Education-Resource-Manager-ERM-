package com.women.sefty;

import android.content.Context;
import android.location.Location;
import android.telephony.SmsManager;
import android.util.Log;

public class SmsTask {

    public static void sendSMS(String phoneNumber, String message) {
        try {
            Log.d("TAG", "sendSMS: phoneNumber message " + phoneNumber + "    " + message);
            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(phoneNumber, null, message, null, null);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void getCurrentLocation(Context context, LocationCallback callback) {
        LocationHelper locationHelper = new LocationHelper(context);
        locationHelper.getCurrentLocation(location -> {
            if (location != null) {
                callback.onLocationReceived(location);
            } else {
                Log.d("TAG", "Failed to get location");
            }
        });
    }

    public static String generateMapLink(double latitude, double longitude) {
        return "https://www.google.com/maps?q=" + latitude + "," + longitude;
    }

    public interface LocationCallback {
        void onLocationReceived(Location location);
    }
}
