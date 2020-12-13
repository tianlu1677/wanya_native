import React from 'react';
import {Text, StyleSheet} from 'react-native';

const JoinStyles = StyleSheet.create({
  btn: {
    width: 54,
    height: 27,
    lineHeight: 27,
    textAlign: 'center',
    fontSize: 13,
    borderRadius: 1,
    fontWeight: '500',
    overflow: 'hidden',
    zIndex: 10
  },
  joined: {
    color: '#bdbdbd',
    backgroundColor: '#fff',
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
