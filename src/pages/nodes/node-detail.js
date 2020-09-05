import React, {useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Loading from '@/components/Loading';
import {JoinButton, JoinAccounts} from '@/components/NodeComponents';
import {getNodeDetail, getPosts} from '@/api/node_api';
import {getTopicList} from '@/api/topic_api';
import DoubleList from '@/components/List/double-list';
import TabViewList from '@/components/TabView';

import {NodeDetailStyles as styles} from './styles';

const defaultCoverUrl =
  'http://file.meirixinxue.com/assets/2020/964cc82f-09d1-4561-b415-8fa58e29c817.png';

const NodeDetail = ({navigation, route}) => {
  const [detail, setDetail] = useState(null);
  const [nodeId] = useState(route.params.nodeId);
  const [currentKey, setCurrentKey] = useState('publish');
  // const navigation = useNavigation();

  // useLayoutEffect(async () => {
  //   // setNodeId(route.params.nodeId)
  //   navigation.setOptions({
  //     headerShown: true,
  //   });
  // }, [navigation]);

  const loadData = async () => {
    const res = await getNodeDetail(nodeId);
    setDetail(res.node);
  };

  const onFollowNode = () => {
    if (detail.followed) {
      setDetail({...detail, followed: false});
    } else {
      setDetail({...detail, followed: true});
    }
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  // return <Text>3232</Text>;
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
            <View>
              <Text>名称</Text>
              <Text>创建者</Text>
            </View>
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
        tabData={
          [
            // {
            //   key: 'publish',
            //   title: '动态',
            //   component: PublishList,
            // },
            // {
            //   key: 'posts',
            //   title: '帖子',
            //   component: PostsList,
            // },
            // {
            //   key: 'article',
            //   title: '文章',
            //   component: ArticleList,
            // },
            // {
            //   key: 'topic',
            //   title: '话题',
            //   component: TopicList,
            // },
          ]
        }
        onChange={key => setCurrentKey(key)}
      />
    </View>
  ) : (
    <Loading />
  );
};

export default NodeDetail;
