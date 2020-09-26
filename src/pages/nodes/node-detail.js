import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '@/components/Loading';
import TabViewList from '@/components/TabView';
import {
  JoinButton,
  JoinAccounts,
  PlayScore,
  JoinActivity,
  GoBack,
} from '@/components/NodeComponents';
import {getNodeDetail, getPosts, getRecentAccounts} from '@/api/node_api';
import {getTopicList, getNodeTopicList} from '@/api/topic_api';
import {getArticleList} from '@/api/article_api';
import {followItem, unfollowItem} from '@/api/mine_api';
import SingleList from '@/components/List/single-list';
import TopicList from '@/components/List/topic-list';
import ArticleList from '@/components/List/article-list';
import HashtagList from '@/components/List/hash-tag-list';
import BottomSheetContent from '@/components/BottomSheetContent';
import {NAVIGATION_BAR_HEIGHT} from '@/utils/navbar';
import * as action from '@/redux/constants';
import Toast from '@/components/Toast';

const NodeDetail = ({navigation, route}) => {
  const home = useSelector(state => state.home);
  const dispatch = useDispatch();
  const sheetRef = useRef(null);

  const [detail, setDetail] = useState(null);
  const [nodeId] = useState(route.params.nodeId);
  const [currentKey, setCurrentKey] = useState('publish');

  const PublishListPage = () => {
    const queryUrl = `q[node_id_eq]=${detail.id}&q[s]=published_at desc&show_followed=on`;
    return <SingleList request={{api: getPosts, params: {queryUrl}}} />;
  };

  const PostsListPage = () => {
    const queryUrl = `q[node_id_eq]=${detail.id}&q[s]=published_at desc&show_followed=on`;
    return <TopicList request={{api: getTopicList, params: {queryUrl}}} />;
  };

  const ArticleListPage = () => {
    const queryUrl = `q[node_id_eq]=${detail.id}&q[s]=published_at desc&show_followed=on`;
    return <ArticleList request={{api: getArticleList, params: {queryUrl}}} />;
  };

  const TopicListPage = () => {
    return <HashtagList request={{api: getNodeTopicList, params: {id: detail.id}}} />;
  };

  const loadData = async () => {
    const res = await getNodeDetail(nodeId);
    setDetail(res.data.node);
  };

  const onFollowNode = async () => {
    if (detail.followed) {
      await unfollowItem({followable_type: 'Node', followable_id: detail.id});
    } else {
      await followItem({followable_type: 'Node', followable_id: detail.id});
    }
    loadData();
  };

  const goJoinAccounts = () => {
    navigation.navigate('JoinAccountsList', {
      title: detail.name,
      request: {api: getRecentAccounts, params: {id: detail.id}},
    });
  };

  const onPlay = () => {
    Toast.show('顽力值代表你的影响力，顽力值越多收获就越多。');
  };

  const joinNewTopic = () => {
    const topics = {...home.savetopic, node: {id: detail.id, name: detail.name}};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.navigate('NewTopic');
  };

  const onShowIntro = () => {
    sheetRef.current.snapTo();
  };

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <View style={{...styles.wrapper}}>
      <ImageBackground source={{uri: detail.backgroud_cover_url}} style={styles.header}>
        <View style={styles.headerBgCover} />
        <View style={styles.nodeContent}>
          <View style={styles.nodeInfo}>
            <Image style={styles.cover} source={{uri: detail.cover_url}} />
            <View style={styles.nodewrap}>
              <Text style={styles.nodeName}>{detail.name}</Text>
              <Text style={styles.nodeNum}>{detail.topics_count}篇动态</Text>
            </View>
          </View>
        </View>
        <View style={styles.descWrap}>
          <Text style={styles.nodeDesc} numberOfLines={2} onPress={onShowIntro}>
            {detail.desc}
          </Text>
          <PlayScore score={detail.play_score} onPress={onPlay} />
        </View>
        <Pressable style={styles.accountInfo} onPress={goJoinAccounts}>
          <Text style={styles.accountOpacity} />
          <JoinAccounts accounts={detail.accounts} size={25} />
          <Text style={styles.count}>
            {detail.accounts_count ? `${detail.accounts_count}位板友已加入` : '还没有板友加入'}
          </Text>
          <JoinButton
            join={detail.followed}
            text={detail.followed ? '已加入' : '加入'}
            onPress={onFollowNode}
          />
        </Pressable>
      </ImageBackground>
      <View style={styles.separator} />
      <TabViewList
        currentKey={currentKey}
        separator={true}
        tabData={[
          {
            key: 'publish',
            title: '动态',
            component: PublishListPage,
          },
          {
            key: 'posts',
            title: '帖子',
            component: PostsListPage,
          },
          {
            key: 'article',
            title: '文章',
            component: ArticleListPage,
          },
          {
            key: 'hashTag',
            title: '话题',
            component: TopicListPage,
          },
        ]}
        onChange={key => setCurrentKey(key)}
      />
      <GoBack />
      <JoinActivity type={'node'} text={'立刻参与'} handleClick={joinNewTopic} />
      <BottomSheetContent content={detail.desc} ref={sheetRef} />
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 283,
    paddingTop: NAVIGATION_BAR_HEIGHT + 1,
    position: 'relative',
  },
  headerBgCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: 0.3,
  },
  nodeContent: {
    flexDirection: 'row',
  },
  nodeInfo: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
  cover: {
    width: 69,
    height: 69,
    borderRadius: 2,
    marginRight: 16,
    marginLeft: 1,
  },
  nodewrap: {
    alignItems: 'flex-start',
  },
  nodeName: {
    fontSize: 24,
    color: '#fff',
    marginTop: 6,
    fontWeight: '500',
  },
  nodeNum: {
    fontSize: 11,
    color: '#fff',
    marginTop: 11,
  },
  nodeCreator: {
    flexDirection: 'row',
  },
  descWrap: {
    marginTop: 20,
    paddingRight: 9,
    flexDirection: 'row',
  },
  nodeDesc: {
    width: 250,
    color: '#fff',
    marginBottom: 20,
    fontSize: 11,
    lineHeight: 19,
    marginRight: 'auto',
  },
  accountInfo: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 2,
    borderRadius: 2,
    position: 'absolute',
    bottom: 22,
    left: 15,
    right: 15,
  },
  accountOpacity: {
    backgroundColor: '#fff',
    opacity: 0.5,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  count: {
    color: '#dbdbdb',
    marginRight: 'auto',
    marginLeft: 7,
    fontSize: 11,
  },
});

export default NodeDetail;
