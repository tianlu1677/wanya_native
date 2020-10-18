import React, {Component} from 'react';
import {View, Text, Pressable} from 'react-native';

// https://github.com/DylanVann/react-native-fast-image

import FastImage from 'react-native-fast-image';

const FinishBtn = props => {

  const onPress = () => {
    props.onPress()
  }

  return (
    <Pressable onPress={onPress} style={{paddingRight: 20}}>
      <Text style={{fontSize: 14, fontWeight: '600', color: props.canClick ? 'white' : '#353535'}}>{props.text || '完成'}</Text>
    </Pressable>
  );
};

export default FinishBtn;
