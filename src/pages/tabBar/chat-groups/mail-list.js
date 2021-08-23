import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import TabView from '@/components/TabView';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {BarHeight, IsIos} from '@/utils/navbar';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {color} from 'react-native-reanimated';
import BrandImg from '@/assets/images/brand.png';

const BaseMail = () => {
  return (
    <View style={bStyles.wrapper}>
      <FastImg source={BrandImg} style={bStyles.avator} />
      <View>
        <Text style={bStyles.nickname}>name</Text>
        <Text style={bStyles.intro}>探索与发现 记录与分享</Text>
      </View>
      <Text style={bStyles.btn}>私聊</Text>
    </View>
  );
};

const bStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avator: {
    width: 45,
    height: 45,
    marginRight: 12,
  },
  nickname: {
    fontSize: 15,
  },
  intro: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 5,
  },
  btn: {
    marginLeft: 'auto',
    width: 54,
    height: 27,
    lineHeight: 27,
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: '#000',
    borderRadius: 13,
    overflow: 'hidden',
  },
});

const TextData = ['互关', '关注', '粉丝'];

const MailList = props => {
  const {navigation} = props;
  const [current, setCurrent] = useState(0);

  const handleChange = index => {
    setCurrent(index);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.followHeader}>
        <Text style={styles.introText}>互相关注（10）</Text>
        <View style={styles.followWrap}>
          {TextData.map((text, index) => {
            return (
              <Text
                key={index}
                onPress={() => handleChange(index)}
                style={[styles.followText, current === index ? styles.active : {}]}>
                {text}
              </Text>
            );
          })}
        </View>
      </View>
      <BaseMail />
      <BaseMail />
    </View>
  );
};

const positionStyle = {
  height: RFValue(33),
  position: 'absolute',
  top: IsIos ? BarHeight : 0,
  zIndex: 99,
  flexDirection: 'row',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  avatorWrap: {
    ...positionStyle,
    left: 14,
  },
  avator: {
    width: 30,
    height: 30,
  },
  createWrap: {
    ...positionStyle,
    right: 14,
  },
  createText: {
    fontSize: 14,
    color: '#2C2C2C',
    marginLeft: 5,
  },

  followHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  introText: {
    fontWeight: '500',
  },
  followWrap: {
    height: 25,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 14,
  },
  followText: {
    height: 21,
    lineHeight: 21,
    paddingHorizontal: 9,
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 11,
    color: '#BDBDBD',
  },
  active: {
    backgroundColor: '#ffe1e6',
    color: '#FF2242',
    fontWeight: '500',
  },
});

export default MailList;
