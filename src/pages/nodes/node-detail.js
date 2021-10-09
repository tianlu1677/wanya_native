import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '@/components/Loading';
import {
  JoinButton,
  JoinAccounts,
  PlayScore,
  JoinActivity,
  BottomModal,
  BlurView,
  TopBack,
} from '@/components/NodeComponents';
import {getNodeDetail, getPosts, getRecentAccounts} from '@/api/node_api';
import {getTopicList, getNodeTopicList} from '@/api/topic_api';
import {getArticleList} from '@/api/article_api';
import {followItem, unfollowItem} from '@/api/mine_api';
import SingleList from '@/components/List/single-list';
import TopicList from '@/components/List/topic-list';
import ArticleList from '@/components/List/article-list';
import HashtagList from '@/components/List/hash-tag-list';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import {BarHeight, SCREEN_WIDTH} from '@/utils/navbar';
import {nodeAction} from '@/redux/actions';
import * as action from '@/redux/constants';
import Toast from '@/components/Toast';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import StickTopHeader from '@/components/StickTopHeader';
import LocationBar from '@/components/LocationBar';
import {dispatchShareItem} from '@/redux/actions';

const HEADER_HEIGHT = Math.ceil((SCREEN_WIDTH * 566) / 750);

const NodeDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const home = useSelector(state => state.home);
  const [nodeId] = useState(route.params.nodeId);
  const currentAccount = useSelector(state => state.account.currentBaseInfo);
  const {nodeDetail} = useSelector(state => state.node);
  const [detail, setDetail] = useState(null);
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
    return (
      <HashtagList
        request={{api: getNodeTopicList, params: {id: detail.id}}}
        type="list"
        dataKey="hashtags"
      />
    );
  };

  const loadData = async () => {
    const res = await getNodeDetail(nodeId);
    setDetail(res.data.node);
    dispatch({type: action.UPDATE_NODE_DETAIL, value: res.data.node});
  };

  const onFollowNode = async () => {
    if (detail.role === 'super_admin') {
      if (detail.check_node_id) {
        navigation.push('CreateNodeResult', {nodeId: detail.check_node_id});
      } else {
        Toast.showError('暂时无法管理');
      }
    } else {
      if (detail.followed) {
        await unfollowItem({followable_type: 'Node', followable_id: detail.id});
      } else {
        await followItem({followable_type: 'Node', followable_id: detail.id});
      }
    }
    loadData();
  };

  const goJoinAccounts = () => {
    navigation.navigate('JoinAccountsList', {
      title: detail.name,
      request: {api: getRecentAccounts, params: {id: detail.id}},
      account: detail.account ? {title: '圈主', account: detail.account} : null,
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

  const onShowIntro = () => {
    setShowModal(true);
  };

  const handleOnShare = () => {
    const shareContent = {item_type: 'Node', item_id: detail.id, visible: true};
    dispatch(dispatchShareItem(shareContent));
  };

  useEffect(() => {
    setDetail(nodeDetail);
  }, [nodeDetail]);

  useEffect(() => {
    loadData();
    return () => {
      dispatch({type: action.UPDATE_NODE_DETAIL, value: null});
      dispatch(nodeAction.dispatchUpdateNodes());
      dispatch(nodeAction.dispatchUpdateFollowNodes(currentAccount.id));
    };
  }, []);

  const Header = () => {
    return (
      <>
        <View style={{height: BarHeight, backgroundColor: 'black'}} />
        <TopBack top={BarHeight + RFValue(10)} handleShare={handleOnShare} />
        <View style={styles.header}>
          <View style={styles.headerOpacity} />
          <FastImg
            source={{uri: detail.backgroud_cover_url}}
            mode={'cover'}
            style={styles.headerCover}
          />
          {/* <View style={styles.nodeContent}> */}
          <View style={styles.nodeInfo}>
            <FastImg style={styles.cover} source={{uri: detail.cover_url}} />
            <View style={styles.nodewrap}>
              <Text style={styles.nodeName} numberOfLines={1}>
                {detail.name}
              </Text>
              <View style={styles.nodeView}>
                <Text style={styles.nodeNum}>{detail.topics_count}篇动态</Text>
                {(detail.space || detail.location) && <Text style={{color: 'white'}}> · </Text>}
                <LocationBar location={detail.location} space={detail.space} />
              </View>
            </View>
          </View>
          {/* </View> */}
          <View style={styles.descWrap}>
            <Text style={styles.nodeDesc} numberOfLines={2} onPress={onShowIntro}>
              {detail.desc}
            </Text>
            <PlayScore score={detail.play_score} onPress={onPlay} />
          </View>

          <Pressable style={styles.accountsWrapper} onPress={goJoinAccounts}>
            <BlurView style={styles.accountsMain} blurAmount={5}>
              <JoinAccounts accounts={detail.accounts} size={25} />
              <Text style={styles.accountsCount}>
                {detail.accounts_count ? `${detail.accounts_count}位板友已加入` : '还没有板友加入'}
              </Text>
              <JoinButton
                join={detail.role === 'super_admin' ? true : detail.followed}
                text={detail.role === 'super_admin' ? '管理' : detail.followed ? '已加入' : '加入'}
                onPress={onFollowNode}
              />
            </BlurView>
          </Pressable>
        </View>
      </>
    );
  };

  return detail ? (
    <View style={styles.wrapper}>
      <CollapsibleHeader
        tabBarHeight={BarHeight}
        headerHeight={HEADER_HEIGHT + BarHeight}
        currentKey={currentKey}
        onKeyChange={key => setCurrentKey(key)}
        renderHeader={<Header />}
        renderTopHeader={<StickTopHeader title={detail.name} />}
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
      />

      <BottomModal
        visible={showModal}
        cancleClick={() => setShowModal(false)}
        title={detail.name}
        content={detail.desc}
      />
      <JoinActivity type={'node'} text={'立刻参与'} handleClick={joinNewTopic} />
    </View>
  ) : (
    <Loading />
  );
};

const positon = {width: SCREEN_WIDTH, height: HEADER_HEIGHT, position: 'absolute'};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  header: {
    height: HEADER_HEIGHT,
    position: 'relative',
    paddingHorizontal: 14,
    paddingTop: RFValue(33),
  },
  headerOpacity: {
    ...positon,
    backgroundColor: '#000',
    opacity: 0.3,
  },
  headerCover: {
    ...positon,
    zIndex: -1,
  },
  nodeInfo: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
  cover: {
    width: VWValue(69),
    height: VWValue(69),
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#ffff00',
  },
  nodewrap: {
    flex: 1,
    alignItems: 'flex-start',
  },
  nodeName: {
    fontSize: 24,
    color: '#fff',
    marginTop: 6,
    fontWeight: '500',
  },
  nodeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  nodeNum: {
    fontSize: 11,
    color: '#fff',
  },
  descWrap: {
    marginTop: RFValue(20),
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
  accountInfoWrap: {
    position: 'absolute',
    bottom: 22,
    left: 15,
    right: 15,
  },
  accountInfo: {
    height: RFValue(45),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 2,
    overflow: 'hidden',
  },
  count: {
    color: '#dbdbdb',
    marginRight: 'auto',
    marginLeft: 7,
    fontSize: 11,
  },

  accountsWrapper: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: RFValue(22),
  },
  accountsMain: {
    height: RFValue(45),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 2,
  },
  accountsCount: {
    color: '#DBDBDB',
    fontSize: 11,
    marginRight: 'auto',
    marginLeft: 7,
  },
});

export default NodeDetail;
