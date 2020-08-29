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
      inviteCode: '222222',
      validCode: false
    };
  }

  componentDidMount() {
    let that = this;
    this.props.navigation.setOptions({
      // headerShown: true,
      // headerTintColor: 'white',
      headerBackTitleVisible: false,
      title: '',
      headerStyle: {
        backgroundColor: 'black',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        // color: 'white',
      },
      headerRight: () => (
        <Button
          onPress={this.onVerifyInviteCode}
          title="确定"
          // style={{color: this.state.validCode ? 'white' : '#353535'}}
          color={that.state.validCode ? 'red' : '#353535'}
        />
      ),
      // header: null
    });
  }

  changeInviteCode = text => {
    console.log('event', text);
    this.setState({
      inviteCode: text.toUpperCase(),
      validCode: text.length >= 4
    });
    console.log('xxxx', this.state)
  };

  onVerifyInviteCode = async () => {
    console.log('x onVerifyInviteCode')
    const {invite_code, inviteCode} = this.state;
    if (!inviteCode) {
      return
    }

    const token = await Helper.getData('socialToken');
    let data = {invite_code: invite_code, token: token};
    verifyInviteCode(data).then(res => {
      console.log('res', res);
      if (res.error) {
        Toast.show(res.error, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          backgroundColor: 'white',
          textColor: 'black',
          delay: 10,
        })
      } else {
        Toast.show("已注册成功", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          backgroundColor: 'white',
          textColor: 'black',
          delay: 10,
        })
      }
    })
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
        <View style={styles.phoneContainer}>
          <TitleText>内测邀请</TitleText>
          {/*<Text style={{color:  '#353535'}} onPress={this.onVerifyInviteCode}>完成</Text>*/}

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
              // value={this.state.value}
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
    letterSpacing: 1,
  },
  inviteCode: {
    color: 'white',
    paddingBottom: 6,
    letterSpacing: 2,
    borderBottomWidth: 1,
    fontWeight: '600',
    borderBottomColor: '#353535',
  },
  inviteCodeDesc: {
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: '400',
    color: '#BDBDBD',
    marginTop: 12,
    lineHeight: 20,
  },
});

const TitleText = styled(Text)`
  letter-spacing: 1px;
  font-size: 27px;
  color: white;
  font-weight: 600;
`;
const InputWrapView = styled(View)`
  padding-top: 57px;
  font-size: 30px;
`;
export default InviteLogin;
