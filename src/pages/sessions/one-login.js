import React, {Component, useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  Platform,
  View,
  Text,
  ImageBackground,
  Pressable,
  Alert,

  TouchableHighlight,
} from 'react-native';
import {Button} from 'react-native-elements';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import Helper from '../../utils/helper';
import * as WeChat from 'react-native-wechat-lib';
import {appWechatSignIn, appAppleSignIn} from '@/api/sign_api';
import { jverifyPhone } from '@/api/phone_sign_api';
import {dispatchSetAuthToken, dispatchCurrentAccount} from '@/redux/actions';
import {BaseApiUrl} from '@/utils/config';
import {BOTTOM_HEIGHT, SCALE, IsIos} from '@/utils/navbar';
import {AppleButton, appleAuth} from '@invertase/react-native-apple-authentication';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import PolicyModal from '@/components/PolicyModal';
import JVerification from 'jverification-react-native';
import CustomView1 from './login-templates/customView1';

import {RFValue} from '@/utils/response-fontsize';


//一键登录页面自定义配置，需要在调用login之前设置

const customUIWithConfigiOS = {
  logoHidden: true,
  statusBarHidden: true,
  statusBarMode: 'dark',
  showWindow: false,
  navReturnHidden: false,
  navHidden: true,
  backgroundImage: 'bg.png',
  //logo
  // logoImage: 'umcsdk_mobile_logo',
  // logoConstraints: [0, -200, 60, 60],
  //number
  numberConstraints: [0, 30, 200, 14],
  numberSize: 18,
  numberColor: 16777215,
  //slogn
  sloganHidden: true,
  // sloganConstraints: [0, 40, 200, 14],
  //登录按钮
  logBtnConstraints: [0, 80, 220, 40],
  loginBtnText: '同意协议并一键登录',
  loginBtnTextColor: 16777215, // 白色
  privacyConstraints: [0, 350, 300, 60],
  checkViewConstraints: [-108, 350, 10, 10],
  unAgreePrivacyCallBack: true,
  privacyCheckEnable: true,
  privacyCheckboxSize: 20,
  privacyOne: ['用户协议', `${BaseApiUrl}/home/user_agreement`], //隐私条款一（显示名称和url，请严格按照格式）
  privacyTwo: ['隐私政策', `${BaseApiUrl}/home/private_policy`], //隐私条款二（显示名称和url，请严格按照格式）
  privacyColor: [12434877, 12434877], //隐私条款颜色 （显示名称和url的颜色，请严格按照格式）
  privacyText: ['登录即同意', '和', '、', '并使用本机号码登录'], //隐私条款名称外的文字
  privacyTextSize: 10, //隐私条款文字字体大小
  privacyTextGravityMode: 'center', //隐私条款文本对齐方式，目前仅支持 left、center
  privacyBookSymbolEnable: true, //隐私条款是否显示书名号，默认不显示

  privacyWebNavColor: -16777216,                              //协议页导航栏背景颜色
  privacyWebNavTitle: '服务条款',                              //协议页导航栏标题（仅iOS）
  privacyWebNavTitleSize: 16,                                 //协议页导航栏标题字体大小
  privacyWebNavTitleColor: -1,                                //协议页导航栏标题字体颜色
  privacyWebNavReturnImage: 'close',

};
const customUIWithConfigAndroid = {
  backgroundImage: '', //背景图

  statusBarHidden: false, //状态栏是否隐藏
  statusBarMode: 'light', //状态栏模式 light,dark

  navHidden: false, //导航栏是否隐藏
  navColor: -16777216, //导航栏颜色

  navTitle: 'RN-JVerification', //导航栏标题
  navTitleSize: 16, //导航栏标题文字字体大小(单位:sp）
  navTitleColor: -1, //导航栏标题文字颜色

  navReturnHidden: false, //导航栏返回按钮是否隐藏
  navReturnImage: 'close', //导航栏左侧返回按钮图标
  //为保障显示效果，请同时设置x,y,w,h
  navReturnX: 5, //导航栏左侧返回按钮图标距屏幕上端偏移（仅Android)
  navReturnY: 5, //导航栏左侧返回按钮图标距屏幕左侧偏移（仅Android)
  navReturnW: 25, //导航栏左侧返回按钮图标宽度（仅Android)
  navReturnH: 25, //导航栏左侧返回按钮图标高度（仅Android)

  logoHidden: false, //logo是否隐藏
  logoImage: 'umcsdk_mobile_logo', //logo(android默认为应用图标;)
  //为保障显示效果，请同时设置x,y,w,h
  // logoX: 50,                              //logo相对于屏幕左边x轴偏移
  // logoY: 50,                              //logo相对于标题栏下边缘y偏移
  // logoW: 100,                             //logo宽
  // logoH: 100,                              //logo高

  numberSize: 16, //手机号码字体大小（单位:sp）
  numberColor: -16777216, //手机号码字体颜色
  //为保障显示效果，请同时设置x,y,w,h
  // numberX: 50,                            //号码栏相对于屏幕左边x轴偏移
  // numberY: 100,                           //号码栏相对于标题栏下边缘y偏移
  // numberW: 250,                           //号码栏宽度
  // numberH: 25,                            //号码栏高度

  sloganHidden: false, //slogan是否隐藏
  sloganTextSize: 16, //slogan字体大小
  sloganTextColor: -16777216, //slogan文字颜色

  //为保障显示效果，请同时设置x,y,w,h
  // sloganX: 50,                            //slogan相对于屏幕左边x轴偏移
  // sloganY: 150,                           //slogan相对于标题栏下边缘y偏移

  loginBtnText: '登录按钮', //登录按钮文字
  loginBtnTextSize: 16, //登录按钮字体大小
  loginBtnTextColor: -16777216, //登录按钮文字颜色

  loginBtnImage: 'login_btn_selector', //登录按钮selector选择样式 （仅android）
  loginBtnNormalImage: 'loginBtn_Nor', //登录按钮正常图片 （仅ios,三个同时设置生效）
  loginBtnDisabledImage: 'loginBtn_Dis', //登录按钮失效图片  (仅ios,三个同时设置生效）
  loginBtnSelectedImage: 'loginBtn_Hig', //登录按钮按下图片  (仅ios,三个同时设置生效）
  //为保障显示效果，请同时设置x,y,w,h
  // loginBtnX: 50,                          //登录按钮相对于屏幕左边x轴偏移
  // loginBtnY: 200,                         //登录按钮相对于标题栏下边缘y偏移
  // loginBtnW: 250,                         //登录按钮宽度
  // loginBtnH: 40,                          //登录按钮高度

  privacyOne: ['隐私条款一', 'https://www.jiguang.cn/about'], //隐私条款一（显示名称和url，请严格按照格式）
  privacyTwo: ['隐私条款二', 'https://www.jiguang.cn/about'], //隐私条款二（显示名称和url，请严格按照格式）
  privacyColor: [-16777216, -65536], //隐私条款颜色 （显示名称和url的颜色，请严格按照格式）
  privacyText: ['登录即同意11111', '和', '、', '并使用本机号码登录'], //隐私条款名称外的文字
  privacyTextSize: 15, //隐私条款文字字体大小
  privacyTextGravityMode: 'left', //隐私条款文本对齐方式，目前仅支持 left、center
  privacyBookSymbolEnable: false, //隐私条款是否显示书名号，默认不显示
  //为保障显示效果，请同时设置x,y,w,h
  // privacyX:50,                                             //隐私条款相对于屏幕左边x轴偏移
  // privacyY:20,                                             //隐私条款相对于授权页面底部下边缘y偏移
  // privacyW:200,                                            //隐私条款宽度
  // privacyH:100,                                            //隐私条款高度

  privacyCheckboxHidden: false, //checkBox是否隐藏，默认不隐藏
  privacyCheckEnable: false, //checkBox默认状态 默认:NO
  privacyCheckedImage: 'checkbox_selected', //checkBox选中时图片
  privacyUncheckedImage: 'checkbox_unSelected', //checkBox未选中时图片
  privacyCheckboxSize: 10, //设置隐私条款checkbox尺寸 默认是10
  unAgreePrivacyHintToast: true,

  privacyWebNavColor: -16777216, //协议页导航栏背景颜色
  privacyWebNavTitle: '服务条款', //协议页导航栏标题（仅iOS）
  privacyWebNavTitleSize: 16, //协议页导航栏标题字体大小
  privacyWebNavTitleColor: -1, //协议页导航栏标题字体颜色
  privacyWebNavReturnImage: 'close', //协议页导航栏返回按钮图片
};

