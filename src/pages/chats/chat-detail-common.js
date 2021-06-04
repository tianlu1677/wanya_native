import React, {useEffect, useState, useMemo} from 'react';
import {View, Button, Text} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {createConsumer} from '@rails/actioncable';
import {useSelector} from 'react-redux';
import {ChatScreen} from '@/plugins/react-native-easy-chat-ui';
import Loading from '@/components/Loading';
import Clipboard from '@react-native-community/clipboard';

import {getChatGroupsConversations, getChatGroupsSendMessage} from '@/api/chat_api';
import {translate} from './meta';

const TransLateData = data => data.map(item => translate(item));

const ChartDetailCommon = props => {
  const {uuid} = props.route.params;
  const {
    account: {currentAccount},
    login: {auth_token},
  } = useSelector(state => state);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  // console.log(messages);

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
    setMessages(TransLateData(res.data.conversations));
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
          // messages.slice(index, 1); // 重新setmessage list
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

  useEffect(() => {
    loadData();
    return () => {
      chatChannel.unsubscribe();
    };
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View>
      <ChatScreen
        // chatWindowStyle={{marginBottom: 20}}
        messageList={messages}
        sendMessage={sendMessage}
        isIPhoneX={true}
        chatType={'friend'}
        usePopView={true}
        setPopItems={(type, index, text, message) => {
          return popItems(type, index, text, message);
        }}
        // showIsRead={true}
        // iphoneXBottomPadding={200}
        userProfile={{
          id: currentAccount.id.toString(),
          avatar: currentAccount.avatar_url,
          nickName: currentAccount.nickname,
        }}
      />
    </View>
  );
};

export default ChartDetailCommon;
