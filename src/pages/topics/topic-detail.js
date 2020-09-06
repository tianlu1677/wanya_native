import React, {useEffect, useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import CommentList from '@/components/List/comment-list';
import {PublishAccount, PublishRelated, ActionComment} from '@/components/Item/single-detail-item';
import {getTopic, getTopicCommentList, createComment} from '@/api/topic_api';
import {BaseTopicContent} from '@/components/Item/base-topic';

const TopicDetail = ({navigation, route}) => {
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
    return <FastImg source={{uri: detail.medias[0]}} style={{width: '100%', height: 300}} />;
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
