import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, ScrollView, Dimensions, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import * as action from '@/redux/constants';
import Toast from '@/components/Toast';
import Loading from '@/components/Loading';
import {ActionComment} from '@/components/Item/single-detail-item';
import {createComment} from '@/api/comment_api';
import {dispatchTopicDetail} from '@/redux/actions';
import {getTopic} from '@/api/topic_api';
import {dispatchShareItem} from '@/redux/actions';
import TopHeaderView from "@/components/TopHeadView"
import {IsIos, STATUS_BAR_HEIGHT} from "@/utils/navbar"
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

  const onShare = () => {
    let shareOptions = {
      userName: 'gh_c2b50fe8e928',
      path: '',
      scene: 0,
      title: currentTopic.topic_link?.title || currentTopic.topic_link.raw_link,
      thumbImageUrl: currentTopic.topic_link.cover_url,
      webpageUrl: currentTopic.topic_link.raw_link,
      visible: true,
      type: 'link'
    };
    dispatch(dispatchShareItem(shareOptions));
  }

  return detail ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}
      keyboardVerticalOffset={IsIos ? 0 : STATUS_BAR_HEIGHT}
    >
      <TopHeaderView
        Title={detail.topic_link.title}
        leftButtonColor={'black'}
        excellent={detail.excellent}
        statusBar={{
          barStyle: 'dark-content',
          hidden: false,
        }}
      />
      {/*https://github.com/react-native-webview/react-native-webview/issues/22*/}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <WebView
          originWhitelist={['*']}
          source={{uri: detail.topic_link.raw_link}}
          startInLoadingState={true}
          scalesPageToFit={true}
          scrollEnabled
          style={{ height: Dimensions.get('window').height-70, width: Dimensions.get('window').width, flex: 1}}
          autoManageStatusBarEnabled={false}
        />
      </ScrollView>

      <ActionComment
        visible={visible}
        detail={detail}
        publishComment={publishComment}
        type="Topic"
        changeVisible={value => setVisible(value)}
        onShare={() => {
          onShare()
        }}
      />
    </KeyboardAvoidingView>
  ) : (
    <Loading />
  );
};

export default TopicLinkDetail;
