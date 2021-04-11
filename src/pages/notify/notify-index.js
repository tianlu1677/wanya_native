import React, {useCallback} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {syncAccountInfo} from '@/api/mine_api';
import {BadgeMessage, Avator, RecommendSearch} from '@/components/NodeComponents';
import {dispatchCurrentAccount} from '@/redux/actions';
import {
  CommentNoticeImg,
  FollowNoticeImg,
  PraiseNoticeImg,
  SystemNoticeImg,
  MineMentionNoticeUserImg,
} from '@/utils/default-image';

const NotifyIndex = ({navigation}) => {
  const dispatch = useDispatch();
  const {currentAccount} = useSelector(state => state.account);
  const {
    unread_insite_notifies_count,
    unread_comments_notifies_count,
    unread_follow_messages_count,
    unread_system_messages_count,
    unread_mentions_notifies_count,
  } = currentAccount;

  const goPageMethod = async (type = '') => {
    if (!currentAccount.id) {
      return;
    }
    switch (type) {
      case 'notify_praise':
        syncAccountInfo({
          id: currentAccount.id,
          profile_attributes: {unread_insite_notifies_count: 0},
        });
        navigation.navigate('PraiseNotify');
        break;
      case 'notify_comment':
        syncAccountInfo({
          id: currentAccount.id,
          profile_attributes: {unread_comments_notifies_count: 0},
        });
        navigation.navigate('CommentNotify');
        break;
      case 'notify_follow':
        syncAccountInfo({
          id: currentAccount.id,
          profile_attributes: {unread_follow_messages_count: 0},
        });
        navigation.navigate('FollowNotify', {title: '关注我的人'});
        break;
      case 'notify_system':
        syncAccountInfo({
          id: currentAccount.id,
          profile_attributes: {unread_system_messages_count: 0},
        });
        navigation.navigate('SystemNotify');
        break;
      case 'mention_account_notice':
        await syncAccountInfo({
          id: currentAccount.id,
          profile_attributes: {unread_mentions_notifies_count: 0},
        });
        navigation.navigate('MentionNotify');
        break;
      default:
        break;
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(dispatchCurrentAccount());
    }, [])
  );

  return (
    <View>
      <RecommendSearch />
      <View style={styles.wrapView}>
        <View style={styles.itemView} onPress={goPageMethod.bind(this, 'notify_praise')}>
          <View style={styles.coverWrapView}>
            <Image source={{uri: PraiseNoticeImg}} style={{width: 45, height: 45}} />
            <BadgeMessage
              value={unread_insite_notifies_count}
              containerStyle={styles.badgeContainer}
            />
          </View>
          <View style={styles.notifyContent}>
            <Text style={styles.notifyContentTitle}>赞和收藏</Text>
            <Text style={styles.notifyContentDesc}>
              🤘
              {unread_insite_notifies_count > 0
                ? `有${unread_insite_notifies_count}人赞了你`
                : '查看赞和收藏'}
            </Text>
          </View>
        </View>
        <View style={styles.speator} />

        <View style={styles.itemView} onPress={goPageMethod.bind(this, 'notify_comment')}>
          <View style={styles.coverWrapView}>
            <Image source={{uri: CommentNoticeImg}} style={{width: 45, height: 45}} />
            <BadgeMessage
              value={unread_comments_notifies_count}
              containerStyle={styles.badgeContainer}
            />
          </View>
          <View style={styles.notifyContent}>
            <Text style={styles.notifyContentTitle}>评论及回复</Text>
            <Text style={styles.notifyContentDesc}>
              🤝
              {unread_comments_notifies_count > 0
                ? `有${unread_comments_notifies_count}人评论了你`
                : '查看评论及回复'}{' '}
            </Text>
          </View>
        </View>
        <View style={styles.speator} />

        <View style={styles.itemView} onPress={goPageMethod.bind(this, 'mention_account_notice')}>
          <View style={styles.coverWrapView}>
            <Image source={{uri: MineMentionNoticeUserImg}} style={{width: 45, height: 45}} />
            <BadgeMessage
              value={unread_mentions_notifies_count}
              containerStyle={styles.badgeContainer}
            />
          </View>
          <View style={styles.notifyContent}>
            <Text style={styles.notifyContentTitle}>@我的</Text>
            <Text style={styles.notifyContentDesc}>
              🤞
              {unread_mentions_notifies_count > 0
                ? `有${unread_mentions_notifies_count}人@了你`
                : '查看@我的消息'}{' '}
            </Text>
          </View>
        </View>
        <View style={styles.speator} />

        <View style={styles.itemView} onPress={goPageMethod.bind(this, 'notify_follow')}>
          <View style={styles.coverWrapView}>
            <Image source={{uri: FollowNoticeImg}} style={{width: 45, height: 45}} />
            <BadgeMessage
              value={unread_follow_messages_count}
              containerStyle={styles.badgeContainer}
            />
          </View>
          <View style={styles.notifyContent}>
            <Text style={styles.notifyContentTitle}>新增粉丝</Text>
            <Text style={styles.notifyContentDesc}>
              🤟
              {unread_follow_messages_count > 0
                ? `有${unread_follow_messages_count}人关注了你`
                : '查看新增粉丝'}{' '}
            </Text>
          </View>
        </View>
        <View style={styles.speator} />

        <View style={styles.itemView} onPress={goPageMethod.bind(this, 'notify_system')}>
          <View style={styles.coverWrapView}>
            <View>
              <Avator
                size={45}
                account={{avatar_url: SystemNoticeImg, settled_type: 'brand'}}
                handleClick={goPageMethod.bind(this, 'notify_system')}
              />
              <BadgeMessage
                value={unread_system_messages_count}
                containerStyle={styles.badgeContainer}
              />
            </View>
          </View>
          <View style={styles.notifyContent}>
            <Text style={styles.notifyContentTitle}>顽鸦小助手</Text>
            <Text style={{marginLeft: -3}}>
              ⚡️
              {unread_system_messages_count > 0
                ? `有${unread_system_messages_count}条新的消息`
                : '查看消息通知'}{' '}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -7,
    top: -3,
  },
  wrapView: {
    backgroundColor: '#fff',
    paddingLeft: 14,
  },
  itemView: {
    flexDirection: 'row',
    paddingVertical: 17,
  },
  coverWrapView: {
    marginRight: 12,
  },
  notifyContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notifyContentTitle: {
    height: 20,
    lineHeight: 20,
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: '500',
  },
  notifyContentDesc: {
    marginTop: 3,
    height: 20,
    lineHeight: 20,
    color: '#BDBDBD',
    letterSpacing: 1,
    fontSize: 13,
  },
  speator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 45 + 12,
  },
});

export default NotifyIndex;
