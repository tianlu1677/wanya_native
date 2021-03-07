import React, {useEffect, useState, useLayoutEffect} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {View, Text, StyleSheet, Platform, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {dispatchArticleDetail} from '@/redux/actions';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import Loading from '@/components/Loading';
import ActionSheet from '@/components/ActionSheet';
import {Avator} from '@/components/NodeComponents';
import {IsIos, STATUS_BAR_HEIGHT, NAV_BAR_HEIGHT, SAFE_TOP} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';
import {getCommentList, createComment, deleteComment} from '@/api/comment_api';
import {getArticle} from '@/api/article_api';
import {followAccount, unfollowAccount} from '@/api/account_api';
import CommentList from '@/components/List/comment-list';
import {createAction} from '@/api/action_api';
import {PublishRelated, ActionComment} from '@/components/Item/single-detail-item';
import RichContent from './components/RichContent';

const ArticleDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const currentArticle = useSelector(state => state.article.articleDetail);
  const [articleId] = useState(route.params.articleId);
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [contentY, setContentY] = useState(0);
  const [headerShowUser, setHeaderShowUser] = useState(false);

  const publishComment = async data => {
    setVisible(false);
    Toast.showLoading('发送中');
    await createComment(data);
    dispatch({type: action.SAVE_COMMENT_CONTENT, value: {}});
    Toast.hide();
    Toast.show('评论成功啦');
    loadData();
  };

  const deleteArticleComment = async id => {
    await deleteComment(id);
    loadData();
  };

  const actionItems = [
    {
      id: 1,
      label: '投诉',
      onPress: () => {
        navigation.push('Report', {report_type: 'Account', report_type_id: detail.id});
      },
    },
  ];

  const loadData = async () => {
    const res = await getArticle(articleId);
    setDetail(res.data.article);
    createAction({target_id: articleId, type: 'view', target_type: 'Article'});
    dispatch(dispatchArticleDetail(res.data.article));
  };

  useEffect(() => {
    loadData();
    // 清空评论数据
    return () => {
      dispatch(dispatchArticleDetail(null));
      dispatch({type: action.SAVE_COMMENT_CONTENT, value: {}});
    };
  }, []);

  useEffect(() => {
    setDetail(currentArticle);
  }, [currentArticle]);

  useLayoutEffect(() => {
    const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};

    const goAccountDetail = () => {
      navigation.push('AccountDetail', {accountId: detail.account.id});
    };

    const onReportClick = () => {
      setShowActionSheet(true);
    };

    if (detail) {
      navigation.setOptions({
        headerTitle: () =>
          headerShowUser ? (
            <Pressable style={styles.headerTitle} onPress={goAccountDetail}>
              <Avator account={detail.account} size={25} />
              <Text style={styles.headerText}>{detail.account.nickname}</Text>
            </Pressable>
          ) : null,
        // headerLeft: () => (
        //   <Pressable onPress={() => navigation.goBack()} style={{marginLeft: 5}} hitSlop={hitSlop}>
        //     <IconFont name={'close'} size={14} />
        //   </Pressable>
        // ),
        headerRight: () =>
          detail.account_id === currentAccount.id ? null : (
            <Pressable onPress={onReportClick} hitSlop={hitSlop}>
              <IconFont name="gengduo" color="#000" size={20} />
            </Pressable>
          ),
      });
    }
  }, [navigation, detail, headerShowUser]);

  const getScrollY = value => {
    value > contentY ? setHeaderShowUser(true) : setHeaderShowUser(false);
  };

  return detail && currentAccount ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}
      keyboardVerticalOffset={IsIos ? NAV_BAR_HEIGHT + SAFE_TOP : STATUS_BAR_HEIGHT + 55}>
      <CommentList
        detail={detail}
        request={{api: getCommentList, params: {item_id: detail.id, item_type: 'Article'}}}
        type="Article"
        changeVisible={value => setVisible(value)}
        deleteComment={deleteArticleComment}
        getScrollY={getScrollY}
        ListHeaderComponent={
          <>
            <View style={{paddingBottom: RFValue(20)}}>
              <Text style={styles.title}>{detail.title}</Text>
              <ArticleHeader data={detail} showFollow={detail.account_id !== currentAccount.id} />
              <View onLayout={e => setContentY(e.nativeEvent.layout.y)}>
                <RichContent
                  content={detail.content}
                  baseColor={'#1F1F1F'}
                  images_info={detail.images_info}
                />
              </View>
              <PublishRelated data={detail} type="article" />
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
        type="Article"
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

const ArticleHeader = props => {
  const {data} = props;
  const navigation = useNavigation();
  const [followed, setFollowed] = useState(props.data.account.followed);

  const goAccountDetail = () => {
    navigation.push('AccountDetail', {accountId: data.account.id});
  };

  const onFollow = async () => {
    if (followed) {
      await unfollowAccount(data.account_id);
    } else {
      await followAccount(data.account_id);
    }
    setFollowed(!followed);
  };

  return (
    <View style={hstyles.headerView}>
      <Pressable style={hstyles.content} onPress={goAccountDetail}>
        <Avator account={data.account} size={25} />
        <Text style={hstyles.nameText}>{data.account.nickname}</Text>
        <Text style={hstyles.timeText}>{data.published_at_text}</Text>
      </Pressable>
      {props.showFollow && (
        <Text style={[hstyles.joinBtn, {color: followed ? '#bdbdbd' : '#000'}]} onPress={onFollow}>
          {followed ? '已关注' : '关注'}
        </Text>
      )}
    </View>
  );
};
const hstyles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop: RFValue(10),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 12,
    marginLeft: 7,
    marginRight: 7,
  },
  timeText: {
    color: '#bdbdbd',
    fontSize: 12,
  },
  joinBtn: {
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 'auto',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingRight: 14,
    paddingLeft: 14,
    fontWeight: '500',
    lineHeight: 28,
    // marginTop: 18,
    color: '#1F1F1F',
    letterSpacing: 1,
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
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 12,
    marginLeft: 5,
  },
});

export default ArticleDetail;
