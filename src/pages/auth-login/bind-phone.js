import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {dispatchUpdateSocialAccount} from '@/redux/actions';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {passwordLogin} from '@/api/sign_api';

import cStyles from './style';

const BindPhone = ({navigation}) => {
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
    // navigation.navigate('LoginVerifyCode', {p})

    // navigation.navigate('LoginVerifyCode', {phone});
    // const res = await passwordLogin(params);
    // console.log('pasword login res', res);
    // res.error
    //   ? Toast.showError(res.error, {})
    //   : dispatch(dispatchUpdateSocialAccount(res.account.token, navigation));
  };

  return (
    <View style={cStyles.wrapper}>
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

      <Text style={styles.tipsText}>8-16位数字、英文、符号中的任意两类</Text>

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
