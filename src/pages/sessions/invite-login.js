import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, TextInput, Text, Button} from 'react-native';

import {verifyInviteCode} from '../../api/phone_sign_api';
import Toast from 'react-native-root-toast';
import Helper from "../../utils/helper"
class InviteLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteCode: ''
    };
  }

  changeInviteCode = text => {
    console.log('event', text);
    this.setState({
      inviteCode: text
    });
  };

  onVerifyInviteCode = () => {
    const { invite_code } = this.state
    const token = Helper.getData('login_token')
    let data = { invite_code: invite_code, token: token}
    verifyInviteCode(data).then((res) => {
      console.log('res', res)
    })
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <View style={styles.phoneContainer}>
            <Text style={styles.phoneTitle}>内测邀请</Text>
            <Text onPress={this.onVerifyInviteCode}>完成</Text>

            <View style={styles.inputWrapContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  autoFocus
                  caretHidden
                  autoCapitalize={'characters'}
                  maxLength={6}
                  onChangeText={this.changeInviteCode}
                  placeholder={'输入邀请码'}
                  placeholderTextColor={'#353535'}
                  textAlignVertical="top"
                  style={styles.inviteCode}
                />
              </View>

              <Text style={styles.inviteCodeDesc}>顽鸦社区尚处于内测阶段，登录需邀请码</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
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

  inputWrapContainer: {
    marginTop: 60
  },

  inputContainer: {
    paddingTop: 18,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontSize: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#353535',
    height: 50,
    lineHeight: 27,
    letterSpacing: 1,
  },
  inviteCode: {},
  inviteCodeDesc: {
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: '400',
    color: '#BDBDBD',
    marginTop: 12,
    lineHeight: 20
  },
  phoneTitle: {
    fontSize: 27,
    // color: 'white',
    fontWeight: '600'
  }
});

export default InviteLogin;
