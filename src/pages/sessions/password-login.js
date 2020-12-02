import React, {useState, useLayoutEffect} from 'react';
import {StyleSheet, StatusBar, View, TextInput, Pressable, Text, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {sendPhoneCode, phonePasswordLogin} from '@/api/phone_sign_api';
import {phoneSignIn} from '@/api/sign_api';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import Helper from '@/utils/helper';
import {dispatchCurrentAccount, dispatchSetAuthToken} from '@/redux/actions';
import {SafeAreaView} from 'react-native-safe-area-context';
import FinishBtn from '@/pages/sessions/components/finishbtn';

var md5 = require('md5');

const LoginTypes = {
  CODE: 'code',
  PASSWORD: 'password', //8-16位
};

const PasswordLogin = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [firstVerify, setFirstVerify] = useState(true);
  const [verifyText, setVerifyText] = useState('获取验证码');
  const [downTime, setDownTime] = useState(0);
  const [loginType, setLoginType] = useState(LoginTypes.CODE);
  const [passwordHidden, setPasswordHidden] = useState(true);

  const phoneLogin = async () => {
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      Toast.showError('请输入正确的手机号');
      return;
    }

    let params = {};
    let res = null;
    if (loginType === LoginTypes.CODE) {
      params = {phone: phone, phone_code: phoneCode};

      res = await phonePasswordLogin(params);
    }

    if (loginType === LoginTypes.PASSWORD) {
      params = {phone: phone, password: password};
      res = await phoneSignIn(params);
    }
    if (res.account) {
      await Helper.setData('auth_token', res.account.token);
      Toast.showError('登录成功');
      setTimeout(() => {
        Toast.hide();
        dispatch(dispatchSetAuthToken(res.account.token));
        dispatch(dispatchCurrentAccount());
        navigation.reset({
          index: 0,
          routes: [{name: 'Recommend'}],
        });
      }, 1000);
    } else {
      if (loginType === LoginTypes.CODE) {
        Toast.showError(res.error);
      }
      if (loginType === LoginTypes.PASSWORD) {
        Toast.showError(res.msg);
      }
    }
  };

  const downTimeRunner = () => {
    var timeo = 59;
    var timeStop = setInterval(function() {
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
    let secret_key = `phone_${phone}_${timestamp}`;
    let secret = md5(secret_key);
    let data = {phone, secret, timestamp, send_code_type: 'login'};

    sendPhoneCode(data)
      .then(res => {
        if (res.status === 'success') {
          downTimeRunner();
          setFirstVerify(false);
        } else {
          Toast.showError(res.error);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onLoginTypeClick = () => {
    setPassword('');
    setPhoneCode('');
    setLoginType(loginType === LoginTypes.CODE ? LoginTypes.PASSWORD : LoginTypes.CODE);
  };

  useLayoutEffect(() => {
    const isCanClick = () => {
      if (loginType === LoginTypes.CODE) {
        return phone.length === 11 && phoneCode.length === 6;
      }

      if (loginType === LoginTypes.PASSWORD) {
        return phone.length === 11 && password.length >= 8 && password.length <= 16;
      }
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
      headerRight: () => <FinishBtn onPress={phoneLogin} canClick={isCanClick()} />,
    });
  }, [navigation, phone, password, phoneCode]);

  return (
    <SafeAreaView style={{backgroundColor: 'black', color: 'white', flex: 1}} edges={['bottom']}>
      <StatusBar barStyle="light-content" />
      <View style={styles.phoneContainer}>
        <Text style={styles.titleText}>手机号登录</Text>
        <View style={styles.inputWrap}>
          <View style={styles.inputView}>
            <Text minimumFontScale={1} style={styles.inputNumber}>
              + 86
            </Text>
            <TextInput
              autoFocus
              autoComplete={'tel'}
              caretHidden={false}
              selectionColor={'#ff193a'}
              keyboardType={'numeric'}
              maxLength={11}
              onChangeText={text => setPhone(text)}
              placeholder={'输入手机号'}
              placeholderTextColor={'#353535'}
              style={{...styles.inputContent, width: '100%'}}
            />
          </View>

          {loginType === LoginTypes.CODE && (
            <View style={[styles.inputView, {justifyContent: 'space-between'}]}>
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
                  onPress={() => onSendPhoneCode()}>
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
          )}

          {loginType === LoginTypes.PASSWORD && (
            <View style={styles.inputView}>
              <TextInput
                autoComplete="tel"
                textContentType="password"
                caretHidden={false}
                selectionColor={'#ff193a'}
                maxLength={16}
                secureTextEntry={passwordHidden}
                onChangeText={text => setPassword(text)}
                placeholder={'输入登录密码'}
                placeholderTextColor={'#353535'}
                style={{...styles.inputContent, width: '70%'}}
                clearButtonMode={'always'}
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
          )}
          <View style={styles.loginTypeWrap}>
            <Text style={styles.loginType} onPress={onLoginTypeClick}>
              {loginType === LoginTypes.CODE ? '密码登录' : '验证码登录'}
            </Text>
            <Text
              style={[styles.loginType, {marginLeft: 'auto'}]}
              onPress={() => navigation.navigate('PhoneLogin', {type: 'register'})}>
              手机号注册
            </Text>
          </View>
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
    letterSpacing: 1,
    color: '#FFFFFF',
    fontWeight: '600',
    minWidth: 200,
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
    paddingBottom: 12,
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
  loginTypeWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
  loginType: {
    color: '#fff',
    lineHeight: 20,
    fontSize: 12,
  },
});

export default PasswordLogin;
