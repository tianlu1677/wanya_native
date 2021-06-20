import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  Pressable,
  Platform,
  StatusBar,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-picker';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Clipboard from '@react-native-community/clipboard';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {EventRegister} from 'react-native-event-listeners';
import {createConsumer} from '@rails/actioncable';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchPreviewImage} from '@/redux/actions';
import {ChatScreen} from '@/plugins/react-native-easy-chat-ui';
import {getCurrentTime} from '@/plugins/react-native-easy-chat-ui/app/chat/utils';
import ActionSheet from '@/components/ActionSheet';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import MediasPicker from '@/components/MediasPicker';
import {pagination} from '@/components/ScrollList';
import {BarHeight} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';
import Helper from '@/utils/helper';
import {getAccount, followAccount, unfollowAccount} from '@/api/account_api';
import {
  getChatGroupsConversations,
  getChatGroupsSendMessage,
  readSingleChatGroupMessage,
} from '@/api/chat_api';
import VideoModal from './video-modal';
import {translate, checkShowRule} from '../meta';

import {consumerWsUrl} from '@/utils/config';

const AddPhoto = require('@/assets/images/chat-photo.png');
const AddVideo = require('@/assets/images/chat-video.png');
import styles from './style';

const isIos = Platform.OS === 'ios';
const systemVersion = Math.ceil(DeviceInfo.getSystemVersion());
const videoSelectType = isIos && systemVersion < 14 ? 'imagePicker' : 'syanPicker';
const TransLateData = data => data.map(item => translate(item));
global.addEventListener = EventRegister.addEventListener;
global.removeEventListener = EventRegister.removeEventListener;

Sound.setCategory('Playback'); // Enable playback in silence mode

