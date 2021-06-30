import {View, Text, StyleSheet, TextInput, Pressable, StatusBar} from 'react-native';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {SCREEN_WIDTH} from '@/utils/navbar';

const styles = StyleSheet.create({
  infoTitle: {
    fontSize: 23,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#fff',
    marginTop: VWValue(14),
    marginBottom: VWValue(40),
    textAlign: 'center',
  },
  nextStep: {
    width: SCREEN_WIDTH - VWValue(52 * 2),
    height: RFValue(45),
    lineHeight: RFValue(45),
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    borderRadius: 24,
    overflow: 'hidden',
  },
  active: {
    color: '#fff',
    backgroundColor: '#ff2242',
  },
  default: {
    color: '#727272',
    backgroundColor: '#3c3c3c',
  },
});

export default styles;
