package com.women.sefty;



import android.content.Context;
import android.content.SharedPreferences;

public class SharedPreferencesModule {
    private static final String PREFS_NAME = "MyPrefs";

    private SharedPreferences preferences;



    public SharedPreferencesModule(Context context) {
        preferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    public void saveString(String key, String value) {
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(key, value);
        editor.apply();
    }

    public String getString(String key, String defaultValue) {
        return preferences.getString(key, defaultValue);
    }

    public void removeString(String key) {
        SharedPreferences.Editor editor = preferences.edit();
        editor.remove(key);
        editor.apply();
    }
}

