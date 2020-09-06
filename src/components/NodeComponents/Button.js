import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const JoinStyles = StyleSheet.create({
  btn: {
    width: 54,
    height: 27,
    lineHeight: 27,
    textAlign: 'center',
    borderRadius: 1,
    fontSize: 13,
  },
  joined: {
    color: '#bdbdbd',
    backgroundColor: '#efefef',
  },
  join: {
    color: '#fff',
    backgroundColor: '#000',
  },
});

export const JoinBtn = props => {
  return (
    <Text
      style={[JoinStyles.btn, props.join ? JoinStyles.joined : JoinStyles.join]}
      onPress={props.onPress}>
      {props.text}
    </Text>
  );
};