// const customViewParams = [
//   {customViewName: 'customView1', customViewPoint: [20, 200, 150, 30]},
//   // {customViewName: 'customView2', customViewPoint: [20, 300, 150, 30]},
//   // {customViewName: 'customView3', customViewPoint: [20, 400, 150, 30]},
// ];

const customViewParams = [{customViewName: 'customView1', customViewPoint: [0, 0, 0, 0]}]
// {customViewName: 'customView2', customViewPoint: [20, 300, 150, 30]},
// {customViewName: 'customView3', customViewPoint: [20, 400, 150, 30]},


//安卓授权页弹窗模式
const androidDialogConfig = {
  privacyNeedClose: true, //弹窗是否需要关闭按钮
  privacyCloseTheme: [10, 60, 0, 0], //弹窗关闭按钮偏移量 privacyNeedClose为true时，必须设置它的偏移量
  privacyDialogTheme: [300, 400, 0, 0, false], //授权页弹窗模式
  privacyNeedStartAnim: true, //设置拉起授权页时是否需要显示默认动画 默认展示
  privacyNeedCloseAnim: true, //设置关闭授权页时是否需要显示默认动画 默认展示
  navColor: 0xff000000,
  loginBtnText: ' 极光认证测试 ',
  privacyCheckEnable: false,
  // privacyColor: [0xff00f000, 0xff000000],
  loginBtnWidth: 40,
  privacyOne: ['隐私条款一', 'https://www.jiguang.cn/about'], //隐私条款一（显示名称和url，请严格按照格式）
  privacyColor: [-16777216, -65536], //隐私条款颜色 （显示名称和url的颜色，请严格按照格式）
  privacyText: ['登录即同意', '和', '、', '并使用本机号码登录'], //隐私条款名称外的文字
  privacyTextSize: 12,
};
//ios授权页弹窗模式
const iosDialogConfig = {
  navHidden: true, //导航栏是否隐藏
  logoImage: 'umcsdk_mobile_logo', //logo(android默认为应用图标;ios默认无)
  logoConstraints: [0, -100, 60, 60], //LOGO图片布局对象
  logoHidden: false, //logo是否隐藏
  numberConstraints: [0, -42, 200, 14], //号码栏布局对象
  sloganConstraints: [0, -20, 200, 14], //slogan布局对象
  logBtnConstraints: [0, 20, 220, 50],
  loginBtnText: '同意协议并一键登录', //登录按钮文字
  loginBtnTextSize: 16, //登录按钮字体大小
  loginBtnTextColor: '#FFF', //登录按钮文字颜色
  privacyConstraints: [0, 100, 200, 60], //隐私条款布局对象
  checkViewConstraints: [-108, 100, 10, 10], //checkBox布局对象

  loadingConstraints: [0, 0, 20, 20],
  showWindow: true, // 是否弹窗，默认no
  //windowBackgroundImage:"bg", // 弹框内部背景图片
  windowBackgroundAlpha: 0.3, //弹窗外侧 透明度 0~1.0
  windowCornerRadius: 10, //弹窗圆角数值
  windowConstraints: [0, 0, 500, 500], //弹窗布局对象
  windowCloseBtnImgs: ['windowClose', 'windowClose'], //弹窗close按钮图片 @[普通状态图片，高亮状态图片]
  windowCloseBtnConstraints: [-135, -135, 20, 20], //弹窗close按钮布局,
};

