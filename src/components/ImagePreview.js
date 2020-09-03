import React, {Component} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {dispatchPreviewImage} from '@/redux/actions';

const ImagePreview = () => {
  const dispatch = useDispatch();
  const previewImageData = useSelector(state => state.home.previewImageData);

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
        index={previewImageData.index}
        imageUrls={previewImageData.images}
        enableSwipeDown
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
