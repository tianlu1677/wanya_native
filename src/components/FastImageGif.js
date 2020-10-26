import React, {Component, useState} from 'react';
import {View, Image} from 'react-native';

// https://github.com/DylanVann/react-native-fast-image

import FastImage from 'react-native-fast-image';

const FastImgGif = props => {
  const [source, setSource] = useState(props.source);
  const modeList = {
    contain: FastImage.resizeMode.contain,
    cover: FastImage.resizeMode.cover,
    stretch: FastImage.resizeMode.stretch,
    center: FastImage.resizeMode.center,
  };
  const resizeMode = modeList[props.mode || 'cover'];

  const onGif = event => {
    if (props.gif_url && props.source.uri) {
      // Image.prefetch(props.gif_url);
      setTimeout(() => {
        console.log('gif_url', props.gif_url, props.source.uri)
        setSource({uri: props.gif_url});
      }, 600)
    }
  };

  return (
    // <FastImage
    //   style={{width: 100, height: 100, borderRadius: 2, ...props.style}}
    //   source={{...source, priority: FastImage.priority.low, cache: FastImage.cacheControl.immutable}}
    //   resizeMode={resizeMode}
    //   // tintColor={'gray'}
    //   onLoad={e => {
    //     onLoad(e);
    //   }}
    //   onLoadEnd={e => {
    //     onGif(e);
    //   }}
    // />
    <Image
      style={{width: 100, height: 100, borderRadius: 2, ...props.style}}
      loadingIndicatorSource={require('../assets/images/red-logo.png')}
      resizeMode={resizeMode}
      source={source}
      onLoad={onGif}
    />
  );
};

export default FastImgGif;
