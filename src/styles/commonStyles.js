import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#219bd930',
    color: '#ff0000'
  },
  content: {
    padding: 6
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
});

export default commonStyles;