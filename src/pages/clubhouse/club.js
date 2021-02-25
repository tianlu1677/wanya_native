import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import Loading from '@/components/Loading';
import {RFValue} from '@/utils/response-fontsize';
import {SCREEN_WIDTH} from '@/utils/navbar';
// import RtcEngine, {ChannelProfile, ClientRole} from 'react-native-agora';

// RtcEngine.create('53c8fb85dec8457eaca749f16ab621f8');
const ClubIndex = ({route, navigation}) => {
  // const APPID = '53c8fb85dec8457eaca749f16ab621f8';

  // const [channelId, setChannelId] = useState('room3');
  // const [stringUid, setStringUid] = useState('1000000005');
  // const [isJoined, setIsJoined] = useState(false);
  // const [openMicrophone, setopenMicrophone] = useState(true);
  // const [_engine, setEngine] = useState(null);
  // const [enableSpeakerphone, setenableSpeakerphone] = useState(true);

  // // this._engine = RtcEngine

  // const _initEngine = async () => {
  //   // this._engine = RtcEngine
  //   const engine = await RtcEngine.create(APPID);
  //   const _engine = engine
  //   setEngine(engine)
  //   console.log('this._engine', this._engine);
  //   _addListeners();
  //   await _engine.enableAudio();
  //   await _engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
  //   await _engine.setClientRole(ClientRole.Broadcaster);
  // };

  // const _addListeners = () => {
  //   _engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
  //     console.info('JoinChannelSuccess', channel);
  //     // setIsJoined(true);
  //     // setState({ isJoined: true });
  //   });
  //   _engine?.addListener('LeaveChannel', stats => {
  //     console.info('LeaveChannel', stats);
  //     // setIsJoined(false);
  //     // setState({ isJoined: false });
  //   });
  // };

  // const _switchMicrophone = () => {
  //   // const { openMicrophone } = state;
  //   _engine
  //     ?.enableLocalAudio(!openMicrophone)
  //     .then(() => {
  //       // setState({ openMicrophone: !openMicrophone });
  //       setopenMicrophone(!openMicrophone);
  //     })
  //     .catch(err => {
  //       console.warn('enableLocalAudio', err);
  //     });
  // };

  // const _switchSpeakerphone = () => {
  //   // const { enableSpeakerphone } = state;
  //   _engine
  //     ?.setEnableSpeakerphone(!enableSpeakerphone)
  //     .then(() => {
  //       setenableSpeakerphone(!enableSpeakerphone);
  //       // setState({ enableSpeakerphone: !enableSpeakerphone });
  //     })
  //     .catch(err => {
  //       console.warn('setEnableSpeakerphone', err);
  //     });
  // };

  // const _joinChannel = async () => {
  //   // const { channelId, stringUid } = state;
  //   // await _initEngine();
  //   const token =
  //     '00653c8fb85dec8457eaca749f16ab621f8IACP5xShOmpzyM89Q00FvziPwVKtc8aELJEGO0cQ0N1VMwZbfQoAAAAAEABwjq6Pv7YfYAEAAQC+th9g';
  //   console.log('xxxx', token, channelId, stringUid);
  //   console.log(_engine.joinChannelWithUserAccount)
  //   try {
  //     const res = await _engine.joinChannelWithUserAccount(token, channelId, null, 1000000005);
  //     console.log('res', res);
  //   } catch (e) {
  //     console.log('_joinChannel error', JSON.stringify(e));
  //   }

  //   // config.token,
  //   // channelId,
  //   // stringUid
  // };

  // const _leaveChannel = async () => {
  //   await _engine?.leaveChannel();
  // };

  // const _getUserInfo = () => {
  //   _engine
  //     .getUserInfoByUserAccount(stringUid)
  //     .then(userInfo => {
  //       // console.debug('getUserInfoByUserAccount', userInfo);
  //       // @ts-ignore
  //       alert(JSON.stringify(userInfo));
  //     })
  //     .catch(err => {
  //       console.error('getUserInfoByUserAccount', err);
  //     });
  // };

  // useEffect(() => {
  //   _initEngine()
  // }, []);

  return (
    <View style={{flex: 1}}>
      {/*<View style={styles.top}>
        <TextInput
          style={styles.input}
          onChangeText={text => setChannelId(text)}
          placeholder={'Channel ID'}
          value={channelId}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setStringUid(text)}
          placeholder={'String User ID'}
          value={stringUid}
        />
      </View>

      <Button
        // onPress={isJoined ? () => _leaveChannel() : () => _joinChannel()}
        onPress={() => _joinChannel()}
        title={`${isJoined ? 'Leave' : 'Join'} channel`}
      />
      <View style={{}}>
        <Button onPress={_getUserInfo} title={'Get userInfo'} />
      </View>

      <View style={{}}>
        <Button onPress={_switchMicrophone} title={`Microphone ${openMicrophone ? 'on' : 'off'}`} />
        <Button
          onPress={_switchSpeakerphone}
          title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
        />
      </View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  float: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  top: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default ClubIndex;
