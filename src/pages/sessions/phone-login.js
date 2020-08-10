import React, {Component} from 'react'
import {SafeAreaView, StyleSheet, ScrollView, View, TextInput, Text, Button} from 'react-native'

import {sendPhoneCode, verifyPhoneCode} from '../../api/phone_sign_api'
import Toast from 'react-native-root-toast'

var md5 = require('md5')

class PhoneLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      phone_code: '',
      error_message: '',
      downTime: 0,
      verifyText: '获取验证码',
      firstVerify: true
    }
  }

  handleSubmit = () => {
    console.log('login')
  }

  changePhone = text => {
    console.log('event', text)
    this.setState({
      phone: text
    })
  }

  downTimeRnner = () => {
    var timeo = 3
    let that = this
    var timeStop = setInterval(function() {
      timeo--
      if (timeo >= 0) {
        let text = `重新获取(${timeo}s`
        that.setState({
          downTime: timeo,
          verifyText: text
        })
      } else {
        timeo = 0 //当减到0时赋值为0
        clearInterval(timeStop) //清除定时器
        that.setState({
          verifyText: `重新获取`
        })
      }
      that.setState({
        firstVerify: false,
        downTime: timeo
      })
    }, 1000)
  }

  onSendPhoneCode = () => {
    const {phone} = this.state
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      return
    }
    let timestamp = new Date().getTime()
    let secret_key = `phone_${phone}_${timestamp}`
    let secret = md5(secret_key)
    console.log(secret, md5(secret))
    let data = {phone: phone, secret: secret, timestamp: timestamp}
    this.downTimeRnner()
    // sendPhoneCode(data).then(res => {
    //   if(res.status === 'success') {
    //     console.log('发送成功')
    //   } else {
    //     console.log('failed')
    //   }
    // });
  }

  onVerifyPhoneCode = () => {
    const {phone, phone_code} = this.state

    console.log('xxxx', phone, phone_code)
    let data = {phone: phone, phone_code: phone_code}
    verifyPhoneCode(data).then(res => {
      if (res.error) {
        console.log(res)
      } else {
        // 进入到下一个页面
      }
    })
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <View style={styles.phoneContainer}>
            <Text style={styles.phoneTitle}>绑定手机号</Text>
            <Text onPress={this.onVerifyPhoneCode}>确认11</Text>
            <Text
              onPress={() => {
                this.props.navigation.navigate('InviteLogin')
              }}>
              进入下一个页面
            </Text>

            <View style={styles.inputWrapContainer}>
              <View style={styles.inputContainer}>
                <Text style={{fontSize: 15, fontWeight: '600', lineHeight: 27, marginRight: 15}}>
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
                  placeholderTextColor={'#353535'}
                  textAlignVertical="top"
                  style={{}}
                />
              </View>

              <View style={[styles.inputContainer, styles.verifyCode]}>
                <TextInput
                  autoComplete="tel"
                  caretHidden
                  keyboardType="numeric"
                  maxLength={6}
                  onChangeText={text => {
                    this.setState({phone_code: text})
                  }}
                  placeholder={'输入验证码'}
                  placeholderTextColor={'#353535'}
                />
                {this.state.firstVerify ? (
                  <Text
                    style={{
                      fontSize: 12,
                      letterSpacing: 1,
                      fontWeight: '600',
                      marginRight: 15,
                      lineHeight: 27
                    }}
                    onPress={this.onSendPhoneCode}>
                    {this.state.verifyText}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 12,
                      letterSpacing: 1,
                      fontWeight: '600',
                      marginRight: 15,
                      lineHeight: 27,
                      color: this.state.downTime > 0 ? 'red' : 'black'
                    }}
                    onPress={this.state.downTime > 0 ? () => {} : this.onSendPhoneCode}>
                    {this.state.verifyText}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
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

  inputWrapContainer: {
    marginTop: 60
  },

  inputContainer: {
    paddingTop: 18,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#353535',
    height: 50,
    lineHeight: 27
  },

  verifyCode: {
    justifyContent: 'space-between',
    lineHeight: 27,
    height: 50
  },
  phoneTitle: {
    fontSize: 27,
    // color: 'white',
    fontWeight: '600'
  }
})

export default PhoneLogin
