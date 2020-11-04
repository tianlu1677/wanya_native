import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getArticle} from '@/api/article_api';
import RichHtml from '@/components/RichHtml';
import Loading from '@/components/Loading';
import Toast from '@/components/Toast';
import {getArticleCommentList, createComment, deleteComment} from '@/api/comment_api';
import CommentList from '@/components/List/comment-list';
import {PublishAccount, PublishRelated, ActionComment} from '@/components/Item/single-detail-item';
import {dispatchArticleDetail} from '@/redux/actions';
import {STATUS_BAR_HEIGHT, NAVIGATION_BAR_HEIGHT} from '@/utils/navbar';
import TopHeader from '@/components/TopHeader';

const ArticleDetail = ({navigation, route}) => {
  const dispatch = useDispatch();

  const currentAccount = useSelector(state => state.account.currentAccount);

  const [articleId] = useState(route.params.articleId);
  const [detail, setDetail] = useState(null);
  const [loadingContent, setLoadingContent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: (detail && detail.title) || '',
    });
  }, [navigation, detail]);

  const loadData = async () => {
    const res = await getArticle(articleId);
    setDetail(res.data.article);
    onHTMLParsed();
    dispatch(dispatchArticleDetail(res.data.article));
  };

  const publishComment = async data => {
    setVisible(false);
    Toast.showLoading('发送中');
    await createComment(data);
    Toast.hide();
    Toast.show('评论成功啦');
    loadData();
  };

  const deleteArticleComment = async id => {
    await deleteComment(id);
    loadData();
  };

  const onHTMLParsed = (dom, RNElements) => {
    setLoadingContent(true);
    // Find the index of the first paragraph
    // const ad = {
    //   wrapper: "View",
    //   tagName: "mycustomblock",
    //   attribs: {},
    //   parent: false,
    //   parentTag: false,
    //   nodeIndex: 4,
    // };
    // // Insert the component
    // RNElements.splice(4, 0, ad);
    // return RNElements;
  };

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#fff'}}>
      <TopHeader
        Title={
          detail.title && detail.title.toString().length > 10
            ? `${detail.title.toString().substr(0, 10)}...`
            : detail.title
        }
        leftButtonColor={'black'}
        statusBar={{
          barStyle: 'dark-content',
          hidden: false,
        }}
      />
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
              onLinkPress={e => {
                console.log('xxx', e);
              }}
              images_info={detail.images_info}
              onHTMLParsed={onHTMLParsed}
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
        setDetail={data => setDetail(data)}
        changeVisible={value => setVisible(value)}
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
