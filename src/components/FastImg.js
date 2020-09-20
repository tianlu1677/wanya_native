import React, {Component} from 'react';
import {View, Text} from 'react-native';

// https://github.com/DylanVann/react-native-fast-image

import FastImage from 'react-native-fast-image';

const FastImg = props => {
  const modeList = {
    contain: FastImage.resizeMode.contain,
    cover: FastImage.resizeMode.cover,
    stretch: FastImage.resizeMode.stretch,
    center: FastImage.resizeMode.center,
  };
  const resizeMode = modeList[props.mode || 'stretch'];

  const onLoad = event => {
    props.onLoad && props.onLoad(event);
  };
  return (
    <FastImage
      style={{width: 100, height: 100, ...props.styles}}
      source={props.source}
      resizeMode={resizeMode}
      onLoad={() => {
        onLoad();
      }}
      {...props}
    />
  );
};

export default FastImg;
