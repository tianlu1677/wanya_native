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

const AccountInfoGender = ({navigation}) => {
  const dispatch = useDispatch();
  const {currentAccount} = useSelector(state => state.account);
  const [visible, setVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(currentAccount.birthday);

  const isCanClick = birthday && gender;

  console.log('currentAccount', currentAccount);

  const handleClick = () => setVisible(true);

  const setBirthdayData = async value => {
    const currentDate = moment(value).format('YYYY-MM-DD');
    setBirthday(currentDate);
    setVisible(false);
    // await syncAccountInfo({id: currentAccount.id, birthday: value});
    // dispatch(dispatchCurrentAccount());
  };

  const handleNextClick = () => {
    if (!isCanClick) return false;
    navigation.navigate('AccountInfoLabel');
  };

  const loadData = async () => {
    const res = await getLabelList();
    dispatch({type: action.TOTAL_LABEL_LIST, value: res.data.label_list});
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={cStyles.infoTitle}>选择性别和生日</Text>
      <Text style={cStyles.infoText}>完善个人信息，让大家更好地认识你</Text>
      <View style={styles.maleWrapper}>
        <Pressable style={styles.maleInfo} onPress={() => setGender('female')}>
          <View style={styles.maleImageWrapper}>
            <FastImg
              source={gender === 'female' ? ActiveFemaleImg : FemaleImg}
              style={styles.maleImage}
            />
            {gender === 'female' && (
              <View style={styles.check}>
                <IconFont name="yixuan" size={15} color="#ff2b57" />
              </View>
            )}
          </View>
          <Text style={styles.maleText}>女</Text>
        </Pressable>
        <Pressable style={styles.maleInfo} onPress={() => setGender('male')}>
          <View style={styles.maleImageWrapper}>
            <FastImg
              source={gender === 'male' ? ActiveMaleImg : MaleImg}
              style={styles.maleImage}
            />
            {gender === 'male' && (
              <View style={styles.check}>
                <IconFont name="yixuan" size={15} color="#ff2b57" />
              </View>
            )}
            {/* <View style={styles.check}>
              <IconFont name="yixuan" size={15} color="#ff2b57" />
            </View> */}
          </View>
          <Text style={styles.maleText}>男</Text>
        </Pressable>
      </View>
      <Pressable style={styles.inputWrapper} onPress={handleClick}>
        <Text style={styles.inputText}>{birthday || '选择你的生日'}</Text>
        <IconFont name="arrow-right" size={14} color="#BDBDBD" />
      </Pressable>

      <Text
        onPress={handleNextClick}
        style={[cStyles.nextStep, isCanClick ? cStyles.active : cStyles.default]}>
        下一步
      </Text>

      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        locale="zh_CN"
        date={birthday ? new Date(birthday) : new Date()}
        onConfirm={setBirthdayData}
        onCancel={() => setVisible(false)}
        cancelTextIOS={'取消'}
        confirmTextIOS={'确认'}
        headerTextIOS={'选择生日'}
      />
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
    width: '100%',
    height: RFValue(47),
    fontSize: 15,
    color: '#fff',
    borderBottomColor: '#353535',
    borderBottomWidth: StyleSheet.hairlineWidth,
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

export default AccountInfoGender;
