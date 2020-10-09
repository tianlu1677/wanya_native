import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {getArticle} from '@/api/article_api';
import RichHtml from '@/components/RichHtml';
import Loading from '@/components/Loading';
import Toast from '@/components/Toast';
import {getArticleCommentList, createComment, deleteComment} from '@/api/comment_api';
import CommentList from '@/components/List/comment-list';
import {PublishAccount, PublishRelated, ActionComment} from '@/components/Item/single-detail-item';
import {BASIC_HEIGHT, BOTTOM_HEIGHT} from '@/utils/navbar';

const ArticleDetail = ({navigation, route}) => {
  const currentAccount = useSelector(state => state.account.currentAccount);

  const [articleId] = useState(route.params.articleId);
  const [detail, setDetail] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: (detail && detail.title) || '',
    });
  }, [navigation, detail]);

  const loadData = async () => {
    const res = await getArticle(7 || articleId);
    setDetail(res.data.article);
  };

  const publishComment = async data => {
    setVisible(false);
    Toast.showLoading('发送中');
    await createComment(data);
    Toast.hide();
    Toast.show('发送成功啦');
    loadData();
  };

  const deleteArticleComment = async id => {
    await deleteComment(id);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: 'white'}}>
      <CommentList
        style={styles.wrapper}
        detail={detail}
        enableLoadMore={false}
        request={{api: getArticleCommentList, params: {id: detail.id}}}
        type="Article"
        changeVisible={value => setVisible(value)}
        deleteComment={deleteArticleComment}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>{detail.title}</Text>
            <PublishAccount data={detail} showFollow={detail.account_id !== currentAccount.id} />
            <RichHtml
              containerStyle={{
                backgroundColor: 'white',
                paddingTop: 20,
                paddingLeft: 10,
                paddingRight: 10,
              }}
              imagesMaxWidth={Dimensions.get('window').width - 20}
              baseFontStyle={{fontSize: 14, lineHeight: 0}}
              content={
                detail &&
                detail.content.replace(/\.<img/gi, '<img style="max-width:"100%";height:auto" ')
              }
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
  wrapper: {
    flex: 1,
  },
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
  },
});

export default ArticleDetail;
