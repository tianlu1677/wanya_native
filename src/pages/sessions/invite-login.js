import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, TextInput, Text, Button} from 'react-native';

import {verifyInviteCode} from '../../api/phone_sign_api';
import Toast from 'react-native-root-toast';
import styled from 'styled-components/native';
import Helper from '@/utils/helper';

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
    const {invite_code} = this.state;
    const token = Helper.getData('login_token');
    let data = {invite_code: invite_code, token: token};
    verifyInviteCode(data).then(res => {
      console.log('res', res);
    });
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
        <View style={styles.phoneContainer}>
          <TitleText>内测邀请</TitleText>
          <Text onPress={this.onVerifyInviteCode}>完成</Text>

          <InputWrapView>
            <TextInput
              autoFocus
              caretHidden
              autoCapitalize={'characters'}
              maxLength={6}
              onChangeText={this.changeInviteCode}
              placeholder={'请输入邀请码'}
              placeholderTextColor={'#353535'}
              textAlignVertical="top"
              style={styles.inviteCode}
            />
            <Text style={styles.inviteCodeDesc}>顽鸦社区尚处于内测阶段，登录需邀请码</Text>
          </InputWrapView>
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
  inviteCode: {
    color: 'white',
    letterSpacing: 2,
  },
  inviteCodeDesc: {
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: '400',
    color: '#BDBDBD',
    marginTop: 12,
    lineHeight: 20
  },
});

const TitleText = styled(Text)`
  letter-spacing: 1;
  font-size: 27px;
  color: white;
  font-weight: 600;
`;
const InputWrapView = styled(View)`
  padding-top: 57px;
  font-size: 30px;
`;
export default InviteLogin;
