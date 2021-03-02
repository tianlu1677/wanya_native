import React, {useEffect, useState} from 'react';
import {View, Text, KeyboardAvoidingView, Dimensions, Platform, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';
import {dispatchTopicDetail} from '@/redux/actions';
import {STATUS_BAR_HEIGHT, IsIos} from '@/utils/navbar';
import Loading from '@/components/Loading';
import Toast from '@/components/Toast';
import FastImg from '@/components/FastImg';
import {SAFE_TOP} from '@/utils/navbar';
import ActionSheet from '@/components/ActionSheet';
import {GoBack} from '@/components/NodeComponents';
import CommentList from '@/components/List/comment-list';
import {ActionComment} from '@/components/Item/single-detail-item';
import {getTopic, deleteTopic, createTopicAction} from '@/api/topic_api';
import {getTopicCommentList, createComment, deleteComment} from '@/api/comment_api';
const {width} = Dimensions.get('window');

const img =
  'http://xinxuefile.meirixinxue.com/uploads/node/backgroud_cover/2020/5bf3c320-53f1-4546-9455-cd3eb6c9f8ca.gif?imageMogr2/thumbnail/!750x485r/gravity/Center/crop/750x485';

const TheoryDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const currentTopic = useSelector(state => state.topic.topicDetail);
  const [topicId] = useState(1353);

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
      createTopicAction({id: topicId, type: 'view'});
      dispatch(dispatchTopicDetail(res.data.topic));
    }
  };

  const publishComment = async data => {
    try {
      setVisible(false);
      Toast.showLoading('发送中');
      await createComment(data);
      dispatch({type: action.SAVE_COMMENT_TOPIC, value: {}});
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
      dispatch({type: action.SAVE_COMMENT_TOPIC, value: {}});
    };
  }, []);

  useEffect(() => {
    setDetail(currentTopic);
  }, [currentTopic]);

  return detail ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={IsIos ? 0 : STATUS_BAR_HEIGHT}
      style={styles.wrapper}>
      <GoBack color={'white'} report={{report_type: 'Topic', report_id: detail.id}} />
      <CommentList
        type="Topic"
        detail={detail}
        enableLoadMore={false}
        changeVisible={value => setVisible(value)}
        deleteComment={deleteTopicComment}
        request={{api: getTopicCommentList, params: {id: detail.id}}}
        ListHeaderComponent={
          <>
            <View style={{height: SAFE_TOP, backgroundColor: 'black'}} />
            <FastImg source={{uri: img}} style={{width, height: 200}} />
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
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
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

export default TheoryDetail;
