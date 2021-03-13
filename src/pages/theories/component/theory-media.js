import React, {useRef, useState, useEffect, useCallback} from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';
import VideoPlayerContent from '@/components/react-native-video-player';
import Video from 'react-native-video';
import {dispatchPreviewImage} from '@/redux/actions';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';
import {deleteAssets} from '@/api/asset_api';
import {scaleSize} from '@/utils/scale';
import {updateTheoryVideo} from '@/redux/actions';

const {width: screenWidth} = Dimensions.get('window');
const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};
const deleteImage = require('@/assets/images/delete.png');

const RenderVideo = props => {
  const dispatch = useDispatch();
  const {videoList} = useSelector(state => state.theory);
  const {media, type, showDelete, refId} = props;
  const innerWidth = type === 'theory_media' ? screenWidth : screenWidth - 30;
  const {width, height} = scaleSize(media, innerWidth);

  const videoRef = useRef(null);
  const onDelete = async () => {
    await deleteAssets(media.id);
    props.loadData();
  };

  useFocusEffect(
    useCallback(() => {
      if (videoRef && videoRef.current) {
        // // 是否继续播放
        // if (videoRef.current.state.isControlsVisible && !videoRef.current.state.isPlaying) {
        //   // videoRef.current.resume();
        // }
      }
      return () => {
        videoRef && videoRef.current && videoRef.current.pause();
      };
    }, [])
  );
  const onStart = () => {
    dispatch(updateTheoryVideo(refId, false));
  };

  const onPlayPress = async playing => {
    // console.log('videoList', videoList, playing.toString());
    // console.log('onPlayPress', videoList[refId]);
    if (playing) {
      videoRef.current.resume();
      videoList[refId] = true;
    }
    await dispatch(updateTheoryVideo(refId, !playing));
    // console.log('videoList', videoList);
  };

  return (
    <View style={[styles.wrapper, {borderRadius: type === 'theory_media' ? 0 : 5}]}>
      {media.url ? (
        <>
          <VideoPlayerContent
            ref={videoRef}
            videoWidth={width}
            videoHeight={height}
            video={{uri: media.url}}
            thumbnail={{uri: `${media.url}?vframe/jpg/offset/0/rotate/auto`}}
            pauseOnPress
            hideControlsOnStart
            muted={false}
            paused={(refId && videoList && videoList[refId]) ? true : false}
            onStart={onStart}
            onPlayPress={onPlayPress}
            resizeMode={'cover'}
            posterResizeMode={'cover'}
          />
          {showDelete && (
            <Pressable onPress={onDelete} style={styles.deleteWrap}>
              <FastImg source={deleteImage} style={styles.delete} hitSlop={hitSlop} />
            </Pressable>
          )}
        </>
      ) : (
        <>
          {media.uri && (
            <Video
              style={{width, height}}
              source={{uri: media.uri}}
              paused={true}
              resizeMode={'cover'}
            />
          )}
          <View style={styles.opacity} />
          <View style={styles.uploadWrap}>
            <Text style={styles.uploadText}>上传中 {media.progress}%</Text>
          </View>
        </>
      )}
    </View>
  );
};
const RenderImage = props => {
  const dispatch = useDispatch();
  const {media, type, showDelete} = props;

  const innerWidth = type === 'theory_media' ? screenWidth : screenWidth - 30;
  const {width, height} = scaleSize(media, innerWidth);

  const onPreview = () => {
    const data = {index: 0, visible: true, images: [{url: media.url}]};
    dispatch(dispatchPreviewImage(data));
  };

  const onDelete = async () => {
    await deleteAssets(media.id);
    props.loadData();
  };

  return (
    <View style={[styles.wrapper, {borderRadius: type === 'theory_media' ? 0 : 5}]}>
      {media.url ? (
        <>
          <Pressable onPress={onPreview}>
            <FastImg
              source={{uri: media.url}}
              style={{width, height, borderRadius: 0}}
              mode="cover"
            />
          </Pressable>
          {showDelete && (
            <Pressable onPress={onDelete} style={styles.deleteWrap}>
              <FastImg source={deleteImage} style={styles.delete} hitSlop={hitSlop} />
            </Pressable>
          )}
        </>
      ) : (
        <>
          {media.uri && <FastImg source={{uri: media.uri}} style={{width, height}} mode="cover" />}
          <View style={styles.opacity} />
          <View style={styles.uploadWrap}>
            <Text style={styles.uploadText}>上传中 {media.progress}%</Text>
          </View>
        </>
      )}
    </View>
  );
};

const TheoryMedia = props => {
  const {media} = props;

  return media.category === 'image' ? (
    <RenderImage {...props} />
  ) : media.category === 'video' ? (
    <RenderVideo {...props} />
  ) : null;
};

TheoryMedia.propTypes = {
  showDelete: PropTypes.bool.isRequired, //是否需要删除
  loadData: PropTypes.func, //showDelete true => 更新
};

const center = {position: 'absolute', top: 0, right: 0, bottom: 0, left: 0};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    overflow: 'hidden',
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

export default TheoryMedia;
