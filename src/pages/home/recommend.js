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
import {BadgeMessage} from '@/components/NodeComponents';
import {dispatchBaseCurrentAccount, dispathUpdateNodes} from '@/redux/actions';
import {dispatchCurrentAccount, dispatchFetchCategoryList} from '@/redux/actions';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import FastImg from '@/components/FastImg';
import {AllNodeImg} from '@/utils/default-image';
import {Search} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';

const Recommend = props => {
  const dispatch = useDispatch();
  const [inputRef, setinputRef] = useState(null);
  const [currentKey, setCurrentKey] = useState('follow');
  const currentAccount = useSelector(state => state.account.currentBaseInfo);
  const uploadStatus = useSelector(state => state.topic.uploadStatus);
  const home = useSelector(state => state.home);

  // 是否展示上传topic模块
  const isShowUploadTopic = () => {
    if (
      uploadStatus &&
      uploadStatus.status &&
      ['upload', 'publish'].includes(uploadStatus.status)
    ) {
      return true;
    }
    return false;
  };

  const UploadTopic = () => {
    return (
      <View style={styles.uploadWrap}>
        <View style={styles.videoWrap}>
          <Video
            style={styles.video}
            // source={{uri: uploadStatus.content.video.uri}}
            source={{
              uri: 'http://xinxuefile.meirixinxue.com/assets/e97cc623812f64d7603a2ba45578f658.mp4',
            }}
            resizeMode={'cover'}
            paused={true}
          />
          <View style={[styles.video, styles.opacity]} />
          {/* <View style={styles.progress}>
            <Text style={styles.num}>{uploadStatus.progress}</Text>
            <Text style={styles.num}>{100}</Text>
            <Text style={styles.percent}>%</Text>
          </View> */}
          <IconFont name="chose-success" color={'white'} size={20} />
        </View>
        <Text style={styles.uploadText}>
          上传中
          {/* {uploadStatus.status === 'upload' && '上传中'}
          {uploadStatus.status === 'publish' && '发布中'}
          {uploadStatus.status === 'done' && '发布成功'} */}
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
        item.condition === 'single' ? (
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
  }, []);

  return (
    <>
      <View style={{flex: 1, position: 'relative'}}>
        <View style={{height: SAFE_TOP, backgroundColor: 'black'}} />
        {/* {isShowUploadTopic() ? <UploadTopic /> : null} */}
        {<UploadTopic />}
        <FocusAwareStatusBar barStyle="light-content" translucent={false} />
        <Search
          getRef={refs => setinputRef(refs)}
          style={{backgroundColor: '#000'}}
          inputStyle={{borderRadius: 18, backgroundColor: '#fff'}}
          height={RFValue(36)}
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
    height: 85,
    backgroundColor: '#000',
    opacity: 0.8,
    borderRadius: 5,
    position: 'absolute',
    left: 16,
    top: '50%',
    marginTop: -42,
    zIndex: 1,
    alignItems: 'center',
  },
  videoWrap: {
    width: 45,
    height: 45,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  video: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderColor: '#fff',
    borderWidth: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  opacity: {
    backgroundColor: '#000',
    opacity: 0.5,
  },
  progress: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  num: {
    fontSize: 16,
    color: '#fff',
  },
  percent: {
    fontSize: 7,
    color: '#fff',
    marginBottom: 3,
  },
  uploadText: {
    color: '#fff',
    fontSize: 10,
    marginTop: 8,
  },
});

export default Recommend;
