import React, {useState, useEffect} from 'react';
import {View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import TabView from '@/components/TabView';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import MailListPage from '@/pages/tabBar/chat-groups/mail-list';
import ChatListPage from '@/pages/chats/chat_groups';
import NotifyIndex from '@/pages/notify/notify-index';
import CurrentAvator from '@/pages/tabBar/current-avator';
import {Cstyles, BoothHeight} from '@/pages/tabBar/style';
import {getInviteCode} from '@/api/account_api';
import {dispatchShareItem} from '@/redux/actions';

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
            title: '通讯录',
            component: MailListPage,
          },
          {
            key: 'chat',
            title: '聊天',
            component: ChatListPage,
          },
          {
            key: 'notify',
            title: '互动',
            component: NotifyIndex,
          },
        ]}
      />
    </View>
  );
};

export default ChatGroups;
