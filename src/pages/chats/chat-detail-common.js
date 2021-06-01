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
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  console.log(messages);

  const Consumer = useMemo(() => {
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
      }
    );
  }, []);

  const sendMessage = async (type, content, isInverted) => {
    const params = {uuid, conversation: {category: type, content}};
    const res = await getChatGroupsSendMessage(params);
  };

  const loadData = async () => {
    const params = {uuid: uuid};
    const res = await getChatGroupsConversations(params);
    console.log('res', res);
    setMessages(TransLateData(res.data.conversations));
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    return () => {
      Consumer.unsubscribe();
    };
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <ChatScreen
      messageList={messages}
      sendMessage={sendMessage}
      isIPhoneX={isIphoneX()}
      userProfile={{
        id: currentAccount.id.toString(),
        avatar: currentAccount.avatar_url,
        nickName: currentAccount.nickname,
      }}
    />
  );
};

export default ChartDetailCommon;
