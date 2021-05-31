import React, {useEffect, useState, useMemo} from 'react';
import {View, Button} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {createConsumer} from '@rails/actioncable';
import {useSelector} from 'react-redux';
import {ChatScreen} from '@/plugins/react-native-easy-chat-ui';
import Loading from '@/components/Loading';
import {getChatGroupsConversations, getChatGroupsSendMessage} from '@/api/chat_api';
import {translate} from './meta';

const TransLateData = data => data.map(item => translate(item));

const ChartDetailCommon = props => {
  const {uuid} = props.route.params;
  const {
    account: {currentAccount},
    login: {auth_token},
  } = useSelector(state => state);
  const [messages, setMessages] = useState(null);

  const consumer = createConsumer(`wss://xinxue.meirixinxue.com//cable?auth_token=${auth_token}`);
  consumer.subscriptions.create(
    {channel: 'ChatChannel', room: `${uuid}`},
    {
      received(data) {
        console.log('received', data);
        const {conversation} = data;
        const current = messages.find(item => item.id === conversation.id);
        if (current) {
          return;
        }
        const newMessage = translate(conversation);
        setMessages([newMessage, ...messages]);
      },
      initialized() {
        console.log('initialized');
      },
      connected() {
        console.log('connected');
        // setCurrentWsState('connected');
      },
      disconnected() {
        console.log('disconnected');
        // setCurrentWsState('disconnected');
      },
      rejected() {
        console.log('rejected');
        // setCurrentWsState('rejected');
      },
      unsubscribe() {
        console.log('unsubscribe');
        // setCurrentWsState('unsubscribe');
      },
      unsubscribed() {
        this.perform('unsubscribed');
        // setCurrentWsState('unsubscribe');
      },
    }
  );

  // const chatChannel = useMemo(() => {
  //   const consumer = createConsumer(`wss://xinxue.meirixinxue.com//cable?auth_token=${auth_token}`);
  //   consumer.subscriptions.create(
  //     {channel: 'ChatChannel', room: `${uuid}`},
  //     {
  //       received(data) {
  //         console.log('received', data);
  //         const {conversation} = data;
  //         const newMessage = translate(conversation);
  //         setMessages([newMessage, ...messages]);
  //       },
  //       initialized() {
  //         console.log('initialized');
  //       },
  //       connected() {
  //         console.log('connected');
  //         // setCurrentWsState('connected');
  //       },
  //       disconnected() {
  //         console.log('disconnected');
  //         // setCurrentWsState('disconnected');
  //       },
  //       rejected() {
  //         console.log('rejected');
  //         // setCurrentWsState('rejected');
  //       },
  //       unsubscribe() {
  //         console.log('unsubscribe');
  //         // setCurrentWsState('unsubscribe');
  //       },
  //       unsubscribed() {
  //         this.perform('unsubscribed');
  //         // setCurrentWsState('unsubscribe');
  //       },
  //     }
  //   );
  //   return consumer;
  // }, []);

  const sendMessage = async (type, content, isInverted) => {
    console.log(type, content, isInverted);
    // chatChannel.unsubscribe();
    const params = {uuid, conversation: {category: type, content}};
    const res = await getChatGroupsSendMessage(params);
    // console.log('res send', res);
    // console.log(chatChannel.unsubscribe())
    // chatChannel.send({message: newMessage}); // 向服务器推送消息
  };

  const unsubscribed = () => {
    consumer.unsubscribed();
  };

  const loadData = async () => {
    const params = {uuid: uuid};
    const res = await getChatGroupsConversations(params);
    setMessages(TransLateData(res.data.conversations));
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log('messages', messages);

  return messages ? (
    <View>
      <ChatScreen
        messageList={messages}
        sendMessage={sendMessage}
        isIPhoneX={isIphoneX}
        userProfile={{
          id: currentAccount.id,
          avatar: currentAccount.avatar_url,
          nickName: currentAccount.nickname,
        }}
      />
      <Button title="unsubscribed" onPress={unsubscribed} />
    </View>
  ) : (
    <Loading />
  );
};

export default ChartDetailCommon;
