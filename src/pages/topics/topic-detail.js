import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';
import {dispatchPreviewImage} from '@/redux/actions';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';
import CommentList from '@/components/List/comment-list';
import {BaseTopicContent} from '@/components/Item/base-topic';
import {PublishAccount, PublishRelated, ActionComment} from '@/components/Item/single-detail-item';
import {getTopic} from '@/api/topic_api';
import {getTopicCommentList, createComment, deleteComment} from '@/api/comment_api';
import {GoBack} from '@/components/NodeComponents';

const TopicDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
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
      <Swiper style={{height: 300}} showsPagination={detail.medias.length > 0}>
        {medias.map((media, index) => (
          <TouchableOpacity onPress={() => onPreview(index)}>
            <FastImg key={media} source={{uri: media}} style={{width: '100%', height: 300}} />
          </TouchableOpacity>
        ))}
      </Swiper>
    );
  };

  const renderVideo = () => {
    return (
      <Video
        style={{height: 300}}
        source={{uri: detail.video_content_m3u8}}
        posterResizeMode={'center'}
        controls
        reportBandwidth
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
        deleteTopicComment={deleteTopicComment}
        request={{api: getTopicCommentList, params: {id: detail.id}}}
        ListHeaderComponent={
          <>
            <GoBack />
            {detail.content_style === 'img' && renderImg()}
            {detail.content_style === 'video' && renderVideo()}
            <View style={{backgroundColor: '#fff'}}>
              <PublishAccount data={detail} />
              <View style={{paddingLeft: 16, paddingRight: 16, marginBottom: 16, marginTop: 16}}>
                <BaseTopicContent data={detail} />
              </View>
              <PublishRelated data={detail} />
            </View>
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
  wrapper: {},
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
});

export default TopicDetail;
