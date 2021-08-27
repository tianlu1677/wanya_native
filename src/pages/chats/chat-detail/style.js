import {StyleSheet} from 'react-native';
import {RFValue, VWValue} from '@/utils/response-fontsize';

const styles = StyleSheet.create({
  panelContainerStyle: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: VWValue(20),
  },
  panelImageWrap: {
    width: VWValue(68),
    height: VWValue(68),
    marginRight: VWValue(30),
  },
  panelImage: {
    width: VWValue(68),
    height: VWValue(68),
  },
  panelText: {
    width: VWValue(68),
    color: '#7a7a7a',
    marginTop: 10,
    textAlign: 'center',
    marginRight: 1,
    fontSize: 11,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attation: {
    paddingHorizontal: VWValue(9),
    height: RFValue(22),
    lineHeight: RFValue(22),
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: RFValue(19),
  },
  inputOutContainerStyle: {
    backgroundColor: '#fff',
  },
  inputStyle: {
    backgroundColor: '#fff',
    height: 35,
  },
  itemContainerStyle: {
    paddingHorizontal: VWValue(12),
    paddingVertical: RFValue(7),
    alignItems: 'flex-start',
  },
  leftMessageText: {
    fontSize: 14,
    color: 'black',
    lineHeight: RFValue(20),
    fontWeight: '300',
  },
  rightMessageText: {
    fontSize: 14,
    color: 'white',
    lineHeight: RFValue(20),
    fontWeight: '300',
  },
  chatTimeWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: RFValue(7),
  },
  chatTime: {
    color: '#bdbdbd',
    fontSize: RFValue(11),
  },
});

export default styles;
