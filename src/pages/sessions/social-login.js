import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import styled from 'styled-components/native';
import * as WeChat from 'react-native-wechat-lib';


class SocialLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      coin_data: [],
      loading: false,
    };
  }

  wechatLogin = () => {
    console.log('wechatLogi11n');
    this.props.navigation.navigate('PhoneLogin');

  };

  async componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: false
      // header: null
    })

    console.log('WeChat', await WeChat.openWXApp())
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
