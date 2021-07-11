import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchCurrentAccount} from '@/redux/actions';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {syncAccountInfo} from '@/api/account_api';
import {SCREEN_WIDTH} from '@/utils/navbar';

const AddDefaultCheck = (data, checked) => {
  const transLateData = data.map(item => {
    const label_list = item.label_list.map(label => {
      return {title: label, checked: checked.includes(label) ? true : false};
    });
    return {category: item.category, label_list: label_list};
  });
  return transLateData;
};

const AccountLabel = ({navigation}) => {
  const dispatch = useDispatch();

  const {
    home: {totalLabelList},
    login: {socialToken, socialAccount},
    account: {currentAccount},
  } = useSelector(state => state);

  const [labelList, setLabelList] = useState(
    AddDefaultCheck(totalLabelList, currentAccount.label_list)
  );

  const allChecked = labelList
    .map(item => item.label_list)
    .flat()
    .filter(label => label.checked);

  const handleLabelClick = (checked, labelIndex, categoryIndex) => {
    labelList[categoryIndex].label_list[labelIndex].checked = checked;
    setLabelList([...labelList]);
  };

  const handleNextClick = async () => {
    if (allChecked.length === 0) {
      return false;
    }
    const label_list = allChecked.map(item => item.title);
    const data = {
      id: socialAccount.id,
      token: socialToken,
      account: {profile_attributes: {label_list}},
    };
    await syncAccountInfo(data);
    dispatch(dispatchCurrentAccount());
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <Text style={styles.infoTitle}>选择个性标签</Text>
        <Text style={styles.infoText}>完善个人信息，让大家更好地认识你</Text>
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
          styles.nextStep,
          allChecked.length > 0 ? styles.nextStepActive : styles.nextStepNormal,
        ]}>
        保存
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
    flex: 1,
    backgroundColor: '#fff',
  },
  infoTitle: {
    fontSize: 23,
    fontWeight: '600',
    marginTop: VWValue(5),
    textAlign: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#bdbdbd',
    marginTop: VWValue(14),
    textAlign: 'center',
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
    borderRadius: 16,
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
    color: '#A1A1A1',
    backgroundColor: '#fff',
    borderColor: '#BDBDBD',
  },
  nextStep: {
    width: SCREEN_WIDTH - VWValue(50 * 2),
    height: RFValue(45),
    lineHeight: RFValue(45),
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    borderRadius: 26,
    overflow: 'hidden',
    position: 'absolute',
    left: VWValue(50),
    bottom: RFValue(15),
  },
  nextStepNormal: {
    color: '#727272',
    backgroundColor: '#3c3c3c',
  },
  nextStepActive: {
    color: '#fff',
    backgroundColor: '#FF2242',
  },
});

export default AccountLabel;
