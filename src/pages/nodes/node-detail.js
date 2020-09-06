import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Loading from '@/components/Loading';
import TabViewList from '@/components/TabView';
import {JoinButton, JoinAccounts} from '@/components/NodeComponents';
import {getNodeDetail, getPosts} from '@/api/node_api';
import {getTopicList, getNodeTopicList} from '@/api/topic_api';
import {getArticleList} from '@/api/article_api';
import {followItem, unfollowItem} from '@/api/mine_api';
import SingleList from '@/components/List/single-list';
import TopicList from '@/components/List/topic-list';
import ArticleList from '@/components/List/article-list';
import HashtagList from '@/components/List/hash-tag-list';

const defaultCoverUrl =
  'http://file.meirixinxue.com/assets/2020/964cc82f-09d1-4561-b415-8fa58e29c817.png';

const NodeDetail = ({navigation, route}) => {
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

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Image style={styles.bgcover} source={{uri: detail.backgroud_cover_url}} />
        <View style={styles.nodeContent}>
          <View style={styles.nodeInfo}>
            <Image style={styles.cover} source={{uri: detail.cover_url || defaultCoverUrl}} />
            <View style={styles.nodewrap}>
              <Text style={styles.nodeName}>{detail.name}</Text>
              <Text style={styles.nodeNum}>{detail.topics_count}篇动态</Text>
            </View>
          </View>
          <View style={styles.nodeCreator}>
            <Image style={styles.creator} source={{uri: detail.cover_url || defaultCoverUrl}} />
            {/* <View>
              <Text>名称</Text>
              <Text>创建者</Text>
            </View> */}
          </View>
        </View>
        <Text style={styles.nodeDesc} numberOfLines={2}>
          {detail.desc}
        </Text>
        <View style={styles.accountInfo}>
          <Text style={styles.accountOpacity} />
          <JoinAccounts accounts={detail.accounts} size={25} />
          <Text style={styles.count}>
            {detail.accounts_count ? `${detail.accounts_count}位板友已加入` : '还没有板友加入'}
          </Text>
          <JoinButton
            join={detail.followed}
            text={detail.followed ? '已加入' : '加入'}
            onPress={() => {
              onFollowNode();
            }}
          />
        </View>
      </View>
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
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    position: 'relative',
    height: 242,
    paddingTop: 20,
  },
  bgcover: {
    height: 242,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
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
    fontSize: 12,
    color: '#fff',
    lineHeight: 27,
    marginBottom: 8,
  },
  nodeCreator: {
    flexDirection: 'row',
  },
  nodeDesc: {
    width: 250,
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 2,
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
    color: '#bdbdbd',
    marginRight: 'auto',
    marginLeft: 7,
  },
});

export default NodeDetail;
