import React from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import IconFont from '@/iconfont';
import Icon from 'react-native-vector-icons/Ionicons';
// import { Icon } from 'react-native-elements'

import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';

export const GoBack = props => {
  const navigation = useNavigation();
  let name = props.name || 'arrow-left';
  let color = props.color || 'white'
  const handleClick = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Recommend');
      console.log('no go');
    }
  };
  // console.log('getStatusBarHeight', getStatusBarHeight())
  return (
    <Pressable
      onPress={() => {
        handleClick();
      }}
      style={{...styles.goBackWrap, top: Math.max(getStatusBarHeight(), 20)}}>
      {/*<Text style={styles.button}>*/}
      {/*  <Icon*/}
      {/*    name="chevron-back-outline"*/}
      {/*    size={28}*/}
      {/*    color={props.color || 'white'}*/}
      {/*    iconStyle={{marginRight: 1}}*/}
      {/*  />*/}
      {/*</Text>*/}
      <IconFont name={name} color={color} size={15} />
    </Pressable>
  );
};

GoBack.propTypes = {
  // type: PropTypes.string.isRequired, // 具体类型
  // text: PropTypes.string.isRequired, // 文字
};

export default GoBack;

const styles = StyleSheet.create({
  goBackWrap: {
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: 44,
    lineHeight: 44,
    flexDirection: 'row',
    color: 'white',
    // backgroundColor: 'green',
  },

  button: {
    color: 'white',
  },

  centerText: {
    paddingLeft: 13,
    fontSize: 14,
    letterSpacing: 1,
    color: 'white',
    fontWeight: '500',
  },
});
