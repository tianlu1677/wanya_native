import React, {useEffect, useState, useMemo, useRef} from 'react';
import {ChatScreen} from '@/plugins/react-native-easy-chat-ui';
import consumer from './consumer';
import {getChatGroupsConversations, getChatGroupsSendMessage} from '@/api/chat_api';

// const mes = [
//   {
//     id: '1',
//     type: 'text',
//     content: 'hello world',
//     targetId: '88886666',
//     chatInfo: {
//       avatar:
//         'https://upload-images.jianshu.io/upload_images/11942126-044bd33212dcbfb8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240',
//       id: '12345678',
//       nickName: 'Test',
//     },
//     renderTime: true,
//     sendStatus: 0,
//     time: '1542006036549',
//   },
//   {
//     id: '2',
//     type: 'text',
//     content: 'hi/{se}',
//     targetId: '88886666',
//     chatInfo: {
//       avatar:
//         'https://upload-images.jianshu.io/upload_images/11942126-044bd33212dcbfb8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240',
//       id: '12345678',
//       nickName: 'Test',
//     },
//     renderTime: true,
//     sendStatus: 0,
//     time: '1542106036549',
//   },
// ];

const TransLateData = data => {
  return data.map(item => {
    const newItem = {
      // ...item,
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
      sendStatus: 0,
      time: item.send_at,
    };
    return newItem;
  });
};

const ChartDetailCommon = props => {
  const ref = useRef();
  const {uuid} = props.route.params;
  const [detail, setDetail] = useState(null);
  const [messages, setMessages] = useState([]);

  const chatChannel = useMemo(() => {
    return consumer.subscriptions.create(
      {channel: 'ChatChannel', room: 'main_room'},
      {
        received(data) {
          console.log('received', data);
          const newMsg = [...messages];
          newMsg.push({
            id: `${new Date().getTime()}`,
            type: 'text',
            content: data.message,
            targetId: '88886666',
            chatInfo: {
              avatar:
                'http://xinxuefile.meirixinxue.com/uploads/account/avatar/2021/fb78b282-5637-4edc-93ba-b0a3f4d5b885.jpg?imageMogr2/thumbnail/!200x200r/gravity/Center/crop/200x200',
              id: '12345678',
              nickName: 'Test',
            },
            renderTime: true,
            sendStatus: 1,
            time: `${new Date().getTime()}`,
          });

          console.log('newMsg', newMsg);

          setMessages(newMsg);
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
    console.log('res send', res);
  };

  const loadData = async () => {
    const params = {uuid: uuid};
    const res = await getChatGroupsConversations(params);
    console.log('res.data.conversations', res.data.conversations);
    console.log('TransLateData', TransLateData(res.data.conversations));
    setMessages(TransLateData(res.data.conversations));
  };

  useEffect(() => {
    loadData();
  }, []);

  return <ChatScreen ref={ref} messageList={messages} sendMessage={sendMessage} />;
};

export default ChartDetailCommon;
