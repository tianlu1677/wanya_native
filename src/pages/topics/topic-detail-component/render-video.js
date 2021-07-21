import React, {useRef, useCallback} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {SAFE_TOP} from '@/utils/navbar';
import VideoPlayerContent from '@/components/react-native-video-player';
import {PlainContent} from '@/components/Item/single-list-item';
import {
  PublishAccount,
  PublishRelated,
  RelatedComponent,
} from '@/components/Item/single-detail-item';
import {scaleDetailVideo} from '@/utils/scale';

const RenderVideo = props => {
  const videoRef = useRef(null);
  const currentAccount = useSelector(state => state.account.currentAccount);
  const {detail} = props;
  const {width, height} = scaleDetailVideo(detail.media_video.width, detail.media_video.height);

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
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} translucent={false} />
      <View style={{height: SAFE_TOP, backgroundColor: 'black'}} />
      <View style={{position: 'relative'}}>
        {detail.excellent && <Text style={styles.excellentLabel}>精选</Text>}
        <VideoPlayerContent
          ref={videoRef}
          video={{uri: detail.video_content_m3u8}}
          videoWidth={width}
          videoHeight={height}
          poster={`${detail.video_content_m3u8}?vframe/jpg/offset/0/rotate/auto`}
          posterResizeMode="cover"
          hideControlsOnStart
          pauseOnPress
          muted={false}
          resizeMode="cover"
          autoplay={true}
          loop
        />
      </View>
      <PublishAccount data={detail} showFollow={currentAccount.id !== detail.account_id} />
      <RelatedComponent data={detail} />
      {detail.plain_content ? (
        <View style={styles.content}>
          <PlainContent data={detail} style={styles.multiLineText} numberOfLines={0} />
        </View>
      ) : null}
      <PublishRelated data={detail} type="topic" space={detail.space} location={detail.location} />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 15,
    paddingRight: 24,
    paddingBottom: 10,
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
