import React, {useEffect, useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, StyleSheet, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';
import {IsIos, BarHeight} from '@/utils/navbar';
import Loading from '@/components/Loading';
import Toast from '@/components/Toast';
import ActionSheet from '@/components/ActionSheet';
import {TopBack} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import CommentList from '@/components/List/comment-list';
import {ActionComment} from '@/components/Item/single-detail-item';
import {PublishAccount} from '@/components/Item/single-detail-item';
import TheoryMedia from '@/pages/theories/component/theory-media';
import {getTheoriy, deleteTheory} from '@/api/theory_api';
import {getCommentList, createComment, deleteComment} from '@/api/comment_api';
import {createAction} from '@/api/action_api';

import {styles} from './theory-preview';

const TheoryDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const theoryId = route.params.theoryId;
  const {
    account: {currentAccount},
    theory: {theoryDetail},
  } = useSelector(state => state);

  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionItems, setActionItems] = useState([]);

  const loadData = async () => {
    const res = await getTheoriy(theoryId);
    if (res.data.status === 404) {
      Toast.show('该玩法已删除');
      navigation.goBack();
    } else {
      createAction({target_id: theoryId, type: 'view', target_type: 'Theory'});
      dispatch({type: action.THEORY_DETAIL, value: res.data.theory});
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
    const isCurrent = detail.account_id === currentAccount.id;
    const actions = [
      {
        id: 1,
        label: isCurrent ? '删除' : '投诉',
        onPress: async () => {
          if (isCurrent) {
            await deleteTheory(detail.id);
            Toast.show('已删除');
            navigation.goBack();
          } else {
            navigation.push('Report', {report_type: 'Theory', report_type_id: detail.id});
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
      dispatch({type: action.THEORY_DETAIL, value: null});
      dispatch({type: action.SAVE_COMMENT_CONTENT, value: {}});
    };
  }, []);

  useEffect(() => {
    setDetail(theoryDetail);
  }, [theoryDetail]);

  const filter_theory_bodies = ((detail && detail.theory_bodies) || []).filter(
    ({title, media, desc}) => title || media || desc
  );

  return detail ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={IsIos ? 0 : BarHeight}
      style={ptyles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <TopBack top={BarHeight + RFValue(12)} onReportClick={onReportClick} />
      <CommentList
        type="Theory"
        detail={detail}
        enableLoadMore={false}
        changeVisible={value => setVisible(value)}
        deleteComment={deleteTopicComment}
        request={{api: getCommentList, params: {item_id: theoryId, item_type: 'Theory'}}}
        ListHeaderComponent={
          <>
            <View style={{height: BarHeight, backgroundColor: 'black'}} />
            {detail.media && (
              <TheoryMedia
                media={detail.media}
                type="theory_media"
                showDelete={false}
                refId={'video_1'}
              />
            )}
            <Text style={styles.title}>{detail.title}</Text>
            <PublishAccount data={detail} showFollow={false} />
            <View style={styles.content}>
              <Text style={styles.intro}>{detail.plain_content}</Text>
              <Text style={styles.introTitle}>顽法步骤</Text>
              {filter_theory_bodies.map((item, index) => (
                <View key={index}>
                  {!!item.title && (
                    <View style={styles.stepTitleWrap}>
                      <Text style={styles.greenLine} />
                      <Text style={styles.stepTitle}>
                        步骤{index + 1}/{filter_theory_bodies.length}
                      </Text>
                      <Text style={[styles.stepTitle, {marginLeft: 10}]}>{item.title}</Text>
                    </View>
                  )}

                  {item.media && (
                    <View style={styles.stepMedia}>
                      <TheoryMedia
                        media={item.media}
                        type="theory_body_media"
                        showDelete={false}
                        refId={`video_${index + 2}`}
                      />
                    </View>
                  )}

                  {!!item.desc && <Text style={styles.stepIntro}>{item.desc}</Text>}
                </View>
              ))}
              {!!detail.tip && (
                <>
                  <Text style={styles.introTitle}>小贴士</Text>
                  <Text style={styles.tips}>{detail.tip}</Text>
                </>
              )}
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
        type="Theory"
        changeVisible={value => setVisible(value)}
      />

      {/* 投诉删除 */}
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
