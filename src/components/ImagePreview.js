import React, {Component} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import FastImg from '@/components/FastImg';
import ImageViewer from 'react-native-image-zoom-viewer';
import {dispatchPreviewImage} from '@/redux/actions';
import IconFont from '@/iconfont';
import Icon from 'react-native-vector-icons/Ionicons';

const ImagePreview = () => {
  const dispatch = useDispatch();
  const previewImageData = useSelector(state => state.home.previewImageData);
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  const CloseBtn = () => {
    return (
      <Pressable
        style={{
          position: 'absolute',
          paddingTop: 45,
          paddingLeft: 17,
          paddingRight: 24,
          paddingBottom: 24,
          zIndex: 1000,
        }}
        onPress={() => {
          dispatch(dispatchPreviewImage({...previewImageData, visible: false}));
        }}
        hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
        <IconFont name={'close'} size={14} color={'white'} />
      </Pressable>
    );
  };

  const onOpen = (visible = false) => {
    dispatch(dispatchPreviewImage({...previewImageData, visible: false}));
  };

  return (
    <Modal
      isVisible={previewImageData.visible}
      style={{flex: 1, margin: 0}}
      // deviceHeight={1000}
      // transparent={true}
      onBackdropPress={() => onOpen(false)}
      // onSwipeComplete={() => onOpen(false)}
      useNativeDriver
      propagateSwipe
      backdropColor="black"
      backdropOpacity={1}
      hideModalContentWhileAnimating={true}
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={300}
      animationOutTiming={500}
      avoidKeyboard
      // hasBackdrop={false}
      // backdropTransitionInTiming={300}
      // backdropTransitionOutTiming={0}
      // animationType={'fade'}
    >
      <View style={{flex: 1, padding: 0}}>
        <ImageViewer
          onShowModal={() => {
            onOpen(true);
          }}
          onCancel={() => {
            onOpen(false);
          }}
          renderImage={props => <FastImg {...props} />}
          renderHeader={props => <CloseBtn {...props} />}
          index={previewImageData.index}
          imageUrls={previewImageData.images}
          enableSwipeDown
          useNativeDriver
          pageAnimateTime={100}
          swipeDownThreshold={120}
          enablePreload
          saveToLocalByLongPress={false}
          onClick={() => {
            onOpen(false);
          }}
        />
      </View>
    </Modal>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 300,
    width: '100%',
  },
});

// const images = [
//   {
//     // Simplest usage.
//     url: 'http://file.meirixinxue.com/assets/2020/15bf8a6a-0429-4122-8107-0d0d3b724d61.jpeg',
//
//     // width: number
//     // height: number
//     // Optional, if you know the image size, you can set the optimization performance
//
//     // You can pass props to <Image />.
//     props: {
//       // headers: ...
//     },
//   },
//   {
//     url: 'http://file.meirixinxue.com/assets/2020/852febda-3dcd-46ee-ab8e-a6cc1322b7c5.jpg',
//     props: {
//       // Or you can set source directory.
//       // source: require('../background.png')
//     },
//   },
// ];

// props => images, visible, handleOpen(), handleClose(),
//
// images = [{url: ''}, {url: 'https://zhihu.com'}]
