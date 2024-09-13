package com.women.sefty;



import android.content.Context;
import android.media.AudioManager;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;

public class RingtonePlayer {

    private Ringtone ringtone;

    public void playDefaultRingtone(Context context) {
        // Get the default ringtone URI
        Uri ringtoneUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
        if (ringtoneUri != null) {
            // Create a Ringtone object from the default ringtone URI
            ringtone = RingtoneManager.getRingtone(context, ringtoneUri);

            // Adjust the audio stream type to ensure the sound is played at full volume
            AudioManager audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
            int maxVolume = audioManager.getStreamMaxVolume(AudioManager.STREAM_RING);
            audioManager.setStreamVolume(AudioManager.STREAM_RING, maxVolume, AudioManager.FLAG_ALLOW_RINGER_MODES);

            // Start playing the ringtone
            ringtone.play();
        }
    }

    public void stopRingtone() {
        if (ringtone != null && ringtone.isPlaying()) {
            // Stop the ringtone if it's playing
            ringtone.stop();
        }
    }
}
