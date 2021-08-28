import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {RFValue} from '@/utils/response-fontsize';

export const JoinBtn = props => {
  const {join, style, joinedStyle, joinStyle, borderRadius} = props;

  return (
    <Text
      style={[
        JStyles.btn,
        style,
        join ? joinedStyle || JStyles.joined : joinStyle || JStyles.join,
        {borderRadius: borderRadius ? 16 : 1},
      ]}
      onPress={props.onPress}>
      {props.text}
    </Text>
  );
};

const JStyles = StyleSheet.create({
  btn: {
    width: RFValue(54),
    height: RFValue(27),
    lineHeight: RFValue(27),
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
    overflow: 'hidden',
    zIndex: 10,
  },
  joined: {
    color: '#bdbdbd',
    backgroundColor: '#FAFAFA',
  },
  join: {
    color: '#fff',
    backgroundColor: '#000',
  },
});
