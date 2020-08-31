import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';

const SafeAreaPlus = props => {
  return (
    <SafeAreaView style={[{flex: 1, backgroundColor: props.backgroundColor || 'white'}, props.styles]}>
      {props.children}
    </SafeAreaView>
  );
};

export default SafeAreaPlus;