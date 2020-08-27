import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button} from 'react-native';
import styled from 'styled-components/native';
import goPage from '../../utils/page_path';
import {getReplyComments} from '@/api/account_api';
import {syncAccountInfo} from '@/api/mine_api';
import {pagination} from '@/utils/load_more';
import NotifyContent from './components/notify-content';
import SafeAreaPlus from '../../components/safe_area_plus';
class CommentNotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      isLoading: true,
      paginate: {
        hasMore: true,
        nextPage: 1,
      },
    };
  }

  readAllMessages = () => {
    const {currentAccount} = this.props;
    syncAccountInfo({
      id: currentAccount.id,
      profile_attributes: {unread_comments_notifies_count: 0},
    });
  };

  getItemList = async (params = {}, opts = {}) => {
    let res = [];
    if (opts.refresh) {
      this.setState({
        isLoading: false,
        paginate: {
          hasMore: true,
          nextPage: 1,
        },
      });
    }
    if (!opts.refresh && !this.state.paginate.hasMore) {
      return;
    }
    res = await getReplyComments(params);
    let comments = res.data.comments;
    comments = comments.map(comment => {
      return this.formatComment(comment);
    });
    // comments = comments.filter((comment) => !comment.commentable)
    this.setState({
      itemList: opts.refresh ? comments : this.state.itemList.concat(comments),
    });
    let paginate = pagination(res.header);
    this.setState({
      isLoading: false,
      paginate: paginate,
    });
  };

  formatComment = comment => {
    let commentable = comment.commentable;
    let type = comment.commentable_type;
    let image_url = '';
    let has_video = false;
    if (!commentable || !commentable.id) {
      return comment;
    }

    if (comment.comment_type === 'comment') {
      return {
        ...comment,
        item: {
          image_url: '',
          content: comment.target_comment_content || '该评论已删除',
        },
      };
    }

    if (type === 'Article') {
      return {...comment, item: {image_url: commentable.cover_url, has_video: false}};
    }

    if (type === 'Topic') {
      image_url = commentable.video_content_thumb
        ? commentable.video_content_thumb
        : commentable.medias[0];
      has_video = !!commentable.video_content_thumb;
      return {
        ...comment,
        item: {image_url: image_url, has_video: has_video, content: commentable.plain_content},
      };
    }
  };

  goInsideNotify = comment => {
    // console.log('xxxxxxxx')
    if (comment.commentable_type === 'Topic' && comment.commentable) {
      goPage.goTopicDetailUrl(comment.commentable_id);
      return;
    }
    if (comment.commentable_type === 'Article' && comment.commentable) {
      goPage.goArticleDetailUrl(comment.commentable_id);
    }
  };

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  componentDidCatch(error, info) {}

  render() {
    const {itemList, isLoading} = this.state;
    return (
      <SafeAreaPlus style={{backgroundColor: 'white', height: '100%'}}>
        {[1, 2, 3, 4].map(item => {
          return <NotifyContent item={item} key={item.id}></NotifyContent>;
        })}
      </SafeAreaPlus>
    );
  }
}

export default CommentNotify;
