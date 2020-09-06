import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button, Pressable} from 'react-native';
import {connect, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import goPage from '../../utils/page_path';
import {getInsideNotifies} from '@/api/account_api';
import ScrollList from '@/components/ScrollList';
import NotifyContent from './components/notify-content';
import SafeAreaPlus from '../../components/SafeAreaPlus';
import {
  dispatchCurrentAccount,
  dispatchBaseCurrentAccount,
  dispatchEmptyAccountDetail,
} from '@/redux/actions';

@connect(state => state.account, {
  dispatchCurrentAccount,
  dispatchBaseCurrentAccount,
  dispatchEmptyAccountDetail,
})
class PraiseNotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      headers: {},
    };
  }

  componentDidMount() {
    this.props.dispatchCurrentAccount();
    this.loadInfo();
  }

  loadInfo = async (page = 1) => {
    let params = {page: page, per_page: 10};
    let data = [];
    let headers = {};
    const res = await getInsideNotifies(params);
    data =
      params.page === 1
        ? res.data.inside_notifies
        : this.state.data.concat(res.data.inside_notifies);

    data = data.map(notify => {
      return this.formatNotify(notify);
    });
    headers = res.headers;
    this.setState(
      {
        data: data,
        headers: headers,
      },
      () => {
        this.setState({
          loading: false,
        });
      }
    );
  };

  formatNotify = notify => {
    let image_url = '';
    let has_video = false;
    let content = '';
    if (notify.target_type === 'Comment') {
      content = notify.comment ? notify.comment.content : '评论已删除';
    } else if (notify.target_type === 'Topic') {
      let topic = notify.topic;
      image_url = topic.single_cover.cover_url;
      has_video = !!topic.video_content_thumb;
      content = topic.plain_content;
    } else if (notify.target_type === 'Article') {
      image_url = notify.article.cover_url;
      content = notify.article.title;
    } else {
      content = '已删除';
    }

    return {...notify, item: {image_url: image_url, content: content, has_video: has_video}};
  };

  componentDidUpdate() {}

  componentWillUnmount() {}

  componentDidCatch(error, info) {}

  goInsideNotify = notify => {
    const comment = notify.comment;
    if (notify.target_type === 'Comment' && comment && comment.commentable_id) {
      if (comment.commentable_type === 'Topic') {
        this.props.navigation.navigate('TopicDetail', {topicId: comment.commentable_id})
        return;
      }
      if (comment.commentable_type === 'Article') {
        this.props.navigation.navigate('ArticleDetail', {articleId: comment.commentable_id})

      }
    } else if (notify.topic) {
      console.log('topic, topic');
      this.props.navigation.navigate('TopicDetail', {topicId: notify.topic.id})
    } else if (notify.article) {
      console.log('article, article');
      this.props.navigation.navigate('ArticleDetail', {articleId: notify.article.id})
    }
  };

  render() {
    const {headers, loading, data} = this.state;
    const renderItem = ({item}) => {
      let notify = item
      // console.log('notify', notify)
      return (
        <NotifyContent
          account={notify.actor}
          notify_type={notify.message_detail}
          time={notify.created_at_text}
          item={notify.item}
          handleClickRight={this.goInsideNotify.bind(this, notify)}
        />
      );
    };

    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <ScrollList
          onRefresh={this.loadInfo}
          headers={headers}
          data={data}
          loading={loading}
          renderItem={renderItem}
          height={1200}
          renderSeparator={() => <View />}
        />
      </SafeAreaView>
    );
  }
}

export default PraiseNotify;
