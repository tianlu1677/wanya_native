import React from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import VideoPlayerContent from '@/components/react-native-video-player';
import Video from 'react-native-video';
import {dispatchPreviewImage} from '@/redux/actions';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';
import {deleteAssets} from '@/api/asset_api';
import {scaleSize} from '@/utils/scale';

const {width: screenWidth} = Dimensions.get('window');
const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};
const deleteImage = require('@/assets/images/delete.png');

const RenderVideo = props => {
  const {media, type, isShowDetele} = props;
  const innerWidth = type === 'theory_media' ? screenWidth : screenWidth - 30;
  const {width, height} = scaleSize(media, innerWidth);

  const onDelete = async () => {
    await deleteAssets(media.id);
    props.loadData();
  };

  return (
    <View style={styles.wrapper}>
      {media.url ? (
        <>
          <VideoPlayerContent
            videoWidth={width}
            videoHeight={height}
            video={{uri: media.url}}
            thumbnail={{uri: `${media.url}?vframe/jpg/offset/0/rotate/auto`}}
            pauseOnPress
            hideControlsOnStart
            muted={false}
            resizeMode={'cover'}
            posterResizeMode={'cover'}
          />
          {isShowDetele && (
            <Pressable onPress={onDelete} style={styles.deleteWrap}>
              <FastImg source={deleteImage} style={styles.delete} hitSlop={hitSlop} />
            </Pressable>
          )}
        </>
      ) : (
        <>
          <Video style={{width: screenWidth, height}} source={{uri: media.uri}} paused={true} />
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
  const {media, type, isShowDetele} = props;

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
    <View style={styles.wrapper}>
      <Pressable onPress={onPreview}>
        <FastImg source={{uri: media.url}} style={{width, height}} mode="cover" />
      </Pressable>
      {isShowDetele && (
        <Pressable onPress={onDelete} style={styles.deleteWrap}>
          <FastImg source={deleteImage} style={styles.delete} hitSlop={hitSlop} />
        </Pressable>
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
  isShowDetele: PropTypes.bool.isRequired, //是否需要删除
  loadData: PropTypes.func, //isShowDetele true => 更新
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

export default TheoryMedia;
