import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {getLabelList} from '@/api/settings_api';
import cStyles from './style';

const LoginPhoneCode = ({navigation}) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState(null);
  const isCanClick = phone && phone.length === 11;

  const handleNextClick = () => {
    if (!isCanClick) {
      return false;
    }
    console.log('params', {phone});
    navigation.navigate('RegisterInfoLabel');
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
      headerRight: () => <Text style={{color: '#BDBDBD'}}>密码登录</Text>,
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
