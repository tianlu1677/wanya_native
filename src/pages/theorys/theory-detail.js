import React, {useEffect, useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';
import {STATUS_BAR_HEIGHT, IsIos} from '@/utils/navbar';
import Loading from '@/components/Loading';
import Toast from '@/components/Toast';
import {SAFE_TOP} from '@/utils/navbar';
import ActionSheet from '@/components/ActionSheet';
import {GoBack} from '@/components/NodeComponents';
import CommentList from '@/components/List/comment-list';
import {ActionComment} from '@/components/Item/single-detail-item';
import {deleteTopic, createTopicAction} from '@/api/topic_api';
import {
  getTopicCommentList,
  getTheoryCommentList,
  createComment,
  deleteComment,
} from '@/api/comment_api';
import TheoryMedia from './component/theory-media.js';
import {PublishAccount} from '@/components/Item/single-detail-item';
import {getTheoriy} from '@/api/theory_api';

import {styles} from './theory-preview';

const TheoryDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const theoryId = route.params.theoryId;

  const {
    account: {currentAccount},
    theory: {theoryDetail},
  } = useSelector(state => state);

  console.log('theoryDetail', theoryDetail);

  const [detail, setDetail] = useState();
  const [visible, setVisible] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionItems, setActionItems] = useState([]);

  const loadData = async () => {
    const res = await getTheoriy(theoryId);
    if (res.data.status === 404) {
      Toast.show('该玩法已删除');
      navigation.goBack();
    } else {
      // createTopicAction({id: theoryId, type: 'view'});
      dispatch({type: action.THEORY_DETAIL, value: res.data.theory});
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
      // dispatch(dispatchTopicDetail(null));
      // dispatch({type: action.SAVE_COMMENT_TOPIC, value: {}});
    };
  }, []);

  useEffect(() => {
    setDetail(theoryDetail);
  }, [theoryDetail]);

  return detail ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={IsIos ? 0 : STATUS_BAR_HEIGHT}
      style={ptyles.wrapper}>
      <GoBack color={'white'} report={{report_type: 'Topic', report_id: detail.id}} />
      <CommentList
        type="Theory"
        detail={detail}
        enableLoadMore={false}
        changeVisible={value => setVisible(value)}
        deleteComment={deleteTopicComment}
        request={{api: getTheoryCommentList, params: {id: detail.id}}}
        ListHeaderComponent={
          <>
            <View style={{height: SAFE_TOP, backgroundColor: 'black'}} />
            <TheoryMedia media={detail.media} type="theory_media" isShowDetele={false} />
            <Text style={styles.title}>{detail.title}</Text>
            <PublishAccount data={detail} showFollow={false} />
            <View style={styles.content}>
              <Text style={styles.intro}>{detail.plain_content}</Text>
              <Text style={styles.introTitle}>顽法步骤</Text>
              {(detail.theory_bodies || []).map((item, index) => (
                <View key={index}>
                  <Text style={styles.stepTitle}>
                    步骤{item.position}/{detail.theory_bodies.length} {item.title}
                  </Text>
                  <View style={styles.stepMedia}>
                    <TheoryMedia media={item.media} type="theory_body_media" isShowDetele={false} />
                  </View>
                  <Text style={styles.stepIntro}>{item.desc}</Text>
                </View>
              ))}
              <Text style={styles.introTitle}>小贴士</Text>
              <Text style={styles.tips}>{detail.tip}</Text>
            </View>

            <View style={{backgroundColor: '#FAFAFA', height: 9}} />
            <Text style={ptyles.commentTitle}>全部评论</Text>
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

const ptyles = StyleSheet.create({
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
