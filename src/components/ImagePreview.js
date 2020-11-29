import React, {Component, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import FastImg from '@/components/FastImg';
import ImageViewer from 'react-native-image-zoom-viewer';
import {dispatchPreviewImage} from '@/redux/actions';
import IconFont from '@/iconfont';

const ImagePreview = () => {
  const dispatch = useDispatch();
  const previewImageData = useSelector(state => state.home.previewImageData);

  const HeaderContent = ({currentShowIndex}) => {
    let allSizeCount = previewImageData.images.length;
    return (
      <View style={{position: 'absolute', zIndex: -1, width: '100%', top: 50}}>
        <Pressable
          style={styles.pressableTop}
          onPress={() => {
            dispatch(dispatchPreviewImage({...previewImageData, visible: false}));
          }}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          <View>
            <IconFont name={'close'} size={15} color={'white'} />
          </View>
          <View style={{flex: 1}}>
            {allSizeCount > 0 && (
              <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>
                {currentShowIndex + 1}/{allSizeCount}
              </Text>
            )}
          </View>
        </Pressable>
      </View>
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
          renderHeader={(currentShowIndex, allSize) => <HeaderContent currentShowIndex={currentShowIndex} allSize={allSize} />}
          index={previewImageData.index}
          imageUrls={previewImageData.images}
          enableSwipeDown
          renderIndicator={(currentIndex, allSize) => {
            return <View />;
          }}
          useNativeDriver={true}
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
  pressableTop: {
    paddingLeft: 17,
    paddingRight: 24,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  }
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
