import React from 'react';
import {View, StyleSheet} from 'react-native';
import IconFont from '@/iconfont';

const RateScore = props => {
  const {score, size} = props;
  const allScore = Array(5).fill(null);

  return (
    <View style={styles.wrapper}>
      {allScore.map((item, index) => {
        const half = score - index < 1;
        const name = score > index ? (half ? 'banxing' : 'hongxing') : 'huixing';
        return <IconFont key={index} size={size} style={styles.star} name={name} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
});

export default RateScore;
