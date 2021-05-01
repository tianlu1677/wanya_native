import React, {useState, useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import {getSystemNotifies} from '@/api/account_api';
import ScrollList from '@/components/ScrollList';
import NotifyContent from './components/notify-content';

const SystemNotify = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState({});

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
    } else if (notify.target_type === 'CheckNode') {
      image_url = notify.target_cover_url;
      has_video = false;
    } else if (notify.target_type === 'Theory' && notify.theory) {
      image_url = notify.theory.single_cover && notify.theory.single_cover.cover_url;
      content = notify.theory.title;
      has_video = notify.theory.single_cover.category === 'video';
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
      navigation.push('TopicDetail', {topicId: notify.topic.id});
    } else if (notify.article) {
      navigation.push('ArticleDetail', {articleId: notify.article.id});
    } else if (notify.target_type == 'CheckNode') {
      navigation.push('CreateNodeResult', {nodeId: notify.target_id});
    }
  };

  useEffect(() => {
    loadInfo();
  }, []);

  const renderItem = ({item}) => {
    let notify = item;
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
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <ScrollList
        onRefresh={loadInfo}
        headers={headers}
        data={data}
        loading={loading}
        renderItem={renderItem}
        enableRefresh={false}
        renderSeparator={() => <View />}
      />
    </View>
  );
};

export default SystemNotify;
