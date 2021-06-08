import React, {useEffect, useState, useMemo} from 'react';
import {View, Text, Pressable, Platform, StatusBar} from 'react-native';
import {isIphoneX, getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-picker';
import {EventRegister} from 'react-native-event-listeners';
import {createConsumer} from '@rails/actioncable';
import {useSelector} from 'react-redux';
import {ChatScreen} from '@/plugins/react-native-easy-chat-ui';
import ActionSheet from '@/components/ActionSheet';
import Toast from '@/components/Toast';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import Clipboard from '@react-native-community/clipboard';
import MediasPicker from '@/components/MediasPicker';
import {BarHeight} from '@/utils/navbar';
import {reportContent} from '@/api/secure_check';
import {getAccount, followAccount, unfollowAccount} from '@/api/account_api';
import {getChatGroupsConversations, getChatGroupsSendMessage} from '@/api/chat_api';
import {translate, checkShowRule} from '../meta';

const AddPhoto = require('@/assets/images/add-photo.png');
const AddVideo = require('@/assets/images/add-video.png');

import styles from './style';

const isIos = Platform.OS === 'ios';
const systemVersion = Math.ceil(DeviceInfo.getSystemVersion());
const videoSelectType = isIos && systemVersion < 14 ? 'imagePicker' : 'syanPicker';
const TransLateData = data => data.map(item => translate(item));

global.addEventListener = EventRegister.addEventListener;
global.removeEventListener = EventRegister.removeEventListener;

export const pagination = (headers = {}) => {
  const currentPage = Number(headers['x-current-page']);
  const perPage = Number(headers['x-per-page'] || headers['X-Page-Items']);
  const total = Number(headers['x-total']);
  const hasMore = currentPage * perPage < total;
  const nextPage = hasMore ? currentPage + 1 : currentPage;
  return {hasMore: hasMore, nextPage: nextPage, page: currentPage, total: total};
};

const ChartDetail = props => {
  const {navigation, route, imagePick, videoPick, uploadVideo} = props;
  const {uuid, targetAccount} = route.params;

  const {
    account: {currentAccount},
    login: {auth_token},
  } = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [pagin, setPagin] = useState(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [targetAccountDetail, setTargetAccountDetail] = useState(null);
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

  const popItems = (type, index, text, message) => {
    let items = [];

    if (type === 'text') {
      const copyItem = [{title: '复制', onPress: () => Clipboard.setString(text)}];
      items = items.concat(copyItem);
    }

    if (message.targetId === currentAccount.id.toString()) {
      const delItem = [
        {
          title: '删除',
          onPress: () => {
            chatChannel.deleteMessage(message.id);
            messages.splice(index, 1);
            setMessages([...messages]);
          },
        },
      ];

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
          chatGroupSendMessage(params);
          Toast.hide();
        });
      }
    }
  };

  const pressAvatar = (isSelf, targetId) => {
    if (!isSelf) {
      navigation.navigate('AccountDetail', {accountId: targetId});
    }
  };

  const onFollow = async () => {
    const {followed, id} = targetAccountDetail;
    followed ? await unfollowAccount(id) : await followAccount(id);
    const ret = await getAccount(id);
    setTargetAccountDetail(ret.data.account);
  };

  const RenderPanelRow = (data, index) => (
    <Pressable key={index} style={styles.panelImageWrap} onPress={() => onMediaPicker(index)}>
      <View>{data.icon}</View>
      <Text style={styles.panelText}>{data.title}</Text>
    </Pressable>
  );

  const actionItems = [
    {
      id: 1,
      label: '拉黑',
      onPress: () => {
        const data = {reason: '拉黑', report_type: 'Account', report_type_id: targetAccount.id};
        reportContent(data).then(res => {
          Toast.showError('已拉黑', {duration: 500});
        });
      },
    },
    {
      id: 2,
      label: '投诉',
      onPress: async () => {
        navigation.push('Report', {report_type: 'Account', report_type_id: targetAccount.id});
      },
    },
  ];

  const loadHistory = () => {
    if (pagin.hasMore) {
      loadData(pagin.nextPage);
    }
  };

  const loadData = async page => {
    if (page === 1) {
      const ret = await getAccount(targetAccount.id);
      setTargetAccountDetail(ret.data.account);
    }
    setLoading(false);
    const per_page = 10;
    const res = await getChatGroupsConversations({uuid, page, per_page});
    const newMessages = TransLateData(checkShowRule(res.data.conversations.reverse(), 'send_at'));
    setPagin(pagination(res.headers));
    setMessages(page === 1 ? newMessages : [...messages, ...newMessages]);
    setLoading(false);
  };

  useEffect(() => {
    loadData(1);
    return () => {
      chatChannel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (targetAccountDetail) {
      const {followed, following} = targetAccountDetail;
      navigation.setOptions({
        title: targetAccountDetail.nickname,
        headerRight: () => (
          <View style={styles.headerRight}>
            <Text style={followed ? styles.attation : styles.noattion} onPress={onFollow}>
              {followed && following ? '互相关注' : followed ? '已关注' : '关注'}
            </Text>
            <Pressable style={styles.shareWrap} onPress={() => setShowActionSheet(true)}>
              <IconFont name={'ziyuan'} color={'#ccc'} size={26} />
            </Pressable>
          </View>
        ),
      });
    }
  }, [targetAccountDetail]);

  return loading ? (
    <Loading />
  ) : (
    <View>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
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
        inverted={messages.length > 10}
        headerHeight={BarHeight + 50}
        iphoneXBottomPadding={20}
        // headerHeight={BarHeight + getBottomSpace()}
        // iphoneXBottomPadding={getBottomSpace()}
        pressAvatar={pressAvatar}
        leftMessageTextStyle={styles.leftMessageText}
        rightMessageTextStyle={styles.rightMessageText}
        rightMessageBackground={'black'}
        leftMessageBackground={'#F3F3F3'}
        usePopView={true}
        setPopItems={popItems}
        showIsRead={false}
        loadHistory={loadHistory}
        userProfile={{
          id: currentAccount.id.toString(),
          avatar: currentAccount.avatar_url,
          nickName: currentAccount.nickname,
        }}
      />

      <ActionSheet
        actionItems={actionItems}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
      />
    </View>
  );
};

export default MediasPicker(ChartDetail);
