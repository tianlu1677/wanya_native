import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button, Pressable} from 'react-native';
import {connect, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import goPage from '../../utils/page_path';
import {getSystemNotifies} from '@/api/account_api';
import ScrollList from '@/components/ScrollList';
import NotifyContent from './components/notify-content';
import SafeAreaPlus from '../../components/SafeAreaPlus';
import {MineSystemNoticeUserImg, SystemNoticeImg} from "@/utils/default-image"
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
class SystemNotify extends Component {
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
    const res = await getSystemNotifies(params);
    data =
      params.page === 1
        ? res.data.inside_notifies
        : this.state.data.concat(res.data.inside_notifies);

    data = data.map(notify => {
      return this.formatSystemNotice(notify);
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

  formatSystemNotice = (notify) => {
    let image_url = ''
    let has_video = false
    let content = '已删除'
    if(notify.target_type === 'Comment') {
      content = notify.comment ? notify.comment.content : '评论已删除'
    } else if (notify.target_type === 'Topic' && notify.topic) {
      let topic = notify.topic
      image_url = topic.video_content_thumb ? topic.video_content_thumb : topic.medias[0]
      has_video = !!topic.video_content_thumb
      content = topic.plain_content
    } else if (notify.target_type === 'Article' && notify.article) {
      image_url = notify.article.cover_url
      content = notify.article.title
    } else if (!notify.target_type) {
      content = ''
    } else {
      content = ''
    }

    return {...notify, actor: {
        avatar_url: SystemNoticeImg, nickname: '', account_color: 'black', fontSize: '28rpx' }, item: {image_url: image_url, has_video: has_video, content: content}}
  }

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
          notify_type={notify.message}
          time={notify.created_at_text}
          notify_content={""}
          item={notify.item}
          showRight={notify.item.content !== ''}
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

export default SystemNotify;
