import React, {Component, useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Button, StatusBar, Platform, View, ImageBackground} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {jverifyPhone} from '@/api/phone_sign_api';
import {dispatchUpdateSocialAccount} from '@/redux/actions';
import {BaseApiUrl} from '@/utils/config';
import {SCREEN_WIDTH} from '@/utils/navbar';
import Toast from '@/components/Toast';
import JVerification from 'jverification-react-native';
import Loading from '@/components/Loading';
//一键登录页面自定义配置，需要在调用login之前设置

// const customUIWithConfigiOS = {
//   logoHidden: true,
//   statusBarHidden: true,
//   statusBarMode: 'dark',
//   showWindow: false,
//   navReturnHidden: false,
//   navHidden: true,
//   backgroundImage: 'bg.png',
//   //logo
//   // logoImage: 'umcsdk_mobile_logo',
//   // logoConstraints: [0, -200, 60, 60],
//   //number
//   numberConstraints: [0, 30, 200, 14],
//   numberSize: 18,
//   numberColor: 16777215,
//   //slogn
//   sloganHidden: true,
//   // sloganConstraints: [0, 40, 200, 14],
//   //登录按钮
//   loginBtnNormalImage: 'loginBtn.png',
//   loginBtnSelectedImage: 'loginBtn.png',
//   logBtnConstraints: [0, 80, 265, 45],
//   loginBtnText: '',
//   loginBtnTextColor: 16777215, // 白色
//   privacyConstraints: [0, 350, 300, 60],
//   checkViewConstraints: [-108, 350, 10, 10],
//   unAgreePrivacyCallBack: true,
//   privacyCheckboxHidden: true,
//   privacyCheckEnable: true,
//   privacyCheckboxSize: 20,
//   privacyOne: ['用户协议', `${BaseApiUrl}/home/user_agreement`], //隐私条款一（显示名称和url，请严格按照格式）
//   privacyTwo: ['隐私政策', `${BaseApiUrl}/home/private_policy`], //隐私条款二（显示名称和url，请严格按照格式）
//   privacyColor: [12434877, 12434877], //隐私条款颜色 （显示名称和url的颜色，请严格按照格式）
//   privacyText: ['登录即同意', '和', '、', '并使用本机号码登录'], //隐私条款名称外的文字
//   privacyTextSize: 10, //隐私条款文字字体大小
//   privacyTextGravityMode: 'center', //隐私条款文本对齐方式，目前仅支持 left、center
//   privacyBookSymbolEnable: true, //隐私条款是否显示书名号，默认不显示
//
//   privacyWebNavColor: -16777216, //协议页导航栏背景颜色
//   privacyWebNavTitle: '服务条款', //协议页导航栏标题（仅iOS）
//   privacyWebNavTitleSize: 16, //协议页导航栏标题字体大小
//   privacyWebNavTitleColor: -1, //协议页导航栏标题字体颜色
//   privacyWebNavReturnImage: 'close',
// };
// const customUIWithConfigAndroid = {
//   backgroundImage: '', //背景图
//
//   statusBarHidden: false, //状态栏是否隐藏
//   statusBarMode: 'light', //状态栏模式 light,dark
//
//   navHidden: false, //导航栏是否隐藏
//   navColor: -16777216, //导航栏颜色
//
//   navTitle: 'RN-JVerification', //导航栏标题
//   navTitleSize: 16, //导航栏标题文字字体大小(单位:sp）
//   navTitleColor: -1, //导航栏标题文字颜色
//
//   navReturnHidden: false, //导航栏返回按钮是否隐藏
//   navReturnImage: 'close', //导航栏左侧返回按钮图标
//   //为保障显示效果，请同时设置x,y,w,h
//   navReturnX: 5, //导航栏左侧返回按钮图标距屏幕上端偏移（仅Android)
//   navReturnY: 5, //导航栏左侧返回按钮图标距屏幕左侧偏移（仅Android)
//   navReturnW: 25, //导航栏左侧返回按钮图标宽度（仅Android)
//   navReturnH: 25, //导航栏左侧返回按钮图标高度（仅Android)
//
//   logoHidden: false, //logo是否隐藏
//   logoImage: 'umcsdk_mobile_logo', //logo(android默认为应用图标;)
//   //为保障显示效果，请同时设置x,y,w,h
//   // logoX: 50,                              //logo相对于屏幕左边x轴偏移
//   // logoY: 50,                              //logo相对于标题栏下边缘y偏移
//   // logoW: 100,                             //logo宽
//   // logoH: 100,                              //logo高
//
//   numberSize: 16, //手机号码字体大小（单位:sp）
//   numberColor: -16777216, //手机号码字体颜色
//   //为保障显示效果，请同时设置x,y,w,h
//   // numberX: 50,                            //号码栏相对于屏幕左边x轴偏移
//   // numberY: 100,                           //号码栏相对于标题栏下边缘y偏移
//   // numberW: 250,                           //号码栏宽度
//   // numberH: 25,                            //号码栏高度
//
//   sloganHidden: false, //slogan是否隐藏
//   sloganTextSize: 16, //slogan字体大小
//   sloganTextColor: -16777216, //slogan文字颜色
//
//   //为保障显示效果，请同时设置x,y,w,h
//   // sloganX: 50,                            //slogan相对于屏幕左边x轴偏移
//   // sloganY: 150,                           //slogan相对于标题栏下边缘y偏移
//
//   loginBtnText: '登录按钮', //登录按钮文字
//   loginBtnTextSize: 16, //登录按钮字体大小
//   loginBtnTextColor: -16777216, //登录按钮文字颜色
//
//   loginBtnImage: 'login_btn_selector', //登录按钮selector选择样式 （仅android）
//   loginBtnNormalImage: 'loginBtn_Nor', //登录按钮正常图片 （仅ios,三个同时设置生效）
//   loginBtnDisabledImage: 'loginBtn_Dis', //登录按钮失效图片  (仅ios,三个同时设置生效）
//   loginBtnSelectedImage: 'loginBtn_Hig', //登录按钮按下图片  (仅ios,三个同时设置生效）
//   //为保障显示效果，请同时设置x,y,w,h
//   // loginBtnX: 50,                          //登录按钮相对于屏幕左边x轴偏移
//   // loginBtnY: 200,                         //登录按钮相对于标题栏下边缘y偏移
//   // loginBtnW: 250,                         //登录按钮宽度
//   // loginBtnH: 40,                          //登录按钮高度
//
//   privacyOne: ['隐私条款一', 'https://www.jiguang.cn/about'], //隐私条款一（显示名称和url，请严格按照格式）
//   privacyTwo: ['隐私条款二', 'https://www.jiguang.cn/about'], //隐私条款二（显示名称和url，请严格按照格式）
//   privacyColor: [-16777216, -65536], //隐私条款颜色 （显示名称和url的颜色，请严格按照格式）
//   privacyText: ['登录即同意11111', '和', '、', '并使用本机号码登录'], //隐私条款名称外的文字
//   privacyTextSize: 15, //隐私条款文字字体大小
//   privacyTextGravityMode: 'left', //隐私条款文本对齐方式，目前仅支持 left、center
//   privacyBookSymbolEnable: false, //隐私条款是否显示书名号，默认不显示
//   //为保障显示效果，请同时设置x,y,w,h
//   // privacyX:50,                                             //隐私条款相对于屏幕左边x轴偏移
//   // privacyY:20,                                             //隐私条款相对于授权页面底部下边缘y偏移
//   // privacyW:200,                                            //隐私条款宽度
//   // privacyH:100,                                            //隐私条款高度
//
//   privacyCheckboxHidden: true, //checkBox是否隐藏，默认不隐藏
//   privacyCheckEnable: false, //checkBox默认状态 默认:NO
//   privacyCheckedImage: 'checkbox_selected', //checkBox选中时图片
//   privacyUncheckedImage: 'checkbox_unSelected', //checkBox未选中时图片
//   privacyCheckboxSize: 10, //设置隐私条款checkbox尺寸 默认是10
//   unAgreePrivacyHintToast: true,
//
//   privacyWebNavColor: -16777216, //协议页导航栏背景颜色
//   privacyWebNavTitle: '服务条款', //协议页导航栏标题（仅iOS）
//   privacyWebNavTitleSize: 16, //协议页导航栏标题字体大小
//   privacyWebNavTitleColor: -1, //协议页导航栏标题字体颜色
//   privacyWebNavReturnImage: 'close', //协议页导航栏返回按钮图片
// };
//
// const customViewParams = [
//   {customViewName: 'customView1', customViewPoint: [0, 500, SCREEN_WIDTH, 120]},
// ];

