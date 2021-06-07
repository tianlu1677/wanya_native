import React, {useEffect, useState, useMemo} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {createConsumer} from '@rails/actioncable';
import {useSelector} from 'react-redux';
import {ChatScreen} from '@/plugins/react-native-easy-chat-ui';
import Loading from '@/components/Loading';
import Clipboard from '@react-native-community/clipboard';

import {getChatGroupsConversations, getChatGroupsSendMessage} from '@/api/chat_api';
import {translate, checkShowRule} from './meta';

const TransLateData = data => data.map(item => translate(item));



const ChartDetailCommon = ({navigation, route}) => {
  const {uuid, target_account_nickname} = route.params;
  const {
    account: {currentAccount},
    login: {auth_token},
  } = useSelector(state => state);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  // console.log(route);

  const chatChannel = useMemo(() => {
    const url = `wss://xinxue.meirixinxue.com//cable?auth_token=${auth_token}`;
    return createConsumer(url).subscriptions.create(
      {channel: 'ChatChannel', room: `${uuid}`},
      {
        received(data) {
          setMessages(m => m.concat(translate(data.conversation)));
        },
        initialized() {
          console.log('initialized');
        },
        connected() {
          console.log('connected');
        },
        disconnected() {
          console.log('disconnected');
        },
        rejected() {
          console.log('rejected');
        },
        unsubscribe() {
          console.log('unsubscribe');
        },
        deleteMessage(id) {
          console.log('delete id ', id);
          this.perform('delete', {conversation_id: id});
        },
      }
    );
  }, []);

  const sendMessage = async (type, content, isInverted) => {
    const params = {uuid, conversation: {category: type, content}};
    const res = await getChatGroupsSendMessage(params);
  };

  const loadData = async () => {
    const params = {uuid: uuid};
    console.log('params', params);

    const res = await getChatGroupsConversations(params);
    // console.log('res', res);
    const conversations = res.data.conversations;
    const messages = checkShowRule(conversations.reverse(),'send_at')
    setMessages(TransLateData(messages));
    setLoading(false);
  };
  // 删除或者复制数据
  const popItems = (type, index, text, message) => {
    console.log('message', message.type);
    let items = [];
    const delItem = [
      {
        title: '删除',
        onPress: () => {
          console.log('del');
          chatChannel.deleteMessage(message.id);
          // messages.slice(index, 1); // TODO: 重新setmessage list
          // setMessages(messages);
        },
      },
    ];
    const copyItem = [
      {
        title: '复制',
        onPress: () => {
          Clipboard.setString(text);
        },
      },
    ];
    if (type === 'text') {
      items = items.concat(copyItem);
    }
    if (message.targetId === currentAccount.id.toString()) {
      items = items.concat(delItem);
    }
    return items;
  };

  // 点击头像
  const pressAvatar = (isSelf, targetId) => {
    console.log('is self,', isSelf, targetId)
    if(isSelf) {
      return;
    }
    navigation.navigate('AccountDetail', {accountId: targetId})
  };

  useEffect(() => {
    loadData();
    navigation.setOptions({
      title: target_account_nickname
    });
    return () => {
      chatChannel.unsubscribe();
    };
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View>
      <ChatScreen
        inverted={false}
        chatWindowStyle={{backgroundColor: 'white'}}
        messageList={messages}
        sendMessage={sendMessage}
        isIPhoneX={true}
        // iphoneXBottomPadding={30}
        chatType={'friend'}
        usePopView={true}
        setPopItems={(type, index, text, message) => {
          return popItems(type, index, text, message);
        }}
        pressAvatar={(isSelf, targetId) => pressAvatar(isSelf, targetId) }
        loadHistory={() => {
          console.log('loadHistory')
        }}
        // allPanelHeight={200}
        leftMessageTextStyle={styles.leftMessageText}
        leftMessageBackground={'#F3F3F3'}
        rightMessageTextStyle={styles.rightMessageText}
        rightMessageBackground={'black'}
        userProfile={{
          id: currentAccount.id.toString(),
          avatar: currentAccount.avatar_url,
          nickName: currentAccount.nickname,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  leftMessageText: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 19,
    borderBottomRightRadius: 19,
    borderBottomLeftRadius: 19,
    fontSize: 14,
    color: 'black',
    lineHeight: 22,
    letterSpacing: 1,
    fontWeight: '300',
  },
  rightMessageText: {
    borderTopLeftRadius: 19,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 19,
    borderBottomLeftRadius: 19,
    fontSize: 14,
    color: 'white',
    lineHeight: 22,
    letterSpacing: 1,
    fontWeight: '300',
    marginLeft: 2
  },
  wrapper: {
    backgroundColor: '#fff',
    paddingLeft: 14,
  }
})

export default ChartDetailCommon;
