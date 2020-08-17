import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Image,Pressable, Button} from 'react-native';
import {syncAccountInfo} from '@/api/mine_api';
import goPage from '../../utils/page_path';
import styled from 'styled-components/native';
import BadgeMessage from '../../components/NodeComponents/BadgeMessage';

import {
  CommentNoticeImg,
  FollowNoticeImg,
  PraiseNoticeImg,
  SystemNoticeImg,
  MineMentionNoticeUserImg,
} from '../../utils/default-image';

class NotifyIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.currentAccountId = '';
  }

  componentDidMount() {
    this.currentAccountId = React.$Store.getData('current_account_id');
  }

  goPageMethod = (type = '', event) => {
    console.log('wwww')
    // event.stopPropagation();

    if (!this.currentAccountId) {
      goPage.goLogin();
      return;
    }
    const {currentAccount} = this.props;
    switch (type) {
      case 'notify_praise':
        this.props.navigation.navigate('PraiseNotify')
        break;
      case 'notify_comment':
        break;
      case 'notify_follow':
        break;
      case 'notify_system':
        break;
      case 'new_followers':
        syncAccountInfo({
          id: currentAccount.id,
          profile_attributes: {unread_follow_messages_count: 0},
        });
        goPage.goAccountFollow(currentAccount.id, 'new_followers', '新增粉丝');
        break;
      case 'followers':
        goPage.goAccountFollow(currentAccount.id, 'followers', '我的粉丝');
        break;
      case 'followings':
        goPage.goAccountFollow(currentAccount.id, 'followings', '我的关注');
        break;
      case 'mention_account_notice':
        break;
      default:
        console.log('default');
    }
  };

  unreadMessageCount = message_count => {
    if (message_count <= 0) {
      return '0';
    } else if (message_count > 99) {
      return '99+';
    } else {
      return message_count.toString();
    }
  };

  render() {
    const {currentAccount} = this.props;
    const account = currentAccount;

    const unread_inside_notifies_count = this.currentAccountId
      ? currentAccount.unread_insite_notifies_count
      : 0;
    const unread_comments_notifies_count = this.currentAccountId
      ? currentAccount.unread_comments_notifies_count
      : 0;
    const unread_follow_messages_count = this.currentAccountId
      ? currentAccount.unread_follow_messages_count
      : 0;
    const unread_system_messages_count = this.currentAccountId
      ? currentAccount.unread_system_messages_count
      : 0;
    const unread_mentions_notifies_count = this.currentAccountId
      ? currentAccount.unread_mentions_notifies_count
      : 0;

    return (
      <View>
        <SafeAreaView>
          <WrapView>
            <ItemView onPress={this.goPageMethod.bind(this, 'notify_praise')}>
              <CoverWrapView>
                <Image
                  source={{uri: PraiseNoticeImg}}
                  style={{width: 45, height: 45}}
                  />
                {unread_inside_notifies_count > 0 && (
                  <BadgeMessage
                    value={this.unreadMessageCount(unread_inside_notifies_count)}
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

            <ItemView onPress={this.goPageMethod.bind(this, 'notify_comment')}>
              <CoverWrapView>
                <Image source={{uri: CommentNoticeImg}} style={{width: 45, height: 45}} />
                {unread_comments_notifies_count > 0 && (
                  <BadgeMessage
                    value={this.unreadMessageCount(unread_comments_notifies_count)}
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

            <ItemView onPress={this.goPageMethod.bind(this, 'mention_account_notice')}>
              <CoverWrapView>
                <Image source={{uri: MineMentionNoticeUserImg}} style={{width: 45, height: 45}} />
                {unread_mentions_notifies_count > 0 && (
                  <BadgeMessage
                    value={this.unreadMessageCount(unread_mentions_notifies_count)}
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

            <ItemView onPress={this.goPageMethod.bind(this, 'notify_follow')}>
              <CoverWrapView>
                <Image source={{uri: FollowNoticeImg}} style={{width: 45, height: 45}} />
                {unread_follow_messages_count > 0 && (
                  <BadgeMessage
                    value={this.unreadMessageCount(unread_follow_messages_count)}
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

            <ItemView onPress={this.goPageMethod.bind(this, 'notify_system')}>
              <CoverWrapView>
                <View>
                  <Image
                    source={{uri: SystemNoticeImg}}
                    style={{width: 45, height: 45, borderRadius: 22.5}}
                  />
                  {unread_system_messages_count > 0 && (
                    <BadgeMessage
                      value={this.unreadMessageCount(unread_system_messages_count)}
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
        </SafeAreaView>
      </View>
    );
  }
}

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
  margin-top: 18px;
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
