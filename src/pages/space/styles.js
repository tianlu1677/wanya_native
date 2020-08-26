import {StyleSheet} from 'react-native';

export const SpaceDetailStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    paddingLeft: 16,
    paddingRight: 24,
    paddingTop: 63,
    position: 'relative',
    height: 275,
    backgroundColor: 'pink',
  },
  bgcover: {
    height: 275,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    zIndex: -1,
    backgroundColor: 'green',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 25,
    color: '#fff',
  },
  intro: {
    fontSize: 11,
    color: '#fff',
    marginTop: 8,
  },
  creatorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creator: {
    marginLeft: 5,
  },
  creatorName: {
    color: '#fff',
    fontSize: 11,
  },
  creatorDesc: {
    color: '#fff',
    fontSize: 8,
    marginTop: 5,
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  addressText: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 8,
  },
  descWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 36,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 260,
  },
  tags: {
    height: 21,
    lineHeight: 21,
    fontSize: 11,
    textAlign: 'center',
    backgroundColor: '#fff',
    opacity: 0.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 8,
    marginBottom: 8,
  },
});
