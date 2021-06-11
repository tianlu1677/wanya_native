import React, {useEffect, useState, useMemo, useRef} from 'react';
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
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import Clipboard from '@react-native-community/clipboard';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {EventRegister} from 'react-native-event-listeners';
import {createConsumer} from '@rails/actioncable';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchPreviewImage} from '@/redux/actions';
import {ChatScreen} from '@/plugins/react-native-easy-chat-ui';
import ActionSheet from '@/components/ActionSheet';
import Toast from '@/components/Toast';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import MediasPicker from '@/components/MediasPicker';
import {pagination} from '@/components/ScrollList';
import {BarHeight} from '@/utils/navbar';
import {getAccount, followAccount, unfollowAccount} from '@/api/account_api';
import {getChatGroupsConversations, getChatGroupsSendMessage} from '@/api/chat_api';
import {translate, checkShowRule} from '../meta';
import { consumerWsUrl } from '@/utils/config'
const AddPhoto = require('@/assets/images/add-photo.png');
const AddVideo = require('@/assets/images/add-video.png');

import styles from './style';

const isIos = Platform.OS === 'ios';
const systemVersion = Math.ceil(DeviceInfo.getSystemVersion());
const videoSelectType = isIos && systemVersion < 14 ? 'imagePicker' : 'syanPicker';
const TransLateData = data => data.map(item => translate(item));
global.addEventListener = EventRegister.addEventListener;
global.removeEventListener = EventRegister.removeEventListener;

const ChartDetail = props => {
  const dispatch = useDispatch();
  const videoRef = useRef('');
  const {navigation, route, imagePick, videoPick, uploadVideo, uploadAudio} = props;
  const {uuid, targetAccount} = route.params;
  const {
    account: {currentAccount},
    login: {auth_token},
  } = useSelector(state => state);
  let timer = null;
  let sound = null;

  const [loading, setLoading] = useState(true);
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

  const chatChannel = useMemo(() => {
    // const url = `wss://xinxue.meirixinxue.com//cable?auth_token=${auth_token}`;
    return createConsumer(consumerWsUrl(auth_token)).subscriptions.create(
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
    try {
      await getChatGroupsSendMessage(params);
      Toast.hide();
    } catch {
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

  const onMessagePress = (type, index, content) => {
    if (type === 'image') {
      const data = {index: 0, visible: true, images: [{url: content}]};
      dispatch(dispatchPreviewImage(data));
    }

    if (type === 'video') {
      // console.log(videoRef);
      console.log(type, content);
      console.log('videoRef', videoRef);

      setVideoContent(content);
      setShowVideoModal(true);
      // const data = {index: 0, visible: true, images: [{url: content}]};
      // dispatch(dispatchPreviewImage(data));
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
            const {url} = result.asset;
            const params = {uuid, conversation: {category: 'image', metadata: {url}}};
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
            const {url} = ret.asset;
            const params = {uuid, conversation: {category: 'video', metadata: {url}}};
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
            const {origURL} = response;
            const params = {uuid, conversation: {category: 'video', metadata: {url: origURL}}};
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
    if (showVideoModal && videoRef && videoRef.current) {
      console.log('222', videoRef);
      videoRef.current.presentFullscreenPlayer();
    }
  }, [showVideoModal]);

  console.log(videoRef);

  useEffect(() => {
    if (targetAccountDetail) {
      const {followed} = targetAccountDetail;
      navigation.setOptions({
        title: targetAccountDetail.nickname,
        headerStyle: {borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#ebebeb'},
        headerRightContainerStyle: {paddingRight: 10},
        headerRight: () =>
          !followed ? (
            <View style={styles.headerRight}>
              <Text style={styles.attation} onPress={onFollow}>
                关注
              </Text>
              <Pressable onPress={() => setShowActionSheet(true)}>
                <IconFont name={'ziyuan'} color={'#ccc'} size={26} />
              </Pressable>
            </View>
          ) : null,
      });
    }
  }, [targetAccountDetail]);

  return loading ? (
    <Loading />
  ) : (
    <View style={{display: 'flex', flex: 1}}>
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
        itemContainerStyle={styles.itemContainerStyle}
        avatarStyle={styles.avatarStyle}
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

      {showVideoModal ? (
        <Modal
          isVisible={showVideoModal}
          // style={{flex: 1, margin: 0}}
          // deviceHeight={1000}
          // transparent={true}
          // onRequestClose={() => onOpen(false)}
          // onBackdropPress={() => onOpen(false)}
          statusBarTranslucent
          // onSwipeComplete={() => onOpen(false)}
          useNativeDriver
          propagateSwipe
          backdropColor="black"
          backdropOpacity={1}
          hideModalContentWhileAnimating={true}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInTiming={300}
          animationOutTiming={500}
          avoidKeyboard>
          <Pressable
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => setShowVideoModal(false)}>
            <Video
              ref={videoRef}
              style={styles.video}
              source={{uri: videoContent}}
              paused={true}
              autoPlay
              resizeMode="cover"
            />
          </Pressable>
        </Modal>
      ) : null}
    </View>
  );
};

export default MediasPicker(ChartDetail);
