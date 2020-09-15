import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Pressable, Button} from 'react-native';
import {syncAccountInfo} from '@/api/mine_api';
import styled from 'styled-components/native';
import {BadgeMessage} from '@/components/NodeComponents';
import {connect, useSelector} from 'react-redux';
import SafeAreaPlus from '@/components/SafeAreaPlus';
import {dispatchCurrentAccount} from '@/redux/actions';

import {
  CommentNoticeImg,
  FollowNoticeImg,
  PraiseNoticeImg,
  SystemNoticeImg,
  MineMentionNoticeUserImg,
} from '@/utils/default-image';

const NotifyIndex = ({navigation}) => {
  const currentAccount = useSelector(state => state.account.currentAccount);

  const goPageMethod = (type = '', event) => {

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
        syncAccountInfo({
          id: currentAccount.id,
          profile_attributes: {unread_mentions_notifies_count: 0},
        });
        navigation.navigate('MentionNotify');
        break;
      default:
        console.log('default');
    }
  };

  const unreadMessageCount = message_count => {
    if (message_count <= 0) {
      return '0';
    } else if (message_count > 99) {
      return '99+';
    } else {
      return message_count.toString();
    }
  };

  const unread_inside_notifies_count = currentAccount.unread_insite_notifies_count;
  const unread_comments_notifies_count = currentAccount.unread_comments_notifies_count;
  const unread_follow_messages_count = currentAccount.unread_follow_messages_count;
  const unread_system_messages_count = currentAccount.unread_system_messages_count;
  const unread_mentions_notifies_count = currentAccount.unread_system_messages_count;

  return (
    <SafeAreaPlus>
      <WrapView>
        <ItemView onPress={goPageMethod.bind(this, 'notify_praise')}>
          <CoverWrapView>
            <Image source={{uri: PraiseNoticeImg}} style={{width: 45, height: 45}} />
            {unread_inside_notifies_count > 0 && (
              <BadgeMessage
                value={unreadMessageCount(unread_inside_notifies_count)}
                status={'error'}
                containerStyle={styles.badgeContainer}
              />
            )}
          </CoverWrapView>

          <NotifyContentView>
            <NotifyContentTitle>赞与收藏</NotifyContentTitle>
            <NotifyContentDesc>
              🤘
              {unread_inside_notifies_count > 0
                ? `有${unread_inside_notifies_count}人赞了你`
                : '查看赞与收藏'}
            </NotifyContentDesc>
          </NotifyContentView>
        </ItemView>

        <ItemView onPress={goPageMethod.bind(this, 'notify_comment')}>
          <CoverWrapView>
            <Image source={{uri: CommentNoticeImg}} style={{width: 45, height: 45}} />
            {unread_comments_notifies_count > 0 && (
              <BadgeMessage
                value={unreadMessageCount(unread_comments_notifies_count)}
                status={'error'}
                containerStyle={styles.badgeContainer}
              />
            )}
          </CoverWrapView>

          <NotifyContentView>
            <NotifyContentTitle>评论及回复</NotifyContentTitle>
            <NotifyContentDesc>
              🤝
              {unread_comments_notifies_count > 0
                ? `有${unread_comments_notifies_count}人评论了你`
                : '查看评论及回复'}{' '}
            </NotifyContentDesc>
          </NotifyContentView>
        </ItemView>

        <ItemView onPress={goPageMethod.bind(this, 'mention_account_notice')}>
          <CoverWrapView>
            <Image source={{uri: MineMentionNoticeUserImg}} style={{width: 45, height: 45}} />
            {unread_mentions_notifies_count > 0 && (
              <BadgeMessage
                value={unreadMessageCount(unread_mentions_notifies_count)}
                status={'error'}
                containerStyle={styles.badgeContainer}
              />
            )}
          </CoverWrapView>

          <NotifyContentView>
            <NotifyContentTitle>@我的</NotifyContentTitle>
            <NotifyContentDesc>
              🤞
              {unread_mentions_notifies_count > 0
                ? `有${unread_mentions_notifies_count}人@了你`
                : '查看@我的消息'}{' '}
            </NotifyContentDesc>
          </NotifyContentView>
        </ItemView>

        <ItemView onPress={goPageMethod.bind(this, 'notify_follow')}>
          <CoverWrapView>
            <Image source={{uri: FollowNoticeImg}} style={{width: 45, height: 45}} />
            {unread_follow_messages_count > 0 && (
              <BadgeMessage
                value={unreadMessageCount(unread_follow_messages_count)}
                status={'error'}
                containerStyle={styles.badgeContainer}
              />
            )}
          </CoverWrapView>

          <NotifyContentView>
            <NotifyContentTitle>新增粉丝</NotifyContentTitle>
            <NotifyContentDesc>
              🤟
              {unread_follow_messages_count > 0
                ? `有${unread_follow_messages_count}人关注了你`
                : '查看新增粉丝'}{' '}
            </NotifyContentDesc>
          </NotifyContentView>
        </ItemView>

        <ItemView onPress={goPageMethod.bind(this, 'notify_system')}>
          <CoverWrapView>
            <View>
              <Image
                source={{uri: SystemNoticeImg}}
                style={{width: 45, height: 45, borderRadius: 22.5}}
              />
              {unread_system_messages_count > 0 && (
                <BadgeMessage
                  value={unreadMessageCount(unread_system_messages_count)}
                  status={'error'}
                  containerStyle={styles.badgeContainer}
                />
              )}
            </View>
          </CoverWrapView>

          <NotifyContentView>
            <NotifyContentTitle>顽鸦小助手</NotifyContentTitle>
            <NotifyContentDesc>
              {' '}
              ⚡️
              {unread_system_messages_count > 0
                ? `有${unread_system_messages_count}条新的推荐`
                : '查看消息通知'}{' '}
            </NotifyContentDesc>
          </NotifyContentView>
        </ItemView>
      </WrapView>
    </SafeAreaPlus>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -7,
    top: -3,
  },
});

const WrapView = styled(View)`
  background-color: white;
  height: 100%;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
`;
const ItemView = styled(Pressable)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 80px;
`;

const CoverWrapView = styled(View)`
  margin-right: 12px;
`;

const NotifyContentView = styled(View)`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding-bottom: 18px;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;

const NotifyContentTitle = styled(Text)`
  height: 20px;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 1px;
`;
const NotifyContentDesc = styled(Text)`
  margin-top: 3px;
  height: 20px;
  font-size: 13px;
  color: rgba(189, 189, 189, 1);
  line-height: 20px;
  letter-spacing: 1px;
`;

export default NotifyIndex;
