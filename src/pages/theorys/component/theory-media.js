import React from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import VideoPlayerContent from '@/components/react-native-video-player';
import Video from 'react-native-video';
import {dispatchPreviewImage} from '@/redux/actions';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';
import TheoryMediaSheet from './theory-media-sheet';
import {deleteAssets} from '@/api/asset_api';

const {width: screenWidth} = Dimensions.get('window');
const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};
const deleteImage = require('@/assets/images/delete.png');

const RenderVideo = props => {
  const dispatch = useDispatch();
  const {media, updateTheory, type} = props;
  const width = type === 'content' ? screenWidth : screenWidth - 30;
  const height = (media.height * width) / media.width;

  const onDelete = () => {
    updateTheory({media: null});
  };

  console.log(props);

  return (
    <View style={styles.wrapper}>
      {/* 封面图没有 */}
      {/* <Video style={{width: screenWidth, height}} source={{uri: media.uri}} paused={true} /> */}
      <VideoPlayerContent
        video={{uri: media.uri}}
        videoWidth={width}
        videoHeight={height}
        poster={`${media.uri}?vframe/jpg/offset/0/rotate/auto`}
        loop
        // autoplay
        pauseOnPress
        hideControlsOnStart
        muted={false}
        resizeMode={'cover'}
        posterResizeMode={'contain'}
      />
      <View style={styles.opacity} />
      <View style={styles.uploadWrap}>
        <Text style={styles.uploadText}>上传中 67%</Text>
      </View>
      <Pressable onPress={onDelete} style={styles.deleteWrap}>
        <FastImg source={deleteImage} style={styles.delete} hitSlop={hitSlop} />
      </Pressable>
    </View>
  );
};

const RenderImage = props => {
  const dispatch = useDispatch();
  const {media, type} = props;
  const width = type === 'content' ? screenWidth : screenWidth - 30;
  const height = (media.height * width) / media.width;

  const onPreview = () => {
    const data = {index: 0, visible: true, images: [{url: media.url}]};
    dispatch(dispatchPreviewImage(data));
  };

  const onDelete = async () => {
    await deleteAssets(media.id);
    props.loadData();
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={onPreview}>
        <FastImg source={{uri: media.url}} style={{width, height}} />
      </Pressable>
      <Pressable onPress={onDelete} style={styles.deleteWrap}>
        <FastImg source={deleteImage} style={styles.delete} hitSlop={hitSlop} />
      </Pressable>
    </View>
  );
};

const RenderMedia = props => {
  const {media} = props;

  return media.category === 'image' ? (
    <RenderImage {...props} />
  ) : media.category === 'video' ? (
    <RenderVideo {...props} />
  ) : null;
};

const center = {position: 'absolute', top: 0, right: 0, bottom: 0, left: 0};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opacity: {
    ...center,
    backgroundColor: '#000',
    opacity: 0.2,
  },
  uploadWrap: {
    ...center,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: '#fff',
  },
  deleteWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  delete: {
    width: RFValue(18),
    height: RFValue(18),
  },
});

export default RenderMedia;
