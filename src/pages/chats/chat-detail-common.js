import React, {Component, useEffect, useState, useMemo, useRef} from 'react';
import {ChatScreen} from 'react-native-easy-chat-ui';
import consumer from './consumer';

console.log('consumer', consumer);

const messages1 = [
  {
    id: '1',
    type: 'text',
    content: 'hello world',
    targetId: '12345678',
    chatInfo: {
      avatar:
        'http://xinxuefile.meirixinxue.com/uploads/account/avatar/2021/fb78b282-5637-4edc-93ba-b0a3f4d5b885.jpg?imageMogr2/thumbnail/!200x200r/gravity/Center/crop/200x200',
      id: '12345678',
      nickName: 'Test',
    },
    renderTime: true,
    sendStatus: 0,
    time: '1542006036549',
  },
  {
    id: '2',
    type: 'text',
    content: 'hi/{se}',
    targetId: '12345678',
    chatInfo: {
      avatar:
        'http://xinxuefile.meirixinxue.com/uploads/account/avatar/2021/fb78b282-5637-4edc-93ba-b0a3f4d5b885.jpg?imageMogr2/thumbnail/!200x200r/gravity/Center/crop/200x200',
      id: '12345678',
      nickName: 'Test',
    },
    renderTime: true,
    sendStatus: 0,
    time: '1542106036549',
  },
];

const ChartDetailCommon = () => {
  const ref = useRef();

  const [messages, setMessages] = useState(messages1);

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

  // const sendMessage = (type, content, isInverted) => {
  //   console.log(type, content, isInverted, 'msg');
  // };

  const sendMessage = (type, content, isInverted) => {
    chatChannel.send({message: content}); // 向服务器推送消息
    // const { messages } = this.state
    // const newMsg = [...messages];
    // newMsg.push({
    //   id: `${new Date().getTime()}`,
    //   type,
    //   content,
    //   targetId: '88886666',
    //   chatInfo: {
    //     avatar: require('../../source/avatar.png'),
    //     id: '12345678',
    //     nickName: 'Test',
    //   },
    //   renderTime: true,
    //   sendStatus: 1,
    //   time: `${new Date().getTime()}`,
    // });
    // this.setState({ messages: newMsg })
  };

  return <ChatScreen ref={ref} messageList={messages} sendMessage={sendMessage} />;
};

export default ChartDetailCommon;