const OneLogin = ({navigation, route}) => {
  // const [inviteCode, setInviteCode] = useState('');
  const [canShowAgree, setCanShowAgree] = useState(false);
  const dispatch = useDispatch();

  const phoneLogin = () => {
    navigation.navigate('PasswordLogin');
  };
  // 跳转逻辑
  const verifyLoginStep = async (userInfoRes, loginType = 'wechatLogin') => {
    if (userInfoRes.error) {
      Toast.showError(userInfoRes.error);
      console.log('error', userInfoRes.error);
      return;
    }
    let accountInfo = userInfoRes.account;
    console.log('accountInfo', accountInfo);
    await Helper.setData('socialToken', accountInfo.token);
    Toast.hide();
    // 有手机且已验证码，跳转到首页
    if (accountInfo.had_phone && accountInfo.had_invited) {
      await Helper.setData('auth_token', accountInfo.token);
      await dispatch(dispatchSetAuthToken(accountInfo.token));
      await dispatch(dispatchCurrentAccount());

      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'Recommend'}],
      // });
    }
    // 没有手机跳转到手机
    if (!accountInfo.had_phone) {
      navigation.navigate('PhoneLogin', {loginType: loginType});
      return;
    }
    // 有手机，没有验证码跳转到验证码
    if (accountInfo.had_phone && !accountInfo.had_invited) {
      navigation.navigate('InviteLogin');
      return;
    }
  };
  const wechatLogin = async () => {
    // navigation.navigate('PhoneLogin')
    // return
    try {
      const codeRes = await WeChat.sendAuthRequest('snsapi_userinfo');
      let signData = {
        code: codeRes.code,
        app_id: codeRes.appid || 'wx17b69998e914b8f0',
        // source: 'vanyah_app'
      };
      const userInfoRes = await appWechatSignIn(signData);
      await verifyLoginStep(userInfoRes);
    } catch (e) {
      console.error(e);
    }
  };

  // 苹果登录的请求
  const onAppleButtonPress = async updateCredentialStateForUser => {
    // console.warn('Beginning Apple Authentication');
    // start a login request
    // {"authorizationCode": "c3c7f5d477b0e41ecbfb10d45f33e4c80.0.nruwt.zrZ-xHe1Pop43QMUFWxotw",
    // "authorizedScopes": [], "email": null,
    // "fullName": {"familyName": null, "givenName": null, "middleName": null, "namePrefix": null, "nameSuffix": null, "nickname": null},
    // "identityToken": "eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLnZhbnlhaC5pb3MiLCJleHAiOjE2MDQwNzAzMTEsImlhdCI6MTYwMzk4MzkxMSwic3ViIjoiMDAxNDYzLjQxMDkyOGY2ZDA0MDQ2Y2I5MWI4OWY0MzAwMjc2Y2JjLjE0NTkiLCJub25jZSI6IjZmNDdhZTUzMzdlNzgzYmVkYTJkOTJlYWVjMTg3ZDYxZjA4ZjMzODVkMmI0MTk4YzViMmZmN2I1MTEyYjdmMzYiLCJjX2hhc2giOiJieE5aVXcybHM4eVJGZlhkVmpsUUtBIiwiZW1haWwiOiJ0aWFubHUxNjc3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImF1dGhfdGltZSI6MTYwMzk4MzkxMSwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlfQ.bu8WUXxSuNNc7XLB6jBulrn2kb-PYdZ5Zv6a9SCI7OX_7h0O5ROzOZa28POf_FHQxYqBeayEGOqe5kMMBOXZNY4Uv2pCxPZsr9XD1Fv5PttExX8g5lyMFYkoFj-HHP_eyzklIisAXpk5GTS7s0Wb0wg4Ri2jnP67PRNkzRHCS-qoWM9rzB8Vj_5UOsjejeYX0b67CazyNgAC0Jn38tLzGI1ZP8vTdtOuyjRa_IjJVtvRy6lUe7Tk5LKcq9Y2TCe-HSCwT9g5wncV-zZef8Et2GgJi0xqpnWPZOE-ZxVYD9cOSj1JzSR-UGFoc1w0QMmcwwzwMB26eXvqXSqYlm10nw", "nonce": ".NEl7LGpr8DjnjCeb4QjpRyCKJULJJ2Y",
    // "realUserStatus": 1, "state": null, "user": "001463.410928f6d04046cb91b89f4300276cbc.1459"
    // }
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log('appleAuthRequestResponse', appleAuthRequestResponse);
      const {
        user,
        email,
        nonce,
        fullName,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );
      Toast.showError('正在登录中...');
      // realUserStatus
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const data = {
          email: email,
          user_id: user,
          identity_token: identityToken,
          nickname: fullName.nickname || fullName.failyName,
        };
        console.log('post', data);
        const accountInfo = await appAppleSignIn(data);
        await verifyLoginStep(accountInfo, 'appleLogin');
      } else {
        Toast.showError('您的苹果登录已失效，请重新尝试');
      }
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        Toast.showError('您取消了苹果登录');
      } else {
        Toast.showError('您的苹果登录失败, 请稍后重试。');
      }
    }
  };

  const initParams = {
    time: 5000,
    appKey: '7cd75000d5932000b3d4ca59', //仅iOS
    // channel: 'release', //仅iOS
    // advertisingId: 'advertisingId', //仅iOS
    isProduction: true, //仅iOS
  };

  const createAlert = title =>
    Alert.alert('提示', title, [{text: 'OK', onPress: () => console.log('OK Pressed')}]);

  const goPages = type => {
    if (type === 'private') {
      navigation.navigate('WebView', {
        sourceUrl: `${BaseApiUrl}/home/private_policy`,
        title: '顽鸦隐私政策',
        bgColor: 'black',
      });
    }
    if (type === 'user') {
      navigation.navigate('WebView', {
        sourceUrl: `${BaseApiUrl}/home/user_agreement`,
        title: '顽鸦用户协议',
        bgColor: 'black',
      });
    }
  };

  JVerification.addLoginEventListener(async result => {
    console.log('LoginListener:' + JSON.stringify(result));
    // 获取到登录的token了, 返回值中会返回手机号。再用此手机号注册新用户
    if(result.code === 6000) {
      createAlert('isInitSuccess:' + JSON.stringify(result));
      const res = await jverifyPhone({jverify_phone_token: result.content})
      console.log('res', res);
      // res {"answer": {"phone": "18612300141"}}
    }
  });

  // JVerification.addUncheckBoxEventListener((result) => {
  //   console.log('addUncheckBoxEventListener:' + JSON.stringify(result));
  // })

  useEffect(() => {
    JVerification.init(initParams, result => {
      console.log('init:' + JSON.stringify(result));
      // if(result.code === 8000) {
      //   // JVerification.preLogin(5000, result => {
      //   //   console.log('preLogin:' + JSON.stringify(result));
      //   // });
      // }
      // JVerification.login(true)
    })
    JVerification.setLoggerEnable(true);

    if (Platform.OS === 'ios') {
      // JVerification.addUncheckBoxEventListener((result) => {
      // console.log('UnCheckboxEvent:未选中隐私协议框');
      // createAlert('Listener:未选中隐私协议框' );
      // });
    }

    return () => {};
  }, []);
  //
  return (
    <View style={{backgroundColor: 'black'}}>
      <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('../../assets/images/social-login.jpg')}
        style={{width: '100%', height: '100%', backgroundColor: 'black'}}
        resizeMode={'cover'}>
        <Button
          title="isInitSuccess"
          onPress={() =>
            JVerification.isInitSuccess(result => {
              console.log('isInitSuccess:' + JSON.stringify(result));
              createAlert('isInitSuccess:' + JSON.stringify(result));
            })
          }
        />

        <Button
          title="checkLoginEnable"
          onPress={() =>
            JVerification.checkLoginEnable(result => {
              console.log('checkLoginEnable:' + JSON.stringify(result));
              createAlert('checkLoginEnable:' + JSON.stringify(result));
            })
          }
        />

        <Button title='getToken'
                onPress={() => JVerification.getToken(5000, result => {
                  console.log('getToken:' + JSON.stringify(result));
                  createAlert('getToken:' + JSON.stringify(result));

                })}/>

        <Button
          title="preLogin"
          onPress={() => {
            JVerification.clearPreLoginCache();
            JVerification.preLogin(5000, result => {
              console.log('preLogin:' + JSON.stringify(result));
              createAlert('preLogin:' + JSON.stringify(result));
            });
          }}
        />

        <Button
          title="addLoginCustomConfig"
          onPress={() => {
            if (Platform.OS === 'android') {
              JVerification.addLoginCustomConfig(customUIWithConfigAndroid, customViewParams);
            } else {
              JVerification.addLoginCustomConfig(customUIWithConfigiOS, customViewParams);
            }
          }}
        />

        <Button
          title="自定义弹窗授权页"
          onPress={() => {
            if (Platform.OS == 'android') {
              JVerification.addLoginCustomConfig(androidDialogConfig, customViewParams);
            } else {
              JVerification.addLoginCustomConfig(iosDialogConfig, customViewParams);
            }
          }}
        />

        <Button title="login" onPress={() => JVerification.login(true)} />

        <View style={styles.privateText} allowFontScaling={false} adjustsFontSizeToFit={false}>
          <Pressable
            style={styles.ruleWrapper}
            hitSlop={{left: 10, right: 10, top: 30}}
            onPress={() => {
              if (!IsIos) {
                setCanShowAgree(!canShowAgree);
              }
            }}>
            <View style={styles.checkbox}>
              {!canShowAgree && <IconFont name="yixuan" size={16} color="red" />}
            </View>
          </Pressable>

          <Text style={styles.textContent}>我已阅读并同意</Text>
          <Pressable
            onPress={() => {
              goPages('user');
            }}
            hitSlop={{top: 10, bottom: 10}}>
            <Text style={styles.textContent}>《用户协议》</Text>
          </Pressable>
          <Text style={styles.textContent}>和</Text>
          <Pressable
            onPress={() => {
              goPages('private');
            }}
            hitSlop={{top: 10, bottom: 10}}>
            <Text style={styles.textContent}>《隐私政策》</Text>
          </Pressable>
        </View>
      </ImageBackground>

      {!IsIos && (
        <PolicyModal
          canShowAgree={canShowAgree}
          canShowAgreeFunc={status => {
            setCanShowAgree(status);
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  //底部默认样式
  loginContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  phoneLoginContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 28,
    color: 'red',
    width: 180,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 2,
    marginTop: 10,
  },

  loginText: {
    color: 'black',
    fontWeight: '500',
    letterSpacing: 1,
    fontSize: 15,
    marginLeft: 5,
  },

  privateText: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    bottom: 18 + BOTTOM_HEIGHT,
    left: 0,
    right: 0,
    paddingTop: 10,
    fontSize: 12,
    color: 'white',
  },

  textContent: {
    fontSize: 11,
    color: '#BDBDBD',
  },
  ruleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
  },
  checkbox: {
    width: 15,
    height: 15,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
});


export default OneLogin;
