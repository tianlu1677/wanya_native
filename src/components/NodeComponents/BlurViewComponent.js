import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, Platform, Pressable} from 'react-native';
import {BlurView, VibrancyView} from '@react-native-community/blur';

const isIos = Platform.OS === 'ios'
const BlurViewComponent = props => {
  return (
    <View>
      {isIos ? (
        <BlurView
          // style={styles.backgroundBlur}
          // blurType="light"
          // blurAmount={80}
          {...props}>
          {props.children}
        </BlurView>
      ) : (
        <View
          {...props}
          style={[props.style, {flex: 1, backgroundColor: 'rgba(1,1,1, 0.8)'}]}
        >
          {props.children}
        </View>
      )}
    </View>
  );
};

export default BlurViewComponent;

BlurViewComponent.propTypes = {
  // type: PropTypes.string.isRequired, // 具体类型
  // text: PropTypes.string.isRequired, // 文字
};

const styles = StyleSheet.create({});
