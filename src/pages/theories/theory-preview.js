import React from 'react';
import {View, Text, StatusBar, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {SAFE_TOP} from '@/utils/navbar';
import {GoBack} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import {PublishAccount} from '@/components/Item/single-detail-item';
import TheoryMedia from './component/theory-media.js';

const TheoryPreview = () => {
  const {theory} = useSelector(state => state.theory);

  const filter_theory_bodies = (theory.theory_bodies || []).filter(
    ({title, media, desc}) => title || media || desc
  );

  return (
    <ScrollView style={styles.wrapper}>
      <GoBack color={'white'} />
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View style={{height: SAFE_TOP, backgroundColor: 'black'}} />
      {theory.media && <TheoryMedia media={theory.media} type="theory_media" showDelete={false} />}
      <Text style={styles.title}>{theory.title}</Text>
      <PublishAccount
        data={{account: theory.account, published_at_text: '刚刚'}}
        showFollow={false}
      />
      <View style={styles.content}>
        <Text style={styles.intro}>{theory.plain_content}</Text>
        <Text style={styles.introTitle}>顽法步骤</Text>
        {filter_theory_bodies.map((item, index) => (
          <View key={index}>
            {!!item.title && (
              <View style={styles.stepTitleWrap}>
                <Text style={styles.greenLine} />
                <Text style={styles.stepTitle}>
                  步骤{index + 1}/{filter_theory_bodies.length}
                </Text>
                <Text style={[styles.stepTitle, {marginLeft: 10}]}>{item.title}</Text>
              </View>
            )}
            {item.media && item.media.id && (
              <View style={styles.stepMedia}>
                <TheoryMedia media={item.media} type="theory_body_media" showDelete={false} />
              </View>
            )}
            {!!item.desc && <Text style={styles.stepIntro}>{item.desc}</Text>}
          </View>
        ))}

        {!!theory.tip && (
          <>
            <Text style={styles.introTitle}>小贴士</Text>
            <Text style={styles.tips}>{theory.tip}</Text>
          </>
        )}
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
  stepTitleWrap: {
    marginTop: RFValue(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenLine: {
    backgroundColor: '#4EFFA3',
    width: 3,
    height: 15,
    borderRadius: 3,
    marginRight: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: RFValue(20),
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
