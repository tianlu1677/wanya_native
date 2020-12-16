import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, Platform, Pressable} from 'react-native';

const BlurViewComponent = props => {
  return (
    <View
      {...props}
      style={[{flex: 1, zIndex: 100, backgroundColor: 'rgba(1,1,1, 0.4)'}, props.style]}
    >
      {props.children}
    </View>
  );
};

export default BlurViewComponent;

BlurViewComponent.propTypes = {
  // type: PropTypes.string.isRequired, // 具体类型
  // text: PropTypes.string.isRequired, // 文字
};

const styles = StyleSheet.create({});
