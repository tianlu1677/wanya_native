import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import Toast from '@/components/Toast';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {getLabelList} from '@/api/settings_api';
import {sendPhoneCode} from '@/api/phone_sign_api';
import cStyles from './style';

const md5 = require('md5');
const LoginPhoneCode = ({navigation}) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState(null);
  const isCanClick = phone && phone.length === 11;

  const onSendPhoneCode = async () => {
    const phoneReg = /^1[3456789]\d{9}$/;
    if (!phoneReg.test(phone)) {
      Toast.showError('请输入正确的手机号');
      return;
    }
    const timestamp = new Date().getTime();
    const secret = md5(`phone_${phone}_${timestamp}`);
    const data = {phone, secret, timestamp, send_code_type: 'login'};
    const res = await sendPhoneCode(data);
    if (res.status === 'success') {
      navigation.navigate('LoginVerifyCode', {phone});
    } else {
      Toast.showError(res.error);
    }
  };

  const handleNextClick = () => {
    if (!isCanClick) {
      return false;
    }
    // navigation.navigate('LoginVerifyCode', {phone});
    onSendPhoneCode();
  };

  const loadData = async () => {
    const res = await getLabelList();
    dispatch({type: action.TOTAL_LABEL_LIST, value: res.data.label_list});
  };

  useEffect(() => {
    loadData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={{color: '#BDBDBD'}} onPress={() => navigation.navigate('LoginPasswordCode')}>
          密码登录
        </Text>
      ),
    });
  }, [navigation, phone]);

  return (
    <View style={cStyles.wrapper}>
      <Text style={cStyles.infoTitle}>手机验证登录</Text>
      <Text style={cStyles.infoText}>请输入你的手机号码，获取验证码</Text>
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
  },
  nextBtn: {
    marginTop: RFValue(25),
  },
});

export default LoginPhoneCode;
