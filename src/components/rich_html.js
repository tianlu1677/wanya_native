import React, {Component} from 'react';
import {ScrollView, Dimensions} from 'react-native';
import HTML from 'react-native-render-html';

const RichHTML = props => {
  return <HTML
    html={props.content}
    imagesMaxWidth={Dimensions.get('window').width}
    {...props}
  />;
};

export default RichHTML;
