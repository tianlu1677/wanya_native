import React, {useState} from 'react';
import {View, Pressable} from 'react-native';
import TabView from '@/components/TabView';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import MailListPage from '@/pages/tabBar/chat-groups/mail-list';
import ChatListPage from '@/pages/chats/chat_groups';
import NotifyIndex from '@/pages/notify/notify-index';
import CurrentAvator from '@/pages/tabBar/current-avator';
import {Styles, BoothHeight} from '@/pages/tabBar/style';

const ChatGroups = props => {
  const {navigation} = props;
  const [currentKey, setCurrentKey] = useState('mail');

  const onChange = key => {
    setCurrentKey(key);
  };

  const handleCreateNode = () => {
    navigation.navigate('CreateNodeIntro');
  };

  return (
    <View style={Styles.wrapper}>
      <View style={{height: BoothHeight, backgroundColor: '#fff'}} />
      <View style={Styles.avatorWrap}>
        <CurrentAvator />
      </View>
      <Pressable style={Styles.createWrap} onPress={handleCreateNode}>
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
