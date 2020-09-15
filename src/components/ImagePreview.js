import React, {Component} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Modal, Text, Pressable, Image, TouchableWithoutFeedback} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {dispatchPreviewImage} from '@/redux/actions';
import IconFont from "@/iconfont"
import Icon from 'react-native-vector-icons/Ionicons';

const ImagePreview = () => {
  const dispatch = useDispatch();
  const previewImageData = useSelector(state => state.home.previewImageData);

  const CloseBtn = () => {
    return (
      <Pressable
        style={{
          position: 'absolute',
          paddingTop: 45,
          paddingLeft: 17,
          paddingRight: 24,
          paddingBottom: 24,
        }}

        onPress={() => {
          dispatch(dispatchPreviewImage({...previewImageData, visible: false}));
        }}
      >
        <IconFont name={"cancel"} size={12} color={"white"}/>
      </Pressable>
    );
  };

  return (
    <Modal visible={previewImageData.visible} transparent={true}>
      <ImageViewer
        onShowModal={() => {
          dispatch(dispatchPreviewImage({...previewImageData, visible: true}));
        }}
        onCancel={() => {
          dispatch(dispatchPreviewImage({...previewImageData, visible: false}));
        }}
        // renderImage={props => <Image {...props} />}
        // renderHeader={props => <CloseBtn {...props} />}
        index={previewImageData.index}
        imageUrls={previewImageData.images}
        enableSwipeDown
        useNativeDriver
        pageAnimateTime={200}
        swipeDownThreshold={100}
        onClick={() => {
          dispatch(dispatchPreviewImage({...previewImageData, visible: false}));
        }}
      />
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
