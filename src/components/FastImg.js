import React, {Component} from 'react';
import {View, Text} from 'react-native';

// https://github.com/DylanVann/react-native-fast-image

import FastImage from 'react-native-fast-image';
import IconArrowLeft from "@/iconfont/IconArrowLeft"

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
      style={{width: 100, height: 100, borderRadius: 2, ...props.style}}
      source={props.source}
      resizeMode={resizeMode}
      // tintColor={'gray'}
      onLoad={(e) => {
        onLoad(e);
      }}
    >{props.children}</FastImage>
  );
};

FastImg.defaultProps = {
  source: {uri: 'https://baidu.com'},
};
export default FastImg;
