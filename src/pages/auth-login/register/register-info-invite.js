import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchSetAuthToken} from '@/redux/actions';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {SCREEN_WIDTH} from '@/utils/navbar';
import Toast from '@/components/Toast';
import {verifyInviteCode} from '@/api/phone_sign_api';
import CodeComponent from '../code-component';
import cStyles from '../style';

const AccountInfoInvite = ({navigation}) => {
  const dispatch = useDispatch();
  const {socialToken} = useSelector(state => state.login);
  const [code, setCode] = useState('');
  const isCanClick = code.length === 6;

  const handleNextClick = async () => {
    const data = {invite_code: code, token: socialToken};
    const res = await verifyInviteCode(data);
    console.log('邀请成功res ', res);
    if (res.error) {
      Toast.showError(res.error);
    } else {
      dispatch(dispatchSetAuthToken(socialToken));
      navigation.reset({index: 0, routes: [{name: 'Recommend'}]});
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString('ufuutech');
    Toast.showError('顽鸦客服微信已复制剪贴板');
  };

  return (
    <View style={cStyles.wrapper}>
      <Text style={cStyles.infoTitle}>内测邀请</Text>
      <Text style={cStyles.infoText}>顽鸦社区为了更好的使用体验，登录需邀请码</Text>
      <CodeComponent
        style={styles.inputContent}
        keyboardType="default"
        getCode={value => setCode(value)}
      />
      <Text
        onPress={handleNextClick}
        style={[
          cStyles.nextStep,
          styles.nextBtn,
          isCanClick ? cStyles.nextStepActive : cStyles.nextStepNormal,
        ]}>
        进入顽鸦APP
      </Text>
      <Text style={styles.tipsText} onPress={copyToClipboard}>
        获取邀请码
      </Text>
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
