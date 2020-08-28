import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import styled from 'styled-components/native';
import * as WeChat from 'react-native-wechat-lib';
import {appWechatSignIn} from "@/api/sign_api";

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
      // WeChat.registerApp('wx2404415c6c678e5d', 'https://rrs.ce04.com/app/');
      WeChat.sendAuthRequest('snsapi_userinfo')
        .then(data => {
          console.log('code', data);
          let signData = {
            code: data.code,
            app_id: data.appid,
            // source: 'vanyah_app'
          };
          appWechatSignIn(signData).then(res => {
            console.log('appWechatSignIn', res);
          })
          // getOpenId(params).then(res => {
          //   console.log('getOpenId', res);
          //   let {head_img_url, nick_name, openid} = res.data;
          //   let params = {
          //     wx_open_id: openid,
          //   };
          //   // console.log('openid', openid);
          //   putBindWx(params).then(res => {
          //     console.log('绑定微信', res);
          //     if (res.data.msg === '成功') {
          //       this.props.saveWxInfo({
          //         head_img_url,
          //         nick_name,
          //         openid,
          //       });
          //       this.props.navigation.goBack();
          //     } else if (res.data.msg === '绑定失败') {
          //       // console.log('绑定失败', res);
          //       this.setState({
          //         modalVisible: true,
          //         openid,
          //       });
          //     }
          //   });
          // });
        })
        .catch(e => {
          console.log(e);
        });
    } catch (e) {
      console.error(e);
    }

  };

  async componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: false
      // header: null
    })

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
