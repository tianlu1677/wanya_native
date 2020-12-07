import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import * as action from '@/redux/constants';
import Toast from '@/components/Toast';
import {ActionComment} from '@/components/Item/single-detail-item';
import {createComment} from '@/api/comment_api';
import {dispatchTopicDetail} from '@/redux/actions';
import {NAVIGATION_BAR_HEIGHT, STATUS_BAR_HEIGHT} from '@/utils/navbar';
import {getTopic} from '@/api/topic_api';

const TopicLinkDetail = () => {
  const dispatch = useDispatch();
  const currentTopic = useSelector(state => state.topic.topicDetail);
  const [detail, setDetail] = useState(currentTopic);
  const [visible, setVisible] = useState(false);

  const loadData = async () => {
    const res = await getTopic(detail.id);
    dispatch(dispatchTopicDetail(res.data.topic));
  };

  const publishComment = async data => {
    setVisible(false);
    Toast.showLoading('发送中');
    await createComment(data);
    dispatch({type: action.SAVE_COMMENT_TOPIC, value: {}});
    Toast.hide();
    Toast.show('评论成功啦');
    loadData();
  };

  useEffect(() => {
    setDetail(currentTopic);
  }, [currentTopic]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}
      keyboardVerticalOffset={NAVIGATION_BAR_HEIGHT + STATUS_BAR_HEIGHT}>
      <WebView
        originWhitelist={['*']}
        source={{uri: detail.topic_link.raw_link}}
        startInLoadingState={false}
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
  );
};

export default TopicLinkDetail;
