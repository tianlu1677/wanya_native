import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Pressable, ActionSheetIOS} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchPreviewImage} from '@/redux/actions';
import {Avator, PlayScore, GoBack, BottomModal} from '@/components/NodeComponents';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import ArticleList from '@/components/List/article-list';
import Toast from '@/components/Toast';
import {AccountDetailBgImg} from '@/utils/default-image';
import StickTopHeader from '@/components/StickTopHeader';
import {
  getAccount,
  getAccountPosts,
  followAccount,
  unfollowAccount,
  getAccountArticles,
} from '@/api/account_api';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import {BASIC_HEIGHT} from '@/utils/navbar';
import FastImg from '@/components/FastImg';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {reportContent} from '@/api/secure_check';
import ActionSheet from '@/components/ActionSheet';

const HEADER_HEIGHT = 270 + BASIC_HEIGHT;

const AccountDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const [accountId] = useState(route.params.accountId);
  const [account, setAccount] = useState({});
  const [currentKey, setCurrentKey] = useState('publish');
  const [showModal, setShowModal] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  // const [actionItems, setActionItems] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  const loadData = async () => {
    const res = await getAccount(accountId);
    setAccount(res.data.account);
  };

  const goFollowList = () => {
    navigation.push('FollowNodes', {accountId: account.id});
  };

  const goFollowAccounts = () => {
    navigation.push('FollowAccounts', {accountId: account.id});
  };

  const goFollowerAccounts = () => {
    navigation.push('FollowerAccounts', {accountId: account.id});
  };

  const onFollow = async () => {
    if (account.followed) {
      await unfollowAccount(account.id);
    } else {
      await followAccount(account.id);
    }
    loadData();
  };

  const onPlay = () => {
    Toast.show('顽力值代表你的影响力 \n顽力值越多收获就越多', {duration: 1000});
  };

  const actionItems = [
    {
      id: 1,
      label: '拉黑',
      onPress: () => {
        const data = {
          reason: '拉黑',
          report_type: 'Account',
          report_type_id: accountId,
        };
        reportContent(data).then(res => {
          Toast.showError('已拉黑', {duration: 500});
        });
      },
    },
    {
      id: 2,
      label: '举报',
      onPress: async () => {
        navigation.push('Report', {report_type: 'Account', report_type_id: accountId});
      },
    },
  ];

  const onReportClick = () => {
    setShowActionSheet(true);
  };

  const onPreview = () => {
    const data = {
      images: [{url: account.avatar_url}],
      visible: true,
      index: 0,
    };
    dispatch(dispatchPreviewImage(data));
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

  useEffect(() => {
    loadData();
  }, []);

  const Header = () => {
    return (
      <View style={{flex: 1}}>
        <FastImg
          source={{
            uri: account.background_img_url ? account.background_img_url : AccountDetailBgImg,
          }}
          resizeMode={'cover'}
          style={styles.imageCover}
        />
        <View style={[styles.imageCover, styles.imageCoverOpacity]} />
        <View style={styles.header}>
          <GoBack />
          {account.id !== currentAccount.id && (
            <Pressable
              onPress={onReportClick}
              style={styles.report}
              hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
              <IconFont name="ziyuan" color="#fff" size={20} />
            </Pressable>
          )}
          <View
            style={[styles.userWrap, {marginBottom: account.settled_type === 'single' ? 30 : 20}]}>
            <Avator account={account} size={50} isShowSettledIcon={false} handleClick={onPreview} />
            <View style={{marginLeft: 8}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.nickname}>{account.nickname}</Text>
                {account.settled_type !== 'single' && (
                  <FastImg
                    style={{width: 16, height: 16, marginLeft: 7}}
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

            {currentAccount.id !== account.id && (
              <Text
                style={[styles.follow, account.followed && {color: '#BDBDBD'}]}
                onPress={onFollow}>
                {account.followed && account.following
                  ? '互相关注'
                  : account.followed
                  ? '已关注'
                  : '关注'}
              </Text>
            )}
          </View>
          {account.settled_type !== 'single' && (
            <View style={styles.settledWrap}>
              <FastImg
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
                  <IconFont name="man" size={13} style={styles.maleIcon} />
                )}
                {account.gender === 'woman' && (
                  <IconFont name="woman" size={13} style={styles.maleIcon} />
                )}
                <Text style={styles.tag}>{account.age || '18'}岁</Text>
                <Text style={styles.tag}>{account.province || '未知街区'}</Text>
              </View>
              <Text style={styles.intro} numberOfLines={2} onPress={() => setShowModal(true)}>
                {account.intro.replace(/(\r\n|\n|\r)/gm, '') || '这个人很懒，还没有填写简介'}
              </Text>
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
        </View>
      </View>
    );
  };

  return account.id ? (
    <View style={styles.wrapper}>
      <CollapsibleHeader
        headerHeight={HEADER_HEIGHT}
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
        onKeyChange={key => setCurrentKey(key)}
        renderTopHeader={<StickTopHeader title={account.nickname} />}
        renderHeader={<Header />}
      />
      <BottomModal
        visible={showModal}
        cancleClick={() => setShowModal(false)}
        title="简介"
        content={account.intro}
      />
      <ActionSheet
        actionItems={actionItems}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
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
  report: {
    position: 'absolute',
    right: 16,
    height: 44,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    top: Math.max(getStatusBarHeight(), 20),
  },
  header: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingTop: 68,
    height: 290,
  },
  imageCover: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    flex: 1,
    height: HEADER_HEIGHT,
  },
  imageCoverOpacity: {
    backgroundColor: '#000',
    opacity: 0.5,
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
  follow: {
    width: 69,
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
    // marginBottom: 21,
    marginBottom: 16,
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
    fontSize: 10,
  },
  intro: {
    lineHeight: 20,
    color: '#fff',
    fontSize: 11,
    paddingRight: 80,
    textAlign: 'justify',
  },
  numberWrap: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
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
});

export default AccountDetail;
