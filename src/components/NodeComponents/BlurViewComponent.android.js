import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, Platform, Pressable} from 'react-native';
import {BlurView, VibrancyView} from '@react-native-community/blur';

const isIos = Platform.OS === 'ios'
const BlurViewComponent = props => {
  return (
    <View style={{zIndex: 100}}>
      {isIos ? (
        <VibrancyView
          // style={styles.backgroundBlur}
          blurType="light"
          blurAmount={80}
          {...props}>
          {props.children}
        </VibrancyView>
      ) : (
        <View
          {...props}
          style={[{flex: 1, zIndex: 100, backgroundColor: 'rgba(1,1,1, 0.4)'}, props.style]}
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