const OneLogin = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [currentState, setCurrentState] = useState('');
  const initParams = {
    time: 5000,
    appKey: '7cd75000d5932000b3d4ca59', //仅iOS
    channel: 'release', //仅iOS
    // advertisingId: 'advertisingId', //仅iOS
    isProduction: true, //仅iOS
  };

  JVerification.addLoginEventListener(async result => {
    console.log('LoginListener:' + JSON.stringify(result));
    const badCode = [6001, 6002, 6003, -994, -996, -997];
    const code = result.code;
    if (code === 6000) {
      const res = await jverifyPhone({jverify_phone_token: result.content});
      if (res.error) {
        Toast.showError(res.error, {});
      } else {
        JVerification.dismissLoginPage();
        dispatch(dispatchUpdateSocialAccount(res.account.token, ''));
      }
    } else if (badCode.includes(code)) {
      goToPhone();
    } else if (code === 6004) {
      setTimeout(() => {
        goToPhone();
      }, 3000);
    }
  });

  const goToPhone = (type = 'nav') => {
    if (type === 'nav') {
      navigation.navigate('LoginPhoneCode');
    } else if (type === 'reset') {
      navigation.reset({index: 0, routes: [{name: 'LoginPhoneCode'}]});
    }
  };

  const checkJverify = () => {
    try {
      JVerification.checkLoginEnable(result => {
        console.log('checkLoginEnable:' + JSON.stringify(result));
        if (result.enable) {
          console.log('start page');
          // setCurrentState('onelogin')
          JVerification.login(false);
        } else {
          goToPhone('reset');
        }
      });
      // JVerification.login(true);
    } catch (e) {
      console.log('ee', e);
      goToPhone();
    }
  };

  useFocusEffect(() => {
    checkJverify();
    console.log('fouce');
    return () => {
      // setCurrentState('');
    };
  }, []);
  return (
    <View style={{backgroundColor: 'black'}}>
      <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />
      {/*<Loading type={'CircleFlip'} style={{backgroundColor: 'black'}} />*/}
      <ImageBackground
        source={require('../../assets/images/social-login.jpg')}
        style={{width: '100%', height: '100%', backgroundColor: 'black'}}
        resizeMode={'cover'}>
        <Loading type={'9CubeGrid'} style={{backgroundColor: 'black'}} text={'顽鸦'} size={80} />
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
        {/*      createAlert('checkLoginEnable:' + JSON.stringify(result));*/}
        {/*    })*/}
        {/*  }*/}
        {/*/>*/}

        {/*<Button title='getToken'*/}
        {/*        onPress={() => JVerification.getToken(5000, result => {*/}
        {/*          console.log('getToken:' + JSON.stringify(result));*/}
        {/*          createAlert('getToken:' + JSON.stringify(result));*/}

        {/*        })}/>*/}

        {/*<Button*/}
        {/*  title="preLogin"*/}
        {/*  onPress={() => {*/}
        {/*    JVerification.clearPreLoginCache();*/}
        {/*    JVerification.preLogin(5000, result => {*/}
        {/*      console.log('preLogin:' + JSON.stringify(result));*/}
        {/*      createAlert('preLogin:' + JSON.stringify(result));*/}
        {/*    });*/}
        {/*  }}*/}
        {/*/>*/}

        {/*<Button*/}
        {/*  title="addLoginCustomConfig"*/}
        {/*  onPress={() => {*/}
        {/*    JVerification.clearPreLoginCache()*/}
        {/*    if (Platform.OS === 'android') {*/}
        {/*      JVerification.addLoginCustomConfig(customUIWithConfigAndroid, customViewParams);*/}
        {/*    } else {*/}
        {/*      JVerification.addLoginCustomConfig(customUIWithConfigiOS, customViewParams);*/}
        {/*    }*/}
        {/*  }}*/}
        {/*/>*/}

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

        {/*<Button title="login" onPress={() => JVerification.login(true)} />*/}

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
      </ImageBackground>
    </View>
  );
};

export default OneLogin;
