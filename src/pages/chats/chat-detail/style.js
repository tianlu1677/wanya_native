import {Dimensions, StyleSheet} from 'react-native';
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
    paddingHorizontal: 5,
    height: 22,
    lineHeight: 22,
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: '#000',
    borderRadius: 2,
    overflow: 'hidden',
  },
  leftMessageText: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 19,
    borderBottomRightRadius: 19,
    borderBottomLeftRadius: 19,
    fontSize: 14,
    color: 'black',
    lineHeight: 22,
    letterSpacing: 1,
    fontWeight: '300',
  },
  rightMessageText: {
    borderTopLeftRadius: 19,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 19,
    borderBottomLeftRadius: 19,
    fontSize: 14,
    color: 'white',
    lineHeight: 22,
    letterSpacing: 1,
    fontWeight: '300',
    marginLeft: 2,
  },
});

export default styles;
