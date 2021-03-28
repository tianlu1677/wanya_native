import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {RFValue} from '@/utils/response-fontsize';

const BaseHashtag = props => {
  const {data} = props;
  return <Text style={styles.hashtagName}>#{data.name}</Text>;
};

const styles = StyleSheet.create({
  hashtagName: {
    paddingHorizontal: 14,
    height: RFValue(45),
    lineHeight: RFValue(45),
    color: '#FF8D00',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
  },
});

export default BaseHashtag;
