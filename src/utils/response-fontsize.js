import {isIphoneX} from 'react-native-iphone-x-helper';
import {Platform, StatusBar, Dimensions} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '@/utils/navbar';

const {height, width} = Dimensions.get('window');
const standardLength = width > height ? width : height;
const offset = width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

const deviceHeight =
  isIphoneX() || Platform.OS === 'android' ? standardLength - offset : standardLength;

export function RFPercentage(percent) {
  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
}

// guideline height for standard 5" device screen is 680  667 = 1334/2
export function RFValue(fontSize, standardScreenHeight = 667) {
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}

// 设计稿 750 1334
export const VWValue = fontSize => {
  return Math.round((fontSize * SCREEN_WIDTH) / (750 / 2));
};

export const VHValue = fontSize => {
  return Math.round((fontSize * SCREEN_HEIGHT) / (1334 / 2));
};
