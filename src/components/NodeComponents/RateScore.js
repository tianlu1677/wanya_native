import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconFont from '@/iconfont';

const RateScore = props => {
  // .1 .9 都为半星
  const {score, size} = props;
  const allScore = Array(5).fill(null);

  return (
    <View style={styles.wrapper}>
      {allScore.map((item, index) => {
        const half = score - index === 0.5;
        return (
          <IconFont
            key={index}
            size={size}
            style={styles.star}
            name={score > index ? (half ? 'banxing' : 'hongxing') : 'huixing'}
          />
        );
      })}
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 4,
  },
  score: {
    color: '#FF2242',
  },
});

export default RateScore;
