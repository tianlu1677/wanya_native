import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import {StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';

const BottomSheetContent = props => {
  const sheetRef = React.useRef(null);

  return (
    <>
      <BottomSheet
        // ref={sheetRef}
        getRef={props.getRef}
        snapPoints={props.snapPoints || [300, 0]}
        borderRadius={10}
        renderContent={props.renderContent}
        renderHeader={props.renderHeader}
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: 450,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default BottomSheetContent;
