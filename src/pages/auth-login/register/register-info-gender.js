import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {dispatchUpdateSocialAccount} from '@/redux/actions';
import moment from 'moment';
import IconFont from '@/iconfont';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {getLabelList} from '@/api/settings_api';
import FastImg from '@/components/FastImg';
import {syncAccountInfo} from '@/api/account_api';

import MaleImg from '@/assets/login/male.png';
import ActiveMaleImg from '@/assets/login/male-active.png';
import FemaleImg from '@/assets/login/female.png';
import ActiveFemaleImg from '@/assets/login/female-active.png';

import cStyles from '../style';

const RegisterInfoGender = ({navigation}) => {
  const dispatch = useDispatch();
  const {currentAccount} = useSelector(state => state.account);
  const {socialToken, socialAccount} = useSelector(state => state.login);

  const [visible, setVisible] = useState(false);
  const [gender, setGender] = useState(socialAccount?.gender || '');
  const [birthday, setBirthday] = useState(currentAccount.birthday || null);

  const isCanClick = birthday && gender;

  const handleClick = () => setVisible(true);

  const setBirthdayData = async value => {
    const currentDate = moment(value).format('YYYY-MM-DD');
    setBirthday(currentDate);
    setVisible(false);
  };

  const handleNextClick = async () => {
    if (!isCanClick) {
      return false;
    }

    const data = {
      id: socialAccount.id,
      token: socialToken,
      account: {gender, birthday, profile_attributes: {init_gender: true}},
    };
    await syncAccountInfo(data);
    dispatch(dispatchUpdateSocialAccount(socialToken, navigation));
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
      <Text style={cStyles.infoTitle}>选择性别和生日</Text>
      <Text style={cStyles.infoText}>完善个人信息，让大家更好地认识你</Text>
      <View style={styles.maleWrapper}>
        <Pressable style={styles.maleInfo} onPress={() => setGender('woman')}>
          <View style={styles.maleImageWrapper}>
            <FastImg
              source={gender === 'woman' ? ActiveFemaleImg : FemaleImg}
              style={styles.maleImage}
            />
            {gender === 'woman' && (
              <View style={styles.check}>
                <IconFont name="yixuan" size={15} color="#ff2b57" />
              </View>
            )}
          </View>
          <Text style={styles.maleText}>女</Text>
        </Pressable>
        <Pressable style={styles.maleInfo} onPress={() => setGender('man')}>
          <View style={styles.maleImageWrapper}>
            <FastImg source={gender === 'man' ? ActiveMaleImg : MaleImg} style={styles.maleImage} />
            {gender === 'man' && (
              <View style={styles.check}>
                <IconFont name="yixuan" size={15} color="#ff2b57" />
              </View>
            )}
          </View>
          <Text style={styles.maleText}>男</Text>
        </Pressable>
      </View>
      <Pressable style={[cStyles.inputWrap, styles.inputContent]} onPress={handleClick}>
        <Text style={styles.inputText}>{birthday || '选择你的生日'}</Text>
        <IconFont name="arrow-right" size={10} color="#BDBDBD" />
      </Pressable>

      <Text
        onPress={handleNextClick}
        style={[
          cStyles.nextStep,
          styles.nextBtn,
          isCanClick ? cStyles.nextStepActive : cStyles.nextStepNormal,
        ]}>
        下一步
      </Text>

      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        locale="zh_CN"
        date={birthday ? new Date(birthday) : new Date()}
        onConfirm={setBirthdayData}
        onCancel={() => setVisible(false)}
        cancelTextIOS="取消"
        confirmTextIOS="确认"
        headerTextIOS="选择生日"
        minimumDate={new Date('1960-01-01')}
        maximumDate={new Date()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  maleWrapper: {
    flexDirection: 'row',
    marginTop: VWValue(40),
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
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFValue(25),
  },
  inputText: {
    fontSize: 16,
    color: '#BDBDBD',
  },
  nextBtn: {
    marginTop: RFValue(25),
  },
});

export default RegisterInfoGender;
