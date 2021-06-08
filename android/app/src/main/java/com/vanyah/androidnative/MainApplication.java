package com.vanyah.androidnative;

import com.theweflex.react.WeChatPackage; // Add this line

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.airbnb.android.react.lottie.LottiePackage;
import com.brentvatne.react.ReactVideoPackage;

// umeng
import com.umeng.socialize.PlatformConfig;
import com.umeng.commonsdk.UMConfigure;

import cn.jiguang.plugins.push.JPushModule;
import com.microsoft.codepush.react.CodePush;


// import com.umeng.message.MsgConstant;
// import com.umeng.message.PushAgent;
// import com.umeng.message.UTrack;
// import com.umeng.message.UmengMessageHandler;
// import com.umeng.message.entity.UMessage;
// import com.umeng.message.UmengNotificationClickHandler;
// import com.umeng.message.IUmengRegisterCallback;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new LottiePackage());
          packages.add(new WeChatPackage()); // Add this line
          packages.add(new DplusReactPackage()); // 增加这行
          packages.add(new ReactVideoPackage()); // 增加这行

//           packages.add(new JPushPackage());

          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

    JPushModule.registerActivityLifecycle(this);
//    UMConfigure.setLogEnabled(true);
    RNUMConfigure.init(this, "5fd0a85dbed37e4506c7b5a8", "Umeng", UMConfigure.DEVICE_TYPE_PHONE, "");
  }

    {
         PlatformConfig.setSinaWeibo("3691201000", "08b8e8ad55f0681b8ae109bbe8806652", "https://app.meirixinxue.com/");
         PlatformConfig.setQQZone("1111498808", "9J2y7keKBcjYZHDs");
    }
  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.vanyah.androidnative.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
