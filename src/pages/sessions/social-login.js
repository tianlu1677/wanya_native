import React, {Component, useState, useLayoutEffect} from 'react';
import {StyleSheet, View, Text, ImageBackground, Pressable} from 'react-native';
import {Button} from 'react-native-elements';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import Helper from '../../utils/helper';
import * as WeChat from 'react-native-wechat-lib';
import {appWechatSignIn} from '@/api/sign_api';
import {dispatchSetAuthToken, dispatchCurrentAccount} from '@/redux/actions';
import {BaseApiUrl} from '@/utils/config';
import {BOTTOM_HEIGHT} from '@/utils/navbar';

const SocialLogin = ({navigation, route}) => {
  // const [inviteCode, setInviteCode] = useState('');
  // const [isValidCode, setIsValidCode] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const phoneLogin = () => {
    navigation.navigate('PasswordLogin');
  }
  const wechatLogin = async () => {
    console.log('wechatLogi11n');
    try {
      const codeRes = await WeChat.sendAuthRequest('snsapi_userinfo');
      let signData = {
        code: codeRes.code,
        app_id: codeRes.appid,
        // source: 'vanyah_app'
      };
      const userInfoRes = await appWechatSignIn(signData);
      console.log('userInfoRes', userInfoRes);
      if (userInfoRes.error) {
        console.log('error', userInfoRes.error);
        return;
      }
      let accountInfo = userInfoRes.account;
      Helper.setData('socialToken', accountInfo.token);
      // 有手机且已验证码，跳转到首页
      if (accountInfo.had_phone && accountInfo.had_invited) {
        await Helper.setData('auth_token', accountInfo.token);
        dispatch(dispatchSetAuthToken(accountInfo.token));
        dispatch(dispatchCurrentAccount());

        navigation.reset({
          index: 0,
          routes: [{name: 'Recommend'}],
        });
      }
      // 没有手机跳转到手机
      if (!accountInfo.had_phone) {
        navigation.navigate('PhoneLogin');
        return;
      }
      // 有手机，没有验证码跳转到验证码
      if (accountInfo.had_phone && !accountInfo.had_invited) {
        navigation.navigate('InviteLogin');
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

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
  return (
    <View>
      <ImageBackground
        source={require('../../assets/images/social-login.jpg')}
        style={{width: '100%', height: '100%'}}
        resizeMode={'cover'}>
        <Pressable
          style={{
            position: 'absolute',
            backgroundColor: 'black',
            top: 39,
            right: 10,
            width: 30,
            height: 10,
          }}
          onPress={() => {
            console.log('xxx')
            // navigation.navigate('AdminPhoneLogin');
            // navigation.navigate('InviteLogin');
            navigation.navigate('PhoneLogin');
          }}
        >
          <Text
            style={{color: 'black'}}>
            去别的页面
          </Text>
        </Pressable>

        <View style={styles.loginContainer}>
          <Pressable
            style={styles.loginButton}
            onPress={() => {
              wechatLogin();
            }}>
            <Text style={styles.loginText} allowFontScaling={true}>
              微信登录
            </Text>
          </Pressable>
        </View>

        <View style={styles.phoneLoginContainer}>
          <Pressable
            style={styles.loginButton}
            onPress={() => {
              phoneLogin();
            }}>
            <Text style={styles.loginText} allowFontScaling={true}>
              手机登录
            </Text>
          </Pressable>
        </View>
        <View style={styles.privateText} allowFontScaling={false} adjustsFontSizeToFit={false}>
          <Text style={styles.textContent}>我已阅读并同意</Text>
          <Pressable
            onPress={() => {
              goPages('user');
            }}
            hitSlop={{top: 10, bottom: 10}}
          >
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
    position: 'absolute',
    bottom: 165 + BOTTOM_HEIGHT,
    left: 0,
    right: 0,
  },

  phoneLoginContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 105 + BOTTOM_HEIGHT,
    left: 0,
    right: 0,
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
  },

  loginText: {
    color: 'black',
    fontWeight: '500',
    letterSpacing: 1,
    fontSize: 15,
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
});

export default SocialLogin;
