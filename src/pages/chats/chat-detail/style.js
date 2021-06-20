import {Dimensions, StyleSheet} from 'react-native';
import {RFValue, VWValue} from '@/utils/response-fontsize';
const {width} = Dimensions.get('window');
const panalWidth = (width - 30 - 15 * 3) / 4;
const InputHeight = RFValue(33);

const styles = StyleSheet.create({
  panelContainerStyle: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: VWValue(20),
  },
  panelImageWrap: {
    // width: panalWidth,
    width: VWValue(68),
    height: VWValue(68),
    marginRight: VWValue(30),
    // marginRight: 15,
  },
  panelImage: {
    // width: panalWidth,
    // height: panalWidth,
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
    borderRadius: 2,
    overflow: 'hidden',
  },
  avatarStyle: {
    width: RFValue(38),
    height: RFValue(38),
    borderRadius: RFValue(19),
  },
  inputOutContainerStyle: {
    // paddingVertical: 8,
    // paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputStyle: {
    backgroundColor: '#fff',
    borderColor: '#ebebeb',
    height: 35,
  },
  itemContainerStyle: {
    paddingHorizontal: VWValue(12),
    paddingVertical: 0,
    paddingBottom: RFValue(14),
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
    height: RFValue(13),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFValue(14),
  },
  chatTime: {
    color: '#bdbdbd',
    fontSize: RFValue(11),
  },
});

export default styles;
