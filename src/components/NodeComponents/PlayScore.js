import React from './node_modules/react';
import {View, Text, Image, StyleSheet} from 'react-native';
import PropTypes from './node_modules/prop-types';

const PlayScore = props => {
  const filter = value => {
    if (value >= 10000) {
      const num = Math.round((value / 10000) * 10) / 10;
      return `${num}w`;
    } else {
      return value;
    }
  };

  return (
    <View style={playStyles.wrapper}>
      <Image
        style={playStyles.image}
        source={require('./node_modules/@/assets/images/play-score.png')}
      />
      <Text style={playStyles.scoreText}>{filter(props.score)}</Text>
    </View>
  );
};

const playStyles = StyleSheet.create({
  wrapper: {
    height: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 21,
    height: 22,
  },
  scoreText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 12,
  },
});

playStyles.propTypes = {
  score: PropTypes.number.isRequired, //数值
};

export default PlayScore;
