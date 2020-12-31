import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Video from 'react-native-video';
import TabViewList from '@/components/TabView';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import IconFont from '@/iconfont';
import {useDispatch, useSelector} from 'react-redux';
import {
  getRecommendPosts,
  getFollowedPosts,
  getFollowedNodePosts,
  getChannelPosts,
} from '@/api/home_api';
import {SAFE_TOP} from '@/utils/navbar';
import {dispatchFetchUploadTopic, changeUploadStatus} from '@/redux/actions';
import {BadgeMessage} from '@/components/NodeComponents';
import {dispatchBaseCurrentAccount, dispathUpdateNodes} from '@/redux/actions';
import {dispatchCurrentAccount, dispatchFetchCategoryList} from '@/redux/actions';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import FastImg from '@/components/FastImg';
import {AllNodeImg} from '@/utils/default-image';
import {Search} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import MediasPicker from '@/components/MediasPicker';

const Recommend = props => {
  const dispatch = useDispatch();
  const [inputRef, setinputRef] = useState(null);
  const [currentKey, setCurrentKey] = useState('follow');
  const currentAccount = useSelector(state => state.account.currentBaseInfo);
  const uploadStatus = useSelector(state => state.topic.uploadStatus);
  const home = useSelector(state => state.home);

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

  const FollowListPage = () => <SingleList request={{api: getFollowedPosts}} />;

  const RecommendPage = () => (
    <SingleList request={{api: getRecommendPosts}} type="recommend" loadType="more" />
  );

  const NodeListPage = () => {
    return (
      <SingleList
        type="node-recommend"
        request={{api: getFollowedNodePosts}}
        ListHeaderComponent={<NodeScrollView {...props} />}
        renderEmpty={
          <View style={styles.emptyWrap}>
            <View style={styles.emptyTextWrap}>
              <Text style={styles.emptyText}>你还没有加入圈子</Text>
              <Text style={styles.emptyText}>点击发现更多圈子</Text>
            </View>
            <Text style={styles.moreNode} onPress={() => props.navigation.navigate('NodeIndex')}>
              发现更多圈子
            </Text>
          </View>
        }
      />
    );
  };

  const channels = home.channels.map(item => {
    const params = {channel_id: item.id, channel_name: item.name};
    return {
      key: item.name,
      title: item.name,
      component: () =>
        item.display_style === 'single' ? (
          <SingleList request={{api: getChannelPosts, params}} />
        ) : (
          <DoubleList request={{api: getChannelPosts, params}} />
        ),
    };
  });

  const UnreadMessageCount = () => {
    if (!currentAccount || currentAccount.new_message_count === 0) {
      return 0;
    }
    return currentAccount.new_message_count;
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(dispatchBaseCurrentAccount());
    }, [])
  );

  useEffect(() => {
    dispatch(dispatchCurrentAccount());
    dispatch(dispatchFetchCategoryList());
    if (uploadStatus) {
      const upload = (file, cb) => props.uploadVideo(file, cb);
      dispatch(changeUploadStatus({...uploadStatus, status: 'upload', progress: 0, upload}));
      dispatch(dispatchFetchUploadTopic({...uploadStatus, upload}));
    }
  }, []);

  return (
    <>
      <View style={{flex: 1, position: 'relative'}}>
        <View style={{height: SAFE_TOP, backgroundColor: 'black'}} />
        {uploadStatus ? (
          <View style={[styles.uploadWrap]}>
            <UploadTopic />
            <CallBackVideo />
          </View>
        ) : null}

        <FocusAwareStatusBar barStyle="light-content" translucent={false} />
        <Search
          getRef={refs => setinputRef(refs)}
          style={{backgroundColor: '#000'}}
          inputStyle={{borderRadius: RFValue(18), backgroundColor: '#fff'}}
          height={RFValue(38)}
          placeholderTextColor="#000"
          placeholder="搜索帖子、文章、圈子等内容"
          onFocus={() => {
            inputRef.blur();
            props.navigation.push('SearchIndex');
          }}>
          <Pressable
            style={styles.message}
            onPress={() => props.navigation.navigate('NotifyIndex')}>
            <View style={styles.message_icon}>
              <IconFont name="notice" color={'white'} size={20} />
              <BadgeMessage
                size={'small'}
                value={UnreadMessageCount()}
                containerStyle={{...styles.badgeContainer, left: UnreadMessageCount() > 9 ? 8 : 14}}
              />
            </View>
          </Pressable>
        </Search>

        {channels.length > 0 && (
          <View style={styles.wrapper}>
            <TabViewList
              center={false}
              bottomLine={true}
              lazy={true}
              currentKey={currentKey}
              onChange={key => setCurrentKey(key)}
              size="small"
              tabData={[
                {
                  key: 'follow',
                  title: '关注',
                  component: FollowListPage,
                },
                {
                  key: 'recommend',
                  title: '推荐',
                  component: RecommendPage,
                },
                {
                  key: 'lasted',
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

const NodeScrollView = props => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentBaseInfo);
  const nodes = useSelector(state => state.home.followNodes);

  useFocusEffect(
    useCallback(() => {
      dispatch(dispathUpdateNodes(currentAccount.id));
    }, [])
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.nodeView}>
      <Pressable style={styles.nodeWrap} onPress={() => props.navigation.push('NodeIndex')}>
        <FastImg style={styles.nodeImg} source={{uri: AllNodeImg}} />
        <Text style={styles.nodeName} numberOfLines={1}>
          全部圈子
        </Text>
      </Pressable>
      {nodes.length > 0 &&
        nodes.map(node => {
          return (
            <Pressable
              key={node.id}
              style={styles.nodeWrap}
              onPress={() => props.navigation.push('NodeDetail', {nodeId: node.id})}>
              <FastImg style={styles.nodeImg} source={{uri: node.cover_url}} />
              <Text
                style={styles.nodeName}
                adjustsFontSizeToFit={false}
                minimumFontScale={1}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {node.name}
              </Text>
            </Pressable>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: -5,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  message: {
    width: 50,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeView: {
    backgroundColor: '#fff',
    paddingLeft: 14,
    paddingTop: 12,
    paddingBottom: 7,
    marginBottom: 9,
  },
  nodeWrap: {
    width: 56,
    marginRight: 15,
  },
  nodeImg: {
    width: 56,
    height: 56,
  },
  nodeName: {
    fontSize: 11,
    marginTop: 5,
    width: 60,
    maxHeight: 18,
    minHeight: 16,
    height: 18,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '300',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
  },
  emptyTextWrap: {
    flexDirection: 'column',
    marginTop: 110,
  },
  emptyText: {
    lineHeight: 23,
    fontSize: 14,
    textAlign: 'center',
    color: '#BDBDBD',
  },
  moreNode: {
    width: 243,
    height: 45,
    lineHeight: 45,
    backgroundColor: '#000',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
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
