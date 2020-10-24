import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
import Loading from '@/components/Loading';
import {
  JoinButton,
  JoinAccounts,
  PlayScore,
  JoinActivity,
  GoBack,
  BottomModal,
} from '@/components/NodeComponents';
import {getNodeDetail, getPosts, getRecentAccounts} from '@/api/node_api';
import {getTopicList, getNodeTopicList} from '@/api/topic_api';
import {getArticleList} from '@/api/article_api';
import {followItem, unfollowItem} from '@/api/mine_api';
import SingleList from '@/components/List/single-list';
import TopicList from '@/components/List/topic-list';
import ArticleList from '@/components/List/article-list';
import HashtagList from '@/components/List/hash-tag-list';
import {NAVIGATION_BAR_HEIGHT} from '@/utils/navbar';
import * as action from '@/redux/constants';
import Toast from '@/components/Toast';
import FastImg from '@/components/FastImg';
import CollapsibleHeader from '@/components/CollapsibleHeaders';

const HEADER_HEIGHT = 283;
const NodeDetail = ({navigation, route}) => {
  const home = useSelector(state => state.home);
  const dispatch = useDispatch();

  const [detail, setDetail] = useState(null);
  const [nodeId] = useState(route.params.nodeId);
  const [currentKey, setCurrentKey] = useState('publish');
  const [showModal, setShowModal] = useState(false);

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
    Toast.show('顽力值代表你的影响力 \n顽力值越多收获就越多', {duration: 1000});
  };

  const joinNewTopic = () => {
    const topics = {...home.savetopic, node: {id: detail.id, name: detail.name}};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.navigate('NewTopic');
  };

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <View style={{flex: 1}}>
      <GoBack />
      <JoinActivity type={'node'} text={'参与话题'} handleClick={joinNewTopic} />
      <CollapsibleHeader
        headerHeight={HEADER_HEIGHT}
        currentKey={currentKey}
        onKeyChange={key => setCurrentKey(key)}
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
        renderHeader={
          <>
            <GoBack />
            <FastImg
              source={{uri: detail.backgroud_cover_url}}
              resizeMode={'cover'}
              style={styles.imageCover}
            />
            <View style={styles.imageCoverOpacity} />
            <View style={styles.header}>
              <View style={styles.nodeContent}>
                <View style={styles.nodeInfo}>
                  <FastImg style={styles.cover} source={{uri: detail.cover_url}} />
                  <View style={styles.nodewrap}>
                    <Text style={styles.nodeName}>{detail.name}</Text>
                    <Text style={styles.nodeNum}>{detail.topics_count}篇动态</Text>
                  </View>
                </View>
              </View>
              <View style={styles.descWrap}>
                <Text style={styles.nodeDesc} numberOfLines={2} onPress={() => setShowModal(true)}>
                  {detail.desc}
                </Text>
                <PlayScore score={detail.play_score} onPress={onPlay} />
              </View>
              <Pressable
                onPress={goJoinAccounts}
                style={{position: 'absolute', bottom: 22, left: 15, right: 15}}>
                <BlurView
                  style={styles.accountInfo}
                  blurType="light"
                  blurAmount={10}
                  reducedTransparencyFallbackColor="#white">
                  <JoinAccounts accounts={detail.accounts} size={25} />
                  <Text style={styles.count}>
                    {detail.accounts_count
                      ? `${detail.accounts_count}位板友已加入`
                      : '还没有板友加入'}
                  </Text>
                  <JoinButton
                    join={detail.followed}
                    text={detail.followed ? '已加入' : '加入'}
                    onPress={onFollowNode}
                  />
                </BlurView>
              </Pressable>
            </View>
            <BottomModal
              visible={showModal}
              cancleClick={() => setShowModal(false)}
              title={detail.name}
              content={detail.desc}
            />
          </>
        }
      />
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    height: HEADER_HEIGHT,
    paddingTop: NAVIGATION_BAR_HEIGHT + 1,
    position: 'relative',
  },
  imageCover: {
    width: '100%',
    height: HEADER_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  imageCoverOpacity: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: 0.5,
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
    borderWidth: 3,
    borderColor: '#ffff00',
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
    height: RFValue(45),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  count: {
    color: '#dbdbdb',
    marginRight: 'auto',
    marginLeft: 7,
    fontSize: 11,
  },
});

export default NodeDetail;
