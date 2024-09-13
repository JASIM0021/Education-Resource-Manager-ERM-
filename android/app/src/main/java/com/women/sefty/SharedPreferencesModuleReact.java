package com.women.sefty;




import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SharedPreferencesModuleReact extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "SharedPreferencesModule";
    private SharedPreferencesModule sharedPreferencesModule;

    public SharedPreferencesModuleReact(ReactApplicationContext reactContext) {
        super(reactContext);
        sharedPreferencesModule = new SharedPreferencesModule(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void saveString(String key, String value) {
        sharedPreferencesModule.saveString(key, value);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getString(String key, String defaultValue) {
        return sharedPreferencesModule.getString(key, defaultValue);
    }

    @ReactMethod
    public void removeString(String key) {
        sharedPreferencesModule.removeString(key);
    }
}

