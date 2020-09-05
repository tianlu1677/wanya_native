import React, {useState, useEffect, useLayoutEffect, useReducer} from 'react';
import {View, Text, Image} from 'react-native';
import {Avator} from '@/components/NodeComponents';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import {AccountDetailBgImg} from '@/utils/default-image';
import {getAccount} from '@/api/account_api';
import {getAccountPosts} from '@/api/account_api';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import TabViewList from '@/components/TabView';

import {AccountsDetailStyles as styles} from './style';

const id = 1106;

const AccountDetail = ({navigation, route}) => {
  const [account, setAccount] = useState({});
  const [accountId, setAccountId] = useState('');
  const [currentKey, setCurrentKey] = useState('publish');

  useLayoutEffect(() => {
    navigation.setOptions({});
    setAccountId(route.params.accountId);
  }, [navigation]);

  const loadData = async () => {
    const res = await getAccount(accountId);
    setAccount(res.data.account);
  };

  const PublishList = () => {
    return <SingleList request={{api: getAccountPosts, params: {id: id, type: 'publish'}}} />;
  };

  const VideoList = () => {
    return <DoubleList request={{api: getAccountPosts, params: {id: id, type: 'publish_video'}}} />;
  };

  const PraiseList = () => {
    return <SingleList request={{api: getAccountPosts, params: {id: id, type: 'praise'}}} />;
  };

  useEffect(() => {
    loadData();
  }, [accountId]);

  return account ? (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Image style={styles.bgcover} source={{uri: AccountDetailBgImg}} />
        <View style={{flexDirection: 'row'}}>
          <Avator account={account} size={50} />
          <View style={{marginLeft: 8}}>
            <Text style={styles.nickname}>{account.nickname}</Text>
            <Text style={styles.uid}>顽鸦号: {account.uid}</Text>
          </View>
          <Text style={styles.invite}>邀请好友</Text>
        </View>
        <Text style={styles.settled}>顽鸦认证：{account.settled_name}</Text>
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          {account.gender === 'man' && <IconFont name="icon1" size={16} />}
          {account.gender === 'women' && <IconFont name="qiuliao" size={16} />}
          <Text style={styles.tag}>{account.age || '18'}岁</Text>
          <Text style={styles.tag}>{account.province || '未知街区'}</Text>
        </View>
        <Text style={styles.intro}>{account.intro || '这个人很懒，还没有填写简介'}</Text>
        <View style={styles.number}>
          <View style={styles.numberItem}>
            <Text style={styles.numberCount}>{account.account_feeds_count}</Text>
            <Text style={styles.numberTitle}>动态</Text>
          </View>
          <View style={styles.numberItem}>
            <Text style={styles.numberCount}>{account.nodes_count}</Text>
            <Text style={styles.numberTitle}>圈子</Text>
          </View>
          <View style={styles.numberItem}>
            <Text style={styles.numberCount}>{account.following_count}</Text>
            <Text style={styles.numberTitle}>关注</Text>
          </View>
          <View style={styles.numberItem}>
            <Text style={styles.numberCount}>{account.followers_count}</Text>
            <Text style={styles.numberTitle}>粉丝</Text>
          </View>
        </View>
      </View>
      <TabViewList
        currentKey={currentKey}
        tabData={[
          {
            key: 'publish',
            title: '动态',
            component: PublishList,
          },
          {
            key: 'video',
            title: '视频',
            component: VideoList,
          },
          {
            key: 'praise',
            title: '喜欢',
            component: PraiseList,
          },
        ]}
        onChange={key => setCurrentKey(key)}
      />
    </View>
  ) : (
    <Loading />
  );
};

export default AccountDetail;
