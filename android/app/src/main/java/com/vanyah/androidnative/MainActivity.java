package com.vanyah.androidnative;
import android.os.Bundle;
import android.content.Intent;
import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash;
import com.umeng.analytics.MobclickAgent;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "wanya_native";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this);
    MobclickAgent.setSessionContinueMillis(1000);
  }

  @Override
  public void onResume() {
      super.onResume();
      MobclickAgent.onResume(this);
  }
  @Override
  protected void onPause() {
      super.onPause();
      MobclickAgent.onPause(this);
  }
}