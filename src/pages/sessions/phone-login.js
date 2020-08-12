import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import {sendPhoneCode, verifyPhoneCode} from '../../api/phone_sign_api';
import Toast from 'react-native-root-toast';
import styled from 'styled-components/native';

var md5 = require('md5');

class PhoneLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      phone_code: '',
      error_message: '',
      downTime: 0,
      verifyText: '获取验证码',
      firstVerify: true,
    };
  }

  handleSubmit = () => {
    console.log('login');
  };

  changePhone = text => {
    console.log('event', text);
    this.setState({
      phone: text,
    });
  };

  downTimeRnner = () => {
    var timeo = 3;
    let that = this;
    var timeStop = setInterval(function () {
      timeo--;
      if (timeo >= 0) {
        let text = `重新获取(${timeo}s`;
        that.setState({
          downTime: timeo,
          verifyText: text,
        });
      } else {
        timeo = 0; //当减到0时赋值为0
        clearInterval(timeStop); //清除定时器
        that.setState({
          verifyText: `重新获取`,
        });
      }
      that.setState({
        firstVerify: false,
        downTime: timeo,
      });
    }, 1000);
  };

  onSendPhoneCode = () => {
    const {phone} = this.state;
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      console.log('error phone');
      let toast = Toast.show('请输入正确的手机号', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      return;
    }
    let timestamp = new Date().getTime();
    let secret_key = `phone_${phone}_${timestamp}`;
    let secret = md5(secret_key);
    console.log(secret, md5(secret));
    let data = {phone: phone, secret: secret, timestamp: timestamp};
    this.downTimeRnner();

    sendPhoneCode(data).then(res => {
      if (res.status === 'success') {
        console.log('发送成功');
        this.setState({
          firstVerify: false,
        });
      } else {
        let toast = Toast.show('服务器出现了点小问题', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
        console.log('failed');
      }
    });
  };

  onVerifyPhoneCode = () => {
    const {phone, phone_code} = this.state;

    console.log('xxxx', phone, phone_code);
    let data = {phone: phone, phone_code: phone_code};
    verifyPhoneCode(data).then(res => {
      if (res.error) {
        let toast = Toast.show('验证码错误', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      } else {
        let toast = Toast.show('注册成功', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
        this.props.navigation.navigate('InviteLogin');
      }
    });
  };

  render() {
    return (
      <>
        <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
          <View>
            <View style={styles.phoneContainer}>
              <TitleText>绑定手机号</TitleText>
              <Text style={{color: 'white'}} onPress={this.onVerifyPhoneCode}>
                确认11
              </Text>
              <Text
                style={{color: 'white'}}
                onPress={() => {
                  this.props.navigation.navigate('InviteLogin');
                }}>
                进入下一个页面
              </Text>

              <InputWrapView>
                <InputView>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      marginRight: 15,
                      color: 'white',
                    }}>
                    + 86
                  </Text>
                  <TextInput
                    autoFocus
                    autoComplete={'tel'}
                    caretHidden
                    keyboardType={'numeric'}
                    maxLength={11}
                    onChangeText={this.changePhone}
                    placeholder={'输入手机号'}
                    placeholderTextColor={'red'}
                    // textAlignVertical="top"
                    // value={'198271'}
                    style={{color: 'white'}}
                  />
                </InputView>

                <InputView
                  style={{
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    autoComplete="tel"
                    caretHidden
                    keyboardType="numeric"
                    maxLength={6}
                    onChangeText={text => {
                      this.setState({phone_code: text});
                    }}
                    placeholder={'输入验证码'}
                    placeholderTextColor={'#353535'}
                    style={{
                      color: 'white',
                    }}
                  />
                  {this.state.firstVerify ? (
                    <VerifyCodeText color="white" onPress={this.onSendPhoneCode}>
                      {this.state.verifyText}
                    </VerifyCodeText>
                  ) : (
                    <VerifyCodeText
                      color="#353535"
                      onPress={this.state.downTime > 0 ? () => {} : this.onSendPhoneCode}>
                      {this.state.verifyText}
                    </VerifyCodeText>
                  )}
                </InputView>
              </InputWrapView>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  //底部默认样式
  phoneContainer: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 30,
    letterSpacing: 1
  },

  // verifyCode: {
  //   justifyContent: 'space-between',
  //   lineHeight: 27,
  //   height: 50
  // },
});

const TitleText = styled(Text)`
  letter-spacing: 1;
  font-size: 27px;
  color: white;
  font-weight: 600;
`;
const InputWrapView = styled(View)`
  padding-top: 18px;
  font-size: 30px;
`;
const InputView = styled(View)`
  margin-top: 24px;
  padding-bottom: 12px;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 30px;
  border-bottom-width: 1px;
  border-bottom-color: red;
`;

const VerifyCodeText = styled(Text)`
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 600;
  margin-right: 15;
  color: ${props => props.color};
`;
export default PhoneLogin;
