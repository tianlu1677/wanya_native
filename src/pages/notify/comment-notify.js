import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button, Pressable} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {getReplyComments} from '@/api/account_api';
import ScrollList from '@/components/ScrollList';
import NotifyContent from './components/notify-content';
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
class CommentNotify extends Component {
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
    const res = await getReplyComments(params);
    data = params.page === 1 ? res.data.comments : this.state.data.concat(res.data.comments);

    data = data.map(comment => {
      return this.formatComment(comment);
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

  componentDidUpdate() {}

  componentWillUnmount() {}

  componentDidCatch(error, info) {}

  goInsideNotify = comment => {
    // console.log('xxxxxxxx')
    if (comment.commentable_type === 'Topic' && comment.commentable) {
      // goPage.goTopicDetailUrl(comment.commentable_id)
      return;
    }
    if (comment.commentable_type === 'Article' && comment.commentable) {
      // goPage.goArticleDetailUrl(comment.commentable_id)
    }
  };

  render() {
    const {headers, loading, data} = this.state;
    const renderItem = ({item}) => {
      let comment = item;
      console.log('comment', comment)
      return (
        <NotifyContent
          account={comment.account}
          notify_type={comment.comment_type === 'comment' ? '回复了你' : '评论了你'}
          time={comment.created_at_text}
          notify_content={comment.content}
          item={comment.item}
          handleClickRight={this.goInsideNotify.bind(this, comment)}
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

export default CommentNotify;
