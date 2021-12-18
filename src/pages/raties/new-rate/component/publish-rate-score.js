import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';

const PublishDateScore = props => {
  const {score, setScore} = props;
  const allScore = Array(5).fill(null);

  const handleStar = index => {
    setScore(index + 1);
  };

  return (
    <View style={styles.wrapper}>
      {allScore.map((item, index) => {
        return (
          <Pressable style={styles.score} key={index} onPress={() => handleStar(index)}>
            <IconFont name={score > index ? 'hongxing' : 'huixing'} size={RFValue(29)} />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  score: {
    marginRight: 10,
  },
});

export const ReturnScoreText = score => {
  switch (score) {
    case 1:
      return '糟糕';
    case 2:
      return '较差';
    case 3:
      return '普通';
    case 4:
      return '推荐';
    case 5:
      return '超棒';
    default:
      break;
  }
};

export default PublishDateScore;
