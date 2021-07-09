import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, StatusBar, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchUpdateSocialAccount} from '@/redux/actions';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {passwordLogin} from '@/api/sign_api';
import {sendPhoneCode} from '@/api/phone_sign_api';
import {SendCodeType} from './meta';

import cStyles from './style';

const md5 = require('md5');
const BindPhone = ({navigation}) => {
  const dispatch = useDispatch();
  const {socialToken, socialAccount} = useSelector(state => state.login);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [passwordHidden, setPasswordHidden] = useState(true);
  const isCanClick = phone.length === 11 && password.length >= 8 && password.length <= 16;

  const onSendPhoneCode = async () => {
    const phoneReg = /^1[3456789]\d{9}$/;
    if (!phoneReg.test(phone)) {
      Toast.showError('请输入正确的手机号');
      return;
    }

    navigation.navigate('LoginVerifyCode', {
      phone,
      password,
      send_code_type: SendCodeType.Binding,
    });

    const timestamp = new Date().getTime();
    const data = {
      phone,
      secret: md5(`phone_${phone}_${timestamp}`),
      timestamp,
      token: socialToken,
      send_code_type: SendCodeType.Binding,
    };
    const res = await sendPhoneCode(data);
    Toast.showError(res.status === 'success' && !res.error ? '发送成功' : res.error);
  };

  const handleNextClick = async () => {
    if (!isCanClick) {
      return false;
    }
    onSendPhoneCode();
  };

  return (
    <View style={cStyles.wrapper}>
      <StatusBar barStyle={'light-content'} />
      <Text style={cStyles.infoTitle}>绑定手机号</Text>
      <Text style={cStyles.infoText}>完善帐号信息，更方便地使用产品</Text>
      <View style={[cStyles.inputWrap, styles.phoneWrapper]}>
        <Text style={styles.phoneNumber}>+ 86</Text>
        <TextInput
          placeholder="输入手机号"
          selectionColor="#ff193a"
          placeholderTextColor="#BDBDBD"
          keyboardType="numeric"
          autoComplete="tel"
          maxLength={11}
          caretHidden={false}
          autoFocus={true}
          style={styles.inputContent}
          onChangeText={text => setPhone(text)}
        />
      </View>

      <View style={[cStyles.inputWrap, styles.passwordWrapper]}>
        <TextInput
          placeholder="设置登录密码"
          selectionColor="#ff193a"
          placeholderTextColor="#BDBDBD"
          autoComplete="tel"
          textContentType="password"
          maxLength={11}
          caretHidden={false}
          secureTextEntry={passwordHidden}
          style={styles.inputContent}
          onChangeText={text => setPassword(text)}
        />

        <Pressable onPress={() => setPasswordHidden(!passwordHidden)}>
          <IconFont name={passwordHidden ? 'yincang' : 'kejian'} size={14} color="white" />
        </Pressable>
      </View>

      <Text style={styles.tipsText}>8-16位数字、英文、符号中的任意两类</Text>

      <Text
        onPress={handleNextClick}
        style={[
          cStyles.nextStep,
          styles.nextBtn,
          isCanClick ? cStyles.nextStepActive : cStyles.nextStepNormal,
        ]}>
        下一步
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  phoneWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(60),
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phoneNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    marginRight: VWValue(18),
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 15,
    color: '#fff',
    width: '80%',
    fontWeight: '500',
  },
  tipsText: {
    fontSize: 12,
    color: '#727272',
    marginTop: RFValue(12),
  },
  nextBtn: {
    marginTop: RFValue(25),
  },
});

export default BindPhone;
