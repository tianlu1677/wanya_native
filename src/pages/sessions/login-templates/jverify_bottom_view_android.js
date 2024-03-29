import React from 'react';
import {StyleSheet, Text, View, Alert, Pressable, Image, TouchableHighlight} from 'react-native';
import FastImg from '@/components/FastImg';
import JVerification from 'jverification-react-native';
import * as RootNavigation from '@/navigator/root-navigation';
import ThirdLogin from '@/pages/sessions/login-templates/third_login';

import * as WeChat from 'react-native-wechat-lib';
import {appWechatSignIn, appQqSignIn, appWeiboSignIn, appAppleSignIn} from '@/api/sign_api';
import {dispatchUpdateSocialAccount} from '@/redux/actions';

import Toast from '@/components/Toast';
import ShareUtil from '@/utils/umeng_share_util';
import {SignInWithAppleButton} from '@/components/AppleLogin';
import {store} from '@/redux/stores/store';
import {IsIos, SCREEN_WIDTH} from '@/utils/navbar';
import Helper from "@/utils/helper"

const JveryfyBottomViewAndroid = ({}) => {

  //{"accessToken": "2D07206AFCBD395D8C6E13572734266E", "city": "海淀", "expiration": null, "gender": "男", "iconurl": "https://thirdqq.qlogo.cn/g?b=oidb&k=37YbkEGP192zF3YTbvzR4A&s=100&t=1556440734", "name": "狂奔的蜗牛", "openid": "2F942F4D00671AE32030DE17B870EBCA", "province": "北京", "uid": "2F942F4D00671AE32030DE17B870EBCA"}
  // const qqLogin = async () => {
  //   try {
  //     ShareUtil.auth(0, async (code, result, message) => {
  //       console.log('res', code, result, message);
  //       if (code === 200) {
  //         let gender = result.gender === '男' ? 'man' : 'woman';
  //         let signData = {
  //           gender: gender,
  //           city: result.city,
  //           avatar_url: result.iconurl,
  //           nickname: result.name,
  //           openid: result.openid,
  //           province: result.province,
  //           unionid: result.uid,
  //           provider: 'qq',
  //         };
  //         const res = await appQqSignIn(signData);
  //         afterLoginSuccess(res, signData);
  //       } else {
  //         Toast.showError('获取QQ信息失败，请稍后再试');
  //       }
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  //
  // // {"accessToken": "2.00okeQaCAAunBE6c79b21cd0chvo4D", "city": "8", "expiration": null, "gender": "男", "iconurl": "https://tva1.sinaimg.cn/crop.0.0.180.180.180/8d279d76jw1e8qgp5bmzyj2050050aa8.jpg?KID=imgbed,tva&Expires=1625466852&ssig=ttOGekAaG9", "name": "风前无止境", "province": "50", "refreshToken": "2.00okeQaCAAunBEfa3e742d05kRjUfE", "uid": "2368183670", "unionid": "2368183670"}
  // const weiboLogin = async () => {
  //   try {
  //     ShareUtil.auth(1, async (code, result, message) => {
  //       console.log('weiboLogin res', code, result, message);
  //       if (code === 200) {
  //         let gender = result.gender === '男' ? 'man' : 'woman';
  //         let signData = {
  //           gender: gender,
  //           city: result.city,
  //           avatar_url: result.iconurl,
  //           nickname: result.name,
  //           openid: result.unionid,
  //           province: result.province,
  //           unionid: result.uid,
  //           provider: 'weibo',
  //         };
  //         const res = await appWeiboSignIn(signData);
  //         afterLoginSuccess(res, signData);
  //       } else {
  //         Toast.showError('获取微博信息失败，请稍后再试');
  //       }
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  //
  // const wechatLogin = async () => {
  //   try {
  //     const codeRes = await WeChat.sendAuthRequest('snsapi_userinfo');
  //     let data = {
  //       code: codeRes.code,
  //       app_id: codeRes.appid || 'wx17b69998e914b8f0',
  //     };
  //     console.log('codeRes', codeRes)
  //     const res = await appWechatSignIn(data);
  //     const signData = {
  //       ...res.account,
  //       provider: 'wechat',
  //     }
  //     console.log('res', res);
  //     afterLoginSuccess(res, signData);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  //
  // // 苹果登录的请求
  // const appleSignIn = async result => {
  //   const {fullName, identityToken, user, email} = result;
  //   console.log('result', result);
  //   try {
  //     const data = {
  //       email: email,
  //       user_id: user,
  //       identity_token: identityToken,
  //       nickname: fullName.nickname || fullName.failyName,
  //       provider: 'apple',
  //       unionid: user,
  //     };
  //     const res = await appAppleSignIn(data);
  //     afterLoginSuccess(res, data);
  //   } catch (e) {
  //     console.log('e', e);
  //     Toast.showError('苹果登录失败, 请稍后重试。');
  //   }
  // };

  const afterLoginSuccess = async (res, raw_data = {}) => {
    if (res.error) {
      Toast.showError(res.error, {});
    } else {
      // Toast.showError('跳转中...',{ duration: 1000});
      await Helper.setData('thirdLogin', JSON.stringify(raw_data));
      store.dispatch(dispatchUpdateSocialAccount(res.account.token));
      setTimeout(() => {
        JVerification.dismissLoginPage();
      }, 900);
    }
  };


  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          console.log('click');
          JVerification.dismissLoginPage();
          RootNavigation.navigate('LoginPhoneCode');
        }}
        hitSlop={{top: 10, bottom: 20, left: 10, right: 10}}
      >
        <Text style={styles.otherLogin}>其他号码登录</Text>
      </Pressable>
      <View style={styles.thirdLoginWrap}>
        <ThirdLogin />
        {/*<View style={styles.thirdLogin}>*/}
        {/*  <TouchableHighlight*/}
        {/*    style={styles.thirdLogoWraper}*/}
        {/*    onPress={wechatLogin}*/}
        {/*    hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}>*/}
        {/*    <Image source={require('../../../assets/login/wechat.png')} style={styles.thirdLogo} />*/}
        {/*  </TouchableHighlight>*/}
        {/*  <Pressable*/}
        {/*    style={styles.thirdLogoWraper}*/}
        {/*    onPress={qqLogin}*/}
        {/*    hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}>*/}
        {/*    <Image source={require('../../../assets/login/qq.png')} style={styles.thirdLogo} />*/}
        {/*  </Pressable>*/}
        {/*  <Pressable*/}
        {/*    style={styles.thirdLogoWraper}*/}
        {/*    onPress={weiboLogin}*/}
        {/*    hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}>*/}
        {/*    <Image source={require('../../../assets/login/weibo.png')} style={styles.thirdLogo} />*/}
        {/*  </Pressable>*/}
        {/*  {IsIos ? (*/}
        {/*    <View style={styles.thirdLogoWraper}>*/}
        {/*      {SignInWithAppleButton({*/}
        {/*        callBack: appleSignIn,*/}
        {/*      })}*/}
        {/*    </View>*/}
        {/*  ) : null}*/}
        {/*</View>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'black',
  },
  otherLogin: {
    color: '#bdbdbd',
    fontSize: 12,
    textAlign: 'center',
  },
  thirdLoginWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
    // width: SCREEN_WIDTH,
    paddingLeft: 80,
    paddingRight: 80,
    backgroundColor: 'black',
  },
});

export default JveryfyBottomViewAndroid;
