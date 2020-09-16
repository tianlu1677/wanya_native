import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {StyleSheet, View, Text} from 'react-native';

const BottomSheetContent = (props, ref) => {
  const sheetRef = useRef(null);
  useImperativeHandle(ref, () => ({
    snapTo: () => {
      sheetRef.current.snapTo(0);
    },
  }));

  const renderContent = () => (
    <View style={{backgroundColor: '#fff', padding: 16, height: 400}}>
      <Text>{props.content}</Text>
    </View>
  );

  const renderHeader = () => {};

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 0]}
        borderRadius={10}
        renderContent={renderContent}
        renderHeader={renderHeader}
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

export default forwardRef(BottomSheetContent);
