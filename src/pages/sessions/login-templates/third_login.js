import React from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  Alert,
  Pressable,
  Image,
  TouchableHighlight,
} from 'react-native';
import FastImg from '@/components/FastImg';
import JVerification from 'jverification-react-native';

import * as WeChat from 'react-native-wechat-lib';
import {appWechatSignIn, appQqSignIn, appWeiboSignIn, appAppleSignIn} from '@/api/sign_api';
import {dispatchUpdateSocialAccount} from '@/redux/actions';

import Toast from '@/components/Toast';
import ShareUtil from '@/utils/umeng_share_util';
import {SignInWithAppleButton} from '@/components/AppleLogin';
import {store} from '@/redux/stores/store';
import {IsIos, SCREEN_WIDTH} from '@/utils/navbar';
import Helper from '@/utils/helper';
import {BaseApiUrl} from '@/utils/config';

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
  numberX: 0, //号码栏相对于屏幕左边x轴偏移
  numberY: 100, //号码栏相对于标题栏下边缘y偏移
  numberW: 200, //号码栏宽度
  numberH: 18, //号码栏高度

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
  loginBtnOffsetX: 18, //登录按钮相对于屏幕左边x轴偏移
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
  privacyCheckEnable: true, //checkBox默认状态 默认:NO
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

const ThirdLogin = ({}) => {
  const showLogin = () => {
    if (Platform.OS === 'android') {
      console.log('android');
      JVerification.addLoginCustomConfig(customUIWithConfigAndroid, [
        {
          customViewName: 'jverify_bottom_view_android',
          customViewPoint: [0, 450, SCREEN_WIDTH, 150],
        },
      ]);
      JVerification.login(true);
    }
  };

  const hideLogin = () => {
    if (Platform.OS === 'android') {
      JVerification.dismissLoginPage();
    }
  };

  const qqLogin = async () => {
    hideLogin();
    try {
      ShareUtil.auth(0, async (code, result, message) => {
        if (code === 200 || code === 0) {
          let gender = result.gender === '男' ? 'man' : 'woman';
          let signData = {
            gender: gender,
            city: result.city,
            avatar_url: result.iconurl,
            nickname: result.name,
            openid: result.openid,
            province: result.province,
            unionid: result.uid,
            provider: 'qq',
          };
          const res = await appQqSignIn(signData);
          afterLoginSuccess(res, signData);
        } else {
          Toast.showError('获取QQ信息失败，请稍后再试');
          showLogin();
        }
      });
    } catch (e) {
      showLogin();
      console.error(e);
    }
  };

  // {"accessToken": "2.00okeQaCAAunBE6c79b21cd0chvo4D", "city": "8", "expiration": null, "gender": "男", "iconurl": "https://tva1.sinaimg.cn/crop.0.0.180.180.180/8d279d76jw1e8qgp5bmzyj2050050aa8.jpg?KID=imgbed,tva&Expires=1625466852&ssig=ttOGekAaG9", "name": "风前无止境", "province": "50", "refreshToken": "2.00okeQaCAAunBEfa3e742d05kRjUfE", "uid": "2368183670", "unionid": "2368183670"}
  const weiboLogin = async () => {
    hideLogin();
    console.log('weibologin');
    try {
      ShareUtil.auth(1, async (code, result, message) => {
        console.log('weiboLogin res', code, result, message);
        if (code === 200 || code === 0) {
          let gender = result.gender === '男' ? 'man' : 'woman';
          let signData = {
            gender: gender,
            city: result.city,
            avatar_url: result.iconurl,
            nickname: result.name,
            openid: result.unionid,
            province: result.province,
            unionid: result.uid,
            provider: 'weibo',
          };
          const res = await appWeiboSignIn(signData);
          afterLoginSuccess(res, signData);
        } else {
          Toast.showError('获取微博信息失败，请稍后再试');
          showLogin();
        }
      });
    } catch (e) {
      console.error(e);
      showLogin();
    }
  };

  const wechatLogin = async () => {
    hideLogin();
    try {
      const codeRes = await WeChat.sendAuthRequest('snsapi_userinfo');
      let data = {
        code: codeRes.code,
        app_id: codeRes.appid || 'wx17b69998e914b8f0',
      };
      const res = await appWechatSignIn(data);
      const signData = {
        ...res.account,
        provider: 'wechat',
      };
      afterLoginSuccess(res, signData);
    } catch (e) {
      showLogin();
    }
  };

  // 苹果登录的请求
  const appleSignIn = async result => {
    const {fullName, identityToken, user, email} = result;
    console.log('result', result);
    try {
      const data = {
        email: email,
        user_id: user,
        identity_token: identityToken,
        nickname: fullName.nickname || fullName.failyName,
        provider: 'apple',
        unionid: user,
      };
      const res = await appAppleSignIn(data);
      afterLoginSuccess(res, data);
    } catch (e) {
      console.log('e', e);
      Toast.showError('苹果登录失败, 请稍后重试。');
    }
  };

  const afterLoginSuccess = async (res, raw_data = {}) => {
    if (res.error) {
      Toast.showError(res.error, {});
    } else {
      // Toast.showError('跳转中...',{ duration: 1000});
      await Helper.setData('thirdLogin', JSON.stringify(raw_data));
      JVerification.dismissLoginPage();
      store.dispatch(dispatchUpdateSocialAccount(res.account.token));
      setTimeout(() => {
        JVerification.dismissLoginPage();
      }, 800);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.thirdLogin}>
        <Pressable
          style={styles.thirdLogoWraper}
          onPress={wechatLogin}
          hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}>
          <Image source={require('../../../assets/login/wechat.png')} style={styles.thirdLogo} />
        </Pressable>
        <Pressable
          style={styles.thirdLogoWraper}
          onPress={qqLogin}
          hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}>
          <Image source={require('../../../assets/login/qq.png')} style={styles.thirdLogo} />
        </Pressable>
        <Pressable
          style={styles.thirdLogoWraper}
          onPress={weiboLogin}
          hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}>
          <Image source={require('../../../assets/login/weibo.png')} style={styles.thirdLogo} />
        </Pressable>
        {IsIos ? (
          <View style={styles.thirdLogoWraper}>
            {SignInWithAppleButton({
              callBack: appleSignIn,
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'black',
  },
  thirdLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 60,
    // paddingLeft: 56,
    // paddingRight: 56,
    backgroundColor: 'black',
  },
  thirdLogoWraper: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'black',
  },
  thirdLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
});

export default ThirdLogin;
