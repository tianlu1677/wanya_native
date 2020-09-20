import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import VideoPlayer from 'react-native-video-controls';
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
import {NAV_BAR_HEIGHT} from '@/utils/navbar';

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
    let {medias, media_images} = detail;
    let maxHeight = 375;
    let maxWidth = 375;

    (media_images || []).map(img => {
      let scale = maxWidth / img.width;
      let imgHeight = img.height * scale;
      if (imgHeight > maxHeight) {
        maxHeight = imgHeight;
      }
    });

    if (maxHeight > 500) {
      maxHeight = 500;
    }

    media_images = (media_images || []).map(img => {
      let scale = maxWidth / img.width;
      let imgHeight = img.height * scale;

      if (imgHeight < maxHeight) {
        return {...img, paddingTop: (maxHeight - imgHeight) / 2};
      } else {
        return {...img, paddingTop: 0};
      }
    });

    const onPreview = index => {
      const data = {
        images: detail.medias.map(v => {
          return {url: v};
        }),
        visible: true,
        index,
      };
      dispatch(dispatchPreviewImage(data));
    };

    return (
      <View>
        <GoBack />
        <Swiper style={{height: 300}} showsPagination={detail.medias.length > 0}>
          {medias.map((media, index) => (
            <TouchableOpacity onPress={() => onPreview(index)} key={media}>
              <FastImg key={media} source={{uri: media}} style={{width: '100%', height: 300}} />
            </TouchableOpacity>
          ))}
        </Swiper>
      </View>
    );
  };

  const renderVideo = () => {
    const {width, height} = detail.media_video;
    const videoWidth = 375;
    let videoHeight = height ? height * (videoWidth / width) : videoWidth;
    if (videoHeight > 500) {
      videoHeight = 500;
    }

    return (
      <VideoPlayer
        style={{height: videoHeight}}
        source={{uri: detail.video_content_m3u8}}
        posterResizeMode={'center'}
        navigator={navigation}
        controlTimeout={3000}
        controls={false}
        reportBandwidth
        showOnStart={false}
        tapAnywhereToPause={true}
        repeat
      />
    );
  };

  const deleteTopicComment = async id => {
    await deleteComment(id);
    loadData();
  };

  return detail ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={90}>
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
            {detail.content_style === 'img' && renderImg()}
            {detail.content_style === 'video' && renderVideo()}
            {detail.content_style === 'text' && (
              <View style={{paddingTop: NAV_BAR_HEIGHT, paddingBottom: 16}}>
                <GoBack color={'black'} />
              </View>
            )}
            <PublishAccount data={detail} showFollow={currentAccount.id !== detail.account_id} />
            <View style={{padding: 16, paddingBottom: 10}}>
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
    flex: 1,
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
    marginTop: 20,
  },
});

export default TopicDetail;
