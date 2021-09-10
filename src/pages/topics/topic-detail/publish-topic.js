import React, {useEffect, useState, useLayoutEffect} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {View, Text, Platform, StyleSheet, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RFValue} from '@/utils/response-fontsize';
import IconFont from '@/iconfont';

import {Avator} from '@/components/NodeComponents';
import LocationBar from '@/components/LocationBar';
import {followAccount, unfollowAccount} from '@/api/account_api';
import {IsIos, BOTTOM_HEIGHT, BarHeight} from '@/utils/navbar';
import Toast from '@/components/Toast';

import RenderImage from './common/render-image';
import RenderLongVideo from './common/render-long-video';
import RenderVideo from './common/render-video';
import RenderLink from './common/render-link';
import RenderText from './common/render-text';
import CommentList from '@/components/List/comment-list';
import {createComment, deleteComment, getCommentList} from '@/api/comment_api';

const HeaderTitle = ({detail}) => {
  const {account, published_at_text, space, location} = detail;

  return (
    <View style={styles.headerTitle}>
      <Avator account={account} size={32} />
      <Pressable style={styles.content}>
        <Text style={styles.nameText}>{account.nickname}</Text>
        <View style={styles.info}>
          <Text style={styles.timeText}>{published_at_text}</Text>
          <LocationBar space={space} location={location} style={{marginLeft: 4}} />
        </View>
      </Pressable>
    </View>
  );
};

const PublishTopic = ({detail, navigation, route}) => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const currentTopic = useSelector(state => state.topic.topicDetail);
  const [topicId] = useState(route.params.topicId);
  //   const [detail, setDetail] = useState();
  const [visible, setVisible] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionItems, setActionItems] = useState([]);

  const publishComment = async data => {
    // try {
    //   setVisible(false);
    //   Toast.showLoading('发送中');
    //   await createComment(data);
    //   dispatch({type: action.SAVE_COMMENT_CONTENT, value: {}});
    //   Toast.hide();
    //   Toast.show('评论成功啦');
    //   loadData();
    // } catch (e) {
    //   Toast.show('评论出错了');
    //   Toast.hide();
    // }
  };

  const deleteTopicComment = async id => {
    // await deleteComment(id);
    // loadData();
  };

  const onReportClick = () => {
    const isCurrentTopic = detail.account_id === currentAccount.id;
    const actions = [
      {
        id: 1,
        label: isCurrentTopic ? '删除' : '投诉',
        onPress: async () => {
          if (isCurrentTopic) {
            // await deleteTopic(detail.id);
            // Toast.show('已删除');
            navigation.goBack();
          } else {
            navigation.push('Report', {report_type: 'Account', report_type_id: detail.id});
          }
        },
      },
    ];
    setActionItems(actions);
    setShowActionSheet(true);
  };

  useEffect(() => {
    // setDetail(currentTopic);
  }, [currentTopic]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      headerTitleContainerStyle: {marginLeft: -30},
      headerTitle: props => <HeaderTitle {...props} detail={detail} showFollow={false} />,
      headerRight: () => <Text style={styles.attion}>关注</Text>,
      //   headerLeft: () => (
      //     <Pressable>
      //       <IconFont name="home-recommend" color="#000" size={15} />
      //     </Pressable>
      //   ),
    });
  }, [navigation]);

  const isVideo = detail && detail.content_style === 'video' && !detail.is_long_video;
  const isLongVideo = detail && detail.content_style === 'video' && detail.is_long_video;
  const longVideoDetail = {...detail, node: detail.node ? {...detail.node, topics_count: 0} : null};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}
      keyboardVerticalOffset={IsIos ? -BOTTOM_HEIGHT : BarHeight}>
      <CommentList
        type="Topic"
        detail={detail}
        enableLoadMore={false}
        changeVisible={value => setVisible(value)}
        deleteComment={deleteTopicComment}
        request={{api: getCommentList, params: {item_id: detail.id, item_type: 'Topic'}}}
        ListHeaderComponent={
          <>
            <View style={{paddingBottom: RFValue(20)}}>
              {isVideo && <RenderVideo detail={detail} />}
              {isLongVideo ? <RenderLongVideo detail={longVideoDetail} /> : null}
              {detail.content_style === 'img' && <RenderImage detail={detail} />}
              {detail.content_style === 'text' && <RenderText detail={detail} />}
            </View>
            <View style={{backgroundColor: '#FAFAFA', height: 9}} />
            <Text style={styles.commentTitle}>全部评论</Text>
          </>
        }
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  attion: {
    color: '#FF2242',
    fontWeight: '500',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: 8,
  },
  nameText: {
    fontSize: 12,
    marginBottom: 3,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#bdbdbd',
    fontSize: 11,
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

export default PublishTopic;
