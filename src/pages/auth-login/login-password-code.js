import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, TextInput, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {dispatchUpdateSocialAccount} from '@/redux/actions';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import Helper from '@/utils/helper';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {passwordLogin} from '@/api/sign_api';
import cStyles from './style';

const LoginPasswordCode = ({navigation, route}) => {
  const dispatch = useDispatch();
  console.log(route.params.phone);
  const [phone, setPhone] = useState(route.params.phone || '');
  const [phoneAutoFocus] = useState(route.params.phone ? false : true);

  const [password, setPassword] = useState('');

  const [passwordHidden, setPasswordHidden] = useState(true);
  const isCanClick = phone.length === 11 && password.length >= 8 && password.length <= 16;

  const handleNextClick = async () => {
    if (!isCanClick) {
      return false;
    }

    Toast.showLoading('正在登录中...');
    const params = {phone: phone, password: password};
    const res = await passwordLogin(params);

    console.log('登录成功', res);

    if (res.error) {
      Toast.showError(res.error, {});
    } else {
      dispatch(dispatchUpdateSocialAccount(res.account.token));
      await Helper.setData('socialToken', res.account.token);
    }

    Toast.hide();
  };

  return (
    <View style={cStyles.wrapper}>
      <StatusBar barStyle={'light-content'} />
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
          caretHidden={false}
          autoFocus={phoneAutoFocus}
          style={styles.inputContent}
          value={phone}
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
          maxLength={16}
          caretHidden={false}
          autoFocus={!phoneAutoFocus}
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
    width: '60%'
    // backgroundColor: 'pink',
  },
  nextBtn: {
    marginTop: RFValue(25),
  },
});

export default LoginPasswordCode;
