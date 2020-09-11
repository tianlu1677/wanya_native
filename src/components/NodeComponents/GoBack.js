import React from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import IconFont from '@/iconfont';
import Icon from 'react-native-vector-icons/Ionicons';
// import { Icon } from 'react-native-elements'

import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'

export const GoBack = props => {
  const navigation = useNavigation()
  let type = props.type || 'goback';
  const handleClick = () => {
    if(navigation.canGoBack()) {
      navigation.goBack()
    } else {
      console.log('no go');
    }
    // props.handleClick && props.handleClick()
  };
  // console.log('getStatusBarHeight', getStatusBarHeight())
  return (
    <Pressable
      onPress={() => {
        handleClick();
      }}
      style={{...styles.goBackWrap, top: Math.max(getStatusBarHeight(), 20)}}
    >
      <Text style={styles.button}>
        <Icon name="chevron-back-outline" size={30} color="white" iconStyle={{marginRight: 1}} />
      </Text>
      {/*<IconFont name={"arrow-right"} color={'white'} size={14} />*/}
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
    color: 'white'
  },

  centerText: {
    paddingLeft: 13,
    fontSize: 14,
    letterSpacing: 1,
    color: 'white',
    fontWeight: '500',
  },
});
