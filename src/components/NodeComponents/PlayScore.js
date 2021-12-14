import React from 'react';
import {Text, Image, StyleSheet, Pressable} from 'react-native';
import PropTypes from 'prop-types';

const PlayScore = props => {
  const {imageStyle = {}, text = ''} = props;

  const filter = value => {
    if (value >= 10000) {
      const num = Math.round((value / 10000) * 10) / 10;
      return `${num}w`;
    } else {
      return value;
    }
  };

  return (
    <Pressable style={playStyles.wrapper} onPress={props.onPress}>
      <Image
        style={[playStyles.image, imageStyle]}
        source={require('@/assets/images/play-score.png')}
      />
      <Text style={[playStyles.scoreText, props.textStyle]}>
        {filter(props.score)}
        {text}
      </Text>
    </Pressable>
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
