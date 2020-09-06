import React, {useState, useEffect, useLayoutEffect, useReducer} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Avator, PlayScore} from '@/components/NodeComponents';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import {AccountDetailBgImg} from '@/utils/default-image';
import {getAccount} from '@/api/account_api';
import {getAccountPosts} from '@/api/account_api';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import TabViewList from '@/components/TabView';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MineDetail = ({navigation, route}) => {
  const id = useSelector(state => state.account.currentAccount.id);
  const [accountId] = useState(id);
  const [account, setAccount] = useState({});
  const [currentKey, setCurrentKey] = useState('publish');

  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  const loadData = async () => {
    const res = await getAccount(accountId);
    setAccount(res.data.account);
  };

  const PublishList = () => {
    return (
      <SingleList request={{api: getAccountPosts, params: {id: accountId, type: 'publish'}}} />
    );
  };

  const VideoList = () => {
    return (
      <DoubleList
        request={{api: getAccountPosts, params: {id: accountId, type: 'publish_video'}}}
      />
    );
  };

  const PraiseList = () => {
    return <SingleList request={{api: getAccountPosts, params: {id: accountId, type: 'praise'}}} />;
  };

  const goFollowList = () => {
    navigation.navigate('FollowNodes', {accountId: account.id});
  };

  const goFollowAccounts = () => {
    navigation.navigate('FollowAccounts', {accountId: account.id});
  };

  const goFollowerAccounts = () => {
    navigation.navigate('FollowerAccounts', {accountId: account.id});
  };

  useEffect(() => {
    loadData();
  }, []);

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
          <Text
            style={styles.invite}
            onPress={() => {
              navigation.navigate('InviteDetail');
            }}>
            邀请好友
          </Text>
          <Text
            style={styles.invite}
            onPress={() => {
              navigation.navigate('Settings');
            }}>
            设置
          </Text>
        </View>
        <Text style={styles.settled}>顽鸦认证：{account.settled_name}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
          <View style={{marginRight: 'auto'}}>
            <View style={{flexDirection: 'row'}}>
              {account.gender === 'man' && <IconFont name="man" size={16} />}
              {account.gender === 'women' && <IconFont name="woman" size={16} />}
              <Text style={styles.tag}>{account.age || '18'}岁</Text>
              <Text style={styles.tag}>{account.province || '未知街区'}</Text>
            </View>
            <Text style={styles.intro}>{account.intro || '这个人很懒，还没有填写简介'}</Text>
          </View>
          <PlayScore score={account.play_score} style={{marginLeft: 'auto'}} />
        </View>

        <View style={styles.number}>
          <TouchableOpacity style={styles.numberItem} onPress={() => setCurrentKey('publish')}>
            <Text style={styles.numberCount}>{account.account_feeds_count}</Text>
            <Text style={styles.numberTitle}>动态</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numberItem} onPress={goFollowList}>
            <Text style={styles.numberCount}>{account.nodes_count}</Text>
            <Text style={styles.numberTitle}>圈子</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numberItem} onPress={goFollowAccounts}>
            <Text style={styles.numberCount}>{account.following_count}</Text>
            <Text style={styles.numberTitle}>关注</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.numberItem} onPress={goFollowerAccounts}>
            <Text style={styles.numberCount}>{account.followers_count}</Text>
            <Text style={styles.numberTitle}>粉丝</Text>
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    position: 'relative',
    paddingTop: 30,
  },
  bgcover: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
  },
  nickname: {
    height: 27,
    fontSize: 16,
    lineHeight: 27,
    color: '#fff',
  },
  uid: {
    height: 20,
    fontSize: 10,
    lineHeight: 20,
    color: '#fff',
  },
  invite: {
    width: 70,
    height: 28,
    lineHeight: 28,
    textAlign: 'center',
    fontSize: 13,
    borderRadius: 1,
    backgroundColor: '#fff',
    marginTop: 5,
    marginLeft: 'auto',
  },
  settled: {
    marginTop: 16,
    marginBottom: 19,
    lineHeight: 20,
    color: '#fff',
    fontSize: 12,
  },
  tag: {
    lineHeight: 18,
    textAlign: 'center',
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  intro: {
    lineHeight: 20,
    marginTop: 10,
    color: '#fff',
  },
  number: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  numberItem: {
    width: 45,
    marginRight: 25,
  },
  numberCount: {
    lineHeight: 20,
    height: 20,
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  numberTitle: {
    fontSize: 10,
    color: '#fff',
  },
});

export default MineDetail;
