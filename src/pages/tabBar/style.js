import {StyleSheet} from 'react-native';
import {BarHeight, IsIos} from '@/utils/navbar';
import {RFValue, VWValue} from '@/utils/response-fontsize';

export const TopHeight = RFValue(5);
export const BoothHeight = IsIos ? BarHeight + TopHeight : TopHeight;

const positionStyle = {
  height: RFValue(33),
  position: 'absolute',
  top: IsIos ? BarHeight + TopHeight : TopHeight,
  zIndex: 99,
  flexDirection: 'row',
  alignItems: 'center',
};

export const Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  avatorWrap: {
    ...positionStyle,
    left: 14,
  },
  createWrap: {
    ...positionStyle,
    right: 14,
  },
  createText: {
    fontSize: 14,
    color: '#2C2C2C',
    marginLeft: 5,
  },
});
