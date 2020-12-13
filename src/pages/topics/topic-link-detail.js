import React, {useState, useEffect, useLayoutEffect} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import * as action from '@/redux/constants';
import Toast from '@/components/Toast';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import {ActionComment} from '@/components/Item/single-detail-item';
import {createComment} from '@/api/comment_api';
import {dispatchTopicDetail} from '@/redux/actions';
import {NAVIGATION_BAR_HEIGHT, STATUS_BAR_HEIGHT} from '@/utils/navbar';
import {getTopic} from '@/api/topic_api';

const TopicLinkDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const currentTopic = useSelector(state => state.topic.topicDetail);
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);

  const loadData = async () => {
    const res = await getTopic(route.params.topicId);
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
    loadData();
  }, []);

  useEffect(() => {
    setDetail(currentTopic);
  }, [currentTopic]);

  useLayoutEffect(() => {
    if (detail) {
      navigation.setOptions({
        headerTitle: `${detail.topic_link.title.toString().substr(0, 10)}...`,
        headerShown: true,
        safeArea: false,
        headerStyle: {
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
            <IconFont
              name={navigation.canGoBack() ? 'arrow-left' : 'home-recommend'}
              color="#000"
              size={15}
            />
          </Pressable>
        ),
      });
    }
  }, [navigation, detail]);

  return detail ? (
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
        changeVisible={value => setVisible(value)}
      />
    </KeyboardAvoidingView>
  ) : (
    <Loading />
  );
};

export default TopicLinkDetail;
