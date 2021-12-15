import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';

const PublishDateScore = () => {
  const allScore = Array(5).fill(null);
  const [score, setScore] = useState(0);

  const handleStar = index => {
    setScore(index + 1);
  };

  return (
    <View style={styles.wrapper}>
      {allScore.map((item, index) => {
        return (
          <Pressable style={styles.score} onPress={() => handleStar(index)}>
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

export default PublishDateScore;
