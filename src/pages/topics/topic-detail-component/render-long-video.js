import React, {useRef, useCallback} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {SAFE_TOP} from '@/utils/navbar';
import {PublishAccount, PublishRelated} from '@/components/Item/single-detail-item';
import {PlainContent} from '@/components/Item/single-list-item';
import VideoPlayerContent from '@/components/react-native-video-player';

const {width: screenWidth} = Dimensions.get('window');

const RenderLongVideo = props => {
  const videoRef = useRef(null);
  const currentAccount = useSelector(state => state.account.currentAccount);
  const {detail} = props;
  const {width, height} = detail.media_video;
  const videoHeight = height ? height * (screenWidth / width) : screenWidth;

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
        <View style={{height: SAFE_TOP, backgroundColor: 'black'}} />
        {detail.excellent && <Text style={styles.excellentLabel}>精选</Text>}
        <VideoPlayerContent
          ref={videoRef}
          customStyles={{position: 'absolute', zIndex: 1, bottom: videoHeight}}
          video={{uri: detail.video_content_m3u8}}
          videoWidth={screenWidth}
          videoHeight={videoHeight}
          poster={`${detail.video_content_m3u8}?vframe/jpg/offset/0/rotate/auto`}
          posterResizeMode={'contain'}
          hideControlsOnStart
          pauseOnPress
          muted={false}
          resizeMode={'cover'}
          autoplay={true}
          loop
        />
      </View>
      <PublishAccount data={detail} showFollow={currentAccount.id !== detail.account_id} />
      {detail.plain_content ? (
        <View style={styles.content}>
          <PlainContent data={detail} style={styles.multiLineText} numberOfLines={0} />
        </View>
      ) : null}
      <PublishRelated data={detail} />
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
    top: SAFE_TOP,
    zIndex: 1,
    marginTop: 9,
  },
});

export default RenderLongVideo;
