package com.pathfinder.ahchacha;

import com.facebook.react.ReactActivity;

// react-native-bootsplash
import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash; //react-native-bootsplash

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ahchacha";
  }

  // Added
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null); // with react-native-screens
    RNBootSplash.init(R.drawable.ic_bootsplash, MainActivity.this); // display the generated bootsplash.xml drawable over
                                                                 // our MainActivity
  }
}
