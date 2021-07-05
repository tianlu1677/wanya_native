import React from 'react';
import {StyleSheet, Text, View, Alert, Pressable, Image, TouchableHighlight} from 'react-native';
import FastImg from '@/components/FastImg';
import JVerification from 'jverification-react-native';

import * as WeChat from 'react-native-wechat-lib';
import {appWechatSignIn, appQqSignIn, appWeiboSignIn, appAppleSignIn} from '@/api/sign_api';
import {dispatchUpdateSocialAccount} from '@/redux/actions';

import Toast from '@/components/Toast';
import ShareUtil from '@/utils/umeng_share_util';
import {SignInWithAppleButton} from '@/components/AppleLogin';
import {store} from '@/redux/stores/store';

const ThirdLogin = ({}) => {
  //{"accessToken": "2D07206AFCBD395D8C6E13572734266E", "city": "海淀", "expiration": null, "gender": "男", "iconurl": "https://thirdqq.qlogo.cn/g?b=oidb&k=37YbkEGP192zF3YTbvzR4A&s=100&t=1556440734", "name": "狂奔的蜗牛", "openid": "2F942F4D00671AE32030DE17B870EBCA", "province": "北京", "uid": "2F942F4D00671AE32030DE17B870EBCA"}
  const qqLogin = async () => {
    try {
      ShareUtil.auth(0, async (code, result, message) => {
        console.log('res', code, result, message);
        if (code === 200) {
          let gender = result.gender === '男' ? 'man' : 'woman';
          let signData = {
            gender: gender,
            city: result.city,
            avatar_url: result.iconurl,
            nickname: result.name,
            openid: result.openid,
            province: result.province,
            unionid: result.uid,
          };
          const res = await appQqSignIn(signData);
          JVerification.dismissLoginPage();
          res.error
            ? Toast.showError(res.error, {})
            : store.dispatch(dispatchUpdateSocialAccount(res.account.token, ''));
        } else {
          Toast.showError('获取QQ信息失败，请稍后再试');
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  // {"accessToken": "2.00okeQaCAAunBE6c79b21cd0chvo4D", "city": "8", "expiration": null, "gender": "男", "iconurl": "https://tva1.sinaimg.cn/crop.0.0.180.180.180/8d279d76jw1e8qgp5bmzyj2050050aa8.jpg?KID=imgbed,tva&Expires=1625466852&ssig=ttOGekAaG9", "name": "风前无止境", "province": "50", "refreshToken": "2.00okeQaCAAunBEfa3e742d05kRjUfE", "uid": "2368183670", "unionid": "2368183670"}
  const weiboLogin = async () => {
    try {
      ShareUtil.auth(1, async (code, result, message) => {
        console.log('weiboLogin res', code, result, message);
        if (code === 200) {
          let gender = result.gender === '男' ? 'man' : 'woman';
          let signData = {
            gender: gender,
            city: result.city,
            avatar_url: result.iconurl,
            nickname: result.name,
            openid: result.unionid,
            province: result.province,
            unionid: result.uid,
          };
          const res = await appWeiboSignIn(signData);
          console.log('weiboLogin res account', res);
          JVerification.dismissLoginPage();
          res.error
            ? Toast.showError(res.error, {})
            : store.dispatch(dispatchUpdateSocialAccount(res.account.token, ''));
        } else {
          Toast.showError('获取微博信息失败，请稍后再试');
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const wechatLogin = async () => {
    try {
      const codeRes = await WeChat.sendAuthRequest('snsapi_userinfo');
      let signData = {
        code: codeRes.code,
        app_id: codeRes.appid || 'wx17b69998e914b8f0',
      };
      const res = await appWechatSignIn(signData);
      JVerification.dismissLoginPage();
      res.error
        ? Toast.showError(res.error, {})
        : store.dispatch(dispatchUpdateSocialAccount(res.account.token, ''));
    } catch (e) {
      console.error(e);
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
      };
      const res = await appAppleSignIn(data);
      afterLoginSuccess(res);
    } catch (e) {
      console.log('e', e);
      Toast.showError('苹果登录失败, 请稍后重试。');
    }
  };

  const afterLoginSuccess = async res => {
    if (res.error) {
      Toast.showError(res.error, {});
    } else {
      store.dispatch(dispatchUpdateSocialAccount(res.account.token, ''));
      JVerification.dismissLoginPage();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.thirdLogin}>
        <Pressable style={styles.thirdLogoWraper} onPress={wechatLogin}>
          <FastImg source={require('../../../assets/login/wechat.png')} style={styles.thirdLogo} />
        </Pressable>
        <Pressable style={styles.thirdLogoWraper} onPress={qqLogin}>
          <FastImg source={require('../../../assets/login/qq.png')} style={styles.thirdLogo} />
        </Pressable>
        <Pressable style={styles.thirdLogoWraper} onPress={weiboLogin}>
          <FastImg source={require('../../../assets/login/weibo.png')} style={styles.thirdLogo} />
        </Pressable>
        <View style={styles.thirdLogoWraper}>
          {SignInWithAppleButton({
            callBack: appleSignIn,
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'black',
    // color: 'black',
  },
  thirdLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
    paddingTop: 60,
    // paddingLeft: 56,
    // paddingRight: 56,
    backgroundColor: 'black',
  },
  thirdLogoWraper: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: 'black',
  },
  thirdLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
  },
});

export default ThirdLogin;
