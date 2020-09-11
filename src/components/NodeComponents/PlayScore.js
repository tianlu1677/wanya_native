import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

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
    <TouchableOpacity style={playStyles.wrapper} onPress={props.onPress}>
      <Image style={playStyles.image} source={require('@/assets/images/play-score.png')} />
      <Text style={[playStyles.scoreText, props.textStyle]}>{filter(props.score)}</Text>
    </TouchableOpacity>
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
