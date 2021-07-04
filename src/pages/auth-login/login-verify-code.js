import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {dispatchUpdateSocialAccount} from '@/redux/actions';
import {RFValue} from '@/utils/response-fontsize';
import Toast from '@/components/Toast';
import {sendPhoneCode, phoneCodeLogin} from '@/api/phone_sign_api';
import CodeComponent from './code-component';

import cStyles from './style';

const md5 = require('md5');
const LoginVerifyCode = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {phone} = route.params;
  const [downTime, setDownTime] = useState(10);
  const [codeData, setCodeData] = useState([]);

  const isCanSend = downTime === 0 ? true : false;
  const isCanClick = codeData.every(item => item);

  const downTimeRunner = () => {
    let time = 10;
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
    const data = {phone, secret, timestamp, send_code_type: 'login'};
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
    const params = {phone, phone_code: codeData.join('')};
    const res = await phoneCodeLogin(params);

    console.log('code login res', res);

    res.error
      ? Toast.showError(res.error, {})
      : dispatch(dispatchUpdateSocialAccount(res.account.token, navigation));

    // const {
    //   account: {had_photo, had_gender, had_taglist, had_invited},
    // } = res;

    // await Helper.setData('socialToken', res.account.token);
    // await Helper.setData('socialAccount', JSON.stringify(res.account));

    // if (!had_photo) {
    //   navigation.navigate('RegisterInfo');
    // } else if (!had_gender) {
    //   navigation.navigate('RegisterInfoGender');
    // } else if (!had_taglist) {
    //   navigation.navigate('RegisterInfoLabel');
    // } else if (!had_invited) {
    //   navigation.navigate('InviteLogin');
    // }
  };

  useEffect(() => {
    downTimeRunner();
  }, []);

  return (
    <View style={cStyles.wrapper}>
      <Text style={cStyles.infoTitle}>输入验证码</Text>
      <Text style={cStyles.infoText}>
        验证码已发送至 +86 {phone.substr(0, 3)}****{phone.substr(7, phone.length)}
      </Text>
      <CodeComponent style={styles.codeWrapper} getCode={code => setCodeData(code)} />
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
    </View>
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
