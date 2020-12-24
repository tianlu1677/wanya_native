import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Video from 'react-native-video';
import TabViewList from '@/components/TabView';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import IconFont from '@/iconfont';
import {useDispatch, useSelector} from 'react-redux';
import {getRecommendPosts, getFollowedPosts, getFollowedNodePosts} from '@/api/home_api';
import {BOTTOM_HEIGHT, IsIos} from '@/utils/navbar';
import {BadgeMessage} from '@/components/NodeComponents';
import {dispatchBaseCurrentAccount, dispathUpdateNodes} from '@/redux/actions';
import {dispatchCurrentAccount} from '@/redux/actions';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import FastImg from '@/components/FastImg';
import {AllNodeImg} from '@/utils/default-image';

const topHeader = IsIos ? (BOTTOM_HEIGHT > 20 ? BOTTOM_HEIGHT : 10) : 0;

const Recommend = props => {
  const [currentKey, setCurrentKey] = useState('follow');
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentBaseInfo);
  const uploadStatus = useSelector(state => state.topic.uploadStatus);

  console.log(uploadStatus);

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
      <View style={styles.uploadContent}>
        <View style={styles.imageWrap}>
          <Video
            style={{width: 45, height: 45}}
            source={{uri: uploadStatus.content.video.uri}}
            posterResizeMode={'center'}
            controls={false}
            muted={false}
            reportBandwidth
            ignoreSilentSwitch="ignore"
            repeat
          />
          <Text style={styles.uploadopacity} />
          {/* 上传视频中 */}
          {uploadStatus.status === 'upload' && (
            <View style={styles.percent}>
              <Text style={{fontSize: 18, color: '#fff'}}>{uploadStatus.progress}</Text>
              <Text style={{fontSize: 8, color: '#fff'}}>%</Text>
            </View>
          )}
          {/* 发布帖子中 */}
          {uploadStatus.status === 'publish' && (
            <Text style={[styles.percent, {fontSize: 10, color: '#fff'}]}>
              {uploadStatus.progress}
            </Text>
          )}
        </View>
        <Text numberOfLines={2} style={styles.uploadText}>
          {uploadStatus.content.content.plain_content}
        </Text>
      </View>
    );
  };

  const FollowListPage = () => {
    return (
      <SingleList
        request={{api: getFollowedPosts}}
        // extraData={uploadStatus}
        // ListHeaderComponent={<UploadTopic />}
        ListHeaderComponent={isShowUploadTopic() ? <UploadTopic /> : null}
      />
    );
  };

  const RecommendList = () => {
    return <DoubleList request={{api: getRecommendPosts}} type="follow" />;
  };

  const NodeList = () => {
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
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <View style={{height: topHeader, backgroundColor: 'black'}} />
        <FocusAwareStatusBar
          barStyle="light-content"
          translucent={false}
          backgroundColor={'black'}
        />
        <Text
          style={{height: 100, lineHeight: 100, textAlign: 'center', backgroundColor: 'pink'}}
          onPress={() => props.navigation.push('SearchIndex')}>
          搜索
        </Text>

        <View style={styles.wrapper}>
          <TabViewList
            size="big"
            lazy={true}
            currentKey={currentKey}
            tabData={[
              {
                key: 'follow',
                title: '关注',
                component: FollowListPage,
              },
              {
                key: 'recommend',
                title: '推荐',
                component: RecommendList,
              },
              {
                key: 'lasted',
                title: '圈子',
                component: NodeList,
              },
            ]}
            onChange={key => setCurrentKey(key)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.message}
        onPress={() => props.navigation.navigate('NotifyIndex')}
        hitSlop={{left: 30, right: 20, top: 20, bottom: 20}}>
        <View style={styles.message_icon}>
          <View style={{position: 'relative'}}>
            <IconFont name="notice" color={'white'} size={20} />
          </View>
          <BadgeMessage
            value={UnreadMessageCount()}
            containerStyle={{...styles.badgeContainer, left: UnreadMessageCount() > 9 ? 8 : 14}}
            size={'small'}
          />
        </View>
      </TouchableOpacity>
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
      <Pressable style={styles.nodeWrap} onPress={() => props.navigation.push('NodeIndex')}>
        <FastImg style={styles.nodeImg} source={{uri: AllNodeImg}} />
        <Text style={styles.nodeName} numberOfLines={1}>
          全部圈子
        </Text>
      </Pressable>
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
    position: 'absolute',
    right: 4,
    zIndex: 1000,
    top: IsIos ? topHeader + 15 : 15,
    width: 49,
  },
  message_icon: {
    height: 20,
    position: 'absolute',
    top: 0,
    right: 18,
    zIndex: -1,
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
  uploadContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageWrap: {
    position: 'relative',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
  },
  uploadopacity: {
    position: 'absolute',
    width: 45,
    height: 45,
    backgroundColor: '#000',
    opacity: 0.6,
  },
  percent: {
    position: 'absolute',
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: 20,
    lineHeight: 20,
  },
  uploadText: {
    flex: 1,
    fontSize: 13,
    color: '#3F3F3F',
    lineHeight: 19,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Recommend;
