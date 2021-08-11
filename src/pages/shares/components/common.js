import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  avator: {
    position: 'absolute',
    top: -22,
    left: 18,
  },
  shareLogoTop: {
    width: 58,
    height: 20,
    position: 'absolute',
    right: 10,
    top: -24,
  },
  headerInfo: {
    // marginHorizontal: 18,
    // marginTop: 30,
  },
  username: {
    color: '#fff',
    fontWeight: '500',
    lineHeight: 20,
    fontSize: 12,
    marginTop: 9,
  },
  time: {
    color: '#BDBDBD',
    fontSize: 10,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 35,
    marginBottom: 40,
  },
  shareLogo: {
    marginTop: 10,
    width: 190,
    height: 300 / (790 / 190),
  },
  shareqrImg: {
    height: 95,
    width: 95,
    backgroundColor: 'white',
    borderRadius: 3,
  },
});
