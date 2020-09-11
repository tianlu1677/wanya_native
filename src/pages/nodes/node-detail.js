import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import Loading from '@/components/Loading';
import TabViewList from '@/components/TabView';
import {JoinButton, JoinAccounts, PlayScore, JoinActivity, GoBack} from '@/components/NodeComponents';
import {getNodeDetail, getPosts, getRecentAccounts} from '@/api/node_api';
import {getTopicList, getNodeTopicList} from '@/api/topic_api';
import {getArticleList} from '@/api/article_api';
import {followItem, unfollowItem} from '@/api/mine_api';
import SingleList from '@/components/List/single-list';
import TopicList from '@/components/List/topic-list';
import ArticleList from '@/components/List/article-list';
import HashtagList from '@/components/List/hash-tag-list';
import { NAVIGATION_BAR_HEIGHT} from "@/utils/navbar"
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NodeDetail = ({navigation, route}) => {
  const [detail, setDetail] = useState(null);
  const [nodeId] = useState(route.params.nodeId);
  const [currentKey, setCurrentKey] = useState('publish');
  // const insets = useSafeAreaInsets();
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

  const onPlay = () => {};

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <View style={{...styles.wrapper}}>
      <ImageBackground source={{uri: detail.backgroud_cover_url}} style={styles.header}>
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
          <Text style={styles.nodeDesc} numberOfLines={2}>
            {detail.desc}
          </Text>
          <PlayScore score={detail.play_score} onPress={onPlay} />
        </View>
        <TouchableOpacity style={styles.accountInfo} onPress={goJoinAccounts}>
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
        </TouchableOpacity>
      </ImageBackground>
      <TabViewList
        currentKey={currentKey}
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
      <JoinActivity type={"node"} text={"立刻参与"} handleClick={() => { console.log('go new topic')}} />
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'gray'
  },
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 283,
    paddingTop: NAVIGATION_BAR_HEIGHT,
  },
  nodeContent: {
    flexDirection: 'row',
  },
  nodeInfo: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
  cover: {
    width: 70,
    height: 70,
    borderRadius: 2,
    marginRight: 16,
  },
  nodewrap: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  nodeName: {
    fontSize: 24,
    color: '#fff',
  },
  nodeNum: {
    fontSize: 11,
    color: '#fff',
    lineHeight: 20,
    marginTop: 8,
  },
  nodeCreator: {
    flexDirection: 'row',
  },
  descWrap: {
    marginTop: 22,
    flexDirection: 'row',
  },
  nodeDesc: {
    width: 270,
    color: '#fff',
    marginBottom: 20,
    lineHeight: 19,
    fontSize: 11,
    marginRight: 'auto',
  },
  accountInfo: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 2,
    borderRadius: 2,
    position: 'relative',
  },
  accountOpacity: {
    backgroundColor: '#fff',
    opacity: 0.12,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  count: {
    color: '#fff',
    marginRight: 'auto',
    marginLeft: 7,
  },
});

export default NodeDetail;
