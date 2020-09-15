import React, {Component, useState, useLayoutEffect, useReducer} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, TextInput, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';

import {verifyInviteCode} from '@/api/phone_sign_api';
import Toast from '@/components/Toast';
import styled from 'styled-components/native';
import Helper from '@/utils/helper';
import {dispatchCurrentAccount, dispatchSetAuthToken} from '@/redux/actions';

const InviteLogin = ({navigation, route}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      title: '',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        // color: 'white',
      },
      headerRight: () => (
        <Button
          onPress={onVerifyInviteCode}
          title="完成"
          color={isValidCode ? 'white' : '#353535'}
        />
      ),
    });
  }, [navigation, isValidCode]);

  const onVerifyInviteCode = async () => {
    console.log('x onVerifyInviteCode');
    if (!isValidCode) {
      return;
    }

    const token = await Helper.getData('socialToken');
    let data = {invite_code: inviteCode, token: token};
    verifyInviteCode(data).then(async (res) => {
      console.log('res', res);
      if (res.error) {
        Toast.showError(res.error);
      } else {
        await Helper.setData('auth_token', token)
        dispatch(dispatchSetAuthToken(token));
        dispatch(dispatchCurrentAccount());
        navigation.reset({
          index: 0,
          routes: [{name: 'Recommend'}],
        });
        Toast.showError('已注册成功')
      }
    });
  };

  const onChangeText = text => {
    setInviteCode(text.toUpperCase());
    setIsValidCode(text.length >= 6);
    console.log(inviteCode, isValidCode);
  };

  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <View style={styles.phoneContainer}>
        <TitleText>内测邀请</TitleText>

        <InputWrapView>
          <TextInput
            autoFocus
            caretHidden={false}
            selectionColor={'white'}
            autoCapitalize={'characters'}
            maxLength={6}
            onChangeText={text => {
              onChangeText(text);
            }}
            placeholder={'输入邀请码'}
            placeholderTextColor={'#353535'}
            textAlignVertical="top"
            value={inviteCode}
            style={styles.inviteCode}
          />
          <Text style={styles.inviteCodeDesc}>顽鸦社区尚处于内测阶段，登录需邀请码</Text>
        </InputWrapView>
      </View>
    </SafeAreaView>
  );
};

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
    letterSpacing: 1,
    borderBottomWidth: 1,
    fontWeight: '700',
    height: 30,
    fontSize: 15,
    borderBottomColor: '#353535',
  },
  inviteCodeDesc: {
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#BDBDBD',
    marginTop: 12,
    lineHeight: 27,
    height: 27
  },
});

const TitleText = styled(Text)`
  letter-spacing: 1px;
  font-size: 25px;
  color: white;
  font-weight: 900;
`;
const InputWrapView = styled(View)`
  padding-top: 58px;
  font-size: 30px;
`;
export default InviteLogin;
