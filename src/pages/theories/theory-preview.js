import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {SAFE_TOP} from '@/utils/navbar';
import {GoBack} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import {PublishAccount} from '@/components/Item/single-detail-item';
import TheoryMedia from './component/theory-media.js';

const TheoryPreview = () => {
  const {theory} = useSelector(state => state.theory);

  return (
    <ScrollView style={styles.wrapper}>
      <GoBack color={'white'} />
      <View style={{height: SAFE_TOP, backgroundColor: 'black'}} />
      {theory.media && <TheoryMedia media={theory.media} type="theory_media" showDetele={false} />}
      <Text style={styles.title}>{theory.title}</Text>
      <PublishAccount
        data={{account: theory.account, published_at_text: '刚刚'}}
        showFollow={false}
      />
      <View style={styles.content}>
        <Text style={styles.intro}>{theory.plain_content}</Text>
        <Text style={styles.introTitle}>顽法步骤</Text>
        {(theory.theory_bodies || []).map((item, index) =>
          item.title && item.media && item.desc ? (
            <View key={index}>
              {item.tiele && (
                <Text style={styles.stepTitle}>
                  步骤{item.position}/{theory.theory_bodies.length} {item.title}
                </Text>
              )}
              {item.media && (
                <View style={styles.stepMedia}>
                  <TheoryMedia media={item.media} type="theory_body_media" showDetele={false} />
                </View>
              )}
              {item.desc && <Text style={styles.stepIntro}>{item.desc}</Text>}
            </View>
          ) : null
        )}
        {theory.tip && (
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
