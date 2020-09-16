import React from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import IconFont from '@/iconfont';
import PropTypes from 'prop-types';

const BlurBackGround = props => {
  return (
    <BlurView
      style={styles.backgroundBlur}
      blurType="light"
      blurAmount={80}
      reducedTransparencyFallbackColor="black">
      {props.children}
    </BlurView>
  )
};

export default BlurBackGround;

BlurBackGround.propTypes = {
  // type: PropTypes.string.isRequired, // 具体类型
  // text: PropTypes.string.isRequired, // 文字
};

const styles = StyleSheet.create({
  backgroundBlur: {
    position: 'absolute',
    bottom: 25,
    left: '32%',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 140,
    borderRadius: 22,
    flexDirection: 'row',
  },

  leftBtn: {
    width: 22,
    height: 22,
  },

  centerText: {
    paddingLeft: 13,
    fontSize: 14,
    letterSpacing: 1,
    color: 'white',
    fontWeight: '500',
  },
});