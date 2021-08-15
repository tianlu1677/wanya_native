import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Video from 'react-native-video';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import {RecommendSearch} from '@/components/NodeComponents';
import MediasPicker from '@/components/MediasPicker';
import TabView from '@/components/TabView';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import {getChannelPosts} from '@/api/home_api';
import {recordDeviceInfo, ahoyTrackEvents} from '@/api/settings_api';
import {syncDeviceToken} from '@/api/app_device_api';
import {getLocationInfo, loadLocation} from './getLocation';
import deviceInfo from '@/utils/device_info';
import {consumerWsUrl} from '@/utils/config';
import {createConsumer} from '@rails/actioncable';
import {
  dispatchFetchCategoryList,
  dispatchFetchLabelList,
  dispatchBaseCurrentAccount,
  dispatchCurrentAccount,
  dispatchFetchUploadTopic,
  changeUploadStatus,
} from '@/redux/actions';
import LongVideoList from '@/components/List/long-video-list';
import FollowListPage from './follow-list-post';
import NodeListPage from './node-list-page';
import RecommendListPage from './recommend-list-post';
import NearbyListPage from './nearby-list-post';
import DownLoadModal from './download-modal';

const Recommend = props => {
  const dispatch = useDispatch();
  const defaultKey = props.route.params && props.route.params.activityKey;
  const uploadStatus = useSelector(state => state.topic.uploadStatus);
  const auth_token = useSelector(state => state.login.auth_token);
  const home = useSelector(state => state.home);
  const [currentKey, setCurrentKey] = useState(defaultKey || 'recommend');

  const MemoVideo = React.memo(() => {
    const {content} = uploadStatus;
    return (
      <Video
        style={styles.video}
        source={{uri: content.video.uri}}
        paused={true}
        resizeMode="cover"
      />
    );
  });

  const onlineChannel = useMemo(() => {
    // const url = `wss://xinxue.meirixinxue.com//cable?auth_token=${auth_token}`;
    return createConsumer(consumerWsUrl(auth_token)).subscriptions.create(
      {channel: 'OnlineChannel'},
      {
        initialized() {},
        connected() {},
        disconnected() {},
        rejected() {},
        unsubscribe() {},
        appear() {},
      }
    );
  }, []);

  // 同步用户是否在线
  const appearOnline = () => {
    setInterval(() => {
      onlineChannel.perform('appear');
    }, 5000);
  };

  const CallBackVideo = useCallback(() => <MemoVideo />, []);

  const UploadTopic = () => {
    const {status, progress} = uploadStatus;
    return (
      <View style={[{zIndex: 3, alignItems: 'center'}]}>
        <View style={styles.videoWrap}>
          <View style={[styles.opacity]} />
          {['upload', 'publish'].includes(status) && (
            <View style={styles.progress}>
              <Text style={styles.num}>{progress}</Text>
              <Text style={styles.percent}>%</Text>
            </View>
          )}
          {status === 'done' && <IconFont name="chose-success" color={'white'} size={20} />}
        </View>
        <Text style={styles.uploadText}>
          {status === 'upload' && '上传中'}
          {status === 'publish' && '发布中'}
          {status === 'done' && '已发布'}
        </Text>
      </View>
    );
  };

  const channels = home.channels.map(item => {
    const params = {channel_id: item.id, channel_name: item.name};
    return {
      key: item.name,
      title: item.name,
      component: () => {
        let component = null;
        if (item.display_style === 'single') {
          component = (
            <SingleList
              request={{api: getChannelPosts, params}}
              type="list"
              style={{paddingBottom: RFValue(50)}}
            />
          );
        }
        if (item.display_style === 'double') {
          component = (
            <DoubleList
              request={{api: getChannelPosts, params}}
              style={{paddingBottom: RFValue(50)}}
            />
          );
        }
        if (item.display_style === 'long_video') {
          component = (
            <LongVideoList
              request={{api: getChannelPosts, params}}
              type="wanpian"
              style={{paddingBottom: RFValue(50)}}
            />
          );
        }

        if (item.display_style === 'nearby') {
          component = <NearbyListPage />;
        }

        return component;
      },
    };
  });

  const onChange = async (key, title) => {
    ahoyTrackEvents({
      name: `click_${key}`,
      properties: {title: title, page: 'recommend'},
      page: 'recommend',
    });

    const {location} = home;
    if (key === 'nearby' && (!location.latitude || !location.longitude)) {
      getLocationInfo(false, result => {
        if (result) {
          dispatch({type: action.GET_LOCATION, value: result.position.coords});
        }
        setCurrentKey(key);
      });
    } else {
      setCurrentKey(key);
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(dispatchBaseCurrentAccount());
    }, [])
  );

  useEffect(() => {
    syncDeviceToken();
    recordDeviceInfo(deviceInfo);
    appearOnline(); // 是否在线
    dispatch(dispatchCurrentAccount());
    dispatch(dispatchFetchCategoryList());
    dispatch(dispatchFetchLabelList());

    if (uploadStatus) {
      const upload = (file, cb) => props.uploadVideo(file, cb);
      dispatch(changeUploadStatus({...uploadStatus, status: 'upload', progress: 0, upload}));
      dispatch(dispatchFetchUploadTopic({...uploadStatus, upload}));
    }
    setTimeout(() => {
      // 如果在这里请求的话，必须要等待1s之后才可以
      loadLocation(dispatch);
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'white'} translucent={false} />
      <DownLoadModal />
      <View style={{flex: 1, position: 'relative'}}>
        <RecommendSearch />
        {uploadStatus ? (
          <View style={[styles.uploadWrap]}>
            <UploadTopic />
            <CallBackVideo />
          </View>
        ) : null}
        {channels.length > 0 && (
          <View style={styles.wrapper}>
            <TabView
              currentKey={currentKey}
              onChange={onChange}
              align="left"
              bottomLine={true}
              separator={false}
              tabData={[
                {
                  key: 'follow',
                  title: '关注',
                  component: FollowListPage,
                },
                {
                  key: 'recommend',
                  title: '推荐',
                  component: RecommendListPage,
                },
                {
                  key: 'nodes',
                  title: '圈子',
                  component: NodeListPage,
                },
                ...channels,
              ]}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  uploadWrap: {
    width: 72,
    height: 84,
    backgroundColor: '#000',
    opacity: 0.8,
    borderRadius: 5,
    position: 'absolute',
    left: 14,
    top: '50%',
    marginTop: -42,
    alignItems: 'center',
    zIndex: 3,
  },
  videoWrap: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  video: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderColor: '#fff',
    borderWidth: 2,
    position: 'absolute',
    top: '50%',
    marginTop: -42 + 10,
    left: 13,
    zIndex: 2,
    overflow: 'hidden',
  },
  opacity: {
    width: 46,
    height: 46,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#000',
    borderRadius: 23,
    borderColor: '#fff',
    borderWidth: 2,
    opacity: 0.4,
  },
  progress: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    position: 'relative',
    zIndex: 2,
  },
  num: {
    fontSize: 16,
    color: '#fff',
  },
  percent: {
    fontSize: 7,
    color: '#fff',
    marginBottom: 3,
    position: 'absolute',
    bottom: 0,
    right: -8,
  },
  uploadText: {
    color: '#fff',
    fontSize: 10,
    marginTop: 8,
  },
});

export default MediasPicker(Recommend);
