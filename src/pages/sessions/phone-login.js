import React, {Component, useState, useLayoutEffect} from 'react';
import {StyleSheet, View, TextInput, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {sendPhoneCode, verifyPhoneCode} from '@/api/phone_sign_api';
import {getCurrentAccount} from '@/api/mine_api';
import Toast from '@/components/Toast';
import styled from 'styled-components/native';
import Helper from '../../utils/helper';
import {dispatchCurrentAccount, dispatchSetAuthToken} from '@/redux/actions';
import {SafeAreaView} from 'react-native-safe-area-context';
var md5 = require('md5');

const PhoneLogin = ({navigation, route}) => {
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [downTime, setDownTime] = useState(0);
  const [firstVerify, setFirstVerify] = useState(true);
  const [verifyText, setVerifyText] = useState('获取验证码');

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      // headerTintColor: 'white',
      title: false,
      headerStyle: {
        backgroundColor: 'black',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerRight: () => (
        <Button
          onPress={() => {
            onVerifyPhoneCode();
          }}
          title="确定"
          style={{fontSize: 14, paddingRight: 17}}
          color={phoneCode.length === 6 ? 'white' : '#353535'}
        />
      ),
    });
  }, [navigation, phoneCode]);

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
        setVerifyText(`重新获取  `);
      }
      setFirstVerify(false);
      setDownTime(timeo);
    }, 1000);
  };

  const onSendPhoneCode = () => {
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      console.log('error phone');
      Toast.show('请输入正确的手机号');
      return;
    }
    let timestamp = new Date().getTime();
    let secret_key = `phone_${phone}_${timestamp}`;
    let secret = md5(secret_key);
    console.log(secret, md5(secret));
    let data = {phone: phone, secret: secret, timestamp: timestamp};
    downTimeRunner();

    sendPhoneCode(data).then(res => {
      if (res.status === 'success') {
        console.log('发送成功');
        setFirstVerify(false)
      } else {
        Toast.show('服务器出现了点小问题');
        console.log('failed');
      }
    });
  };

  const onVerifyPhoneCode = async () => {
    console.log('xxxx', phone, phoneCode);
    const token = await Helper.getData('socialToken');
    let data = {phone: phone, phone_code: phoneCode, token: token};
    const verifyResponse = await verifyPhoneCode(data);
    console.log('verifyResponse', verifyResponse);
    if (verifyResponse.error) {

      Toast.show(verifyResponse.error, {
      });

    } else {
      Toast.show('注册成功');
      const accountInfo = await getCurrentAccount({token: token});
      if (!accountInfo.account.had_invited) {
        navigation.navigate('InviteLogin');
      } else {
        await Helper.setData('auth_token', accountInfo.token)
        dispatch(dispatchSetAuthToken(accountInfo.token));
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
      <View style={styles.phoneContainer}>
        <TitleText>绑定手机号</TitleText>

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
              caretHidden={false}
              selectionColor={'white'}
              keyboardType={'numeric'}
              maxLength={11}
              onChangeText={text => {
                setPhone(text);
              }}
              placeholder={'输入手机号'}
              placeholderTextColor={'#353535'}
              // textAlignVertical="top"
              // value={'198271'}
              style={{color: 'white', fontWeight: '600'}}
            />
          </InputView>

          <InputView
            style={{
              justifyContent: 'space-between',
            }}>
            <TextInput
              autoComplete="tel"
              caretHidden={false}
              selectionColor={'white'}
              keyboardType="numeric"
              maxLength={6}
              onChangeText={text => setPhoneCode(text)}
              placeholder={'输入验证码'}
              placeholderTextColor={'#353535'}
              style={{
                color: 'white',
                fontWeight: '600',
              }}
            />
            {firstVerify ? (
              <VerifyCodeText
                color="white"
                onPress={() => {
                  onSendPhoneCode();
                }}>
                {verifyText}
              </VerifyCodeText>
            ) : (
              <VerifyCodeText
                color={downTime ? '#353535' : 'white'}
                onPress={
                  downTime > 0
                    ? () => {}
                    : () => {
                      onSendPhoneCode();
                    }
                }>
                {verifyText}
              </VerifyCodeText>
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
});

const TitleText = styled(Text)`
  letter-spacing: 1px;
  font-size: 25px;
  color: white;
  font-weight: 900;
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
  border-bottom-color: #353535;
`;

const VerifyCodeText = styled(Text)`
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 600;
  margin-right: 15px;
  color: ${props => props.color};
`;
export default PhoneLogin;
