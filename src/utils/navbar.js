import React, {useState, useEffect, useLayoutEffect, useReducer} from 'react';
import { Platform} from 'react-native'
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'

export const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
export const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
export const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID;
export const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT + getStatusBarHeight();
export const STATUS_BAR_HEIGHT = Platform.OS !== 'ios' || !isIphoneX ? 0 : 20;