import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, Platform, Pressable} from 'react-native';
import {BlurView, VibrancyView} from '@react-native-community/blur';

const BlurViewComponent = props => {
  return (
    <BlurView
      // style={styles.backgroundBlur}
      blurType={props.blurType || 'light'}
      blurAmount={props.blurAmount || 80}
      style={props.style}
      reducedTransparencyFallbackColor={props.reducedTransparencyFallbackColor || 'white'}>
      {props.children}
    </BlurView>
  );
};

export default BlurViewComponent;

BlurViewComponent.propTypes = {
  // type: PropTypes.string.isRequired, // 具体类型
  // text: PropTypes.string.isRequired, // 文字
};

const styles = StyleSheet.create({});
