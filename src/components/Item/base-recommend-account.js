import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avator} from '@/components/NodeComponents';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import BrandImg from '@/assets/images/brand.png';

const BaseRecommendAccount = () => {
  return (
    <View style={styles.wrap}>
      <Avator size={45} account={{nickname: '气氛'}} style={{backgroundColor: 'pink'}} />
      <View style={styles.accountInfo}>
        <Text style={styles.nickname}>芝麻开花</Text>
        <View style={styles.labelWrap}>
          <Text style={styles.label}>画手</Text>
          <Text style={styles.labelLine}>|</Text>
          <Text style={styles.label}>滑雪</Text>
          <Text style={styles.labelLine}>|</Text>
        </View>
        <Text style={styles.intro}>探索与发现 记录与分享</Text>
        <View style={styles.imageWrap}>
          <FastImg source={BrandImg} style={styles.image} />
          <FastImg source={BrandImg} style={styles.image} />
        </View>

        <Text style={styles.btn}>打招呼</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  accountInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nickname: {
    fontSize: 15,
  },
  labelWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 9,
  },
  label: {
    fontSize: 12,
    lineHeight: 14,
    color: '#3d3d3d',
    fontWeight: '300',
  },
  labelLine: {
    width: StyleSheet.hairlineWidth,
    height: 12,
    marginHorizontal: 5,
    backgroundColor: '#3d3d3d',
  },
  intro: {
    fontSize: 12,
    lineHeight: 20,
    color: '#3d3d3d',
    marginTop: 5,
  },
  imageWrap: {
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    width: 56,
    height: 56,
    marginRight: 4,
  },
  btn: {
    width: 54,
    height: 27,
    lineHeight: 27,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#FF2242',
    borderWidth: 1,
    borderColor: '#FF2242',
    borderRadius: 14,
    position: 'absolute',
    right: 0,
    top: 2,
  },
});

export default BaseRecommendAccount;
