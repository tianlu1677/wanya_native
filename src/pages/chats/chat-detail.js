import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import {isIphoneX, getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-picker';
import {createConsumer} from '@rails/actioncable';
import {useSelector} from 'react-redux';
import {ChatScreen} from '@/plugins/react-native-easy-chat-ui';
import Toast from '@/components/Toast';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import Clipboard from '@react-native-community/clipboard';
import MediasPicker from '@/components/MediasPicker';
import {BarHeight} from '@/utils/navbar';
import {getChatGroupsConversations, getChatGroupsSendMessage} from '@/api/chat_api';
import {translate, checkShowRule} from './meta';

import { EventRegister } from "react-native-event-listeners";

global.addEventListener = EventRegister.addEventListener;
global.removeEventListener = EventRegister.removeEventListener;


const AddPhoto = require('@/assets/images/add-photo.png');
const AddVideo = require('@/assets/images/add-video.png');

console.log(getBottomSpace());

const TransLateData = data => data.map(item => translate(item));
const isIos = Platform.OS === 'ios';
const systemVersion = Math.ceil(DeviceInfo.getSystemVersion());
const videoSelectType = isIos && systemVersion < 14 ? 'imagePicker' : 'syanPicker';
const {width, height} = Dimensions.get('window');

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
    const res = await getChatGroupsConversations({uuid});
    const conversations = res.data.conversations;
    const newMessages = checkShowRule(conversations.reverse(), 'send_at');
    setMessages(TransLateData(newMessages));
    setLoading(false);
  };

  // 点击头像
  const pressAvatar = (isSelf, targetId) => {
    console.log('is self,', isSelf, targetId)
    if(isSelf) {
      return;
    }
    navigation.navigate('AccountDetail', {accountId: targetId})
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
          messages.slice(index, 1); // 重新setmessage list
          setMessages(messages);
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

  const onMediaPicker = index => {
    props.removeAllPhoto();

    if (index === 0) {
      const options = {imageCount: 9, isCamera: false};
      imagePick(options, async (err, res) => {
        if (err) {
          return;
        }
        Toast.showLoading('发送中...');
        for (const file of res) {
          const result = await props.uploadImage({uploadType: 'multipart', ...file});
          const {url} = result.asset;
          const params = {uuid, conversation: {category: 'image', metadata: {url}}};
          console.log('image params', params);
          chatGroupSendMessage(params);
        }
        Toast.hide();
      });
    }

    if (index === 1) {
      if (videoSelectType === 'syanPicker') {
        const options = {recordVideoSecond: 60, allowTakeVideo: false};
        videoPick(options, async (err, res) => {
          if (err) {
            return;
          }
          Toast.showLoading('发送中...');
          const ret = await uploadVideo(res[0], () => {});
          const {url} = ret.asset;
          const params = {uuid, conversation: {category: 'video', metadata: {url}}};
          console.log('syanPicker video params', params);
          chatGroupSendMessage(params);
          Toast.hide();
        });
      }

      if (videoSelectType === 'imagePicker') {
        const options = {mediaType: 'video', videoQuality: 'low'};
        ImagePicker.launchImageLibrary(options, async response => {
          if (response.didCancel) {
            return;
          }
          Toast.showLoading('发送中...');
          const {origURL} = response;
          const params = {uuid, conversation: {category: 'video', metadata: {url: origURL}}};
          console.log('imagePicker video params', params);
          chatGroupSendMessage(params);
          Toast.hide();
        });
      }
    }
  };

  const RenderPanelRow = (data, index) => (
    <TouchableOpacity
      key={index}
      style={styles.panelImageWrap}
      activeOpacity={0.7}
      onPress={() => onMediaPicker(index)}>
      <View>{data.icon}</View>
      <Text style={styles.panelText}>{data.title}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    loadData();
    navigation.setOptions({
      title: target_account_nickname,
      headerRight: () => (
        <View style={styles.headerRight}>
          <Text style={styles.attation}>关注</Text>
          <Pressable style={[styles.shareWrap]}>
            <IconFont name={'ziyuan'} color={'#ccc'} size={26} />
          </Pressable>
        </View>
      ),
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
        chatWindowStyle={{backgroundColor: 'white'}}
        messageList={messages}
        sendMessage={sendMessage}
        panelSource={[
          {title: '照片', icon: <FastImg source={AddPhoto} style={styles.panelImage} />},
          {title: '视频', icon: <FastImg source={AddVideo} style={styles.panelImage} />},
        ]}
        renderPanelRow={RenderPanelRow}
        panelContainerStyle={styles.panelContainerStyle}
        useEmoji={true}
        isIPhoneX
        inverted={false}
        headerHeight={BarHeight + 50}
        iphoneXBottomPadding={20}
        pressAvatar={(isSelf, targetId) => pressAvatar(isSelf, targetId) }
        // headerHeight={BarHeight + getBottomSpace()}
        // iphoneXBottomPadding={getBottomSpace()}
        leftMessageTextStyle={styles.leftMessageText}
        rightMessageTextStyle={styles.rightMessageText}
        rightMessageBackground={'black'}
        leftMessageBackground={'#F3F3F3'}
        usePopView={true}
        setPopItems={(type, index, text, message) => popItems(type, index, text, message)}
        showIsRead={true}
        userProfile={{
          id: currentAccount.id.toString(),
          avatar: currentAccount.avatar_url,
          nickName: currentAccount.nickname,
        }}
      />
    </View>
  );
};

const panalWidth = (width - 30 - 15 * 3) / 4;
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attation: {
    width: 45,
    height: 22,
    lineHeight: 22,
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: '#000',
    borderRadius: 2,
    overflow: 'hidden',
  },
  leftMessageText: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 19,
    borderBottomRightRadius: 19,
    borderBottomLeftRadius: 19,
    fontSize: 14,
    color: 'black',
    lineHeight: 22,
    letterSpacing: 1,
    fontWeight: '300',
  },
  rightMessageText: {
    borderTopLeftRadius: 19,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 19,
    borderBottomLeftRadius: 19,
    fontSize: 14,
    color: 'white',
    lineHeight: 22,
    letterSpacing: 1,
    fontWeight: '300',
    marginLeft: 2
  },
});

export default MediasPicker(ChartDetail);
