import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import TabView from '@/components/TabView';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {BarHeight, IsIos} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';
import ChatListPage from '@/pages/chats/chat_groups';
import NotifyIndex from '@/pages/notify/notify-index';
import MailListPage from './mail-list';
import CurrentAvator from '@/pages/tabBar/current-avator';

const ChatGroups = props => {
  const {navigation} = props;

  const [currentKey, setCurrentKey] = useState('mail');

  const onChange = key => {
    setCurrentKey(key);
  };

  const handleCreateNode = () => {
    navigation.navigate('CreateNodeIntro');
  };

  console.log(232323233232);
  return (
    <View style={styles.wrapper}>
      <View
        style={{height: IsIos ? BarHeight + RFValue(6) : RFValue(6), backgroundColor: '#fff'}}
      />
      <View style={styles.avatorWrap}>
        <CurrentAvator />
      </View>
      <Pressable style={styles.createWrap} onPress={handleCreateNode}>
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

const positionStyle = {
  height: RFValue(33),
  position: 'absolute',
  top: IsIos ? BarHeight : 0,
  zIndex: 99,
  flexDirection: 'row',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
  avatorWrap: {
    ...positionStyle,
    left: 14,
  },
  createWrap: {
    ...positionStyle,
    right: 14,
  },
  createText: {
    fontSize: 14,
    color: '#2C2C2C',
    marginLeft: 5,
  },
});

export default ChatGroups;