const ChartDetail = props => {
  const dispatch = useDispatch();
  const {navigation, route, imagePick, videoPick, uploadVideo, uploadAudio} = props;
  const {uuid, targetAccount} = route.params;
  const {
    account: {currentAccount},
    login: {auth_token},
  } = useSelector(state => state);
  let timer = null;
  let sound = null;
  const [pagin, setPagin] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoContent, setVideoContent] = useState(null);

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [targetAccountDetail, setTargetAccountDetail] = useState(null);
  const [messages, setMessages] = useState([]);
  const [audioPath, setAudioPath] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [hasPermission, setHasPermission] = useState(true);
  const [voiceHandle, setVoiceHandle] = useState(true);
  const [voiceVolume, setVoiceVolume] = useState(0);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [activeVoiceId, setActiveVoiceId] = useState(-1);

  const receivedConversation = conversation => {
    const uid = conversation?.uid;

    if (messages.findIndex(m => m.id === uid) > -1) {
      console.log('gooood'); // 存在则改状态
      // setMessages(m => m.concat(translate(conversation)));
    } else {
      console.log('no exist'); // 存在则改状态
      // setMessages(m => m.concat(translate(conversation)));
      // 不存在则新+1
    }
  };

  const chatChannel = useMemo(() => {
    // const url = `wss://xinxue.meirixinxue.com//cable?auth_token=${auth_token}`;
    return createConsumer(consumerWsUrl(auth_token)).subscriptions.create(
      {channel: 'ChatChannel', room: `${uuid}`},
      {
        received(data) {
          const uid = data.conversation?.uid;
          // if (messages.findIndex(m => m.id === uid) > -1) {
          //   console.log('gooood'); // 存在则改状态
          // } else {
          //   // setMessages(m => m.concat(translate(data.conversation)));
          //   // 不存在则新+1
          // }


          setMessages(m => {
            const index = m.findIndex(item => item.id === uid);
            if (index > -1) {
              m[index].sendStatus = 1;
              return m //m.concat(translate(data.conversation));
            } else {
              return m.concat(translate(data.conversation));
            }
          });
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
    try {
      console.log('params', params);
      // 先直接本地发送，接收数据后再排除掉当前列表中有相同的uid的数据;
      const uid = Helper.generateUuid();
      if(params.category === 'text') {
        const fakeData = {
          id: uid,
          type: params.conversation.category,
          content: params.conversation.content,
          targetId: currentAccount.id.toString(),
          chatInfo: {
            avatar: currentAccount.avatar_url,
            id: currentAccount.id.toString(),
            nickName: currentAccount.nickname,
          },
          renderTime: false,
          sendStatus: 0,
          time: new Date().getTime(),
        };
        console.log('fakeData', fakeData);
        setMessages(m => m.concat(fakeData));
      }
      console.log('newwwmessage', messages.map(x => x.id)); // 不能立刻查找到？ messages.findIndex(m => m.id === uid) > -1
      const paramsData = {conversation: {...params.conversation, uid: uid}, uuid: uuid};
      // console.log('realsemd', paramsData)
      await getChatGroupsSendMessage(paramsData);
      Toast.hide();
    } catch (e) {
      console.log('error', e);
      Toast.hide();
    }
  };
  const sendMessage = async (type, content, isInverted) => {
    if (type === 'text') {
      const params = {uuid, conversation: {category: type, content}};
      chatGroupSendMessage(params);
    }

    if (type === 'voice') {
      Toast.showLoading('发送中...');
      try {
        const result = await uploadAudio(content);
        const {url, seconds} = result.asset;
        const params = {uuid, conversation: {category: 'audio', metadata: {url, seconds}}};
        chatGroupSendMessage(params);
      } catch {
        Toast.hide();
      }
      Toast.hide();
    }
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

  const _requestAndroidPermission = async () => {
    try {
      const rationale = {title: '麦克风权限', message: '需要权限录制语音.', buttonPositive: '确定'};
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        rationale
      );
      setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    } catch (e) {
      console.log(e);
    }
  };

  const random = () => {
    if (!timer) {
      timer = setInterval(() => {
        const num = Math.floor(Math.random() * 10);
        setVoiceVolume(num);
      }, 500);
    }
  };

  const audioProgress = () => {
    AudioRecorder.onProgress = data => {
      setCurrentTime(Math.floor(data.currentTime === 0 ? currentTime + 0.25 : data.currentTime));
      setVoiceHandle(false);
      setVoiceVolume(Math.floor(data.currentMetering));
      random();
    };
  };

  const prepareRecordingPath = path => {
    AudioRecorder.prepareRecordingAtPath(path, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'High',
      AudioEncoding: 'aac',
      OutputFormat: 'aac_adts',
      AudioEncodingBitRate: 32000,
      MeteringEnabled: true,
    });
  };

  const initPath = async () => {
    if (!(await RNFS.exists(`${AudioUtils.DocumentDirectoryPath}/voice/`))) {
      RNFS.mkdir(`${AudioUtils.DocumentDirectoryPath}/voice/`);
    }
    const nowPath = `${AudioUtils.DocumentDirectoryPath}/voice/voice${Date.now()}.aac`;
    setAudioPath(nowPath);
    setCurrentTime(0);
    prepareRecordingPath(nowPath);
  };

  const _pause = async () => {
    try {
      await AudioRecorder.pauseRecording(); // Android 由于API问题无法使用此方法
    } catch (e) {
      console.log(e);
    }
  };

  const _resume = async () => {
    try {
      await AudioRecorder.resumeRecording(); // Android 由于API问题无法使用此方法
    } catch (e) {
      console.log(e);
    }
  };

  const _record = async () => {
    try {
      await AudioRecorder.startRecording();
    } catch (error) {
      console.log(error);
    }
  };

  const _stop = async () => {
    try {
      await AudioRecorder.stopRecording();
      timer && clearInterval(timer);
    } catch (error) {
      console.log(error);
    }
  };

  const playSound = (url, index) => {
    setActiveVoiceId(index);
    if (sound === null) {
      setVoiceLoading(true);
      sound = new Sound(url, '', error => {
        if (error) {
          setVoiceLoading(false);
          sound = null;
          return;
        }
        setVoiceLoading(false);
        setVoicePlaying(true);
        sound.play(success => setVoicePlaying(!success));
      });
    } else {
      setVoicePlaying(true);
      sound.play(success => setVoicePlaying(!success));
    }
  };

  const stopSound = (remove = false) => {
    sound && sound.stop();
    setVoicePlaying(false);
    if (remove) {
      sound = null;
    }
  };

  const onMessagePress = (type, index, content, message) => {
    if (type === 'image') {
      const data = {index: 0, visible: true, images: [{url: content}]};
      dispatch(dispatchPreviewImage(data));
    }

    if (type === 'video') {
      setVideoContent(message.content);
      setShowVideoModal(true);
    }

    if (type === 'voice') {
      if (voicePlaying) {
        if (index === activeVoiceId) {
          stopSound();
        } else {
          stopSound(true);
          playSound(content, index);
        }
      } else {
        if (index !== activeVoiceId) {
          stopSound(true);
        }
        playSound(content, index);
      }
    }
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
          try {
            const result = await props.uploadImage({uploadType: 'multipart', ...file});
            const {url, width, height} = result.asset;
            const params = {
              uuid,
              conversation: {category: 'image', metadata: {url, width, height}},
            };
            chatGroupSendMessage(params);
          } catch {
            Toast.hide();
          }
        }
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
          try {
            const ret = await uploadVideo(res[0], () => {});
            const {url, width, height} = ret.asset;
            const params = {
              uuid,
              conversation: {category: 'video', metadata: {url, width, height}},
            };
            chatGroupSendMessage(params);
          } catch {
            Toast.hide();
          }
        });
      }

      if (videoSelectType === 'imagePicker') {
        const options = {mediaType: 'video', videoQuality: 'low'};
        ImagePicker.launchImageLibrary(options, async response => {
          if (response.didCancel) {
            return;
          }
          Toast.showLoading('发送中...');
          try {
            const {origURL, width, height} = response;
            const params = {
              uuid,
              conversation: {category: 'video', metadata: {url: origURL, width, height}},
            };
            chatGroupSendMessage(params);
          } catch {
            Toast.hide();
          }
        });
      }
    }
  };

  const pressAvatar = (isSelf, targetId) => {
    navigation.navigate('AccountDetail', {accountId: targetId});
  };

  const onFollow = async () => {
    const {followed, id} = targetAccountDetail;
    followed ? await unfollowAccount(id) : await followAccount(id);
    const ret = await getAccount(id);
    Toast.show('关注成功');
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
      label: '个人主页',
      onPress: () => navigation.navigate('AccountDetail', {accountId: targetAccount.id}),
    },
    {
      id: 2,
      label: '举报',
      onPress: async () => {
        navigation.navigate('Report', {report_type: 'Account', report_type_id: targetAccount.id});
      },
    },
  ];

  const loadHistory = () => {
    if (pagin.hasMore) {
      loadData(pagin.nextPage);
    }
  };

  const loadData = async page => {
    const per_page = 10;
    const res = await getChatGroupsConversations({uuid, page, per_page});
    const newMessages = TransLateData(checkShowRule(res.data.conversations.reverse(), 'send_at'));
    setPagin(pagination(res.headers));
    setMessages(page === 1 ? newMessages : [...messages, ...newMessages]);
  };

  const loadAccount = async () => {
    const ret = await getAccount(targetAccount.id);
    setTargetAccountDetail(ret.data.account);
  };

  useEffect(() => {
    loadAccount();
    loadData(1);
    return () => {
      chatChannel.unsubscribe();
      readSingleChatGroupMessage({uuid: uuid});
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: targetAccount.nickname,
    });
    if (targetAccountDetail) {
      const {followed} = targetAccountDetail;
      navigation.setOptions({
        title: targetAccountDetail.nickname,
        headerStyle: {borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#EBEBEB'},
        headerRightContainerStyle: {paddingRight: 4},
        headerRight: () => (
          <View style={styles.headerRight}>
            {!followed && (
              <Text style={styles.attation} onPress={onFollow}>
                关注
              </Text>
            )}
            <Pressable onPress={() => setShowActionSheet(true)}>
              <IconFont name={'ziyuan'} color={'#ccc'} size={26} />
            </Pressable>
          </View>
        ),
      });
    }
  }, [targetAccountDetail]);

  return (
    <View style={{display: 'flex', flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <ChatScreen
        chatWindowStyle={{backgroundColor: '#fff'}}
        messageList={messages}
        sendMessage={sendMessage}
        panelSource={[
          {title: '照片', icon: <FastImg source={AddPhoto} style={styles.panelImage} />},
          {title: '视频', icon: <FastImg source={AddVideo} style={styles.panelImage} />},
        ]}
        renderPanelRow={RenderPanelRow}
        panelContainerStyle={styles.panelContainerStyle}
        useEmoji={true}
        isIPhoneX={Boolean(isIphoneX())}
        inverted={messages.length > 5}
        headerHeight={BarHeight + 50}
        iphoneXBottomPadding={10}
        pressAvatar={pressAvatar}
        flatListProps={{style: {paddingTop: RFValue(10)}}}
        leftMessageTextStyle={styles.leftMessageText}
        rightMessageTextStyle={styles.rightMessageText}
        rightMessageBackground={'black'}
        leftMessageBackground={'#F3F3F3'}
        voiceRightLoadingColor="#000"
        itemContainerStyle={styles.itemContainerStyle}
        avatarStyle={styles.avatarStyle}
        inputOutContainerStyle={styles.inputOutContainerStyle}
        inputStyle={styles.inputStyle}
        placeholder="请输入新消息"
        emojiIcon={<IconFont name={'biaoqing'} size={24} />}
        plusIcon={<IconFont name={'liaotian'} size={24} />}
        voiceIcon={<IconFont name={'yuyin'} size={24} />}
        usePopView={true}
        setPopItems={popItems}
        showIsRead={false}
        loadHistory={loadHistory}
        onMessagePress={onMessagePress}
        audioPath={audioPath}
        audioHasPermission={hasPermission}
        checkPermission={AudioRecorder.requestAuthorization}
        requestAndroidPermission={_requestAndroidPermission}
        audioOnProgress={audioProgress}
        audioInitPath={initPath}
        audioRecord={_record}
        audioStopRecord={_stop}
        audioPauseRecord={_pause}
        audioResumeRecord={_resume}
        audioCurrentTime={currentTime}
        audioHandle={voiceHandle}
        setAudioHandle={satus => setVoiceHandle(satus)}
        voiceLoading={voiceLoading}
        voicePlaying={voicePlaying}
        voiceVolume={voiceVolume}
        pressOutText="松开发送"
        renderMessageTime={time => (
          <View style={styles.chatTimeWrap}>
            <Text style={styles.chatTime}>{getCurrentTime(Math.ceil(time))}</Text>
          </View>
        )}
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

      {videoContent ? (
        <VideoModal
          visible={showVideoModal}
          message={videoContent}
          onCancel={() => setShowVideoModal(false)}
        />
      ) : null}
    </View>
  );
};

export default MediasPicker(ChartDetail);
