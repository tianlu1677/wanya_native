import React, {useState, useRef, useCallback} from 'react';
import {View, Text, StatusBar, StyleSheet, Dimensions, Pressable} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {SAFE_TOP} from '@/utils/navbar';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import {PublishAccount, PublishRelated} from '@/components/Item/single-detail-item';
import VideoPlayerContent from '@/components/react-native-video-player';

const {width: screenWidth} = Dimensions.get('window');

const RenderLongVideo = props => {
  const videoRef = useRef(null);
  const [check, setCkeck] = useState(false);
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
      <StatusBar barStyle={'light-content'} />
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
      <View style={styles.introWrap}>
        <View style={styles.titleInfo}>
          <Text style={styles.title}>{detail.title}</Text>
          <Pressable
            hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
            onPress={() => setCkeck(!check)}>
            <IconFont
              name={check ? 'upper' : 'down'}
              size={11}
              color={'#000'}
              style={styles.titleIcon}
            />
          </Pressable>
        </View>
        {check && <Text style={styles.intro}>{detail.plain_content}</Text>}
      </View>
      <PublishRelated
        data={detail}
        type="topic"
        space={props.detail.space}
        location={props.detail.location}
      />
    </>
  );
};

const styles = StyleSheet.create({
  introWrap: {
    paddingHorizontal: 15,
    marginTop: RFValue(14),
  },
  titleInfo: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: RFValue(25),
    textAlign: 'justify',
    marginRight: 'auto',
    flex: 1,
  },
  titleIcon: {
    marginTop: RFValue(8),
    marginLeft: RFValue(14),
  },
  intro: {
    color: '#BDBDBD',
    lineHeight: RFValue(16),
    marginTop: RFValue(15),
    textAlign: 'justify',
    fontSize: 12,
    fontWeight: '300',
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
