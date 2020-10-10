import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Spinner from 'react-native-spinkit';

const Loading = () => {
  const allTypes = ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt']
  const type = Math.random(allTypes.length - 1).toFixed(1) * 10
  return (
    <View style={styles.loading}>
      {/*<ActivityIndicator size="large" />*/}
      <Spinner style={{}} isVisible={true} size={80} type={allTypes[type]} color={'red'} />
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
});

export default Loading;
