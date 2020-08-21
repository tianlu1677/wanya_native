import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Avator from '@/components/NodeComponents/Avator';

const JoinStyles = StyleSheet.create({
  btn: {
    width: 54,
    height: 27,
    lineHeight: 27,
    textAlign: 'center',
    borderRadius: 1,
    fontSize: 13,
    backgroundColor: '#fff',
  },
  joined: {
    color: '#bdbdbd',
  },
  join: {
    color: '#000',
  },
});

export const JoinButton = props => {
  return (
    <Text style={[JoinStyles.btn, props.joined ? JoinStyles.joined : JoinStyles.join]}>
      {props.text}
    </Text>
  );
};
