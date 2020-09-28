import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {Avator, BadgeMessage, PlayScore} from '@/components/NodeComponents';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import {AccountDetailBgImg} from '@/utils/default-image';
import {getAccount, getAccountPosts, getAccountArticles} from '@/api/account_api';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import ArticleList from '@/components/List/article-list';
import TabViewList from '@/components/TabView';
import Toast from '@/components/Toast';
import {BASIC_HEIGHT} from '@/utils/navbar';
import {useFocusEffect} from '@react-navigation/native';

const MineDetail = ({navigation, route}) => {
  const currentAccount = useSelector(state => state.account.currentAccount);
  const currentBaseInfo = useSelector(state => state.account.currentBaseInfo);
  const [accountId] = useState(currentAccount.id);
  const [account, setAccount] = useState({});
  const [currentKey, setCurrentKey] = useState('publish');

  useLayoutEffect(() => {
    navigation.setOptions({});
    loadData();
  }, [navigation]);

  useFocusEffect(() => {}, []);

  const loadData = async () => {
    const res = await getAccount(accountId);
    setAccount(res.data.account);
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

  const onPlay = () => {
    Toast.show('顽力值代表你的影响力，顽力值越多收获就越多。', {duration: 1000});
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

  const UnreadMessageCount = () => {
    // console.log('currentAccount', currentAccount)
    if (!currentBaseInfo || currentBaseInfo.new_message_count === 0) {
      return 0;
    }
    return currentBaseInfo.new_message_count > 99 ? '99+' : currentBaseInfo.new_message_count;
  };

  useEffect(() => {}, []);

  return account ? (
    <View style={styles.wrapper}>
      <View style={styles.setting}>
        <Pressable onPress={() => navigation.navigate('NotifyIndex')} style={styles.message}>
          <View style={styles.message_icon}>
            <IconFont name="notice" size={20} style={{marginRight: 9}} color="#fff" />
          </View>
          {UnreadMessageCount() > 0 && (
            <BadgeMessage
              value={UnreadMessageCount()}
              status={'error'}
              containerStyle={{position: 'absolute', right: -6, top: -6}}
            />
          )}
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Settings')}>
          <IconFont name="settings" size={20} color="#fff" />
        </Pressable>
      </View>
      <ImageBackground source={{uri: AccountDetailBgImg}} style={styles.header}>
        <View
          style={[styles.userWrap, {marginBottom: account.settled_type === 'single' ? 30 : 20}]}>
          <Avator account={account} size={50} isShowSettledIcon={false} />
          <View style={{marginLeft: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.nickname}>{account.nickname}</Text>
              {account.settled_type !== 'single' && (
                <Image
                  style={{width: 16, height: 16, marginLeft: 5}}
                  source={
                    account.settled_type === 'personal'
                      ? require('@/assets/images/personal.png')
                      : require('@/assets/images/brand.png')
                  }
                />
              )}
            </View>
            <Text style={styles.uid}>顽鸦号: {account.uid}</Text>
          </View>
          <Text style={styles.invite} onPress={() => navigation.navigate('InviteDetail')}>
            邀请好友
          </Text>
        </View>
        {account.settled_type !== 'single' && (
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
        )}
        <View style={styles.introWrap}>
          <View style={{marginRight: 'auto'}}>
            <View style={{flexDirection: 'row', marginBottom: 8}}>
              {account.gender === 'man' && (
                <IconFont name="man" size={16} style={styles.maleIcon} />
              )}
              {account.gender === 'woman' && (
                <IconFont name="woman" size={16} style={styles.maleIcon} />
              )}
              <Text style={styles.tag}>{account.age || '18'}岁</Text>
              <Text style={styles.tag}>{account.province || '未知街区'}</Text>
            </View>
            <Text style={styles.intro}>{account.intro || '这个人很懒，还没有填写简介'}</Text>
          </View>
          <PlayScore score={account.play_score} style={{marginLeft: 'auto'}} onPress={onPlay} />
        </View>
        <View style={styles.numberWrap}>
          <Pressable style={styles.numberItem} onPress={() => setCurrentKey('publish')}>
            <Text style={styles.numberCount}>{account.account_feeds_count}</Text>
            <Text style={styles.numberTitle}>动态</Text>
          </Pressable>
          <Pressable style={styles.numberItem} onPress={goFollowList}>
            <Text style={styles.numberCount}>{account.nodes_count}</Text>
            <Text style={styles.numberTitle}>圈子</Text>
          </Pressable>
          <Pressable style={styles.numberItem} onPress={goFollowAccounts}>
            <Text style={styles.numberCount}>{account.following_count}</Text>
            <Text style={styles.numberTitle}>关注</Text>
          </Pressable>
          <Pressable style={styles.numberItem} onPress={goFollowerAccounts}>
            <Text style={styles.numberCount}>{account.followers_count}</Text>
            <Text style={styles.numberTitle}>粉丝</Text>
          </Pressable>
        </View>
      </ImageBackground>
      <TabViewList
        separator={true}
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
    top: 15 + BASIC_HEIGHT,
    zIndex: 2,
    flexDirection: 'row',
  },
  header: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingTop: 54 + BASIC_HEIGHT,
    height: 270 + BASIC_HEIGHT,
  },
  userWrap: {
    flexDirection: 'row',
    marginBottom: 20,
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
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginTop: 5,
    marginLeft: 'auto',
    fontWeight: '500',
  },
  settledWrap: {
    marginBottom: 21,
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
    marginBottom: 17,
  },
  maleIcon: {
    marginRight: 7,
    marginTop: 2,
  },
  tag: {
    height: 18,
    lineHeight: 18,
    textAlign: 'center',
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: '#fff',
    opacity: 0.6,
    marginRight: 10,
  },
  intro: {
    lineHeight: 20,
    color: '#fff',
    fontSize: 11,
  },
  numberWrap: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 18,
    left: 20,
  },
  numberItem: {
    width: 45,
    marginRight: 24,
  },
  numberCount: {
    lineHeight: 20,
    height: 20,
    fontSize: 16,
    color: '#fff',
    marginBottom: 3,
    fontWeight: '500',
  },
  numberTitle: {
    fontSize: 10,
    color: '#fff',
  },
  message: {
    marginRight: 10,
    // position: 'absolute',
    // right: 16,
    // zIndex: 2,
    // top: 15 + BASIC_HEIGHT,
    // paddingRight: 10,
  },
  message_icon: {
    // marginRight: 10,
    // position: 'absolute',
    // top: 0,
    // right: 30,
    // zIndex: -1,
  },
});

export default MineDetail;
