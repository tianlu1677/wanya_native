import React, {useRef} from 'react';
import {Pressable, StyleSheet, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import IconFont from '@/iconfont';
import VideoPlayerContent from '@/components/react-native-video-player';
const {width} = Dimensions.get('window');

const VideoModal = props => {
  const videoRef = useRef(null);
  const {visible, message, onCancel} = props;

  return (
    <Modal
      isVisible={visible}
      transparent={true}
      onRequestClose={onCancel}
      onBackdropPress={onCancel}
      statusBarTranslucent
      onSwipeComplete={onCancel}
      useNativeDriver
      propagateSwipe
      backdropOpacity={1}
      hideModalContentWhileAnimating={true}
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={300}
      animationOutTiming={500}
      avoidKeyboard
      style={styles.wrapper}>
      <Pressable style={styles.content} onPress={onCancel}>
        <IconFont name={'close'} size={15} color={'white'} style={styles.videoIcon} />
        <VideoPlayerContent
          ref={videoRef}
          video={{uri: message.uri}}
          videoWidth={width}
          videoHeight={(message.height * width) / message.width}
          poster={message.poster}
          posterResizeMode={'contain'}
          hideControlsOnStart
          pauseOnPress
          muted={false}
          resizeMode={'cover'}
          autoplay={true}
          loop
        />
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  videoIcon: {
    position: 'absolute',
    top: 50,
    left: 30,
    zIndex: 2,
  },
});

export default VideoModal;
