import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal, {ModalTitle, BottomModal, ModalContent} from 'react-native-modals';

const BottomModalView = props => {
  const cancel = () => {
    props.cancleClick();
  };

  return (
    <BottomModal
      height={props.height || 0.5}
      width={1}
      rounded
      statusBarTranslucent
      useNativeDriver={false}
      containerStyle={{flex: 1, zIndex: 10000, elevation: 10}}
      modalStyle={{}}
      overlayOpacity={0.6}
      visible={props.visible}
      onTouchOutside={() => cancel()}
      onSwipeOut={() => cancel()}
      modalTitle={props.title ? <ModalTitle title={props.title} /> : false}>
      <ModalContent style={{...styles.content, ...props.contentWrapStyle}}>
        {props.content ? <View style={styles.body}>{props.content}</View> : props.children}
      </ModalContent>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    zIndex: 1000,
  },
  content: {
    paddingTop: 10,
    fontSize: 12,
    lineHeight: 14,
    color: '#222222',
    backgroundColor: '#FAFAFA',
    height: '100%',
  },
  body: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 1,
    color: '#222222',
  },
});

export default BottomModalView;
