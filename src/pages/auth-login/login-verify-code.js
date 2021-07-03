import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {RFValue} from '@/utils/response-fontsize';
import {getLabelList} from '@/api/settings_api';
import CodeComponent from './code-component';

import cStyles from './style';

const LoginVerifyCode = ({navigation}) => {
  const dispatch = useDispatch();
  const [codeData, setCodeData] = useState([]);

  const isCanClick = codeData.every(item => item);

  const handleNextClick = () => {
    if (!isCanClick) {
      return false;
    }
    console.log('params', {codeData});
    navigation.navigate('RegisterInfoLabel');
  };

  const loadData = async () => {
    const res = await getLabelList();
    dispatch({type: action.TOTAL_LABEL_LIST, value: res.data.label_list});
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={cStyles.wrapper}>
      <Text style={cStyles.infoTitle}>输入验证码</Text>
      <Text style={cStyles.infoText}>验证码已发送至 +86 139****8803</Text>
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
      <Text style={styles.tipsText}>重新获取（60s）</Text>
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
