import React, {useState, useEffect, useMemo, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Pressable,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchPreviewImage} from '@/redux/actions';
import {Avator, PlayScore, BottomModal, TopBack} from '@/components/NodeComponents';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import {RFValue} from '@/utils/response-fontsize';
import {BarHeight, SCREEN_WIDTH} from '@/utils/navbar';

import consumer from './consumer';
import consumerFunc from "./consumer"

const HEADER_HEIGHT = Math.ceil((SCREEN_WIDTH * 540) / 750);

global.addEventListener = () => {};
global.removeEventListener = () => {};

const ChatDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {
    login: {auth_token},
  } = useSelector(state => state);
  const currentAccount = useSelector(state => state.account.currentAccount);
  const consumer = consumerFunc(auth_token)
  const [currentWsState, setCurrentWsState] = useState('');

  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);

  const chatChannel = useMemo(() => {
    return consumer.subscriptions.create(
      {channel: 'ChatChannel', room: 'main_room'},
      {
        received(data) {
          // console.log('received', data);
          setMessages(messages => messages.concat(data));
        },
        initialized() {
          console.log('initialized');
        },
        connected() {
          console.log('connected');
          setCurrentWsState('connected');
        },
        disconnected() {
          console.log('disconnected');
          setCurrentWsState('disconnected');
        },
        rejected() {
          console.log('rejected');
          setCurrentWsState('rejected');
        },
        unsubscribe() {
          console.log('unsubscribe');
          setCurrentWsState('unsubscribe');
        },
      }
    );
  }, []);

  const renderedItem = ({item}) => <Message message={item.message} key={item.key} />;
  const inputSubmitted = event => {
    const newMessage = event.nativeEvent.text;
    console.log('inputSubmitted', newMessage);
    chatChannel.send({message: newMessage}); // 向服务器推送消息
    setValue('');
  };

  const disconnect = () => {
    consumer.disconnect();
  };

  useEffect(() => {}, []);

  const Message = ({message}) => (
    <View style={styles.message}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <FlatList
        styles={styles.messages}
        data={messages}
        renderItem={renderedItem}
        keyExtractor={item => item.key}
      />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={text => setValue(text)}
          value={value}
          placeholder="Type a Message"
          onSubmitEditing={inputSubmitted}
        />

        <Pressable>
          <Text>断开连接</Text>
          <Text>当前状态 {currentWsState}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const position = {width: SCREEN_WIDTH, height: HEADER_HEIGHT, position: 'absolute'};
const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flex: 1,
  },
  messages: {
    flex: 1,
  },
  message: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 8,
  },
  form: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 75,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
  },
});

export default ChatDetail;
