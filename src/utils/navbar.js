import {Platform, Dimensions, StatusBar} from 'react-native';
import {isIphoneX, getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';

export const IsIos = Platform.OS === 'ios';
export const NAV_BAR_HEIGHT_IOS = 44; //导航栏在iOS中的高度
export const NAV_BAR_HEIGHT_ANDROID = 50; //导航栏在Android中的高度
export const NAV_BAR_HEIGHT = IsIos ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID;

export const STATUS_BAR_HEIGHT =
  !IsIos || !isIphoneX ? getStatusBarHeight(false) : getStatusBarHeight(false);

export const BOTTOM_HEIGHT = IsIos ? getBottomSpace() : 0;

export const BASIC_HEIGHT = BOTTOM_HEIGHT > 0 ? BOTTOM_HEIGHT : STATUS_BAR_HEIGHT;

export const SCALE = Dimensions.get('window').width / 375 > 1 ? 1.08 : 1;

//padding的距离
export const PADDING_TOP = IsIos ? 20 : 0;
export const SAFE_TOP = IsIos ? getStatusBarHeight(true) : 0;
export const UNSAFE_TOP = IsIos ? getStatusBarHeight(false) : 0;

// 设备的宽高
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
console.log('SCREEN_WIDTH', SCREEN_WIDTH, SCREEN_HEIGHT)
// console.log('getStatusBarHeight();', getStatusBarHeight(true))
// console.log('getStatusBarHeight();', getStatusBarHeight(false))
// console.log('getBottomSpace();', getBottomSpace())
// console.log('BASIC_HEIGHT();', BASIC_HEIGHT)
// console.log('STATUS_BAR_HEIGHT();', STATUS_BAR_HEIGHT)
// console.log('Platform.OS();', Platform.OS)
// console.log('UNSAFE_TOP', <UNSAFE_TOP></UNSAFE_TOP>)

export const BarHeight = IsIos
  ? isIphoneX()
    ? getStatusBarHeight(true)
    : getStatusBarHeight(false)
  : StatusBar.currentHeight;

console.log('BarHeight', BarHeight);
