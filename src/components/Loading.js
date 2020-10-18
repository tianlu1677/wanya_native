import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Spinner from 'react-native-spinkit';

const Loading = () => {
  const allTypes = ['CircleFlip', 'Bounce', 'Plane', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'FadingCircle', 'FadingCircleAlt']
  const type = Math.random(allTypes.length - 1).toFixed(1) * 10
  return (
    <View style={styles.loading}>
      {/*<ActivityIndicator size="large" />*/}
      <Spinner style={{}} isVisible={true} size={35} type={'Bounce'} color={'#BDBDBD'} />
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
    zIndex: 999,
  },
});

export default Loading;
