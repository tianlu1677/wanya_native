import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SafeAreaPlus = props => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        props.styles,
        {
          flex: 1,
          backgroundColor: props.backgroundColor || 'white',
          // paddingBottom: Math.max(insets.bottom, 16),
          // paddingTop: Math.max(insets.top, 20),
        },
      ]}
      edges={props.edges}
      mode="padding"
    >
      {props.children}

    </SafeAreaView>
  );
};

export default SafeAreaPlus;
