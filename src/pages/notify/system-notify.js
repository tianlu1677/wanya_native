import React, {Component, useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {getSystemNotifies} from '@/api/account_api';
import ScrollList from '@/components/ScrollList';
import NotifyContent from './components/notify-content';

const SystemNotify = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState({});

  useEffect(() => {
    loadInfo();
  }, []);

  const loadInfo = async (page = 1) => {
    let params = {page: page, per_page: 20};
    let res_data = [];
    let headers = {};
    const res = await getSystemNotifies(params);
    res_data = params.page === 1 ? res.data.inside_notifies : data.concat(res.data.inside_notifies);

    res_data = res_data.map(notify => {
      return formatNotify(notify);
    });
    headers = res.headers;
    setData(res_data);
    setHeaders(headers);
    setLoading(false);
  };

  const formatNotify = notify => {
    console.log('noti', notify);
    let image_url = '';
    let has_video = false;
    let content = '';
    if (notify.target_type === 'Comment') {
      content = notify.comment ? notify.comment.content : '评论已删除';
    } else if (notify.target_type === 'Topic' && notify.topic) {
      let topic = notify.topic;
      image_url = topic.single_cover ? topic.single_cover.cover_url : '';
      has_video = topic.has_video;
      content = topic.plain_content;
    } else if (notify.target_type === 'Article') {
      image_url = notify.article.cover_url;
      content = notify.article.title;
    } else if (notify.target_type === null) {
      content = 'nothing';
    } else {
      content = '已删除';
    }
    return {...notify, item: {image_url: image_url, content: content, has_video: has_video}};
  };

  const goInsideNotify = notify => {
    const comment = notify.comment;
    if (notify.target_type === 'Comment' && comment && comment.commentable_id) {
      if (comment.commentable_type === 'Topic') {
        navigation.push('TopicDetail', {topicId: comment.commentable_id});
        return;
      }
      if (comment.commentable_type === 'Article') {
        navigation.push('ArticleDetail', {articleId: comment.commentable_id});
      }
    } else if (notify.topic) {
      console.log('topic, topic');
      navigation.push('TopicDetail', {topicId: notify.topic.id});
    } else if (notify.article) {
      console.log('article, article');
      navigation.push('ArticleDetail', {articleId: notify.article.id});
    }
  };

  const renderItem = ({item}) => {
    let notify = item;
    // console.log('notify', notify)
    return (
      <NotifyContent
        account={{...notify.actor, nickname: ''}}
        notify_type={notify.message}
        time={notify.created_at_text}
        item={notify.item}
        descStyle={{fontSize: 14, color: 'black'}}
        showRight={notify.item.content !== 'nothing'}
        handleClickRight={() => {
          goInsideNotify(notify);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollList
        onRefresh={loadInfo}
        headers={headers}
        data={data}
        loading={loading}
        renderItem={renderItem}
        // height={1200}
        enableRefresh={false}
        renderSeparator={() => <View />}
      />
    </SafeAreaView>
  );
};

export default SystemNotify;
