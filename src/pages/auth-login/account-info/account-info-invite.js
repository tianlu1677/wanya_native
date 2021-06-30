import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, StatusBar} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import moment from 'moment';
import {dispatchCurrentAccount} from '@/redux/actions';
import IconFont from '@/iconfont';

import {RFValue, VWValue} from '@/utils/response-fontsize';
import {getLabelList} from '@/api/settings_api';
import FastImg from '@/components/FastImg';
import {syncAccountInfo} from '@/api/mine_api';
import {SCREEN_WIDTH} from '@/utils/navbar';

import MaleImg from '@/assets/login/male.png';
import ActiveMaleImg from '@/assets/login/male-active.png';
import FemaleImg from '@/assets/login/female.png';
import ActiveFemaleImg from '@/assets/login/female-active.png';

import cStyles from '../style';

const AccountInfoInvite = ({navigation}) => {
  const dispatch = useDispatch();
  const {currentAccount} = useSelector(state => state.account);
  const [visible, setVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(currentAccount.birthday);

  return (
    <View style={styles.wrapper}>
      <Text style={cStyles.infoTitle}>内测邀请</Text>
      <Text style={cStyles.infoText}>顽鸦社区为了更好的使用体验，登录需邀请码</Text>
      <View style={styles.inputContent}>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <TextInput
            key={item}
            value={item}
            style={styles.inputItem}
            selectionColor="#ff193a"
            autoFocus={item === 1 ? true : false}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: VWValue(52),
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
    flexDirection: 'row',
  },
  inputItem: {
    width: 50,
    height: 50,

    // width: '100%',
    // height: RFValue(47),
    // fontSize: 15,
    // color: '#fff',
    // borderBottomColor: '#353535',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // backgroundColor: 'pink',
    marginRight: 10,
  },
  maleWrapper: {
    flexDirection: 'row',
  },
  maleInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: VWValue(27),
  },
  maleImageWrapper: {
    position: 'relative',
  },
  maleImage: {
    width: VWValue(76),
    height: VWValue(76),
  },
  maleText: {
    fontSize: 12,
    color: '#fff',
    marginTop: RFValue(12),
  },
  check: {
    width: VWValue(16),
    height: VWValue(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: VWValue(8),
    position: 'absolute',
    bottom: -VWValue(8),
    left: VWValue(30),
  },
  inputWrapper: {
    width: SCREEN_WIDTH - VWValue(52 * 2),
    height: RFValue(47),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFValue(25),
    borderBottomColor: '#353535',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: RFValue(25),
  },
  inputText: {
    fontSize: 16,
    color: '#BDBDBD',
  },
  active: {
    color: '#fff',
    backgroundColor: '#ff2242',
  },
  default: {
    color: '#727272',
    backgroundColor: '#3c3c3c',
  },
});

export default AccountInfoInvite;
