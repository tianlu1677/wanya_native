import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import VideoPlayerContent from '@/components/react-native-video-player';
import {useNavigation} from '@react-navigation/native';
import {dispatchPreviewImage} from '@/redux/actions';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';
import CommentList from '@/components/List/comment-list';
import {PlainContent} from '@/components/Item/single-list-item';
import {GoBack} from '@/components/NodeComponents';
import {PublishAccount, PublishRelated, ActionComment} from '@/components/Item/single-detail-item';
import {getTopic} from '@/api/topic_api';
import {getTopicCommentList, createComment, deleteComment} from '@/api/comment_api';
import {NAV_BAR_HEIGHT, BASIC_HEIGHT} from '@/utils/navbar';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const TopicDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);

  const [topicId] = useState(route.params.topicId);
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);

  const loadData = async () => {
    const res = await getTopic(topicId);
    setDetail(res.data.topic);
  };

  const publishComment = async data => {
    setVisible(false);
    Toast.showLoading('发送中');
    await createComment(data);
    Toast.hide();
    Toast.show('发送成功啦');
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderImg = () => {
    const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
    let {medias, media_images} = detail;
    let maxHeight = 100;
    (media_images || []).map(img => {
      let imgHeight = Math.floor((screenWidth / img.width) * img.height);
      if (imgHeight > maxHeight) {
        maxHeight = imgHeight;
      }
    });

    // if (maxHeight > 1000) {
    //   maxHeight = 750;
    // }

    media_images = (media_images || []).map(img => {
      let imgHeight = (screenWidth / img.width) * img.height;
      if (imgHeight < maxHeight) {
        return {...img, imgHeight: imgHeight, paddingTop: (maxHeight - imgHeight) / 2};
      } else {
        return {...img, imgHeight: imgHeight, paddingTop: 0};
      }
    });

    const onPreview = index => {
      const data = {
        images: detail.medias.map(v => {
          return {url: v.split('?')[0]};
        }),
        visible: true,
        index,
      };
      dispatch(dispatchPreviewImage(data));
    };

    return (
      <View>
        <GoBack name={navigation.canGoBack() ? 'arrow-left' : 'home-recommend'} color={'white'} />
        <Swiper
          index={0}
          loop={false}
          activeDotColor={'yellow'}
          dotColor={'white'}
          style={{height: maxHeight, backgroundColor: 'black'}}
          showsPagination={detail.media_images.length > 0}>
          {media_images.map((media, index) => (
            <Pressable
              onPress={() => onPreview(index)}
              key={media.image_url}
              style={{paddingTop: media.paddingTop, height: media.imgHeight}}>
              <FastImg
                key={media.image_url}
                source={{uri: media.image_url}}
                style={{width: screenWidth, height: media.imgHeight}}
                mode={'contain'}
              />
            </Pressable>
          ))}
        </Swiper>
      </View>
    );
  };

  const renderVideo = () => {
    const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
    const {width, height} = detail.media_video;
    const videoWidth = screenWidth;
    let videoHeight = height ? height * (screenWidth / width) : screenWidth;
    if (videoHeight > 500) {
      videoHeight = 500;
    }

    return (
      <View style={{backgroundColor: 'black'}}>
        <GoBack name={navigation.canGoBack() ? 'arrow-left' : 'home-recommend'} />
        <VideoPlayerContent
          customStyles={{height: videoHeight}}
          video={{uri: detail.video_content_m3u8}}
          videoWidth={videoWidth}
          videoHeight={videoHeight}
          hideControlsOnStart
          pauseOnPress
          autoplay
          loop
        />
      </View>
    );
  };

  const renderLink = () => {
    const goLinkDetail = () => {
      navigation.push('WebView', {
        sourceUrl: detail.topic_link.raw_link,
        title: detail.topic_link.title,
      });
    };
    return (
      <View>
        <View style={{paddingTop: NAV_BAR_HEIGHT, paddingBottom: 16}}>
          <StatusBar barStyle={'dark-content'} />
          <GoBack
            name={navigation.canGoBack() ? 'arrow-left' : 'home-recommend'}
            color={'black'}
          />
        </View>
      <Pressable style={styles.linkWrap} onPress={goLinkDetail}>
        <Text style={styles.linkTitle}>{detail.topic_link.title}</Text>
        <FastImg style={styles.linkImageCover} source={{uri: detail.topic_link.cover_url}} />
      </Pressable>
        </View>
    );
  };

  const deleteTopicComment = async id => {
    await deleteComment(id);
    loadData();
  };

  return detail ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#fff'}}>
      <CommentList
        style={styles.wrapper}
        type="Topic"
        detail={detail}
        enableLoadMore={false}
        changeVisible={value => setVisible(value)}
        deleteComment={deleteTopicComment}
        request={{api: getTopicCommentList, params: {id: detail.id}}}
        ListHeaderComponent={
          <>
            <StatusBar barStyle={'light-content'} />
            <View>
              {detail.content_style === 'img' && renderImg()}
              {detail.content_style === 'video' && renderVideo()}
              {detail.content_style === 'link' && renderLink()}
              {detail.excellent && <Text style={{...styles.excellentLabel, top: Math.max(getStatusBarHeight(), 20)}}>精选</Text>}
            </View>

            {(detail.content_style === 'text') && (
              <View style={{paddingTop: NAV_BAR_HEIGHT, paddingBottom: 16}}>
                <StatusBar barStyle={'dark-content'} />
                <GoBack
                  name={navigation.canGoBack() ? 'arrow-left' : 'home-recommend'}
                  color={'black'}
                />
              </View>
            )}
            <PublishAccount data={detail} showFollow={currentAccount.id !== detail.account_id} />
            <View style={{padding: 15, paddingRight: 24, paddingBottom: 10}}>
              <PlainContent data={detail} />
            </View>
            <PublishRelated data={detail} />
            <View style={{backgroundColor: '#FAFAFA', height: 9}} />
            <Text style={styles.commentTitle}>全部评论</Text>
          </>
        }
      />
      <ActionComment
        visible={visible}
        detail={detail}
        publishComment={publishComment}
        type="Topic"
        setDetail={data => setDetail(data)}
        changeVisible={value => setVisible(value)}
      />
    </KeyboardAvoidingView>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
  },
  title: {
    fontSize: 20,
    paddingTop: 8,
    paddingRight: 14,
    paddingLeft: 14,
    paddingBottom: 8,
    fontWeight: '500',
    lineHeight: 28,
  },
  commentTitle: {
    fontSize: 15,
    fontWeight: '500',
    paddingLeft: 16,
    paddingTop: 20,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  linkWrap: {
    marginTop: 14,
    backgroundColor: 'pink',
    marginRight: 14,
    marginLeft: 14,
    height: 167,
    position: 'relative',
  },
  linkTitle: {
    padding: 11,
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 22,
    zIndex: 2,
    position: 'absolute',
  },
  linkImageCover: {
    height: 167,
    flex: 1,
  },
  excellentLabel: {
    width: 30,
    height: 16,
    marginTop: 14,
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 16,
    backgroundColor: '#FF2242',
    borderRadius: 2,
    overflow: 'hidden',
    color: 'white',
    position: 'absolute',
    left: 35,
  },
});

export default TopicDetail;
