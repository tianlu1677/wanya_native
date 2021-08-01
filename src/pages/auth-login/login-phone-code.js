import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, StatusBar, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import Toast from '@/components/Toast';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {getLabelList} from '@/api/settings_api';
import {sendPhoneCode} from '@/api/phone_sign_api';
import {SendCodeType} from './meta';

import cStyles from './style';
import ThirdLogin from '@/pages/sessions/login-templates/third_login';
import {BOTTOM_HEIGHT, IsIos} from '@/utils/navbar';
import PolicyModal from '@/components/PolicyModal';
import IconFont from '@/iconfont';
import {BaseApiUrl} from '@/utils/config';

const md5 = require('md5');
const LoginPhoneCode = ({navigation}) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [canShowAgree, setCanShowAgree] = useState(false);
  const isCanClick = phone && phone.length === 11;

  const goPages = type => {
    if (type === 'private') {
      navigation.navigate('WebView', {
        sourceUrl: `${BaseApiUrl}/home/private_policy`,
        title: '顽鸦隐私政策',
        bgColor: 'black',
      });
    }
    if (type === 'user') {
      navigation.navigate('WebView', {
        sourceUrl: `${BaseApiUrl}/home/user_agreement`,
        title: '顽鸦用户协议',
        bgColor: 'black',
      });
    }
  };

  const onSendPhoneCode = async () => {
    const phoneReg = /^1[3456789]\d{9}$/;
    if (!phoneReg.test(phone)) {
      Toast.showError('请输入正确的手机号');
      return;
    }

    navigation.navigate('LoginVerifyCode', {phone, send_code_type: SendCodeType.Login});

    const timestamp = new Date().getTime();
    const secret = md5(`phone_${phone}_${timestamp}`);
    const data = {phone, secret, timestamp, send_code_type: SendCodeType.Login};
    if(__DEV__) {
      return
    }
    const res = await sendPhoneCode(data);
    Toast.showError(res.status === 'success' && !res.error ? '发送成功' : res.error);
  };

  const handleNextClick = () => {
    if (!isCanClick) {
      return false;
    }

    onSendPhoneCode();
    // navigation.navigate('RegisterInfoInvite', {phone, send_code_type: SendCodeType.Login});
  };

  const loadData = async () => {
    const res = await getLabelList();
    dispatch({type: action.TOTAL_LABEL_LIST, value: res.data.label_list});
  };

  useEffect(() => {
    loadData();
  }, []);

  useLayoutEffect(() => {
    const goPasswordLogin = () => {
      navigation.navigate('LoginPasswordCode', {phone: phone.length === 11 ? phone : ''});
    };

    navigation.setOptions({
      headerRight: () => (
        <Text style={{color: '#BDBDBD'}} onPress={goPasswordLogin}>
          密码登录
        </Text>
      ),
    });
  }, [phone]);

  return (
    <Pressable style={cStyles.wrapper} onPress={() => Keyboard.dismiss()}>
      <StatusBar barStyle={'light-content'} />
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
      <Text>8-16位数字、英文、符号中的任意两类</Text>
      <Text
        onPress={handleNextClick}
        style={[
          cStyles.nextStep,
          styles.nextBtn,
          isCanClick ? cStyles.nextStepActive : cStyles.nextStepNormal,
        ]}>
        下一步
      </Text>

      <ThirdLogin />

      {/* 同意协议*/}
      <View style={styles.privateText} allowFontScaling={false} adjustsFontSizeToFit={false}>
        <Pressable
          style={styles.ruleWrapper}
          hitSlop={{left: 10, right: 10, top: 30}}
          onPress={() => {
            if (!IsIos) {
              setCanShowAgree(!canShowAgree);
            }
          }}>
          <View style={styles.checkbox}>
            {!canShowAgree && <IconFont name="yixuan" size={16} color="red" />}
          </View>
        </Pressable>
        <Text style={styles.textContent}>我已阅读并同意</Text>
        <Pressable
          onPress={() => {
            goPages('user');
          }}
          hitSlop={{top: 10, bottom: 10}}>
          <Text style={styles.textContent}>《用户协议》</Text>
        </Pressable>
        <Text style={styles.textContent}>和</Text>
        <Pressable
          onPress={() => {
            goPages('private');
          }}
          hitSlop={{top: 10, bottom: 10}}>
          <Text style={styles.textContent}>《隐私政策》</Text>
        </Pressable>
      </View>

      {!IsIos && (
        <PolicyModal
          canShowAgree={canShowAgree}
          canShowAgreeFunc={status => {
            setCanShowAgree(status);
          }}
        />
      )}
    </Pressable>
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
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
    width: '80%',
  },
  nextBtn: {
    marginTop: RFValue(25),
  },
  privateText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    bottom: 18 + BOTTOM_HEIGHT,
    left: 0,
    right: 0,
    paddingTop: 20,
    fontSize: 12,
    color: 'white',
  },

  textContent: {
    fontSize: 11,
    color: '#BDBDBD',
  },
  ruleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
  },
  checkbox: {
    width: 15,
    height: 15,
    borderColor: 'red',
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 15,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
});

export default LoginPhoneCode;
