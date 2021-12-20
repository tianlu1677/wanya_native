import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RateScore} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';

const RateRelatedText = props => {
  const {
    data: {is_rate, rate_score},
  } = props;

  return is_rate ? (
    <View style={styles.rateWrapper}>
      <Text style={styles.rateText}>打分</Text>
      <RateScore score={rate_score} size={RFValue(14)} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  rateWrapper: {
    flexDirection: 'row',
    marginLeft: 14,
  },
  rateText: {
    marginRight: 5,
  },
});

export default RateRelatedText;
