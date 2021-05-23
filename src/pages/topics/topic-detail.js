import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {View, Text, Platform, StyleSheet, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';
import {dispatchTopicDetail} from '@/redux/actions';
import {STATUS_BAR_HEIGHT, IsIos} from '@/utils/navbar';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import {RFValue} from '@/utils/response-fontsize';
import ActionSheet from '@/components/ActionSheet';
import TopHeaderView from '@/components/TopHeadView';
import {GoBack} from '@/components/NodeComponents';
import CommentList from '@/components/List/comment-list';
import {ActionComment} from '@/components/Item/single-detail-item';
import {getTopic, deleteTopic} from '@/api/topic_api';
import {createComment, deleteComment, getCommentList} from '@/api/comment_api';
import RenderImage from './topic-detail-component/render-image';
import RenderLongVideo from './topic-detail-component/render-long-video';
import RenderVideo from './topic-detail-component/render-video';
import RenderLink from './topic-detail-component/render-link';
import RenderText from './topic-detail-component/render-text';
import {createAction} from '@/api/action_api';

const TopicDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const currentTopic = useSelector(state => state.topic.topicDetail);
  const [topicId] = useState(route.params.topicId);
  const [detail, setDetail] = useState();
  const [visible, setVisible] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionItems, setActionItems] = useState([]);

  const loadData = async () => {
    const res = await getTopic(topicId);
    if (res.data.status === 404) {
      Toast.show('该帖子已删除');
      navigation.goBack();
    } else {
      createAction({target_id: topicId, type: 'view', target_type: 'Topic'});
      dispatch(dispatchTopicDetail(res.data.topic));
    }
  };

  const publishComment = async data => {
    try {
      setVisible(false);
      Toast.showLoading('发送中');
      await createComment(data);
      dispatch({type: action.SAVE_COMMENT_CONTENT, value: {}});
      Toast.hide();
      Toast.show('评论成功啦');
      loadData();
    } catch (e) {
      Toast.show('评论出错了');
      Toast.hide();
    }
  };

  const deleteTopicComment = async id => {
    await deleteComment(id);
    loadData();
  };

  const onReportClick = () => {
    const isCurrentTopic = detail.account_id === currentAccount.id;
    const actions = [
      {
        id: 1,
        label: isCurrentTopic ? '删除' : '投诉',
        onPress: async () => {
          if (isCurrentTopic) {
            await deleteTopic(detail.id);
            Toast.show('已删除');
            navigation.goBack();
          } else {
            navigation.push('Report', {report_type: 'Account', report_type_id: detail.id});
          }
        },
      },
    ];
    setActionItems(actions);
    setShowActionSheet(true);
  };

  useEffect(() => {
    loadData();
    return () => {
      dispatch(dispatchTopicDetail(null));
      dispatch({type: action.SAVE_COMMENT_CONTENT, value: {}});
    };
  }, []);

  useEffect(() => {
    setDetail(currentTopic);
  }, [currentTopic]);

  // console.log('detail', detail);

  return detail ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}
      keyboardVerticalOffset={IsIos ? 0 : STATUS_BAR_HEIGHT}>
      {['video', 'img'].includes(detail.content_style) ? (
        <GoBack color={'white'} report={true} onReportClick={onReportClick} />
      ) : null}
      {['link', 'text'].includes(detail.content_style) ? (
        <>
          <TopHeaderView
            Title={'帖子详情'}
            leftButtonColor={'black'}
            excellent={detail.excellent}
            statusBar={{
              barStyle: 'dark-content',
              hidden: false,
            }}
            RightButton={() => (
              <Pressable
                onPress={onReportClick}
                hitSlop={{left: 30, right: 30, top: 30, bottom: 30}}
                style={{marginRight: 16}}>
                <IconFont name="gengduo" color="#000" size={20} />
              </Pressable>
            )}
          />
        </>
      ) : null}
      <CommentList
        type="Topic"
        detail={detail}
        enableLoadMore={false}
        changeVisible={value => setVisible(value)}
        deleteComment={deleteTopicComment}
        request={{api: getCommentList, params: {item_id: detail.id, item_type: 'Topic'}}}
        ListHeaderComponent={
          <>
            <View style={{paddingBottom: RFValue(20)}}>
              {detail.content_style === 'video' && detail.is_long_video && (
                <RenderLongVideo
                  detail={{...detail, node: detail.node ? {...detail.node, topics_count: 0} : null}}
                />
              )}
              {detail.content_style === 'video' && !detail.is_long_video && (
                <RenderVideo detail={detail} />
              )}
              {detail.content_style === 'img' && <RenderImage detail={detail} />}
              {detail.content_style === 'link' && <RenderLink detail={detail} />}
              {detail.content_style === 'text' && <RenderText detail={detail} />}
            </View>
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
        changeVisible={value => setVisible(value)}
      />
      <ActionSheet
        actionItems={actionItems}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
      />
    </KeyboardAvoidingView>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  commentTitle: {
    fontSize: 15,
    fontWeight: '500',
    paddingLeft: 16,
    paddingTop: 20,
    marginTop: 5,
    backgroundColor: '#fff',
    paddingBottom: 5,
  },
});

export default TopicDetail;
