import React, {Component, useState, useLayoutEffect} from 'react';
import {StyleSheet, StatusBar, View, TextInput, Pressable, Text, Button, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {sendPhoneCode, verifyPhoneCode} from '@/api/phone_sign_api';
import {getCurrentAccount} from '@/api/mine_api';
import Toast from '@/components/Toast';
import styled from 'styled-components/native';
import Helper from '@/utils/helper';
import {dispatchCurrentAccount, dispatchSetAuthToken} from '@/redux/actions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {phoneSignIn} from '@/api/sign_api';
import FinishBtn from "@/pages/sessions/components/finishbtn"

var md5 = require('md5');

const PhoneLogin = ({navigation, route}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      title: false,
      headerStyle: {
        backgroundColor: 'black',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerBackImage: () => (
        <Image
          source={require('../../assets/images/back-white.png')}
          style={{width: 9, height: 15}}
        />
      ),
      headerRight: () => (
        <FinishBtn
          onPress={phoneLogin}
          canClick={(password.length >= 6 && phone.length === 11) }
        />
      ),
    });
  }, [navigation, password, phone]);

  const phoneLogin = () => {
    phoneSignIn({phone: phone, password: password}).then(async res => {
      console.log('res', res);
      if (res.status === 200) {
        dispatch(dispatchSetAuthToken(res.token));
        dispatch(dispatchCurrentAccount());
        navigation.reset({
          index: 0,
          routes: [{name: 'Recommend'}],
        });
      } else {
        Toast.showError('用户名或者密码错误')
      }
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: 'black', color: 'white', flex: 1}} edges={['bottom']}>
      <StatusBar barStyle="light-content" />
      <View style={styles.phoneContainer}>
        <TitleText>手机号登录</TitleText>
        <InputWrapView>
          <InputView>
            <Text
              minimumFontScale={1}
              style={{
                fontSize: 15,
                fontWeight: '600',
                marginRight: 20,
                lineHeight: 20,
                color: 'white',
                letterSpacing: 1,
              }}>
              手机
            </Text>
            <TextInput
              autoFocus
              autoComplete={'tel'}
              caretHidden={false}
              selectionColor={'blue'}
              keyboardType={'numeric'}
              maxLength={11}
              onChangeText={text => {
                setPhone(text);
              }}
              placeholder={'输入手机号'}
              placeholderTextColor={'#353535'}
              // textAlignVertical="top"
              // value={'198271'}
              style={styles.inputContent}
            />
          </InputView>

          <InputView>
            <Text
              minimumFontScale={1}
              style={{
                fontSize: 15,
                fontWeight: '600',
                marginRight: 20,
                lineHeight: 20,
                color: 'white',
                letterSpacing: 1,
              }}>
              密码
            </Text>
            <TextInput
              autoFocus
              autoComplete={'tel'}
              caretHidden={false}
              selectionColor={'blue'}
              keyboardType={'numeric'}
              maxLength={11}
              onChangeText={text => {
                setPassword(text);
              }}
              placeholder={'输入密码'}
              placeholderTextColor={'#353535'}
              // textAlignVertical="top"
              // value={'198271'}
              style={styles.inputContent}
            />
          </InputView>

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
  inputContent: {
    fontSize: 15,
    letterSpacing: 1,
    color: '#FFFFFF',
    fontWeight: '600',
    minWidth: 200,
  },
});

const TitleText = styled(Text)`
  letter-spacing: 1px;
  font-size: 25px;
  color: white;
  font-weight: 900;
`;
const InputWrapView = styled(View)`
  padding-top: 38px;
  font-size: 30px;
`;
const InputView = styled(View)`
  margin-top: 20px;
  padding-bottom: 12px;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 30px;
  border-bottom-width: 1px;
  border-bottom-color: #353535;
`;

const VerifyCodeText = styled(Text)`
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 600;
  color: ${props => props.color};
`;
export default PhoneLogin;
