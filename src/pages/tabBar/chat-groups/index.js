import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import TabView from '@/components/TabView';
import IconFont from '@/iconfont';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import MailListPage from '@/pages/tabBar/chat-groups/mail-list';
import ChatListPage from '@/pages/chats/chat_groups';
import NotifyIndex from '@/pages/notify/notify-index';
import CurrentAvator from '@/pages/tabBar/current-avator';
import {BadgeMessage} from '@/components/NodeComponents';
import {Cstyles, BoothHeight} from '@/pages/tabBar/style';
import {getInviteCode} from '@/api/account_api';
import {dispatchShareItem} from '@/redux/actions';

const Message = () => {
  const UnreadMessageCount = () => {
    return 23;
  };

  return (
    <BadgeMessage
      size={'middle'}
      value={UnreadMessageCount()}
      containerStyle={[
        styles.badge,
        {
          right:
            UnreadMessageCount() >= 1 && UnreadMessageCount() < 10
              ? -VWValue(-4)
              : UnreadMessageCount() > 99
              ? -VWValue(4) * 1.75
              : -VWValue(10) * 1.45,
        },
      ]}
    />
  );
};

const ChatGroups = props => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const [currentKey, setCurrentKey] = useState('mail');

  const onChange = key => {
    setCurrentKey(key);
  };

  const handleShare = () => {
    const shareContent = {
      item_type: 'Account',
      item_id: currentAccount.id,
      visible: true,
      title: '邀请好友来顽',
    };
    dispatch(dispatchShareItem(shareContent));
  };

  const loadInitInfo = async () => {
    await getInviteCode();
  };

  useEffect(() => {
    loadInitInfo();
  }, []);

  return (
    <View style={Cstyles.wrapper}>
      <View style={{height: BoothHeight, backgroundColor: '#fff'}} />
      <View style={Cstyles.avatorWrap}>
        <CurrentAvator />
      </View>
      <Pressable style={Cstyles.createWrap} onPress={handleShare}>
        <IconFont name="plus" color="#000" size={14} />
      </Pressable>
      <TabView
        currentKey={currentKey}
        onChange={onChange}
        align="center"
        bottomLine={true}
        separator={false}
        tabStyle={{height: RFValue(33) + 10, paddingBottom: 10}}
        tabData={[
          {
            key: 'mail',
            title: (
              <View style={{position: 'relative'}}>
                <Text
                  style={[styles.tabItemText, currentKey === 'mail' && styles.tabItemTextActive]}>
                  通讯录
                </Text>
                <Message />
              </View>
            ),
            component: MailListPage,
          },
          {
            key: 'chat',
            title: (
              <View style={{position: 'relative'}}>
                <Text
                  style={[styles.tabItemText, currentKey === 'chat' && styles.tabItemTextActive]}>
                  聊天
                </Text>
                <Message />
              </View>
            ),
            component: ChatListPage,
          },
          {
            key: 'notify',
            title: (
              <View style={{position: 'relative'}}>
                <Text
                  style={[styles.tabItemText, currentKey === 'notify' && styles.tabItemTextActive]}>
                  互动
                </Text>
                <Message />
              </View>
            ),
            component: NotifyIndex,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabItemText: {
    fontSize: 15,
    color: '#aaa',
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
  tabItemTextActive: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: -10,
    zIndex: 1,
  },
});

export default ChatGroups;
