import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {SAFE_TOP} from '@/utils/navbar';
import {GoBack} from '@/components/NodeComponents';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';
import {PublishAccount} from '@/components/Item/single-detail-item';
const {width} = Dimensions.get('window');

const img =
  'http://xinxuefile.meirixinxue.com/uploads/node/backgroud_cover/2020/5bf3c320-53f1-4546-9455-cd3eb6c9f8ca.gif?imageMogr2/thumbnail/!750x485r/gravity/Center/crop/750x485';

const TheoryPreview = () => {
  const currentAccount = useSelector(state => state.account.currentAccount);

  return (
    <ScrollView style={styles.wrapper}>
      <GoBack color={'white'} />
      <View style={{height: SAFE_TOP, backgroundColor: 'black'}} />
      <FastImg source={{uri: img}} style={{width, height: 200}} />
      <Text style={styles.title}>kickflip的奇妙顽法kickflip的奇妙顽法kickflip的奇妙顽法</Text>
      <PublishAccount
        data={{account: currentAccount, published_at_text: '刚刚'}}
        showFollow={false}
      />
      <View style={styles.content}>
        <Text style={styles.intro}>可以写写这个技巧顽法背后的故事，背后的故背后的故背后的故</Text>
        <Text style={styles.introTitle}>顽法步骤</Text>
        {[1, 2].map((v, index) => (
          <View key={index}>
            <Text style={styles.stepTitle}>步骤1/2 基本上板的脚位</Text>
            <FastImg
              source={{uri: img}}
              style={{...styles.stepMedia, width: width - 30, height: 200}}
            />
            <Text style={styles.stepIntro}>
              步骤1描述描述描述描述描述描述描述描述描述描述描述描述描述
            </Text>
          </View>
        ))}
        <Text style={styles.introTitle}>小贴士</Text>
        <Text style={styles.tips}>
          这套玩法有哪些小技巧或者注意事项，需要提醒大家这套玩法有哪些小技巧或者注意事项，需要提醒大家这套玩法有哪些小技巧或者注意事项，需要提醒大家
        </Text>
      </View>
    </ScrollView>
  );
};

const greyText = {fontSize: 14, color: '#2C2C2C', fontWeight: '300'};
export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    color: '#1F1F1F',
    fontWeight: '500',
    lineHeight: RFValue(25),
    paddingHorizontal: 15,
    marginTop: RFValue(14),
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: RFValue(25),
  },
  intro: {
    lineHeight: RFValue(20),
    marginTop: RFValue(16),
    ...greyText,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: RFValue(20),
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: RFValue(20),
    marginTop: RFValue(15),
  },
  stepMedia: {
    marginTop: RFValue(15),
  },
  stepIntro: {
    lineHeight: RFValue(20),
    marginTop: RFValue(12),
    ...greyText,
  },
  tips: {
    lineHeight: RFValue(20),
    marginTop: RFValue(20),
    ...greyText,
  },
});

export default TheoryPreview;
