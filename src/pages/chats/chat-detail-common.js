import React, {useEffect, useState, useMemo, useRef} from 'react';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {createConsumer} from '@rails/actioncable';
import {useDispatch, useSelector} from 'react-redux';
import {ChatScreen} from '@/plugins/react-native-easy-chat-ui';
import consumer from './consumer';
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
  const ref = useRef();
  const {uuid} = props.route.params;
  const state1 = useSelector(state => state);

  console.log(state1);
  const {currentAccount, userToken} = useSelector(state => state.account);
  const [detail, setDetail] = useState(null);
  const [messages, setMessages] = useState([]);

  const chatChannel = useMemo(() => {
    return createConsumer(
      `wss://xinxue.meirixinxue.com//cable?auth_token=${userToken}`
    ).subscriptions.create(
      {channel: 'ChatChannel', room: `chat_${uuid}`},
      {
        received(data) {
          console.log('received', data);
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
    console.log('res send', res);

    // chatChannel.send({message: newMessage}); // 向服务器推送消息
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

  return (
    <ChatScreen
      ref={ref}
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
