import React, {Component, useEffect, useState, useLayoutEffect} from 'react';
import {StyleSheet, StatusBar, View, TextInput, Pressable, Text, Button, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {sendPhoneCode, verifyPhoneCode} from '@/api/phone_sign_api';
import {getCurrentAccount} from '@/api/mine_api';
import Toast from '@/components/Toast';
import styled from 'styled-components/native';
import Helper from '../../utils/helper';
import {dispatchCurrentAccount, dispatchSetAuthToken} from '@/redux/actions';
import {SafeAreaView} from 'react-native-safe-area-context';
import FinishBtn from '@/pages/sessions/components/finishbtn';

var md5 = require('md5');
const appleLogin = 'appleLogin';
const PhoneLogin = ({navigation, route}) => {
  const loginType = route.params?.loginType || 'wechatLogin';
  const [phone, setPhone] = useState('');
  const [skip, setSkip] = useState(false);
  const [phoneCode, setPhoneCode] = useState('');
  const [downTime, setDownTime] = useState(0);
  const [firstVerify, setFirstVerify] = useState(true);
  const [verifyText, setVerifyText] = useState('获取验证码');

  const dispatch = useDispatch();
  useEffect(() => {
    setSkip(loginType === 'appleLogin');
  }, []);
  //

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
      1: () => (
        <Image
          source={require('../../assets/images/back-white.png')}
          style={{width: 9, height: 15}}
        />
      ),
      headerRight: () => (
        <View>
          {skip && phone.length <= 0 ? (
            <FinishBtn onPress={skipPhone} textColor={'#353535'} text={'跳过'} canClick={true} />
          ) : (
            <FinishBtn onPress={onVerifyPhoneCode} canClick={phone.length > 0} />
          )}
        </View>
        // <FinishBtn onPress={onVerifyPhoneCode} canClick={phoneCode.length === 6} />
      ),
    });
  }, [navigation, phoneCode, phone, skip]);

  const skipPhone = async () => {
    const token = await Helper.getData('socialToken');
    // Toast.showError('注册成功');
    const accountInfo = await getCurrentAccount({token: token});
    if (!accountInfo.account.had_invited) {
      navigation.navigate('InviteLogin');
    } else {
      await Helper.setData('auth_token', token);
      dispatch(dispatchSetAuthToken(token));
      dispatch(dispatchCurrentAccount());
      navigation.reset({
        index: 0,
        routes: [{name: 'Recommend'}],
      });
    }
  };

  const downTimeRunner = () => {
    var timeo = 59;
    var timeStop = setInterval(function () {
      timeo--;
      if (timeo >= 1) {
        let text = `重新获取(${timeo}s)`;
        setVerifyText(text);
        setDownTime(timeo);
      } else {
        timeo = 0; //当减到0时赋值为0
        clearInterval(timeStop); //清除定时器
        setVerifyText('重新获取  ');
      }
      setFirstVerify(false);
      setDownTime(timeo);
    }, 1000);
  };

  const onSendPhoneCode = async () => {
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      console.log('error phone');
      Toast.showError('请输入正确的手机号');
      return;
    }
    let timestamp = new Date().getTime();
    let secret_key = `phone_${phone}_${timestamp}`;
    let secret = md5(secret_key);
    const token = await Helper.getData('socialToken');
    console.log(secret, md5(secret));
    let data = {phone: phone, secret: secret, timestamp: timestamp, token: token};

    sendPhoneCode(data).then(res => {
      if (res.status === 'success') {
        console.log('发送成功');
        downTimeRunner();
        setFirstVerify(false);
      } else {
        Toast.showError(res.error);
        console.log('failed');
      }
    });
  };

  const onVerifyPhoneCode = async () => {
    console.log('xxxxxxxxx');
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      Toast.showError('请输入正确的手机号');
      return;
    }
    // console.log('xxxx', phone, phoneCode);
    const token = await Helper.getData('socialToken');
    let data = {phone: phone, phone_code: phoneCode, token: token};
    const verifyResponse = await verifyPhoneCode(data);
    // console.log('verifyResponse', verifyResponse);
    if (verifyResponse.error) {
      Toast.showError(verifyResponse.error, {});
    } else {
      await Helper.setData('auth_token', token);
      // Toast.showError('注册成功');
      const accountInfo = await getCurrentAccount({token: token});
      if (!accountInfo.account.had_invited) {
        navigation.navigate('InviteLogin');
      } else {
        await Helper.setData('auth_token', token);
        dispatch(dispatchSetAuthToken(token));
        dispatch(dispatchCurrentAccount());
        navigation.reset({
          index: 0,
          routes: [{name: 'Recommend'}],
        });
      }
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'black', color: 'white', flex: 1}} edges={['bottom']}>
      <StatusBar barStyle="light-content" />
      <View style={styles.phoneContainer}>
        <TitleText>绑定手机号</TitleText>
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
              + 86
            </Text>
            <TextInput
              autoFocus
              autoComplete={'tel'}
              caretHidden={false}
              selectionColor={'#ff193a'}
              keyboardType={'numeric'}
              maxLength={11}
              onChangeText={text => {
                setPhone(text);
              }}
              placeholder={'输入手机号'}
              placeholderTextColor={'#353535'}
              // textAlignVertical="top"
              // value={'198271'}
              style={{...styles.inputContent, width: '100%'}}
            />
          </InputView>

          <InputView
            style={{
              justifyContent: 'space-between',
            }}>
            <TextInput
              autoComplete="tel"
              caretHidden={false}
              selectionColor={'#ff193a'}
              keyboardType="numeric"
              maxLength={6}
              onChangeText={text => setPhoneCode(text)}
              placeholder={'输入验证码'}
              placeholderTextColor={'#353535'}
              style={{...styles.inputContent, width: '70%'}}
              clearButtonMode={'always'}
            />
            {firstVerify ? (
              <Pressable
                hitSlop={{top: 30, left: 20, right: 10, bottom: 15}}
                onPress={() => {
                  onSendPhoneCode();
                }}>
                <VerifyCodeText color="white">{verifyText}</VerifyCodeText>
              </Pressable>
            ) : (
              <Pressable
                hitSlop={{top: 20, left: 10, right: 10, bottom: 20}}
                onPress={
                  downTime > 0
                    ? () => {}
                    : () => {
                        onSendPhoneCode();
                      }
                }>
                <VerifyCodeText color={downTime ? '#353535' : 'white'}>{verifyText}</VerifyCodeText>
              </Pressable>
            )}
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
  margin-top: 5px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 600;
  color: ${props => props.color};
`;
export default PhoneLogin;