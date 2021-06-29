import React, {useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import IconFont from '@/iconfont';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {SCREEN_WIDTH} from '@/utils/navbar';

const AccountInfoLabel = () => {
  const {totalLabelList} = useSelector(state => state.home);
  console.log(totalLabelList);

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <Text style={styles.title}>选择个性标签</Text>
        <Text style={styles.text}>完善个人信息，让大家更好地认识你</Text>
        <View style={styles.labelContent}>
          {totalLabelList.map(data => {
            return (
              <View key={data.category} style={styles.categoryWapper}>
                <Text style={styles.category}>{data.category}</Text>
                <View style={styles.labelWrapper}>
                  {data.label_list.map((label, index) => (
                    <Text key={label} style={styles.label}>
                      {label}
                    </Text>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Text style={styles.complate}>完成</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 10,
    paddingBottom: 50,
  },
  title: {
    fontSize: 23,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    color: '#fff',
    marginTop: VWValue(14),
    marginBottom: VWValue(40),
    textAlign: 'center',
  },
  labelContent: {
    marginLeft: VWValue(52),
    marginRight: VWValue(52 - 13),
  },
  categoryWapper: {
    marginBottom: RFValue(23),
  },
  category: {
    color: '#fff',
    fontSize: 16,
  },
  labelWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: RFValue(25),
  },
  label: {
    fontSize: 14,
    color: '#fff',
    height: RFValue(29),
    lineHeight: RFValue(29),
    paddingHorizontal: VWValue(12),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BDBDBD',
    borderRadius: 20,
    marginBottom: RFValue(13),
    marginRight: VWValue(14),
  },
  complate: {
    width: SCREEN_WIDTH - VWValue(52 * 2),
    height: RFValue(45),
    lineHeight: RFValue(45),
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
    backgroundColor: '#ff2242',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 15,
  },
});

export default AccountInfoLabel;
