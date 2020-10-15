import React, {Component} from 'react';
import {Badge, withBadge} from 'react-native-elements';
import {View, Pressable, StyleSheet, Text} from 'react-native';

const BadgeMessage = props => {
  const {size, value, containerStyle} = props;
  const warpStyle = styles[`${size}Wrap`];
  const isBig = value > 99;
  const bigger = value >= 1 && value < 10 ? 1 : value > 99 ? 2 : 1.4;

  return (
    <View style={containerStyle}>
      {value > 0 && (
        <View style={{...warpStyle, width: warpStyle.width * bigger}}>
          <Text style={styles[`${size}Content`]} color={props.color}>
            {isBig ? '99+' : value}
          </Text>
        </View>
      )}
    </View>
  );
};

BadgeMessage.defaultProps = {
  size: 'middle',
  color: 'red',
  number: 0,
};

export default BadgeMessage;

const styles = StyleSheet.create({
  smallWrap: {
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: '#FF2242',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  smallContent: {
    fontSize: 9,
    color: '#ffffff',
  },

  middleWrap: {
    width: 18,
    height: 18,
    lineHeight: 18,
    borderRadius: 9,
    backgroundColor: '#FF2242',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  middleContent: {
    fontSize: 11,
    color: '#ffffff',
  },
});