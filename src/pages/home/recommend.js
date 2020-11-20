import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import TabViewList from '@/components/TabView';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import IconFont from '@/iconfont';
import {useDispatch, useSelector} from 'react-redux';
import {getRecommendPosts, getFollowedPosts, getRecommendLatestPosts} from '@/api/home_api';
import {getFollowNodeIndex} from '@/api/node_api';
import {BOTTOM_HEIGHT} from '@/utils/navbar';
import {BadgeMessage} from '@/components/NodeComponents';
import {dispatchBaseCurrentAccount} from '@/redux/actions';
import {dispatchCurrentAccount} from '@/redux/actions';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import SafeAreaPlus from '@/components/SafeAreaPlus';
import FastImg from '@/components/FastImg';

const Recommend = props => {
  const [currentKey, setCurrentKey] = useState('recommend');
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentBaseInfo);

  const RecommendList = () => {
    return <DoubleList request={{api: getRecommendPosts}} type="recommend" />;
  };

  const FollowList = () => {
    return <SingleList request={{api: getFollowedPosts}} />;
  };

  // const NodeList = () => {
  //   return <SingleList request={{api: getFollowedPosts}} />;
  // };

  const NodeList = () => {
    return (
      <SingleList
        type="node-recommend"
        request={{api: getRecommendPosts}}
        ListHeaderComponent={<NodeScrollView {...props} />}
        renderEmpty={
          <View style={styles.emptyWrap}>
            <View style={styles.emptyTextWrap}>
              <Text style={styles.emptyText}>你还没有加入圈子</Text>
              <Text style={styles.emptyText}>点击发现更多圈子</Text>
            </View>
            <Text style={styles.moreNode} onPress={() => props.navigation.navigate('NotifyIndex')}>
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
    <SafeAreaPlus style={{flex: 1}} edges={['right', 'left']}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <View style={styles.wrapper}>
        <TabViewList
          size="big"
          lazy={true}
          currentKey={currentKey}
          tabData={[
            {
              key: 'recommend',
              title: '推荐',
              component: RecommendList,
            },
            {
              key: 'follow',
              title: '关注',
              component: FollowList,
            },
            {
              key: 'lasted',
              title: '圈子',
              component: NodeList,
            },
          ]}
          onChange={key => setCurrentKey(key)}
        />
        <View style={styles.message}>
          <Pressable
            style={styles.message_icon}
            hitSlop={{left: 20, right: 10, top: 10, bottom: 10}}
            onPress={() => props.navigation.navigate('NotifyIndex')}>
            <View style={{position: 'relative'}}>
              <IconFont name="notice" size={20} />
            </View>
            <BadgeMessage
              value={UnreadMessageCount()}
              containerStyle={{...styles.badgeContainer, left: UnreadMessageCount() > 9 ? 8 : 14}}
              size={'small'}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaPlus>
  );
};

const NodeScrollView = props => {
  const currentAccount = useSelector(state => state.account.currentBaseInfo);
  const [data, setData] = useState([]);

  const loadNodeData = async () => {
    const res = await getFollowNodeIndex({account_id: currentAccount.id});
    setData(res.data.nodes);
  };

  useEffect(() => {
    loadNodeData();
  }, []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator style={styles.nodeView}>
      {data.length > 0 &&
        data.map(node => {
          return (
            <Pressable
              key={node.id}
              style={styles.nodeWrap}
              onPress={() => props.navigation.push('NodeDetail', {nodeId: node.id})}>
              <FastImg style={styles.nodeImg} source={{uri: node.cover_url}} />
              <Text style={styles.nodeName} numberOfLines={1}>
                {node.name}
              </Text>
            </Pressable>
          );
        })}
      <Pressable style={styles.nodeWrap} onPress={() => props.navigation.push('NodeIndex')}>
        {/* <FastImg style={styles.nodeImg} source={{uri: node.cover_url}} /> */}
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
    paddingTop: BOTTOM_HEIGHT + 10,
  },
  message: {
    position: 'absolute',
    right: 4,
    zIndex: 100,
    top: BOTTOM_HEIGHT + 3 + 22,
  },
  message_icon: {
    position: 'absolute',
    top: 0,
    right: 18,
    zIndex: -1,
  },
  nodeView: {
    backgroundColor: '#fff',
    paddingLeft: 14,
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom: 9,
  },
  nodeWrap: {
    width: 50,
    marginRight: 15,
  },
  nodeImg: {
    width: 50,
    height: 50,
  },
  nodeName: {
    fontSize: 11,
    lineHeight: 22,
    marginTop: 5,
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
});

export default Recommend;
