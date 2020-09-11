import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import CommentList from '@/components/List/comment-list';
import {PublishAccount, PublishRelated, ActionComment} from '@/components/Item/single-detail-item';
import {getTopic, getTopicCommentList, createComment} from '@/api/topic_api';
import {BaseTopicContent} from '@/components/Item/base-topic';
import {dispatchPreviewImage} from '@/redux/actions';

const TopicDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [topicId] = useState(route.params.topicId);
  const [detail, setDetail] = useState(null);

  const laodData = async () => {
    const res = await getTopic(topicId);
    setDetail(res.data.topic);
  };

  const publishComment = async data => {
    const res = await createComment(data);
    laodData();
  };

  useEffect(() => {
    laodData();
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
      <Swiper style={{height: maxHeight}} showsPagination={detail.medias.length > 0}>
        {medias.map((media, index) => (
          <TouchableWithoutFeedback onPress={() => onPreview(index)}>
            <FastImg key={media} source={{uri: media}} style={{width: '100%', height: 300}} />;
          </TouchableWithoutFeedback>
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

  return detail ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={90}>
      <CommentList
        style={styles.wrapper}
        detail={detail}
        enableLoadMore={false}
        request={{api: getTopicCommentList, params: {id: detail.id}}}
        ListHeaderComponent={
          <>
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
        detail={detail}
        publishComment={publishComment}
        type="Topic"
        setDetail={data => setDetail(data)}
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
