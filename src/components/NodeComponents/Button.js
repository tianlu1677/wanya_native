import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {RFValue} from '@/utils/response-fontsize';

const JStyles = StyleSheet.create({
  btn: {
    width: RFValue(54),
    height: RFValue(27),
    lineHeight: RFValue(27),
    textAlign: 'center',
    fontSize: 13,
    borderRadius: 1,
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

export const JoinBtn = props => {
  const {join, joinedStyle, joinStyle} = props;

  return (
    <Text
      style={[JStyles.btn, join ? joinedStyle || JStyles.joined : joinStyle || JStyles.join]}
      onPress={props.onPress}>
      {props.text}
    </Text>
  );
};
