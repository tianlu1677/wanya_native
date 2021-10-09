import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  StatusBar,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';
import {dispatchTopicDetail} from '@/redux/actions';
import IconFont from '@/iconfont';
import {Toast, Loading, LocationBar, ActionSheet} from '@/components';
import {GoBack, Avator} from '@/components/NodeComponents';
import CommentList from '@/components/List/comment-list';
import {ActionComment} from '@/components/Item/single-detail-item';
import {IsIos, BOTTOM_HEIGHT, STATUS_BAR_HEIGHT, BarHeight} from '@/utils/navbar';
import {createAction} from '@/api/action_api';
import {getTopic, deleteTopic} from '@/api/topic_api';
import {followAccount, unfollowAccount} from '@/api/account_api';
import {createComment, deleteComment, getCommentList} from '@/api/comment_api';
import RenderImage from './common/render-image';
import RenderLongVideo from './common/render-long-video';
import RenderVideo from './common/render-video';
import RenderLink from './common/render-link';
import RenderText from './common/render-text';

const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

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

const TopicDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const {
    account: {currentAccount},
    topic: {topicDetail},
  } = useSelector(state => state);
  const [topicId] = useState(route.params.topicId);
  const [detail, setDetail] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionItems, setActionItems] = useState([]);

  const isSelf = detail && detail.account_id === currentAccount.id;
  const isVideo = detail && detail.content_style === 'video' && !detail.is_long_video;
  const isRenderHeader =
    detail && (['img', 'text', 'link'].includes(detail.content_style) || isVideo);
  const isLongVideo = detail && detail.content_style === 'video' && detail.is_long_video;
  const longVideoDetail = detail && {
    ...detail,
    node: detail.node ? {...detail.node, topics_count: 0} : null,
  };

  const HeaderHeight = IsIos ? headerHeight - BOTTOM_HEIGHT : STATUS_BAR_HEIGHT + 55;
  const TopHeight = IsIos ? -BOTTOM_HEIGHT : BarHeight;
  const Offset = isRenderHeader ? HeaderHeight : TopHeight;

  const deleteTopicComment = async id => {
    await deleteComment(id);
    loadData();
  };

  const publishComment = async data => {
    try {
      setVisible(false);
      Toast.showLoading('发送中');
      await createComment(data);
      dispatch({type: action.SAVE_COMMENT_CONTENT, value: {}});
      Toast.hide();
      Toast.show('评论成功啦');
      loadData();
    } catch (e) {
      Toast.hide();
      Toast.show('评论出错了');
    }
  };

  const onReportClick = () => {
    const onPress = async () => {
      if (isSelf) {
        await deleteTopic(detail.id);
        Toast.show('已删除');
        navigation.goBack();
      } else {
        navigation.push('Report', {report_type: 'Account', report_type_id: detail.id});
      }
    };
    setActionItems([{id: 1, label: isSelf ? '删除' : '投诉', onPress}]);
    setShowActionSheet(true);
  };

  const onFollow = async () => {
    followed ? await unfollowAccount(detail.account_id) : await followAccount(detail.account_id);
    setFollowed(!followed);
  };

  const loadData = async () => {
    const res = await getTopic(topicId);
    if (res.data.status === 404) {
      Toast.show('该帖子已删除');
      navigation.goBack();
    } else {
      createAction({target_id: topicId, type: 'view', target_type: 'Topic'});
      dispatch(dispatchTopicDetail(res.data.topic));
    }
  };

  useEffect(() => {
    loadData();

    return () => {
      dispatch(dispatchTopicDetail(null));
      dispatch({type: action.SAVE_COMMENT_CONTENT, value: {}});
    };
  }, []);

  useEffect(() => {
    setDetail(topicDetail);
    setFollowed(topicDetail ? topicDetail.account.followed : false);
  }, [topicDetail]);

  useLayoutEffect(() => {
    if (!isRenderHeader || !detail) {
      return;
    }

    const HeaderLeft = () => {
      const canBack = navigation.canGoBack();
      const handleBack = () => {
        if (canBack) {
          navigation.goBack();
        } else {
          const params = {activityKey: 'follow'};
          navigation.reset({index: 0, routes: [{name: 'Recommend', params}]});
        }
      };
      return (
        <Pressable onPress={handleBack}>
          <IconFont name={canBack ? 'arrow-left' : 'home-recommend'} color="#000" size={15} />
        </Pressable>
      );
    };

    if (detail.content_style === 'link') {
      navigation.setOptions({
        headerShown: true,
        title: '帖子详情',
        headerLeft: () => <HeaderLeft />,
        headerRight: () => (
          <Pressable onPress={onReportClick}>
            <IconFont name="gengduo" color="#000" size={20} />
          </Pressable>
        ),
      });
    } else {
      navigation.setOptions({
        headerShown: true,
        headerTitleAlign: 'left',
        headerTitleContainerStyle: {marginLeft: -30},
        headerLeft: () => <HeaderLeft />,
        headerTitle: props => <HeaderTitle {...props} detail={detail} showFollow={false} />,
        headerRight: () =>
          isSelf ? null : (
            <Text
              style={[styles.attion, {color: followed ? '#bdbdbd' : '#FF2242'}]}
              onPress={onFollow}>
              {followed ? '已关注' : '关注'}
            </Text>
          ),
      });
    }
  }, [navigation, detail, followed]);

  return detail ? (
    <KeyboardAvoidingView behavior={behavior} style={styles.wrap} keyboardVerticalOffset={Offset}>
      {isLongVideo && <GoBack color="#000" report={true} onReportClick={onReportClick} />}
      <StatusBar barStyle="dark-content" />
      <CommentList
        type="Topic"
        detail={detail}
        enableLoadMore={false}
        changeVisible={value => setVisible(value)}
        deleteComment={deleteTopicComment}
        request={{api: getCommentList, params: {item_id: detail.id, item_type: 'Topic'}}}
        ListHeaderComponent={
          <>
            <View style={{paddingBottom: 20}}>
              {isLongVideo && <RenderLongVideo detail={longVideoDetail} />}
              {isVideo && <RenderVideo detail={detail} />}
              {detail.content_style === 'img' && <RenderImage detail={detail} />}
              {detail.content_style === 'link' && <RenderLink detail={detail} />}
              {detail.content_style === 'text' && <RenderText detail={detail} />}
            </View>
            <View style={{backgroundColor: '#FAFAFA', height: 9}} />
            <Text style={styles.commentTitle}>全部评论</Text>
          </>
        }
      />
      <ActionComment
        visible={visible}
        detail={detail}
        publishComment={publishComment}
        type="Topic"
        changeVisible={value => setVisible(value)}
      />
      <ActionSheet
        actionItems={actionItems}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
      />
    </KeyboardAvoidingView>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
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
});

export default TopicDetail;
