import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PlainContent, RateRelated} from '@/components/Item/single-list-item';
import {PublishRelated, RelatedComponent} from '@/components/Item/single-detail-item';
import {RateScore} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';

const RenderText = props => {
  const {
    detail: {is_rate, rate_score, plain_content, space, location},
  } = props;

  console.log(props.detail);
  return (
    <>
      <RelatedComponent data={props.detail} />
      {plain_content ? (
        <View style={styles.content}>
          <PlainContent data={props.detail} style={styles.multiLineText} />
        </View>
      ) : null}

      {is_rate ? (
        <View style={styles.rateWrapper}>
          <Text style={styles.rateText}>打分</Text>
          <RateScore score={rate_score} size={RFValue(14)} />
        </View>
      ) : null}

      {/* 为评价时显示场地、顽士多列 */}
      <RateRelated data={props.detail} style={{marginHorizontal: 14}} />

      <PublishRelated data={props.detail} type="topic" space={space} location={location} />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 14,
    paddingBottom: 0,
    marginTop: 15,
  },
  multiLineText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#000',
  },
  rateWrapper: {
    flexDirection: 'row',
    marginLeft: 14,
  },
  rateText: {
    marginRight: 5,
  },
});

export default RenderText;
