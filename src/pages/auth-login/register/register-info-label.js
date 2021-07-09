import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchUpdateSocialAccount} from '@/redux/actions';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {syncAccountInfo} from '@/api/account_api';
import cStyles from '../style';

const AddDefaultCheck = (data, checked) => {
  const transLateData = data.map(item => {
    const label_list = item.label_list.map(label => {
      return {title: label, checked: checked.includes(label) ? true : false};
    });
    return {category: item.category, label_list: label_list};
  });

  return transLateData;
};

const AccountInfoLabel = () => {
  const dispatch = useDispatch();
  const {
    home: {totalLabelList},
    login: {socialToken, socialAccount},
  } = useSelector(state => state);

  const [labelList, setLabelList] = useState(AddDefaultCheck(totalLabelList, []));
  const allChecked = labelList
    .map(item => item.label_list)
    .flat()
    .filter(label => label.checked);

  const isCanClick = allChecked.length >= 5;

  const handleLabelClick = (checked, labelIndex, categoryIndex) => {
    labelList[categoryIndex].label_list[labelIndex].checked = checked;
    setLabelList([...labelList]);
  };

  const handleNextClick = async () => {
    if (!isCanClick) {
      return false;
    }
    const label_list = allChecked.map(item => item.title);
    const data = {
      id: socialAccount.id,
      token: socialToken,
      account: {profile_attributes: {label_list, init_taglist: true}},
    };

    const res = await syncAccountInfo(data);
    console.log('更新信息res: ', res);
    dispatch(dispatchUpdateSocialAccount(socialToken));
  };

  return (
    <View style={[cStyles.wrapper, styles.wrapper]}>
      <ScrollView>
        <Text style={cStyles.infoTitle}>选择个性标签</Text>
        <Text style={cStyles.infoText}>完善个人信息，让大家更好地认识你</Text>
        <View style={styles.labelContent}>
          {labelList.map((data, categoryIndex) => {
            return (
              <View key={categoryIndex} style={styles.categoryWapper}>
                <Text style={styles.category}>{data.category}</Text>
                <View style={styles.labelWrapper}>
                  {data.label_list.map((label, labelIndex) => {
                    const {title, checked} = label;
                    return (
                      <Text
                        key={labelIndex}
                        style={[styles.label, checked ? styles.labelActive : styles.labelDefault]}
                        onPress={() => handleLabelClick(!checked, labelIndex, categoryIndex)}>
                        {title}
                      </Text>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Text
        onPress={handleNextClick}
        style={[
          cStyles.nextStep,
          styles.nextBtn,
          isCanClick ? cStyles.nextStepActive : cStyles.nextStepNormal,
        ]}>
        完成 {allChecked.length}/5
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
  },
  labelContent: {
    marginLeft: VWValue(50),
    marginRight: VWValue(50 - 13),
    marginTop: RFValue(40),
    marginBottom: VWValue(35),
  },
  categoryWapper: {
    marginBottom: RFValue(28),
  },
  category: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  labelWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: RFValue(25),
  },
  label: {
    fontSize: 14,
    height: RFValue(29),
    lineHeight: RFValue(29),
    paddingHorizontal: VWValue(12),
    borderWidth: 1,
    borderRadius: 18,
    overflow: 'hidden',
    marginRight: VWValue(13),
    marginBottom: VWValue(13),
  },
  labelActive: {
    color: '#fff',
    backgroundColor: '#ff2242',
    borderColor: 'transparent',
  },
  labelDefault: {
    color: '#fff',
    backgroundColor: '#000',
    borderColor: '#BDBDBD',
  },
  nextBtn: {
    position: 'absolute',
    left: VWValue(50),
    bottom: RFValue(15),
  },
});

export default AccountInfoLabel;
