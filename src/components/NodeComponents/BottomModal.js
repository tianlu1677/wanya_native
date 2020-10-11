import React, {useState} from 'react';
import {Image, View, Pressable, Text, StyleSheet} from 'react-native';
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';

const BottomModal = props => {
  const [isVisible, setIsVisible] = useState(props.visible);
  // console.log('prps', props, isVisible);

  const cancel = () => {
    props.cancleClick();
  };

  return (
    <Modal.BottomModal
      height={0.5}
      width={1}
      rounded
      useNativeDriver={false}
      containerStyle={{flex: 1, zIndex: 10000, elevation: 10}}
      modalStyle={{}}
      overlayOpacity={0.6}
      visible={props.visible}
      onTouchOutside={() => cancel()}
      onSwipeOut={() => cancel()}
      modalTitle={props.title ? <ModalTitle title={props.title} /> : false}>
      <ModalContent style={styles.content}>
        {props.children}
      </ModalContent>
    </Modal.BottomModal>
  );
};

export default BottomModal;

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
  }
});
