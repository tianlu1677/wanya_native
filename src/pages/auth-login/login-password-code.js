import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {dispatchUpdateSocialAccount} from '@/redux/actions';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {getLabelList} from '@/api/settings_api';
import {passwordLogin} from '@/api/sign_api';

import cStyles from './style';

const LoginPasswordCode = ({navigation}) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [passwordHidden, setPasswordHidden] = useState(true);
  const isCanClick = phone.length === 11 && password.length >= 8 && password.length <= 16;

  const handleNextClick = async () => {
    if (!isCanClick) {
      return false;
    }
    const params = {phone: phone, password: password};
    const res = await passwordLogin(params);
    console.log('pasword login res', res);
    res.error
      ? Toast.showError(res.error, {})
      : dispatch(dispatchUpdateSocialAccount(res.account.token, navigation));
  };

  return (
    <View style={cStyles.wrapper}>
      <Text style={cStyles.infoTitle}>手机密码登录</Text>
      <Text style={cStyles.infoText}>请输入你的手机号码和登录密码</Text>
      <View style={[cStyles.inputWrap, styles.phoneWrapper]}>
        <Text style={styles.phoneNumber}>+ 86</Text>
        <TextInput
          placeholder="输入手机号"
          selectionColor="#ff193a"
          placeholderTextColor="#BDBDBD"
          keyboardType="numeric"
          autoComplete="tel"
          maxLength={11}
          autoFocus={true}
          caretHidden={false}
          style={styles.inputContent}
          onChangeText={text => setPhone(text)}
        />
      </View>

      <View style={[cStyles.inputWrap, styles.passwordWrapper]}>
        <TextInput
          placeholder="输入登录密码"
          selectionColor="#ff193a"
          placeholderTextColor="#BDBDBD"
          autoComplete="tel"
          textContentType="password"
          caretHidden={false}
          maxLength={16}
          secureTextEntry={passwordHidden}
          style={styles.inputContent}
          onChangeText={text => setPassword(text)}
        />

        <Pressable onPress={() => setPasswordHidden(!passwordHidden)}>
          <IconFont name={passwordHidden ? 'yincang' : 'kejian'} size={14} color="white" />
        </Pressable>
      </View>

      <Text
        onPress={handleNextClick}
        style={[
          cStyles.nextStep,
          styles.nextBtn,
          isCanClick ? cStyles.nextStepActive : cStyles.nextStepNormal,
        ]}>
        登录
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
    fontWeight: '500',
    // backgroundColor: 'pink',
  },
  nextBtn: {
    marginTop: RFValue(25),
  },
});

export default LoginPasswordCode;
