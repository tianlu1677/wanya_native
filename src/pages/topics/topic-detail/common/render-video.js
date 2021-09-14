import React, {useRef, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import VideoPlayerContent from '@/components/react-native-video-player';
import {PlainContent} from '@/components/Item/single-list-item';
import {PublishRelated, RelatedComponent} from '@/components/Item/single-detail-item';
import {scaleDetailVideo} from '@/utils/scale';

const RenderVideo = props => {
  const videoRef = useRef(null);
  const {detail} = props;
  const {media_video, excellent, video_content_m3u8, plain_content, space, location} = detail;
  const {width, height} = scaleDetailVideo(media_video.width, media_video.height);

  useFocusEffect(
    useCallback(() => {
      if (videoRef && videoRef.current) {
        // 是否继续播放
        if (videoRef.current.state.isControlsVisible && !videoRef.current.state.isPlaying) {
          videoRef.current.resume();
        }
      }
      return () => {
        videoRef && videoRef.current && videoRef.current.pause();
      };
    }, [])
  );

  return (
    <>
      <View style={{position: 'relative'}}>
        {excellent && <Text style={styles.excellentLabel}>精选</Text>}
        <VideoPlayerContent
          ref={videoRef}
          video={{uri: video_content_m3u8}}
          videoWidth={width}
          videoHeight={height}
          poster={`${video_content_m3u8}?vframe/jpg/offset/0/rotate/auto`}
          posterResizeMode="cover"
          hideControlsOnStart
          pauseOnPress
          muted={false}
          resizeMode="cover"
          autoplay={true}
          loop
        />
      </View>
      <RelatedComponent data={detail} />
      {plain_content ? (
        <View style={styles.content}>
          <PlainContent data={detail} style={styles.multiLineText} numberOfLines={0} />
        </View>
      ) : null}
      <PublishRelated data={detail} type="topic" space={space} location={location} />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 14,
    paddingBottom: 0,
    marginTop: 15,
  },
  multiLineText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#000',
  },
  excellentLabel: {
    width: 30,
    height: 16,
    lineHeight: 16,
    textAlign: 'center',
    fontSize: 10,
    color: 'white',
    backgroundColor: '#FF2242',
    borderRadius: 2,
    overflow: 'hidden',
    position: 'absolute',
    left: 40,
    top: 0,
    zIndex: 1,
    marginTop: 9,
  },
});

export default RenderVideo;
