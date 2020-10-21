import React, {Component} from 'react';
import {View, Text, Pressable} from 'react-native';

const FinishBtn = props => {
  const onPress = () => {
    props.canClick && props.onPress();
  };

  return (
    <Pressable onPress={onPress} style={{paddingRight: 3}} hitSlop={{left: 20, top: 20, bottom: 20}}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: props.canClick ? 'white' : '#353535',
        }}>
        {props.text || '确定'}
      </Text>
    </Pressable>
  );
};

export default FinishBtn;
