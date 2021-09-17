import React, {Component, useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, AlertIOS, Button, StatusBar, Platform, View, ImageBackground} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {jverifyPhone} from '@/api/phone_sign_api';
import {dispatchUpdateSocialAccount} from '@/redux/actions';
import {BaseApiUrl} from '@/utils/config';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/utils/navbar';
import Toast from '@/components/Toast';
import JVerification from 'jverification-react-native';
import Loading from '@/components/Loading';
import {debounce, throttle} from 'lodash';

let tgophonetimeout = '';

let toPhoneListen = []

const OneLogin = ({navigation, route}) => {
  const dispatch = useDispatch();



  //一键登录页面自定义配置，需要在调用login之前设置
  const customUIWithConfigiOS = {
    logoHidden: true,
    statusBarHidden: true,
    statusBarMode: 'dark',
    showWindow: false,
    navReturnHidden: false,
    navHidden: true,
    backgroundImage: (SCREEN_HEIGHT > 800 ? 'bg1.png' : 'bg.png'),
    //logo
    // logoImage: 'umcsdk_mobile_logo',
    // logoConstraints: [0, -200, 60, 60],
    //number
    numberConstraints: [0, 40, 200, 18],
    numberSize: 20,
    numberColor: 16777215,
    //slogn
    sloganHidden: true,
    // sloganConstraints: [0, 40, 200, 14],
    //登录按钮
    loginBtnNormalImage: 'loginBtn.png',
    loginBtnSelectedImage: 'loginBtn.png',
    logBtnConstraints: [0, 94, 290, 50], //1062*180
    loginBtnText: '',
    loginBtnTextColor: 16777215, // 白色
    privacyConstraints: [0, 325, 300, 70],
    checkViewConstraints: [-157, 318, 50, 50],
    unAgreePrivacyCallBack: false,
    privacyCheckboxHidden: false,
    UncheckBoxCallBack: true,
    privacyCheckEnable: true,
    privacyCheckboxSize: 20,
    privacyOne: ['用户协议', `${BaseApiUrl}/home/user_agreement`], //隐私条款一（显示名称和url，请严格按照格式）
    privacyTwo: ['隐私政策', `${BaseApiUrl}/home/private_policy`], //隐私条款二（显示名称和url，请严格按照格式）
    privacyColor: [12434877, 16777215], //隐私条款颜色 （显示名称和url的颜色，请严格按照格式）
    privacyText: ['登录注册即表示已阅读并同意', '和', '、', '  '], //隐私条款名称外的文字
    privacyTextSize: 11, //隐私条款文字字体大小
    privacyTextGravityMode: 'center', //隐私条款文本对齐方式，目前仅支持 left、center
    privacyBookSymbolEnable: true, //隐私条款是否显示书名号，默认不显示

    privacyWebNavColor: -16777216, //协议页导航栏背景颜色
    privacyWebNavTitle: '服务条款', //协议页导航栏标题（仅iOS）
    privacyWebNavTitleSize: 16, //协议页导航栏标题字体大小
    privacyWebNavTitleColor: -1, //协议页导航栏标题字体颜色
    privacyWebNavReturnImage: 'close',
  };
  const customUIWithConfigAndroid = {
    backgroundImage: 'bg1', //背景图

    statusBarHidden: false, //状态栏是否隐藏
    statusBarMode: 'dark', //状态栏模式 light,dark

    navHidden: true, //导航栏是否隐藏
    navColor: -16777216, //导航栏颜色

    // navTitle: 'RN-JVerification', //导航栏标题
    // navTitleSize: 16, //导航栏标题文字字体大小(单位:sp）
    // navTitleColor: -1, //导航栏标题文字颜色

    // navReturnHidden: true, //导航栏返回按钮是否隐藏
    navReturnImage: 'close', //导航栏左侧返回按钮图标
    //为保障显示效果，请同时设置x,y,w,h
    navReturnX: 5, //导航栏左侧返回按钮图标距屏幕上端偏移（仅Android)
    navReturnY: 5, //导航栏左侧返回按钮图标距屏幕左侧偏移（仅Android)
    navReturnW: 25, //导航栏左侧返回按钮图标宽度（仅Android)
    navReturnH: 25, //导航栏左侧返回按钮图标高度（仅Android)

    logoHidden: true, //logo是否隐藏
    // logoImage: 'umcsdk_mobile_logo', //logo(android默认为应用图标;)
    //为保障显示效果，请同时设置x,y,w,h
    // logoX: 50,                              //logo相对于屏幕左边x轴偏移
    // logoY: 50,                              //logo相对于标题栏下边缘y偏移
    // logoW: 100,                             //logo宽
    // logoH: 100,                              //logo高

    numberSize: 22, //手机号码字体大小（单位:sp）
    numberColor: -67333, //手机号码字体颜色
    //为保障显示效果，请同时设置x,y,w,h
    // 0, 40, 200, 18
    numberX: 0,                            //号码栏相对于屏幕左边x轴偏移
    numberY: 100,                           //号码栏相对于标题栏下边缘y偏移
    numberW: 200,                           //号码栏宽度
    numberH: 18,                            //号码栏高度

    sloganHidden: true, //slogan是否隐藏
    sloganTextSize: 16, //slogan字体大小
    sloganTextColor: -16777216, //slogan文字颜色

    //为保障显示效果，请同时设置x,y,w,h
    // sloganX: 50,                            //slogan相对于屏幕左边x轴偏移
    // sloganY: 150,                           //slogan相对于标题栏下边缘y偏移

    loginBtnText: '', //登录按钮文字
    loginBtnTextSize: 16, //登录按钮字体大小
    loginBtnTextColor: -16777216, //登录按钮文字颜色

    loginBtnImageSelector: 'login_btn_selector', //登录按钮selector选择样式 （仅android）
    // loginBtnNormalImage: 'login_btn_normal', //登录按钮正常图片 （仅ios,三个同时设置生效）
    // loginBtnDisabledImage: 'login_btn_press', //登录按钮失效图片  (仅ios,三个同时设置生效）
    // loginBtnSelectedImage: 'login_btn_unable', //登录按钮按下图片  (仅ios,三个同时设置生效）
    //为保障显示效果，请同时设置x,y,w,h
    // 0, 80, 265, 45
    //0, 94, 290, 50
    loginBtnOffsetX: 18,                          //登录按钮相对于屏幕左边x轴偏移
    loginBtnOffsetY: 125, //登录按钮相对于标题栏下边缘y偏移
    loginBtnWidth: 88, //登录按钮宽度
    loginBtnHeight: 15, //180/(1062/70),                          //登录按钮高度

    privacyOne: ['《用户协议》', `${BaseApiUrl}/home/user_agreement`], //隐私条款一（显示名称和url，请严格按照格式）
    privacyTwo: ['《隐私政策》', `${BaseApiUrl}/home/private_policy`], //隐私条款二（显示名称和url，请严格按照格式）
    privacyColor: [0xffbdbdbd, -67333], //隐私条款颜色 （显示名称和url的颜色，请严格按照格式） https://www.shuxuele.com/hexadecimal-decimal-colors.html
    privacyText: ['登录注册即表示已阅读并同意', '和', '、', ''], //隐私条款名称外的文字
    privacyTextSize: 14, //隐私条款文字字体大小
    privacyTextGravityMode: 'center', //隐私条款文本对齐方式，目前仅支持 left、center
    privacyBookSymbolEnable: true, //隐私条款是否显示书名号，默认不显示
    //为保障显示效果，请同时设置x,y,w,h
    //privacyConstraints: [0, 325, 300, 70],
    // privacyOffsetX: -1,                                             //隐私条款相对于屏幕左边x轴偏移
    // privacyOffsetY: 0, //隐私条款相对于授权页面底部下边缘y偏移
    privacyW: 200, //隐私条款宽度
    privacyH: -5, //隐私条款高度
    privacyCheckboxHidden: false, //checkBox是否隐藏，默认不隐藏
    privacyCheckEnable: false, //checkBox默认状态 默认:NO
    privacyCheckedImage: 'checkbox_selected', //checkBox选中时图片
    privacyUncheckedImage: 'checkbox_unselected', //checkBox未选中时图片
    privacyCheckboxSize: 13, //设置隐私条款checkbox尺寸 默认是10
    unAgreePrivacyHintToast: true,

    privacyWebNavColor: -16777216, //协议页导航栏背景颜色
    privacyWebNavTitle: '服务条款', //协议页导航栏标题（仅iOS）
    privacyWebNavTitleSize: 16, //协议页导航栏标题字体大小
    privacyWebNavTitleColor: -1, //协议页导航栏标题字体颜色
    privacyWebNavReturnImage: 'close', //协议页导航栏返回按钮图片
  };

  const customViewParams = [
    {customViewName: 'jverify_bottom_view', customViewPoint: [0, SCREEN_HEIGHT/1.5, SCREEN_WIDTH, 150]},
  ];
  const customViewParamsAdnroid = [
    {customViewName: 'jverify_bottom_view_android', customViewPoint: [0, 450, SCREEN_WIDTH, 150]},
  ];
  // JVerification.preLogin();
  if (Platform.OS === 'android') {
    console.log('android');
    JVerification.addLoginCustomConfig(customUIWithConfigAndroid, customViewParamsAdnroid);
  } else {
    JVerification.addLoginCustomConfig(customUIWithConfigiOS, customViewParams);
  }

  this.listener = JVerification.addLoginEventListener(async result => {
    console.log('LoginListener:' + JSON.stringify(result));
    jump(result);
    // }, 800);
  });

  const jump = async result => {
    const badCode = [2005, 6001, 6003, -994, -996, -997];
    const code = result.code;
    if (code === 6000) {
      // Toast.showError('请勾选同意协议');
      const res = await jverifyPhone({jverify_phone_token: result.content});
      if (res.error) {
        // Toast.showError(res.error, {});
      } else {
        Toast.hide();
        dispatch(dispatchUpdateSocialAccount(res.account.token));
        JVerification.dismissLoginPage();
      }
    } else if (badCode.includes(code)) {
      goToPhone();
    } else if (code === 6004) {
      tgophonetimeout = setTimeout(() => {
        goToPhone();
      }, 45000);
      toPhoneListen.push(tgophonetimeout);
    } else if (code === 6002) {
      this.listener && this.listener.remove();
    } else if (code === 7) {
      console.log('toast');
      Toast.showError('请勾选同意协议');
    } else if (code === 6) {
      Toast.hide();
    } else if (code === 2) {
      // console.log('tgophonetimeout', toPhoneListen);
      toPhoneListen.forEach((t) => t && clearTimeout(t));
    } else if (code >= 2000 && code <= 2016) {
      goToPhone();
    }
  };

  const goToPhone = (type = 'nav') => {
    JVerification.dismissLoginPage();
    if (type === 'nav') {
      navigation.navigate('LoginPhoneCode');
    } else if (type === 'reset') {
      navigation.reset({index: 0, routes: [{name: 'LoginPhoneCode'}]});
    }
  };

  const checkJverify = () => {
    if (Platform.OS === 'android') {
      console.log('android');
      JVerification.addLoginCustomConfig(customUIWithConfigAndroid, customViewParamsAdnroid);
    }

    console.log('loadding...')
    try {
      JVerification.checkLoginEnable(result => {
        console.log('checkLoginEnable:' + JSON.stringify(result));
        if (result.enable) {
          console.log('start page');
          setTimeout(() => {
            JVerification.login(true);
          }, 500);
        } else {
          goToPhone('reset');
        }
      });
    } catch (e) {
      console.log('ee', e);
      goToPhone();
    }
  };

  useFocusEffect(() => {
    console.log('fouce');
    // debounce(a, 300)
    checkJverify();
    return () => {
      // JVerification.dismissLoginPage();
      // console.log('remove ', this.listener)
      //
      // JVerification.removeListener(result => {
      //   console.log('remove LoginListener:' + JSON.stringify(result));
      // })
      //
      // this.listener && this.listener.remove();
      // setCurrentState('');
    };
  }, []);
  return (
    <View style={{backgroundColor: 'black', width: '100%', height: '100%'}}>
      <StatusBar barStyle={'light-content'} translucent />
      <Loading type={'Bounce'} style={{backgroundColor: 'black'}} text={'none'} size={34} />
      {/*<Loading type={'CircleFlip'} style={{backgroundColor: 'black'}} />*/}
      {/*<ImageBackground*/}
      {/*source={require('../../assets/images/social-login.jpg')}*/}
      {/*style={{width: '100%', height: '100%', backgroundColor: 'black'}}*/}
      {/*resizeMode={'cover'}>*/}

      {/*<ThirdLogin />*/}
      {/*<Button*/}
      {/*  title="isInitSuccess"*/}
      {/*  onPress={() =>*/}
      {/*    JVerification.isInitSuccess(result => {*/}
      {/*      console.log('isInitSuccess:' + JSON.stringify(result));*/}
      {/*      createAlert('isInitSuccess:' + JSON.stringify(result));*/}
      {/*    })*/}
      {/*  }*/}
      {/*/>*/}

      {/*<Button*/}
      {/*  title="checkLoginEnable"*/}
      {/*  onPress={() =>*/}
      {/*    JVerification.checkLoginEnable(result => {*/}
      {/*      console.log('checkLoginEnable:' + JSON.stringify(result));*/}
      {/*    })*/}
      {/*  }*/}
      {/*/>*/}

      {/*<Button*/}
      {/*  title="getToken"*/}
      {/*  onPress={() =>*/}
      {/*    JVerification.getToken(5000, result => {*/}
      {/*      console.log('getToken:' + JSON.stringify(result));*/}
      {/*    })*/}
      {/*  }*/}
      {/*/>*/}

      {/*<Button*/}
      {/*  title="preLogin"*/}
      {/*  onPress={() => {*/}
      {/*    JVerification.clearPreLoginCache();*/}
      {/*    JVerification.preLogin(5000, result => {*/}
      {/*      console.log('preLogin:' + JSON.stringify(result));*/}
      {/*    });*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<Button*/}
      {/*  title="addLoginCustomConfig"*/}
      {/*  style={{marginTop: 40}}*/}
      {/*  onPress={() => {*/}
      {/*    JVerification.clearPreLoginCache()*/}
      {/*    if (Platform.OS === 'android') {*/}
      {/*      JVerification.addLoginCustomConfig(customUIWithConfigAndroid, customViewParamsAdnroid);*/}
      {/*    } else {*/}
      {/*      JVerification.addLoginCustomConfig(customUIWithConfigiOS, customViewParams);*/}
      {/*    }*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<Button title="login" onPress={() => {*/}
      {/*  if (Platform.OS === 'android') {*/}
      {/*    console.log('android');*/}
      {/*    JVerification.addLoginCustomConfig(customUIWithConfigAndroid, customViewParamsAdnroid);*/}
      {/*  }*/}
      {/*  JVerification.login(false)*/}
      {/*  }*/}
      {/*} />*/}

      {/*<Button*/}
      {/*  title="自定义弹窗授权页"*/}
      {/*  onPress={() => {*/}
      {/*    if (Platform.OS == 'android') {*/}
      {/*      JVerification.addLoginCustomConfig(androidDialogConfig, customViewParams);*/}
      {/*    } else {*/}
      {/*      JVerification.addLoginCustomConfig(iosDialogConfig, customViewParams);*/}
      {/*    }*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<View style={styles.privateText} allowFontScaling={false} adjustsFontSizeToFit={false}>*/}
      {/*  /!*<Pressable*!/*/}
      {/*  /!*  style={styles.ruleWrapper}*!/*/}
      {/*  /!*  hitSlop={{left: 10, right: 10, top: 30}}*!/*/}
      {/*  /!*  onPress={() => {*!/*/}
      {/*  /!*    if (!IsIos) {*!/*/}
      {/*  /!*      setCanShowAgree(!canShowAgree);*!/*/}
      {/*  /!*    }*!/*/}
      {/*  /!*  }}>*!/*/}
      {/*  /!*  <View style={styles.checkbox}>*!/*/}
      {/*  /!*    {!canShowAgree && <IconFont name="yixuan" size={16} color="red" />}*!/*/}
      {/*  /!*  </View>*!/*/}
      {/*  /!*</Pressable>*!/*/}

      {/*  <Text style={styles.textContent}>我已阅读并同意</Text>*/}
      {/*  <Pressable*/}
      {/*    onPress={() => {*/}
      {/*      goPages('user');*/}
      {/*    }}*/}
      {/*    hitSlop={{top: 10, bottom: 10}}>*/}
      {/*    <Text style={styles.textContent}>《用户协议》</Text>*/}
      {/*  </Pressable>*/}
      {/*  <Text style={styles.textContent}>和</Text>*/}
      {/*  <Pressable*/}
      {/*    onPress={() => {*/}
      {/*      goPages('private');*/}
      {/*    }}*/}
      {/*    hitSlop={{top: 10, bottom: 10}}>*/}
      {/*    <Text style={styles.textContent}>《隐私政策》</Text>*/}
      {/*  </Pressable>*/}
      {/*</View>*/}
      {/*</ImageBackground>*/}
    </View>
  );
};

export default OneLogin;
