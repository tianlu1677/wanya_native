import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '@/components/Loading';
import {
  JoinButton,
  JoinAccounts,
  PlayScore,
  JoinActivity,
  BottomModal,
  BlurView,
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
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import {NAV_BAR_HEIGHT, SAFE_TOP} from '@/utils/navbar';
import {nodeAction} from '@/redux/actions';
import * as action from '@/redux/constants';
import Toast from '@/components/Toast';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import StickTopHeader from '@/components/StickTopHeader';
import LocationBar from '@/components/LocationBar';
import {dispatchShareItem} from '@/redux/actions';
import {getMovementDetail} from '@/api/movement_api';

const {width} = Dimensions.get('window');
const Height = parseInt((width * 420) / 750);

console.log(Height);
const MovementDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {movementId} = route.params;
  console.log('movementId', movementId);
  const [detail, setDetail] = useState(null);
  const [currentKey, setCurrentKey] = useState('topic');

  const PublishListPage = () => {
    const queryUrl = `q[node_id_eq]=${detail.id}&q[s]=published_at desc&show_followed=on`;
    return <SingleList request={{api: getPosts, params: {queryUrl}}} />;
  };

  const loadData = async () => {
    const res = await getMovementDetail(movementId);
    setDetail(res.data.movement);
  };

  useEffect(() => {
    loadData();
  }, []);

  const Header = () => {
    return (
      <View style={styles.header}>
        {/* <View style={styles.header} /> */}
        <Text style={styles.title}>滑板 / 入门</Text>
        <Text style={styles.name}>滑Kick Flip 360</Text>
      </View>
    );
  };

  return detail ? (
    <View style={styles.wrapper}>
      <CollapsibleHeader
        headerHeight={Height}
        currentKey={currentKey}
        onKeyChange={key => setCurrentKey(key)}
        renderHeader={<Header />}
        separator={true}
        tabData={[
          {
            key: 'topic',
            title: '帖子',
            component: PublishListPage,
          },
          {
            key: 'lessons',
            title: '教程',
            component: PublishListPage,
          },
        ]}
      />
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
    height: Height,
    paddingHorizontal: 14,
    paddingTop: RFValue(20),
    backgroundColor: '#61D3F0',
  },
  title: {
    fontSize: 11,
    color: '#fff',
  },
  name: {
    fontSize: 18,
    color: '#fff',
    marginTop: RFValue(10),
  },
});

export default MovementDetail;
