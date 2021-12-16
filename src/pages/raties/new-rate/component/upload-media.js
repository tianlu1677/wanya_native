import React, {useState, useRef} from 'react';
import {View, StyleSheet, Pressable, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-picker';
import DeviceInfo from 'react-native-device-info';
import {dispatchPreviewImage} from '@/redux/actions';
import FastImg from '@/components/FastImg';
import PermissionModal, {checkPermission} from '@/utils/setting/photo-permission';
import {SCREEN_WIDTH} from '@/utils/navbar';

const addVideoImage = require('@/assets/images/add-video.png');
const addPhotoImage = require('@/assets/images/add-photo.png');
const closeImage = require('@/assets/images/close.png');
const loadingImage = require('@/assets/images/loading.gif');

const UploadMedia = props => {
  const dispatch = useDispatch();
  const videoRef = useRef('');

  const {
    imageSource,
    videoSource,
    setImageSource,
    setVideoSource,
    uploadImage,
    imagePick,
    videoPick,
    removeAllPhoto,
    removeImage,
  } = props;

  const image = imageSource.length;
  const video = videoSource.length;
  const nthThree = image % 3 === 0;

  const [permissionModal, setPermissionModal] = useState(false); // 显示权限页面

  const onImagePicker = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) {
      setPermissionModal(true);
      return;
    }
    removeAllPhoto();

    const options = {imageCount: 9 - imageSource.length, isCamera: false};
    imagePick(options, async (err, res) => {
      if (err) {
        return;
      }
      const allImage = [...imageSource, ...res];
      setImageSource([...allImage]);
      for (let [index, file] of new Map(allImage.map((item, i) => [i, item]))) {
        if (!file.id) {
          const result = await uploadImage({uploadType: 'multipart', ...file});
          allImage[index] = result.asset;
          setImageSource([...allImage]);
        }
      }
    });
  };

  const onVideoPicker = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) {
      setPermissionModal(true);
      return;
    }
    removeAllPhoto();

    const systemVersion = parseFloat(DeviceInfo.getSystemVersion());
    const isIos14 = Platform.OS === 'ios' && systemVersion >= 14;
    const videoSelectType = isIos14 ? 'syanPicker' : 'imagePicker';

    if (videoSelectType === 'syanPicker') {
      const option = {recordVideoSecond: 60, allowTakeVideo: false};
      videoPick(option, async (err, res) => {
        if (err) {
          return;
        }
        setVideoSource(res);
      });
    }

    if (videoSelectType === 'imagePicker') {
      const option = {mediaType: 'video', videoQuality: 'low'};
      ImagePicker.launchImageLibrary(option, async response => {
        if (response.didCancel) {
          return;
        }
        setVideoSource([{uri: response.origURL}]);
      });
    }
  };

  const onPreview = (index = 0) => {
    const images = imageSource.map(v => {
      return {url: v.url};
    });
    const data = {images, visible: true, index};
    dispatch(dispatchPreviewImage(data));
  };

  const deleteMedia = index => {
    removeImage(index);
    const currentImage = imageSource.filter((v, i) => i !== index);
    const currentVideo = videoSource.filter((v, i) => i !== index);
    setImageSource([...currentImage]);
    setVideoSource(currentVideo);
  };

  const handleVideoFullScreen = () => {
    videoRef.current.presentFullscreenPlayer();
  };

  return (
    <View style={styles.mediaCon}>
      <PermissionModal visible={permissionModal} cancleClick={() => setPermissionModal(false)} />

      {imageSource.map((item, index) => (
        <View style={[styles.mediaWrap, {marginRight: (index + 1) % 4 === 0 ? 0 : 10}]} key={index}>
          {item.id ? (
            <>
              <Pressable onPress={() => onPreview(index)}>
                <FastImg mode="cover" key={index} style={styles.media} source={{uri: item.url}} />
              </Pressable>
              <Pressable onPress={() => deleteMedia(index)} style={styles.mediaCloseWrap}>
                <FastImg style={styles.mediaClose} source={closeImage} />
              </Pressable>
            </>
          ) : (
            <FastImg key={index} style={styles.media} source={loadingImage} />
          )}
        </View>
      ))}

      {videoSource.map((v, index) => (
        <Pressable style={[styles.mediaWrap, styles.videoMediaWrap]} key={index}>
          <Pressable style={styles.media} onPress={handleVideoFullScreen}>
            <Video
              style={styles.media}
              ref={videoRef}
              source={{uri: v.uri}}
              posterResizeMode={'center'}
              controls={false}
              muted={false}
              reportBandwidth
              ignoreSilentSwitch="ignore"
              repeat
              onFullscreenPlayerDidDismiss={() => videoRef.current.seek(0)}
            />
          </Pressable>
          <Pressable onPress={() => deleteMedia(index)} style={styles.mediaCloseWrap}>
            <FastImg style={styles.mediaClose} source={closeImage} />
          </Pressable>
        </Pressable>
      ))}

      {video === 0 && image !== 9 && (
        <Pressable
          onPress={onImagePicker}
          style={[styles.mediaWrap, {marginRight: image > 0 && nthThree ? 0 : 10}]}>
          <FastImg style={styles.media} source={addPhotoImage} />
        </Pressable>
      )}

      {image === 0 && video === 0 && (
        <Pressable onPress={onVideoPicker}>
          <FastImg style={styles.mediaWrap} source={addVideoImage} />
        </Pressable>
      )}
    </View>
  );
};

const mediaSize = (SCREEN_WIDTH - 60 - 30) / 4; //图片尺寸

const styles = StyleSheet.create({
  mediaCon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mediaWrap: {
    position: 'relative',
    width: mediaSize,
    height: mediaSize,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  videoMediaWrap: {
    backgroundColor: '#000',
  },
  media: {
    width: mediaSize,
    height: mediaSize,
    borderRadius: 6,
  },
  mediaCloseWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingLeft: 10,
    paddingBottom: 10,
    textAlign: 'right',
  },
  mediaClose: {
    width: 15,
    height: 15,
  },
});

export default UploadMedia;
