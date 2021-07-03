import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {SCREEN_WIDTH} from '@/utils/navbar';
import CodeComponent from '../code-component';

import cStyles from '../style';

const AccountInfoInvite = () => {
  const [codeData, setCodeData] = useState([]);
  const isCanClick = codeData.every(item => item);

  const handleNextClick = () => {};

  return (
    <View style={cStyles.wrapper}>
      <Text style={cStyles.infoTitle}>内测邀请</Text>
      <Text style={cStyles.infoText}>顽鸦社区为了更好的使用体验，登录需邀请码</Text>
      <CodeComponent style={styles.inputContent} getCode={code => setCodeData(code)} />
      <Text
        onPress={handleNextClick}
        style={[
          cStyles.nextStep,
          styles.nextBtn,
          isCanClick ? cStyles.nextStepActive : cStyles.nextStepNormal,
        ]}>
        进入顽鸦APP
      </Text>
      <Text style={styles.tipsText}>获取邀请码</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContent: {
    width: SCREEN_WIDTH - VWValue(50 * 2),
    marginTop: RFValue(40),
  },
  nextBtn: {
    marginTop: RFValue(25),
  },
  tipsText: {
    color: '#fff',
    marginTop: RFValue(18),
  },
});

export default AccountInfoInvite;
