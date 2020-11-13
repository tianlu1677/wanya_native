import React, {Component} from 'react';
import {ScrollView, Dimensions, Image, Text, View} from 'react-native';
import HTML from 'react-native-render-html';
import FastImg from '@/components/FastImg';

const RichHTML = props => {
  const {images_info} = props;
  const imageWidth = Dimensions.get('window').width - 20;
  const renderImg = (htmlAttribs, children, convertedCSSStyles, passProps) => {
    if (!htmlAttribs || !htmlAttribs.src) {
      return <View />;
    } else {
      const findImg = images_info.find(x => x.url === htmlAttribs.src);
      return (
        <View style={{flex: 1}} key={htmlAttribs.src}>
          <FastImg
            source={{uri: htmlAttribs.src}}
            style={{width: imageWidth, height: (imageWidth * findImg.height) / findImg.width}}
            resizeMode={'cover'}
            tintColor={'gray'}
          />
        </View>
      );
    }
  };

  return (
    <HTML
      html={props.content}
      imagesMaxWidth={Dimensions.get('window').width}
      renderers={{
        img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
          return renderImg(htmlAttribs, children, convertedCSSStyles, passProps);
        },
      }}
      {...props}
    />
  );
};

export default RichHTML;
