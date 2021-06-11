import {Dimensions, StyleSheet} from 'react-native';
import {RFValue, VWValue} from '@/utils/response-fontsize';
const {width} = Dimensions.get('window');

const panalWidth = (width - 30 - 15 * 3) / 4;
const styles = StyleSheet.create({
  panelContainerStyle: {
    paddingTop: 15,
    flexDirection: 'row',
  },
  panelImageWrap: {
    width: panalWidth,
    marginRight: 15,
  },
  panelImage: {
    width: panalWidth,
    height: panalWidth,
  },
  panelText: {
    width: panalWidth,
    color: '#7a7a7a',
    marginTop: 10,
    textAlign: 'center',
    marginRight: 1,
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
  itemContainerStyle: {
    paddingHorizontal: VWValue(15),
    paddingVertical: RFValue(14),
    alignItems: 'flex-start',
  },
  leftMessageText: {
    fontSize: VWValue(14),
    color: 'black',
    lineHeight: RFValue(20),
    fontWeight: '300',
  },
  rightMessageText: {
    fontSize: VWValue(14),
    color: 'white',
    lineHeight: RFValue(20),
    fontWeight: '300',
  },
  video: {
    width,
    height: 200,
  },
  videoIcon: {
    position: 'absolute',
    top: 50,
    left: 50,
    zIndex: 2,
  },
});

export default styles;
