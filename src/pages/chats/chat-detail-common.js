import React, {useEffect, useState, useMemo, useRef} from 'react';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {createConsumer} from '@rails/actioncable';
import {useDispatch, useSelector} from 'react-redux';
import {ChatScreen} from '@/plugins/react-native-easy-chat-ui';
// import consumer from './consumer';
import {getChatGroupsConversations, getChatGroupsSendMessage} from '@/api/chat_api';

const TransLateData = data => {
  return data.map(item => {
    const newItem = {
      id: item.id,
      type: item.category,
      content: item.content,
      targetId: item.creator.id,
      chatInfo: {
        avatar: item.target_account.avatar_url,
        id: item.target_account.id,
        nickName: item.target_account.nickname,
      },
      renderTime: true,
      sendStatus: 1,
      time: new Date(item.send_at).getTime(),
    };
    return newItem;
  });
};

const ChartDetailCommon = props => {
  const {uuid} = props.route.params;
  const {
    account: {currentAccount},
    login: {auth_token},
  } = useSelector(state => state);
  const [detail, setDetail] = useState(null);
  const [messages, setMessages] = useState([]);

  const chatChannel = useMemo(() => {
    console.log('auth_token', auth_token);
    const consumer = createConsumer(`wss://xinxue.meirixinxue.com//cable?auth_token=${auth_token}`);
    return consumer.subscriptions.create(
      {channel: 'ChatChannel', room: `${uuid}`},
      {
        received(data) {
          console.log('received', data);
          const {conversation} = data;
          const newMessage = {
            id: conversation.id,
            type: conversation.category,
            content: conversation.content,
            targetId: conversation.creator.id,
            chatInfo: {
              avatar: conversation.target_account.avatar_url,
              id: conversation.target_account.id,
              nickName: conversation.target_account.nickname,
            },
            renderTime: true,
            sendStatus: 1,
            time: new Date(conversation.send_at).getTime(),
          };
          console.log('messages2222', messages);
          console.log([newMessage, ...messages]);
          setMessages([newMessage, ...messages]);
          // const newMsg = [...messages];
          // newMsg.push({
          //   id: `${new Date().getTime()}`,
          //   type: 'text',
          //   content: data.message,
          //   targetId: '88886666',
          //   chatInfo: {
          //     avatar:
          //       'http://xinxuefile.meirixinxue.com/uploads/account/avatar/2021/fb78b282-5637-4edc-93ba-b0a3f4d5b885.jpg?imageMogr2/thumbnail/!200x200r/gravity/Center/crop/200x200',
          //     id: '12345678',
          //     nickName: 'Test',
          //   },
          //   renderTime: true,
          //   sendStatus: 1,
          //   time: `${new Date().getTime()}`,
          // });

          // console.log('newMsg', newMsg);

          // setMessages(newMsg);
          // setMessages(messages => messages.concat(data));
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
      }
    );
  }, []);

  const sendMessage = async (type, content, isInverted) => {
    console.log(type, content, isInverted);
    const params = {uuid, conversation: {category: type, content}};
    const res = await getChatGroupsSendMessage(params);
    // console.log('res send', res);

    // chatChannel.send({message: newMessage}); // 向服务器推送消息
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

  return (
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
  );
};

export default ChartDetailCommon;
