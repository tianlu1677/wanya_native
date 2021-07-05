import React from 'react';
import {StyleSheet, Text, View, Alert, Pressable, Image, TouchableHighlight} from 'react-native';
import FastImg from '@/components/FastImg';
import JVerification from 'jverification-react-native';
import * as RootNavigation from '@/navigator/root-navigation';
import {useDispatch} from 'react-redux';

import * as WeChat from 'react-native-wechat-lib';
import {appWechatSignIn, appQqSignIn, appWeiboSignIn, appAppleSignIn} from '@/api/sign_api';
import {dispatchCurrentAccount, dispatchUpdateSocialAccount} from '@/redux/actions';
import {BaseApiUrl} from '@/utils/config';
import Toast from '@/components/Toast';
// import IconFont from '@/iconfont';
// import PolicyModal from '@/components/PolicyModal';
import ShareUtil from '@/utils/umeng_share_util';
import {SignInWithAppleButton} from '@/components/AppleLogin';
import {store} from '@/redux/stores/store';
import ThirdLogin from "@/pages/sessions/login-templates/third_login"

const CustomView1 = ({}) => {
  // const dispatch = useDispatch();

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
  const onAppleButtonPress = async updateCredentialStateForUser => {
    // console.warn('Beginning Apple Authentication');
    // start a login request
    // {"authorizationCode": "c3c7f5d477b0e41ecbfb10d45f33e4c80.0.nruwt.zrZ-xHe1Pop43QMUFWxotw",
    // "authorizedScopes": [], "email": null,
    // "fullName": {"familyName": null, "givenName": null, "middleName": null, "namePrefix": null, "nameSuffix": null, "nickname": null},
    // "identityToken": "eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLnZhbnlhaC5pb3MiLCJleHAiOjE2MDQwNzAzMTEsImlhdCI6MTYwMzk4MzkxMSwic3ViIjoiMDAxNDYzLjQxMDkyOGY2ZDA0MDQ2Y2I5MWI4OWY0MzAwMjc2Y2JjLjE0NTkiLCJub25jZSI6IjZmNDdhZTUzMzdlNzgzYmVkYTJkOTJlYWVjMTg3ZDYxZjA4ZjMzODVkMmI0MTk4YzViMmZmN2I1MTEyYjdmMzYiLCJjX2hhc2giOiJieE5aVXcybHM4eVJGZlhkVmpsUUtBIiwiZW1haWwiOiJ0aWFubHUxNjc3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImF1dGhfdGltZSI6MTYwMzk4MzkxMSwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlfQ.bu8WUXxSuNNc7XLB6jBulrn2kb-PYdZ5Zv6a9SCI7OX_7h0O5ROzOZa28POf_FHQxYqBeayEGOqe5kMMBOXZNY4Uv2pCxPZsr9XD1Fv5PttExX8g5lyMFYkoFj-HHP_eyzklIisAXpk5GTS7s0Wb0wg4Ri2jnP67PRNkzRHCS-qoWM9rzB8Vj_5UOsjejeYX0b67CazyNgAC0Jn38tLzGI1ZP8vTdtOuyjRa_IjJVtvRy6lUe7Tk5LKcq9Y2TCe-HSCwT9g5wncV-zZef8Et2GgJi0xqpnWPZOE-ZxVYD9cOSj1JzSR-UGFoc1w0QMmcwwzwMB26eXvqXSqYlm10nw", "nonce": ".NEl7LGpr8DjnjCeb4QjpRyCKJULJJ2Y",
    // "realUserStatus": 1, "state": null, "user": "001463.410928f6d04046cb91b89f4300276cbc.1459"
    // }
    // try {
    //   const appleAuthRequestResponse = await appleAuth.performRequest({
    //     requestedOperation: appleAuth.Operation.LOGIN,
    //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    //   });
    //
    //   console.log('appleAuthRequestResponse', appleAuthRequestResponse);
    //   const {
    //     user,
    //     email,
    //     nonce,
    //     fullName,
    //     identityToken,
    //     realUserStatus /* etc */,
    //   } = appleAuthRequestResponse;
    //
    //   const credentialState = await appleAuth.getCredentialStateForUser(
    //     appleAuthRequestResponse.user
    //   );
    //   Toast.showError('正在登录中...');
    //   // realUserStatus
    //   // use credentialState response to ensure the user is authenticated
    //   if (credentialState === appleAuth.State.AUTHORIZED) {
    //     const data = {
    //       email: email,
    //       user_id: user,
    //       identity_token: identityToken,
    //       nickname: fullName.nickname || fullName.failyName,
    //     };
    //     console.log('post', data);
    //     const accountInfo = await appAppleSignIn(data);
    //     // await verifyLoginStep(accountInfo, 'appleLogin');
    //   } else {
    //     Toast.showError('您的苹果登录已失效，请重新尝试');
    //   }
    // } catch (error) {
    //   if (error.code === appleAuth.Error.CANCELED) {
    //     Toast.showError('您取消了苹果登录');
    //   } else {
    //     Toast.showError('您的苹果登录失败, 请稍后重试。');
    //   }
    // }
  };

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
      <Pressable
        onPress={() => {
          console.log('xxxx');
          JVerification.dismissLoginPage();
          RootNavigation.reset({index: 0, routes: [{name: 'LoginPhoneCode'}]});
          console.log('xxxx');
        }}>
        <Text style={styles.otherLogin}>其他号码登录</Text>
      </Pressable>

      <View style={styles.thirdLogin}>
        <ThirdLogin />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 550,
    // width: 400,
    // height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'black',
  },
  otherLogin: {
    color: '#bdbdbd',
    fontSize: 12,
  },
  thirdLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 60,
    paddingLeft: 56,
    paddingRight: 56,
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

export default CustomView1;
