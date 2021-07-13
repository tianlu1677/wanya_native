import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, StatusBar, Pressable, Keyboard} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchUpdateSocialAccount} from '@/redux/actions';
import {RFValue} from '@/utils/response-fontsize';
import Toast from '@/components/Toast';
import Helper from '@/utils/helper';
import {sendPhoneCode, phoneCodeLogin, verifyPhoneCode, bindingPhone} from '@/api/phone_sign_api';
import CodeComponent from './code-component';
import {SendCodeType} from './meta';
import cStyles from './style';

const md5 = require('md5');
const LoginVerifyCode = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {socialToken} = useSelector(state => state.login);
  const {send_code_type, phone, password} = route.params;
  const [downTime, setDownTime] = useState(60);
  const [code, setCode] = useState('');

  const isCanSend = downTime === 0 ? true : false;
  const isCanClick = code.length === 6;

  const downTimeRunner = () => {
    let time = 60;
    const timer = setInterval(() => {
      time--;
      if (time >= 0) {
        setDownTime(time);
      } else {
        time = 0;
        clearInterval(timer);
      }
    }, 1000);
  };

  const onSendPhoneCode = async () => {
    const timestamp = new Date().getTime();
    const secret = md5(`phone_${phone}_${timestamp}`);
    const data = {phone, secret, timestamp, send_code_type};
    const res = await sendPhoneCode(data);
    if (res.status === 'success') {
      downTimeRunner();
      Toast.showError('已发送');
    } else {
      Toast.showError(res.error);
    }
  };

  const handleNextClick = async () => {
    if (!isCanClick) {
      return false;
    }

    let res = null;

    Toast.showLoading('正在登录中...');
    if (send_code_type === SendCodeType.Login) {
      const params = {phone, phone_code: code};
      res = await phoneCodeLogin(params);
    }

    // 绑定手机号，将之前获取到的第三方登录的信息回传回来
    if (send_code_type === SendCodeType.Binding) {
      let thirdData = await Helper.getData('thirdLogin');
      if (thirdData) {
        thirdData = JSON.parse(thirdData);
      }
      const data = {
        phone,
        phone_code: code,
        password: password,
        token: socialToken,
        third_data: thirdData,
      };
      res = await bindingPhone(data);
    }

    Toast.hide();

    if (res.error) {
      Toast.showError(res.error);
    } else {
      dispatch(dispatchUpdateSocialAccount(res.account.token));
      await Helper.setData('socialToken', res.account.token);
    }
  };

  useEffect(() => {
    downTimeRunner();
  }, []);

  return (
    <Pressable style={cStyles.wrapper} onPress={() => Keyboard.dismiss()}>
      <StatusBar barStyle={'light-content'} />
      <Text style={cStyles.infoTitle}>输入验证码</Text>
      <Text style={cStyles.infoText}>
        验证码已发送至 +86 {phone.substr(0, 3)}****{phone.substr(7, phone.length)}
      </Text>

      <CodeComponent
        style={styles.codeWrapper}
        keyboardType="numeric"
        getCode={value => setCode(value)}
      />

      <Text
        onPress={handleNextClick}
        style={[
          cStyles.nextStep,
          styles.nextBtn,
          isCanClick ? cStyles.nextStepActive : cStyles.nextStepNormal,
        ]}>
        下一步
      </Text>
      <Text style={styles.tipsText} onPress={isCanSend ? onSendPhoneCode : null}>
        {downTime === 0 ? '重新获取' : `重新获取（${downTime}s）`}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  codeWrapper: {
    marginTop: RFValue(60),
  },
  nextBtn: {
    marginTop: RFValue(25),
  },
  tipsText: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: RFValue(18),
  },
});

export default LoginVerifyCode;
