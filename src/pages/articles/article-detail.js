import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {getArticle} from '@/api/article_api';
import RichHtml from '@/components/RichHtml';
import Loading from '@/components/Loading';
import {getArticleCommentList, createComment} from '@/api/comment_api';
import CommentList from '@/components/List/comment-list';
import {PublishAccount, PublishRelated, ActionComment} from '@/components/Item/single-detail-item';

const ArticeDetail = ({navigation, route}) => {
  const [articleId] = useState(route.params.articleId);
  const [detail, setDetail] = useState(null);

  const laodData = async () => {
    const res = await getArticle(7 || articleId);
    setDetail(res.data.article);
  };

  const publishComment = async data => {
    const res = await createComment(data);
    laodData();
  };

  useEffect(() => {
    laodData();
  }, []);

  return detail ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={90}>
      <CommentList
        style={styles.wrapper}
        detail={detail}
        enableLoadMore={false}
        request={{api: getArticleCommentList, params: {id: detail.id}}}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.title}>{detail.title}</Text>
            <PublishAccount data={detail} />
            <RichHtml
              style={{backgroundColor: 'pink'}}
              content={
                detail &&
                detail.content.replace(/\.<img/gi, '<img style="max-width:"100%";height:auto" ')
              }
            />
            <PublishRelated data={detail} />

            <Text style={styles.commentTitle}>全部评论</Text>
          </>
        )}
      />
      <ActionComment
        detail={detail}
        publishComment={publishComment}
        type="Article"
        setDetail={data => setDetail(data)}
      />
    </KeyboardAvoidingView>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: '#fff',
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

export default ArticeDetail;
