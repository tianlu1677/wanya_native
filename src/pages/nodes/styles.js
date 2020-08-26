import {StyleSheet} from 'react-native';

export const NodeDetailStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    position: 'relative',
    height: 242,
    paddingTop: 20,
  },
  bgcover: {
    height: 242,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
  },
  nodeContent: {
    flexDirection: 'row',
  },
  nodeInfo: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
  cover: {
    width: 70,
    height: 70,
    borderRadius: 2,
    marginRight: 16,
  },
  nodewrap: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  nodeName: {
    fontSize: 24,
    color: '#fff',
  },
  nodeNum: {
    fontSize: 12,
    color: '#fff',
    lineHeight: 27,
    marginBottom: 8,
  },
  nodeCreator: {
    flexDirection: 'row',
  },
  nodeDesc: {
    width: 250,
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 2,
  },
  accountOpacity: {
    backgroundColor: '#fff',
    opacity: 0.12,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  count: {
    color: '#bdbdbd',
    marginRight: 'auto',
    marginLeft: 7,
  },
});
