import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {PublishAccount, PublishRelated} from '@/components/Item/post-detail-item';
import {CommentList, ActionComment} from '@/components/List/comment-list';
import {getArticle} from '@/api/article_api';
import RichHtml from '@/components/RichHtml';
import Loading from '@/components/Loading';
import {getArticleCommentList, createComment} from '@/api/comment_api';
import BottomSheet from 'reanimated-bottom-sheet';

const ArticeDetail = ({navigation, route}) => {
  const [detail, setDetail] = useState(null);
  const sheetRef = useRef(null);
  const laodData = async () => {
    const res = await getArticle(7);
    console.log(res.data.article);
    setDetail(res.data.article);
  };

  const publishComment = async data => {
    const res = await createComment(data);
    console.log(res);
    laodData();
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}>
      <Text>Swipe down to close</Text>
    </View>
  );

  useEffect(() => {
    laodData();
  }, []);

  return detail ? (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={90}>
        <ScrollView style={styles.wrapper}>
          <Text style={styles.title}>{detail.title}</Text>
          <PublishAccount data={detail} />
          {/* <RichHtml
        style={{backgroundColor: 'pink'}}
        content={detail.content.replace(/\<img/gi, '<img style="max-width:"100%";height:auto" ')}
      /> */}
          <PublishRelated data={detail} />
          <CommentList
            detail={detail}
            request={{api: getArticleCommentList, params: {id: detail.id}}}
          />
        </ScrollView>
        <ActionComment detail={detail} publishComment={publishComment} type="Article" />
      </KeyboardAvoidingView>
    </>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    // flex: 1,
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
});
// const styles = StyleSheet.create({
//   //底部默认样式
//   phoneContainer: {
//     marginLeft: 25,
//     marginRight: 25,
//     paddingTop: 30,
//     letterSpacing: 1,
//   },
// });

export default ArticeDetail;
