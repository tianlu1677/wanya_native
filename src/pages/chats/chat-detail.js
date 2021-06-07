import React, {useEffect, useState, useMemo} from 'react';
import {View, Button, Text, TouchableOpacity, Dimensions, StyleSheet, Platform} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-picker';

import {createConsumer} from '@rails/actioncable';
import {useSelector} from 'react-redux';
import {ChatScreen} from '@/plugins/react-native-easy-chat-ui';
import Toast from '@/components/Toast';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import Clipboard from '@react-native-community/clipboard';
import MediasPicker from '@/components/MediasPicker';

import {getChatGroupsConversations, getChatGroupsSendMessage} from '@/api/chat_api';
import {translate, checkShowRule} from './meta';

const {width, height} = Dimensions.get('window');

const TransLateData = data => data.map(item => translate(item));

const AddPhoto = require('@/assets/images/add-photo.png');
const AddVideo = require('@/assets/images/add-video.png');

const ChartDetail = props => {
  const {navigation, route, imagePick, videoPick, uploadVideo} = props;
  const {uuid, target_account_nickname} = route.params;
  const {
    account: {currentAccount},
    login: {auth_token},
  } = useSelector(state => state);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  console.log(messages);

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

  const chatGroupSendMessage = async params => {
    const res = await getChatGroupsSendMessage(params);
    console.log('send res', res);
  };

  const sendMessage = async (type, content, isInverted) => {
    const params = {uuid, conversation: {category: type, content}};
    chatGroupSendMessage(params);
  };

  const loadData = async () => {
    const params = {uuid: uuid};
    const res = await getChatGroupsConversations(params);
    const conversations = res.data.conversations;
    const messages = checkShowRule(conversations.reverse(), 'send_at');
    console.log('mess', messages);

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

  const onImagePicker = index => {
    if (index === 0) {
      props.removeAllPhoto();
      const options = {imageCount: 9, isCamera: false};
      imagePick(options, async (err, res) => {
        if (err) {
          return;
        }
        console.log(res);
        Toast.showLoading('上传中...');
        for (const file of res) {
          const result = await props.uploadImage({uploadType: 'multipart', ...file});
          console.log('resultimage', result);
          const {url} = result.asset;
          const params = {uuid, conversation: {category: 'image', metadata: {url: url}}};
          console.log('params', params);
          chatGroupSendMessage(params);
        }

        Toast.hide();
      });
    }
    if (index === 1) {
      const systemVersion = parseInt(DeviceInfo.getSystemVersion());
      const videoSelectType =
        Platform.OS === 'ios' && systemVersion < 14 ? 'imagePicker' : 'syanPicker';

      if (videoSelectType === 'syanPicker') {
        videoPick(
          {
            MaxSecond: 300,
            MinSecond: 1,
            recordVideoSecond: 60,
            videoCount: 1,
            allowTakeVideo: false,
          },
          async (err, res) => {
            if (err) {
              return;
            }
            Toast.showLoading('上传中...');
            console.log('res', res);
            const ret = await uploadVideo(res[0], () => {});
            const {url} = ret.asset;
            const params = {uuid, conversation: {category: 'video', metadata: {url: url}}};
            console.log('params', params);
            chatGroupSendMessage(params);
          }
        );
      }

      console.log(videoSelectType);

      // react-native-image-picker
      if (videoSelectType === 'imagePicker') {
        ImagePicker.launchImageLibrary(
          {mediaType: 'video', videoQuality: 'low'},
          async response => {
            if (response.didCancel) {
              return;
            }
            console.log({uri: response.origURL});
            const {origURL} = response;
            const params = {uuid, conversation: {category: 'video', metadata: {url: origURL}}};
            console.log('params', params);
            chatGroupSendMessage(params);
            // setVideoSource([{uri: response.origURL}]);
          }
        );
      }
    }
  };

  const onVideoPicker = () => {};

  const RenderPanelRow = (data, index) => (
    <TouchableOpacity
      key={index}
      style={styles.panelImageWrap}
      activeOpacity={0.7}
      onPress={() => onImagePicker(index)}>
      <View>{data.icon}</View>
      <Text style={styles.panelText}>{data.title}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    loadData();
    navigation.setOptions({
      title: target_account_nickname,
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
        inverted={true}
        // chatWindowStyle={{marginBottom: 20}}
        messageList={messages}
        sendMessage={sendMessage}
        isIPhoneX={true}
        chatType={'friend'}
        usePopView={true}
        // setPopItems={(type, index, text, message) => {
        //   return popItems(type, index, text, message);
        // }}
        // showIsRead={true}
        // iphoneXBottomPadding={0}
        userProfile={{
          id: currentAccount.id.toString(),
          avatar: currentAccount.avatar_url,
          nickName: currentAccount.nickname,
        }}
        panelSource={[
          {title: '照片', icon: <FastImg source={AddPhoto} style={styles.panelImage} />},
          {title: '视频', icon: <FastImg source={AddVideo} style={styles.panelImage} />},
        ]}
        renderPanelRow={RenderPanelRow}
        panelContainerStyle={styles.panelContainerStyle}
      />
    </View>
  );
};

const panalWidth = (width - 30 - 15 * 3) / 4;
console.log(panalWidth);

const styles = StyleSheet.create({
  panelContainerStyle: {
    paddingTop: 15,
    flexDirection: 'row',
  },
  panelImageWrap: {
    width: panalWidth,
    marginRight: 15,
  },
  panelImage: {
    width: panalWidth,
    height: panalWidth,
  },
  panelText: {
    width: panalWidth,
    color: '#7a7a7a',
    marginTop: 10,
    textAlign: 'center',
    marginRight: 1,
  },
});

export default MediasPicker(ChartDetail);
