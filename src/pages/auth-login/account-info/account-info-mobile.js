import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {getLabelList} from '@/api/settings_api';

const AccountInfoMobile = ({navigation}) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');

  const loadData = async () => {
    const res = await getLabelList();
    dispatch({type: action.TOTAL_LABEL_LIST, value: res.data.label_list});
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>欢迎来到顽鸦</Text>
      <Text style={styles.text}>完善个人信息，让大家更好地认识你</Text>
      <View style={styles.avator}>
        <IconFont name="shangchuan" size={20} color="#fff" />
      </View>
      <TextInput
        placeholder="填写昵称"
        textAlign="left"
        selectionColor="#ff193a"
        placeholderTextColor="#353535"
        maxLength={11}
        autoFocus={true}
        caretHidden={false}
        style={styles.inputContent}
        onChangeText={text => setPhone(text)}
      />

      <Text onPress={() => navigation.navigate('AccountInfoGender')} style={{color: '#fff'}}>
        下一步
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: VWValue(56),
    paddingTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    color: '#fff',
    fontWeight: '600',
  },
  text: {
    fontSize: 12,
    color: '#fff',
    marginTop: VWValue(14),
    marginBottom: VWValue(40),
  },
  avator: {
    width: VWValue(75),
    height: VWValue(75),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(50),
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: VWValue(40),
  },
  inputContent: {
    width: '100%',
    height: RFValue(47),
    fontSize: 15,
    color: '#fff',
    borderBottomColor: '#353535',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default AccountInfoMobile;
