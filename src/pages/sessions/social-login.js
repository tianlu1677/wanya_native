import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import styled from 'styled-components/native';
import Helper from '../../utils/helper';
import * as WeChat from 'react-native-wechat-lib';
import {appWechatSignIn} from '@/api/sign_api';

class SocialLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      coin_data: [],
      loading: false,
    };
  }

  wechatLogin = async () => {
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
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'Recommend'}],
        });
      }
      // 没有手机跳转到手机
      if (!accountInfo.had_phone) {
        this.props.navigation.navigate('PhoneLogin');
        return;
      }
      // 有手机，没有验证码跳转到验证码
      if (accountInfo.had_phone && !accountInfo.had_invited) {
        this.props.navigation.navigate('InviteLogin');
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  async componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: false,
      // header: null
    });

    // console.log('WeChat', await WeChat.openWXApp())
  }

  render() {
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
            onPress={this.wechatLogin}
          />
        </ImageBackground>
      </View>
    );
  }
}

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
});

export default SocialLogin;
