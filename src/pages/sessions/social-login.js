import React, {Component, useState, useLayoutEffect} from 'react';
import {StyleSheet, View, Text, ImageBackground, Pressable} from 'react-native';
import {Button} from 'react-native-elements';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import Helper from '../../utils/helper';
import * as WeChat from 'react-native-wechat-lib';
import {appWechatSignIn, appAppleSignIn} from '@/api/sign_api';
import {dispatchSetAuthToken, dispatchCurrentAccount} from '@/redux/actions';
import {BaseApiUrl} from '@/utils/config';
import {BOTTOM_HEIGHT, SCALE} from '@/utils/navbar';
import {AppleButton, appleAuth} from '@invertase/react-native-apple-authentication';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';

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
  };
  // 跳转逻辑
  const verifyLoginStep = async(userInfoRes, loginType = 'wechatLogin') => {
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
      dispatch(dispatchSetAuthToken(accountInfo.token));
      dispatch(dispatchCurrentAccount());

      navigation.reset({
        index: 0,
        routes: [{name: 'Recommend'}],
      });
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
        app_id: codeRes.appid,
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
        Toast.showError(`您的苹果登录失败, 请稍后重试。`);
      }
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
    <View style={{backgroundColor: 'black'}}>
      <Pressable
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          top: 100,
          right: 20,
          width: 30,
          height: 100,
          zIndex: 100
        }}
        onPress={() => {
          console.log('xxx');
          // navigation.navigate('AdminPhoneLogin');
          navigation.navigate('InviteLogin');
          // navigation.navigate('PhoneLogin');
        }}>
        <Text style={{color: 'white', fontSize: 30}}>去别的页面</Text>
      </Pressable>

      <ImageBackground
        source={require('../../assets/images/social-login.jpg')}
        style={{width: '100%', height: '100%', backgroundColor: 'black'}}
        resizeMode={'cover'}>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            bottom: 91 + BOTTOM_HEIGHT,
            left: 0,
            right: 0,
          }}>


          <View style={styles.loginContainer}>
            <Pressable
              style={styles.loginButton}
              onPress={() => {
                wechatLogin();
              }}>
              <IconFont name={'weixin1'} />
              <Text style={styles.loginText}>通过微信登录</Text>
            </Pressable>
          </View>
          <View style={{...styles.phoneLoginContainer}}>
            <Pressable
              style={styles.loginButton}
              onPress={() => {
                phoneLogin();
              }}>
              <IconFont name={'shouji'} />
              <Text style={styles.loginText}>
                通过手机登录
              </Text>
            </Pressable>
          </View>

          <View style={[styles.phoneLoginContainer]}>
            <AppleButton
              buttonStyle={AppleButton.Type.WHITE_OUTLINE}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{...styles.loginButton, backgroundColor: 'black'}}
              cornerRadius={2}
              // textStyle={{...styles.loginText}}
              leftView={<Text />}
              onPress={onAppleButtonPress}
            />
          </View>
        </View>

        <View style={styles.privateText} allowFontScaling={false} adjustsFontSizeToFit={false}>
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
    marginTop: 10
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
});

export default SocialLogin;
