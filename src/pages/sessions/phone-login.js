import React, {useState, useLayoutEffect} from 'react';
import {StyleSheet, StatusBar, View, TextInput, Pressable, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {dispatchCurrentAccount, dispatchSetAuthToken} from '@/redux/actions';
import {sendPhoneCode, verifyPhoneCode, phoneRegisterAccount} from '@/api/phone_sign_api';
import {getCurrentAccount} from '@/api/mine_api';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import Helper from '@/utils/helper';
import FinishBtn from '@/pages/sessions/components/finishbtn';

var md5 = require('md5');

const PhoneLogin = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [password, setPassword] = useState('');
  const [downTime, setDownTime] = useState(0);
  const [firstVerify, setFirstVerify] = useState(true);
  const [verifyText, setVerifyText] = useState('获取验证码');
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isRegister] = useState(route.params?.type || null);

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
      Toast.showError('请输入正确的手机号');
      return;
    }
    let timestamp = new Date().getTime();
    let secret = md5(`phone_${phone}_${timestamp}`);
    const token = await Helper.getData('socialToken');
    let data = {
      phone,
      secret,
      timestamp,
      token,
      send_code_type: isRegister ? 'register' : 'binding',
    };

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
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      Toast.showError('请输入正确的手机号');
      return;
    }

    if (!/^(?!(?:[0-9]+|[a-zA-Z]+|[!-\/:-@\[-`{-~]+)$)[!-~]+$/g.test(password)) {
      Toast.showError('密码格式有误');
      return;
    }
    const token = await Helper.getData('socialToken');
    const data = {phone, phone_code: phoneCode, password: password, token};
    let res = {};

    if (isRegister) {
      console.log('data', data, isRegister);
      res = await phoneRegisterAccount(data);
    } else {
      res = await verifyPhoneCode(data);
    }
    console.log('res', res);
    if (res.error) {
      Toast.showError(res.error, {});
    } else {
      await Helper.setData('socialToken', res.account.token);
      const accountInfo = await getCurrentAccount({token: res.account.token});
      if (!accountInfo.account.had_invited) {
        navigation.navigate('InviteLogin');
      } else {
        await Helper.setData('auth_token', res.account.token);
        dispatch(dispatchSetAuthToken(res.account.token));
        dispatch(dispatchCurrentAccount());
        navigation.reset({
          index: 0,
          routes: [{name: 'Recommend'}],
        });
      }
    }
  };

  useLayoutEffect(() => {
    const isCanClick = () => {
      return (
        phone.length === 11 &&
        phoneCode.length === 6 &&
        password.length >= 8 &&
        password.length <= 16
      );
    };

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
      headerRight: () => <FinishBtn onPress={onVerifyPhoneCode} canClick={isCanClick()} />,
    });
  }, [navigation, phone, phoneCode, password]);

  return (
    <SafeAreaView style={{backgroundColor: 'black', color: 'white', flex: 1}} edges={['bottom']}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.phoneContainer}>
        <Text style={styles.titleText}>{isRegister ? '手机号注册' : '绑定手机号'}</Text>
        <View style={styles.inputWrap}>
          <View style={styles.inputView}>
            <Text
              minimumFontScale={1}
              style={{
                fontSize: 15,
                fontWeight: '600',
                marginRight: 27,
                // lineHeight: 27,
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
              style={{...styles.inputContent, width: '100%'}}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              autoComplete="tel"
              caretHidden={false}
              selectionColor={'#ff193a'}
              keyboardType="numeric"
              maxLength={6}
              underlineColorAndroid = {'transparent'}
              onChangeText={text => setPhoneCode(text)}
              placeholder={'输入验证码'}
              placeholderTextColor={'#353535'}
              style={{...styles.inputContent, width: '70%', height: 20}}
              clearButtonMode={'always'}
            />
            {firstVerify ? (
              <Pressable
                hitSlop={{top: 30, left: 20, right: 10, bottom: 15}}
                onPress={onSendPhoneCode}>
                <Text style={styles.verifyCodeText}>{verifyText}</Text>
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
                <Text style={[styles.verifyCodeText, {color: downTime ? '#353535' : 'white'}]}>
                  {verifyText}
                </Text>
              </Pressable>
            )}
          </View>
          <View style={styles.inputView}>
            <TextInput
              autoComplete="password"
              selectionColor={'#ff193a'}
              placeholderTextColor={'#353535'}
              placeholder={'设置密码'}
              maxLength={16}
              secureTextEntry={passwordHidden}
              onChangeText={text => setPassword(text)}
              style={{...styles.inputContent, width: '70%'}}
            />
            <Pressable
              onPress={() => setPasswordHidden(!passwordHidden)}
              hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
              {passwordHidden ? (
                <IconFont name={'yincang'} size={14} color={'white'} />
              ) : (
                <IconFont name={'kejian'} size={14} color={'white'} />
              )}
            </Pressable>
          </View>
          <Text style={styles.tips}>8-16位数字、英文、符号中的任意两类</Text>
        </View>
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
    height: 22,
    letterSpacing: 1,
    color: '#FFFFFF',
    fontWeight: '600',
    minWidth: 200,
    paddingVertical: 0,
    padding: 0,
  },
  titleText: {
    letterSpacing: 1,
    fontSize: 25,
    color: 'white',
    fontWeight: '900',
  },
  inputWrap: {
    paddingTop: 38,
    fontSize: 30,
  },
  inputView: {
    marginTop: 20,
    padding: 0,
    paddingVertical: 0,
    paddingBottom: 8,
    // paddingBottom: 10,
    lineHeight: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    fontSize: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#353535',
    justifyContent: 'space-between',
  },
  verifyCodeText: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '600',
    color: '#fff',
  },
  inputNumber: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 20,
    lineHeight: 20,
    color: 'white',
    letterSpacing: 1,
  },
  tips: {
    color: '#353535',
    lineHeight: 20,
    marginTop: 8,
    fontSize: 12,
  },
});

export default PhoneLogin;
