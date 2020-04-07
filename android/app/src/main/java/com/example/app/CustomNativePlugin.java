package com.example.app;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.Plugin;

@NativePlugin()
public class CustomNativePlugin extends Plugin {

    @PluginMethod()
    public void customCall(PluginCall call) {
        String message = call.getString("message Li");
        call.success();
    }

    @PluginMethod()
    public void customFunction(PluginCall call) {
        call.resolve();
    }
}
