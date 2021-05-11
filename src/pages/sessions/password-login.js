import React, {useState, useLayoutEffect} from 'react';
import {StyleSheet, View, TextInput, Pressable, Text, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {sendPhoneCode, phonePasswordLogin} from '@/api/phone_sign_api';
import {phoneSignIn} from '@/api/sign_api';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import Helper from '@/utils/helper';
import {dispatchCurrentAccount, dispatchSetAuthToken} from '@/redux/actions';

const md5 = require('md5');
const LoginTypes = {CODE: 'code', PASSWORD: 'password'}; //8-16位

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

  const isCanClick = () => {
    if (loginType === LoginTypes.CODE) {
      return phone.length === 11 && phoneCode.length === 6;
    }

    if (loginType === LoginTypes.PASSWORD) {
      return phone.length === 11 && password.length >= 8 && password.length <= 16;
    }
  };

  const phoneLogin = async () => {
    if (!isCanClick()) {
      return false;
    }
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
      await Helper.setData('socialToken', res.account.token);
      const accountInfo = res;
      if (!accountInfo.account.had_invited) {
        navigation.navigate('InviteLogin');
      } else {
        await Helper.setData('auth_token', res.account.token);
        dispatch(dispatchSetAuthToken(res.account.token));
        dispatch(dispatchCurrentAccount());
        // navigation.reset({
        //   index: 0,
        //   routes: [{name: 'Recommend'}],
        // });
      }
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
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={{fontSize: 14, fontWeight: '600', color: isCanClick() ? '#fff' : '#353535'}}
          onPress={phoneLogin}>
          确定
        </Text>
      ),
    });
  }, [navigation, phone, password, phoneCode]);

  return (
    <View style={styles.phoneContainer}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor={'black'} />
      <Text style={styles.titleText}>手机号登录</Text>
      <View style={styles.inputWrap}>
        <View style={[styles.inputView]}>
          <Text minimumFontScale={1} style={styles.inputNumber}>
            + 86
          </Text>
          <TextInput
            autoFocus
            textAlign={'left'}
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
              textAlign={'left'}
              onChangeText={text => setPhoneCode(text)}
              placeholder={'输入验证码'}
              placeholderTextColor={'#353535'}
              style={{...styles.inputContent, width: '70%'}}
            />
            {firstVerify ? (
              <Pressable
                hitSlop={{top: 30, left: 20, right: 10, bottom: 15}}
                onPress={() => onSendPhoneCode()}>
                <Text style={styles.verifyCodeText} includeFontPadding={false}>
                  {verifyText}
                </Text>
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
  );
};

const styles = StyleSheet.create({
  //底部默认样式
  phoneContainer: {
    flex: 1,
    backgroundColor: 'black',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 30,
    letterSpacing: 1,
  },
  inputContent: {
    fontSize: 15,
    letterSpacing: 1,
    color: '#FFFFFF',
    fontWeight: '600',
    minWidth: 200,
    padding: 0,
    paddingBottom: 0,
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
    marginBottom: 12,
  },
  inputView: {
    height: 30,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    fontSize: 30,
    paddingBottom: 8,
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
    color: 'white',
    alignItems: 'center',
    letterSpacing: 1,
    padding: 0,
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
