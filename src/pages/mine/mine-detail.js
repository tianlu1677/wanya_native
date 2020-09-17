import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, Animated} from 'react-native';
import {useSelector} from 'react-redux';
import {Avator, PlayScore, GoBack} from '@/components/NodeComponents';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import {AccountDetailBgImg} from '@/utils/default-image';
import {getAccount, getAccountPosts, getAccountArticles} from '@/api/account_api';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import ArticleList from '@/components/List/article-list';
import TabViewList from '@/components/TabView';
import GoPage from '@/utils/go_page';
// import HeaderImageScrollView, {TriggeringView} from 'react-native-image-header-scroll-view';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {STATUS_BAR_HEIGHT} from '@/utils/navbar';

const MineDetail = ({navigation, route}) => {
  const id = useSelector(state => state.account.currentAccount.id);
  const [accountId] = useState(id);
  const [account, setAccount] = useState({});
  const [currentKey, setCurrentKey] = useState('publish');
  const [scoll, setScroll] = useState(new Animated.Value(0));
  // this.scroll = new Animated.Value(0)

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

  const ArticleListPage = () => {
    const params = {id: accountId, type: 'publish'};
    return <ArticleList request={{api: getAccountArticles, params}} />;
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

  const HEADER_HEIGHT = 240;
  const COLLAPSED_HEIGHT = 50;
  const SCROLLABLE_HEIGHT = HEADER_HEIGHT - COLLAPSED_HEIGHT;

  const _renderHeader = props => {
    const translateY = this.state.scroll.interpolate({
      inputRange: [0, SCROLLABLE_HEIGHT],
      outputRange: [0, -SCROLLABLE_HEIGHT],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
        <ImageBackground source={{uri: 'https://picsum.photos/900'}} style={styles.cover}>
          <View style={styles.overlay} />
          <Text>xxxxx</Text>
          {/*<TabBar {...props} style={styles.tabbar} />*/}
        </ImageBackground>
      </Animated.View>
    );
  };

  const HeaderContent = () => {
    return (
      <View>
        <View style={styles.setting}>
          <TouchableOpacity onPress={() => navigation.navigate('NotifyIndex')}>
            <IconFont name="notice" size={20} style={{marginRight: 25}} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <IconFont name="settings" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <ImageBackground source={{uri: AccountDetailBgImg}} style={styles.header}>
          <View style={styles.userWrap}>
            <Avator account={account} size={50} />
            <View style={{marginLeft: 8}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.nickname}>{account.nickname}</Text>
                <Image
                  style={{width: 16, height: 16, marginLeft: 7}}
                  source={
                    account.settled_type === 'personal'
                      ? require('@/assets/images/personal.png')
                      : require('@/assets/images/brand.png')
                  }
                />
              </View>
              <Text style={styles.uid}>顽鸦号: {account.uid}</Text>
            </View>
            <Text style={styles.invite} onPress={() => navigation.navigate('InviteDetail')}>
              邀请好友
            </Text>
          </View>
          <View style={styles.settledWrap}>
            <Image
              style={{width: 16, height: 16, marginRight: 3}}
              source={
                account.settled_type === 'personal'
                  ? require('@/assets/images/personal.png')
                  : require('@/assets/images/brand.png')
              }
            />
            <Text style={styles.settled}>顽鸦认证：{account.settled_name}</Text>
          </View>
          <View style={styles.introWrap}>
            <View style={{marginRight: 'auto'}}>
              <View style={{flexDirection: 'row', marginBottom: 8}}>
                {account.gender === 'man' && <IconFont name="man" size={16} />}
                {account.gender === 'woman' && <IconFont name="woman" size={16} />}
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
        </ImageBackground>
      </View>
    );
  };

  return account ? (
    <View style={styles.wrapper}>
      <HeaderContent />
      <TabViewList
        currentKey={currentKey}
        header={<HeaderContent />}
        size="small"
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
          {
            key: 'article',
            title: '文章',
            component: ArticleListPage,
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
  setting: {
    height: 20,
    position: 'absolute',
    right: 16,
    top: 30 + STATUS_BAR_HEIGHT,
    zIndex: 2,
    flexDirection: 'row',
  },
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 64 + STATUS_BAR_HEIGHT,
    height: 290 + STATUS_BAR_HEIGHT,
  },
  userWrap: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  nickname: {
    fontSize: 16,
    lineHeight: 27,
    color: '#fff',
    fontWeight: '500',
    marginTop: 3,
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
    fontWeight: '500',
  },
  settledWrap: {
    marginBottom: 19,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settled: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  introWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  tag: {
    height: 18,
    lineHeight: 18,
    textAlign: 'center',
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  intro: {
    lineHeight: 20,
    color: '#fff',
    fontSize: 11,
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
    fontWeight: '500',
  },
  numberTitle: {
    fontSize: 10,
    color: '#fff',
  },
});

export default MineDetail;
