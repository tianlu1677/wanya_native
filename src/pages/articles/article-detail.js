import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Pressable,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getArticle} from '@/api/article_api';
import RichHtml from '@/components/RichHtml';
import Loading from '@/components/Loading';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import * as action from '@/redux/constants';
import {getArticleCommentList, createComment, deleteComment} from '@/api/comment_api';
import CommentList from '@/components/List/comment-list';
import {PublishAccount, PublishRelated, ActionComment} from '@/components/Item/single-detail-item';
import {dispatchArticleDetail} from '@/redux/actions';
import {NAVIGATION_BAR_HEIGHT, STATUS_BAR_HEIGHT} from '@/utils/navbar';
import ActionSheet from '@/components/ActionSheet';

const ArticleDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const currentArticle = useSelector(state => state.topic.articleDetail);

  const [articleId] = useState(route.params.articleId);
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const publishComment = async data => {
    setVisible(false);
    Toast.showLoading('发送中');
    await createComment(data);
    dispatch({type: action.SAVE_COMMENT_TOPIC, value: {}});
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
      label: '举报',
      onPress: () => {
        navigation.push('Report', {report_type: 'Account', report_type_id: detail.id});
      },
    },
  ];

  const onReportClick = () => {
    setShowActionSheet(true);
  };

  const loadData = async () => {
    const res = await getArticle(articleId);
    setDetail(res.data.article);
    dispatch(dispatchArticleDetail(res.data.article));
  };

  useEffect(() => {
    loadData();
    // 清空评论数据
    return () => {
      dispatch(dispatchArticleDetail(null));
      dispatch({type: action.SAVE_COMMENT_TOPIC, value: {}});
    };
  }, []);

  useEffect(() => {
    setDetail(currentArticle);
  }, [currentArticle]);

  useLayoutEffect(() => {
    if (detail) {
      navigation.setOptions({
        headerTitle: detail.title,
        headerShown: true,
        headerTransparent: false,
        safeArea: false,
        headerStyle: {
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
        headerRight: () =>
          detail.account_id === currentAccount.id ? null : (
            <Pressable onPress={onReportClick} hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
              <IconFont name="ziyuan" color="#000" size={20} />
            </Pressable>
          ),
      });
    }
  }, [navigation, detail]);

  return detail && currentAccount ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={NAVIGATION_BAR_HEIGHT + STATUS_BAR_HEIGHT}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#fff'}}>
      <CommentList
        detail={detail}
        request={{api: getArticleCommentList, params: {id: detail.id}}}
        type="Article"
        changeVisible={value => setVisible(value)}
        deleteComment={deleteArticleComment}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>{detail.title}</Text>
            <View style={{marginBottom: 20}}>
              <PublishAccount data={detail} showFollow={detail.account_id !== currentAccount.id} />
            </View>
            <RichHtml
              containerStyle={{
                backgroundColor: '#fff',
                paddingLeft: 10,
                paddingRight: 10,
              }}
              enableExperimentalPercentWidth
              allowFontScaling={true}
              textSelectable
              tagsStyles={{
                p: {
                  fontSize: 16,
                  lineHeight: 26,
                  marginTop: 10,
                  marginBottom: 10,
                  letterSpacing: 1,
                },
              }}
              imagesMaxWidth={Dimensions.get('window').width - 20}
              imagesInitialDimensions={{width: Dimensions.get('window').width}}
              baseFontStyle={{lineHeight: 26, letterSpacing: 1}}
              images_info={detail.images_info}
              content={detail.content}
            />
            <PublishRelated data={detail} />
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

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingTop: 8,
    paddingRight: 14,
    paddingLeft: 14,
    paddingBottom: 8,
    fontWeight: '500',
    lineHeight: 28,
    marginTop: 20,
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

export default ArticleDetail;
