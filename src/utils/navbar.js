import React, {useState, useEffect, useLayoutEffect, useReducer} from 'react';
import {Platform, Dimensions} from 'react-native';
import {isIphoneX, getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';

export const NAV_BAR_HEIGHT_IOS = 44; //导航栏在iOS中的高度
export const NAV_BAR_HEIGHT_ANDROID = 50; //导航栏在Android中的高度
export const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID;

export const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT;
export const STATUS_BAR_HEIGHT = Platform.OS !== 'ios' || !isIphoneX ? getStatusBarHeight() : 20;
export const BOTTOM_HEIGHT = Platform.OS === 'ios' ? getBottomSpace() : 0;
export const IsIos = Platform.OS === 'ios'

export const BASIC_HEIGHT = BOTTOM_HEIGHT > 0 ? BOTTOM_HEIGHT : STATUS_BAR_HEIGHT;

export const SCALE = Dimensions.get('window').width / 375 > 1 ? 1.08 : 1;

//padding的距离
export const PADDING_TOP = Platform.OS === 'ios' ? 20 : 0;

// 设备的宽高
export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height

console.log('getStatusBarHeight();', getStatusBarHeight())
console.log('getBottomSpace();', getBottomSpace())
console.log('BASIC_HEIGHT();', BASIC_HEIGHT)
console.log('STATUS_BAR_HEIGHT();', STATUS_BAR_HEIGHT)