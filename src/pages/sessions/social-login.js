import React, {Component, useState, useLayoutEffect} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import Helper from '../../utils/helper';
import * as WeChat from 'react-native-wechat-lib';
import {appWechatSignIn} from '@/api/sign_api';
import {dispatchSetAuthToken, dispatchCurrentAccount} from '@/redux/actions';

const SocialLogin = ({navigation, route}) => {
  // const [inviteCode, setInviteCode] = useState('');
  // const [isValidCode, setIsValidCode] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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
        await Helper.setData('auth_token', accountInfo.token)
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
        sourceUrl: 'https://xinxue.meirixinxue.com/home/private_policy',
        title: '顽鸦隐私政策',
        bgColor: 'black',
      });
    }
    if (type === 'user') {
      navigation.navigate('WebView', {
        sourceUrl: 'https://xinxue.meirixinxue.com/home/user_agreement',
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
        <Button
          containerStyle={styles.loginContainer}
          buttonStyle={styles.loginButton}
          titleStyle={styles.loginText}
          title="微信登录"
          clear="clear"
          onPress={() => {
            wechatLogin();
          }}
        />

        <Text style={styles.privateText}>
          我已阅读并同意{' '}
          <Text
            onPress={() => {
              goPages('user');
            }}>
            《用户协议》
          </Text>{' '}
          和{' '}
          <Text
            onPress={() => {
              goPages('private');
            }}>
            《隐私政策》
          </Text>{' '}
          <Text
            onPress={() => {
              // navigation.navigate('AdminPhoneLogin');
              // navigation.navigate('InviteLogin');
              navigation.navigate('PhoneLogin');
            }}>

            --
          </Text>
        </Text>
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
    bottom: 129,
    left: 0,
    right: 0,
  },
  loginButton: {
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
  },

  privateText: {
    display: 'flex',
    // flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    fontSize: 12,
    color: 'white',
  },
});

export default SocialLogin;
