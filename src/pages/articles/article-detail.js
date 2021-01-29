import React, {useEffect, useState, useLayoutEffect} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {View, Text, StyleSheet, ActivityIndicator, Platform, Dimensions, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {dispatchArticleDetail} from '@/redux/actions';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import Loading from '@/components/Loading';
import ActionSheet from '@/components/ActionSheet';
import {Avator} from '@/components/NodeComponents';
import RichHtml from '@/components/RichHtml';
import {NAV_BAR_HEIGHT, SAFE_TOP} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';
import {getArticleCommentList, createComment, deleteComment} from '@/api/comment_api';
import {getArticle, createArticleAction} from '@/api/article_api';
import CommentList from '@/components/List/comment-list';
import {PublishAccount, PublishRelated, ActionComment} from '@/components/Item/single-detail-item';
const {width} = Dimensions.get('window');
import AutoHeightWebView from 'react-native-autoheight-webview'
import {WebView} from 'react-native-webview';

const ArticleDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const currentArticle = useSelector(state => state.topic.articleDetail);
  const [articleId] = useState(route.params.articleId);
  const [detail, setDetail] = useState(null);
  const [height, setHeight] = useState(100);
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
      label: '投诉',
      onPress: () => {
        navigation.push('Report', {report_type: 'Account', report_type_id: detail.id});
      },
    },
  ];

  const loadData = async () => {
    const res = await getArticle(articleId);
    setDetail(res.data.article);
    createArticleAction({id: articleId, type: 'view'});
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
    const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};

    const goAccountDetail = () => {
      navigation.push('AccountDetail', {accountId: detail.account.id});
    };

    const onReportClick = () => {
      setShowActionSheet(true);
    };

    if (detail) {
      navigation.setOptions({
        headerTitle: () => (
          <Pressable style={styles.headerTitle} onPress={goAccountDetail}>
            <Avator account={detail.account} size={25} />
            <Text style={styles.headerText}>{detail.account.nickname}</Text>
          </Pressable>
        ),
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()} style={{marginLeft: 5}} hitSlop={hitSlop}>
            <IconFont name={'close'} size={14} />
          </Pressable>
        ),
        headerRight: () =>
          detail.account_id === currentAccount.id ? null : (
            <Pressable onPress={onReportClick} hitSlop={hitSlop}>
              <IconFont name="gengduo" color="#000" size={20} />
            </Pressable>
          ),
      });
    }
  }, [navigation, detail]);

  const richHtmlPStyle = {fontSize: 15, lineHeight: 25, marginBottom: 10, fontWeight: '300'};

  return detail && currentAccount ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={NAV_BAR_HEIGHT + SAFE_TOP}
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
            <View style={{paddingBottom: RFValue(20)}}>
              <Text style={styles.title}>{detail.title}</Text>
              <PublishAccount data={detail} showFollow={detail.account_id !== currentAccount.id} />
              <RichHtml
                containerStyle={{paddingLeft: 14, paddingRight: 14, marginTop: 20}}
                enableExperimentalPercentWidth
                allowFontScaling={true}
                textSelectable
                tagsStyles={{p: {...richHtmlPStyle}}}
                imagesMaxWidth={width - 20}
                imagesInitialDimensions={{width: width}}
                baseFontStyle={{lineHeight: 26, letterSpacing: 1}}
                images_info={detail.images_info}
                content={detail.content}
              />
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

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingRight: 14,
    paddingLeft: 14,
    fontWeight: '500',
    lineHeight: 28,
    marginTop: 18,
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
