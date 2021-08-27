import React, {useState} from 'react';
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
import {dispatchShareItem} from '@/redux/actions';

const Message = ({count = 0}) => {
  const right =
    count >= 1 && count < 10 ? -VWValue(9) : count > 99 ? -VWValue(12) * 1.75 : -VWValue(11) * 1.45;

  return <BadgeMessage size={'middle'} value={count} containerStyle={[styles.badge, {right}]} />;
};

const ChatGroups = props => {
  const dispatch = useDispatch();
  const [currentKey, setCurrentKey] = useState('mail');
  const {currentBaseInfo, currentAccount} = useSelector(state => state.account);

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

  return (
    <View style={Cstyles.wrapper}>
      <View style={{height: BoothHeight, backgroundColor: '#fff'}} />
      <View style={Cstyles.avatorWrap}>
        <CurrentAvator />
      </View>
      <Pressable style={Cstyles.createWrap} onPress={handleShare}>
        <IconFont name="jiahaoyuan" size={20} />
      </Pressable>
      <TabView
        currentKey={currentKey}
        onChange={onChange}
        align="center"
        bottomLine={true}
        separator={false}
        tabStyle={{height: RFValue(33) + 10, paddingBottom: 10}}
        tabScrollStyle={{paddingHorizontal: 15}}
        tabData={[
          {
            key: 'mail',
            title: (
              <Text style={[styles.tabItemText, currentKey === 'mail' && styles.tabItemTextActive]}>
                通讯录
              </Text>
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
                <Message count={currentBaseInfo.unread_chat_messages_count} />
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
                <Message count={currentBaseInfo.new_message_count} />
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
    fontSize: 16,
    color: '#93a2a9',
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
  tabItemTextActive: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -8,
    zIndex: 99999,
  },
});

export default ChatGroups;
