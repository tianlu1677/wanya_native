import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Spinner from 'react-native-spinkit';

const Loading = props => {
  const allTypes = [
    'CircleFlip',
    'Bounce',
    'Plane',
    'Wave',
    'WanderingCubes',
    'Pulse',
    'ChasingDots',
    'ThreeBounce',
    'Circle',
    '9CubeGrid',
    'FadingCircle',
    'FadingCircleAlt',
  ];
  const type = Math.random(allTypes.length - 1).toFixed(1) * 10;

  return (
    <View style={[styles.loading, props.style]}>
      {/*<ActivityIndicator size={'small'} />*/}
      <Spinner
        style={{}}
        isVisible={true}
        size={props.size || 35}
        type={props.type || 'Bounce'}
        color={'#BDBDBD'}
      />
      {props.text !== 'none' && <Text style={styles.text}>{props.text || '加载中...'}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
  },

  text: {
    marginTop: 10,
    fontSize: 14,
    color: '#BDBDBD',
  },
});

export default Loading;
