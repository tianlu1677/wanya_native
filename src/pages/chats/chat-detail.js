import React, {useEffect, useState, useMemo} from 'react';
import {View, Text, Pressable, Dimensions, StyleSheet} from 'react-native';
import {createConsumer} from '@rails/actioncable';
import {useSelector} from 'react-redux';
import {ChatScreen} from '@/plugins/react-native-easy-chat-ui';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';

import Clipboard from '@react-native-community/clipboard';

import {getChatGroupsConversations, getChatGroupsSendMessage} from '@/api/chat_api';
import {translate} from './meta';

const AddPhoto = require('@/assets/images/add-photo.png');
const AddVideo = require('@/assets/images/add-video.png');

const {height, width} = Dimensions.get('window');
const MediaWidth = (width - 2 * 15 - 3 * 15) / 4;

const TransLateData = data => data.map(item => translate(item));

const ChartDetailCommon = props => {
  const {uuid} = props.route.params;
  const {
    account: {currentAccount},
    login: {auth_token},
  } = useSelector(state => state);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

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
    console.log('params', params);

    const res = await getChatGroupsConversations(params);
    // console.log('res', res);
    setMessages(TransLateData(res.data.conversations));
    setLoading(false);
  };
  // 删除或者复制数据
  const popItems = (type, index, text, message) => {
    // console.log('message', message)
    let items = [
      {
        title: '删除',
        onPress: () => {
          console.log('del');
        },
      },
      {
        title: '复制',
        onPress: () => {
          Clipboard.setString(text);
        },
      },
    ];
    return items;
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
        // usePlus={true}
        panelContainerStyle={styles.panelContainerStyle}
        panelSource={[
          {
            icon: <FastImg source={AddPhoto} style={styles.media} />,
            title: '照片',
            onPress: () => {
              console.log('takePhoto');
            },
          },
          {
            icon: <FastImg source={AddVideo} style={styles.media} />,
            title: '视频',
            onPress: () => {
              console.log('takePhoto');
            },
          },
        ]}
        renderPanelRow={data => {
          console.log(data);
          return (
            <Pressable style={styles.mediaWrapper} onPress={data.onPress}>
              {data.icon}
              <Text style={styles.mediaText}>{data.title}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  panelContainerStyle: {},
  mediaWrapper: {
    width: MediaWidth,
    height: MediaWidth + 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  media: {
    width: MediaWidth,
    height: MediaWidth,
  },
  mediaText: {
    height: 20,
    lineHeight: 20,
    color: '#7a7a7a',
  },
});

export default ChartDetailCommon;
