import {StyleSheet} from 'react-native';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {SCREEN_WIDTH} from '@/utils/navbar';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: VWValue(50),
    backgroundColor: '#000',
  },
  infoTitle: {
    fontSize: 23,
    color: '#fff',
    fontWeight: '600',
    marginTop: VWValue(5),
    textAlign: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#fff',
    marginTop: VWValue(14),
    textAlign: 'center',
  },
  inputWrap: {
    width: SCREEN_WIDTH - VWValue(50 * 2),
    height: RFValue(45),
    fontSize: 15,
    color: '#BDBDBD',
    fontWeight: '500',
    borderBottomColor: '#353535',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  nextStep: {
    width: SCREEN_WIDTH - VWValue(50 * 2),
    height: RFValue(45),
    lineHeight: RFValue(45),
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    borderRadius: 28,
    overflow: 'hidden',
  },
  nextStepNormal: {
    color: '#727272',
    backgroundColor: '#3c3c3c',
  },
  nextStepActive: {
    color: '#fff',
    backgroundColor: '#FF2242',
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
