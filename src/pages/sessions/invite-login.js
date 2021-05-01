import React, {useState, useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View, TextInput, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {dispatchCurrentAccount, dispatchSetAuthToken} from '@/redux/actions';
import {verifyInviteCode} from '@/api/phone_sign_api';
import Toast from '@/components/Toast';
import styled from 'styled-components/native';
import Helper from '@/utils/helper';

const InviteLogin = ({navigation, route}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);
  const dispatch = useDispatch();

  const onVerifyInviteCode = async () => {
    if (!isValidCode) {
      return;
    }
    const token = await Helper.getData('socialToken');
    let data = {invite_code: inviteCode, token: token};
    verifyInviteCode(data).then(async res => {
      if (res.error) {
        Toast.showError(res.error);
      } else {
        await Helper.setData('auth_token', token);
        dispatch(dispatchSetAuthToken(token));
        dispatch(dispatchCurrentAccount());
        // navigation.reset({
        //   index: 0,
        //   routes: [{name: 'Recommend'}],
        // });
      }
    });
  };

  const onChangeText = text => {
    setInviteCode(text.toUpperCase());
    setIsValidCode(text.length >= 6);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={{fontSize: 14, fontWeight: '600', color: isValidCode ? '#fff' : '#353535'}}
          onPress={onVerifyInviteCode}>
          完成
        </Text>
      ),
    });
  }, [navigation, isValidCode]);

  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View style={styles.phoneContainer}>
        <TitleText>邀请码邀请</TitleText>
        <InputWrapView>
          <TextInput
            autoFocus
            caretHidden={false}
            selectionColor={'#ff193a'}
            autoCapitalize={'characters'}
            maxLength={6}
            onChangeText={text => {
              onChangeText(text);
            }}
            placeholder={'输入邀请码'}
            placeholderTextColor={'#353535'}
            textAlignVertical="top"
            value={inviteCode}
            style={styles.inviteCode}
          />
          <Text style={styles.inviteCodeDesc}>顽鸦社区为了更好的使用体验，登录需邀请码</Text>
        </InputWrapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //底部默认样式
  phoneContainer: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 30,
    letterSpacing: 1,
  },
  inviteCode: {
    color: 'white',
    padding: 0,
    marginBottom: 6,
    letterSpacing: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontWeight: '700',
    height: 30,
    fontSize: 15,
    borderBottomColor: '#353535',
  },
  inviteCodeDesc: {
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#BDBDBD',
    marginTop: 12,
    lineHeight: 27,
    height: 27,
  },
});

const TitleText = styled(Text)`
  letter-spacing: 1px;
  font-size: 25px;
  color: white;
  font-weight: 900;
`;
const InputWrapView = styled(View)`
  padding-top: 58px;
  font-size: 30px;
`;
export default InviteLogin;
