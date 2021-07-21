import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchPreviewImage} from '@/redux/actions';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import StickTopHeader from '@/components/StickTopHeader';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import ArticleList from '@/components/List/article-list';
import ActionSheet from '@/components/ActionSheet';
import Toast from '@/components/Toast';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {Avator, BottomModal, TopBack} from '@/components/NodeComponents';
import {
  getAccount,
  getAccountPosts,
  followAccount,
  unfollowAccount,
  getAccountArticles,
} from '@/api/account_api';
import {getChatGroupsDetail} from '@/api/chat_api';
import {BarHeight, SCREEN_WIDTH} from '@/utils/navbar';
import {reportContent} from '@/api/secure_check';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {AccountDetailBgImg} from '@/utils/default-image';
import PersonalImg from '@/assets/images/personal.png';
import BrandImg from '@/assets/images/brand.png';

const TOP_HEADER = RFValue(110) + BarHeight;

const filterScore = value => {
  if (value >= 10000) {
    const num = Math.round((value / 10000) * 10) / 10;
    return `${num}w`;
  } else {
    return value;
  }
};

const AccountDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const accountId = route.params.accountId;
  const {currentAccount} = useSelector(state => state.account);
  const [headerHeight, setHeaderHeight] = useState(380);
  const [currentKey, setCurrentKey] = useState('publish');
  const [account, setAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const isSelf = account && account.id === currentAccount.id;

  const onPlay = () => {
    Toast.show('顽力值代表你的影响力 \n顽力值越多收获就越多', {duration: 1000});
  };

  const goFollowAccounts = () => {
    navigation.push('FollowAccounts', {accountId: account.id});
  };

  const goFollowerAccounts = () => {
    navigation.push('FollowerAccounts', {accountId: account.id});
  };

  const onPreview = () => {
    const data = {index: 0, visible: true, images: [{url: account.avatar_url}]};
    dispatch(dispatchPreviewImage(data));
  };

  const onFollow = async () => {
    account.followed ? await unfollowAccount(accountId) : await followAccount(accountId);
    loadData();
  };

  const editInfo = () => {
    navigation.navigate('AccountContent');
  };

  const createChat = async () => {
    const params = {receiver_id: account.id};
    const res = await getChatGroupsDetail(params);
    const {uuid} = res.data.chat_group;
    navigation.navigate('ChatDetail', {uuid, targetAccount: account});
  };

  const actionItems = [
    {
      id: 1,
      label: '拉黑',
      onPress: () => {
        const data = {reason: '拉黑', report_type: 'Account', report_type_id: accountId};
        reportContent(data).then(() => {
          Toast.showError('已拉黑', {duration: 500});
        });
      },
    },
    {
      id: 2,
      label: '投诉',
      onPress: async () => {
        navigation.push('Report', {report_type: 'Account', report_type_id: accountId});
      },
    },
  ];

  const PublishList = () => {
    const params = {id: accountId, type: 'publish'};
    return <SingleList request={{api: getAccountPosts, params}} />;
  };

  const VideoList = () => {
    const params = {id: accountId, type: 'publish_video'};
    return <DoubleList request={{api: getAccountPosts, params}} />;
  };

  const PraiseList = () => {
    const params = {id: accountId, type: 'praise'};
    return <SingleList request={{api: getAccountPosts, params}} />;
  };

  const ArticleListPage = () => {
    const params = {id: accountId, type: 'publish'};
    return <ArticleList request={{api: getAccountArticles, params}} />;
  };

  const loadData = async () => {
    const res = await getAccount(accountId);
    setAccount(res.data.account);
  };

  useEffect(() => {
    loadData();
  }, []);

  const Header = () => {
    const defaultImage = account.background_img_url || AccountDetailBgImg;
    return (
      <View onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}>
        <TopBack top={BarHeight} onReportClick={() => setShowActionSheet(true)} />
        <View style={styles.header}>
          <View style={styles.topHeader}>
            <View style={styles.coverOpacity} />
            <FastImg source={{uri: defaultImage}} mode={'cover'} style={styles.imageCover} />
            <View style={styles.topHeaderContent}>
              <Avator
                size={RFValue(50)}
                account={account}
                isShowSettledIcon={false}
                handleClick={onPreview}
              />
              <View style={styles.countWrap}>
                <View style={styles.countContent}>
                  <Text style={styles.countNum}>{account.get_praises_count}</Text>
                  <Text style={styles.countText}>获赞</Text>
                </View>
                <Pressable style={styles.countContent} onPress={onPlay}>
                  <Text style={styles.countNum}>{filterScore(account.play_score)}</Text>
                  <Text style={styles.countText}>顽力值</Text>
                </Pressable>
                <Pressable style={styles.countContent} onPress={goFollowAccounts}>
                  <Text style={styles.countNum}>{account.following_count}</Text>
                  <Text style={styles.countText}>关注</Text>
                </Pressable>
                <Pressable style={styles.countContent} onPress={goFollowerAccounts}>
                  <Text style={styles.countNum}>{account.followers_count}</Text>
                  <Text style={styles.countText}>粉丝</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.bottomHeader}>
            <Text style={styles.nickname}>{account.nickname}</Text>
            <Text style={styles.uid}>顽鸦号: {account.uid}</Text>
            {['personal', 'brand'].includes(account.settled_type) && (
              <View style={styles.settledWrap}>
                <FastImg
                  style={styles.settledIcon}
                  source={account.settled_type === 'personal' ? PersonalImg : BrandImg}
                />
                <Text style={styles.settledText}>顽鸦认证：{account.settled_name}</Text>
              </View>
            )}
            <View style={styles.infoWrap}>
              {account.gender && (
                <IconFont name={account.gender} size={13} style={styles.maleIcon} />
              )}
              <Text style={styles.introtag}>{account.age || '18'}岁</Text>
              <Text style={styles.introtag}>{account.city.replace(',', ' ') || '未知街区'}</Text>
            </View>
            <View style={styles.labelWrap}>
              {account.label_list.map((label, index) => (
                <>
                  <Text style={styles.label}>{label}</Text>
                  {account.label_list.length - 1 !== index && (
                    <Text style={styles.labelLine}>|</Text>
                  )}
                </>
              ))}
            </View>
            <Text style={styles.introWrap} onPress={() => setShowModal(true)}>
              {/* {account.intro.replace(/(\r\n|\n|\r)/gm, '') || '这个人很懒，还没有填写简介'} */}
              {account.intro || '这个人很懒，还没有填写简介'}
            </Text>

            <View style={styles.headerBtnWrap}>
              {isSelf ? (
                <Text style={[styles.headerBtn, styles.editBth]} onPress={editInfo}>
                  编辑个人资料
                </Text>
              ) : (
                <>
                  <Text
                    style={[
                      styles.headerBtn,
                      account.followed ? styles.unfollowed : styles.followBtn,
                    ]}
                    onPress={onFollow}>
                    {account.followed && account.following
                      ? '互相关注'
                      : account.followed
                      ? '已关注'
                      : '关注'}
                  </Text>
                  <Text style={[styles.headerBtn, styles.chatBtn]} onPress={createChat}>
                    私聊
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return account ? (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light" />
      <CollapsibleHeader
        tabBarHeight={BarHeight}
        headerHeight={headerHeight}
        currentKey={currentKey}
        onKeyChange={key => setCurrentKey(key)}
        renderTopHeader={<StickTopHeader title={account.nickname} />}
        renderHeader={<Header />}
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

const position = {width: SCREEN_WIDTH, position: 'absolute'};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  header: {},
  topHeader: {
    height: TOP_HEADER,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 18,
  },
  imageCover: {
    height: TOP_HEADER,
    zIndex: -1,
    ...position,
  },
  coverOpacity: {
    height: TOP_HEADER,
    ...position,
    backgroundColor: '#000',
    opacity: 0.4,
  },
  topHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(20),
  },
  countWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: VWValue(55),
  },
  countNum: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: '#fff',
  },
  countText: {
    fontSize: RFValue(10),
    fontWeight: '400',
    color: '#fff',
    marginTop: RFValue(5),
  },
  bottomHeader: {
    backgroundColor: '#fff',
    borderTopLeftRadius: RFValue(10),
    borderTopRightRadius: RFValue(10),
    marginTop: -RFValue(10),
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 5,
  },
  nickname: {
    fontSize: VWValue(16),
    fontWeight: '600',
  },
  uid: {
    fontSize: 10,
    color: '#3d3d3d',
    fontWeight: '300',
    marginTop: RFValue(5),
  },
  settledWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(14),
  },
  settledIcon: {
    width: RFValue(14),
    height: RFValue(14),
    marginRight: 5,
  },
  settledText: {
    color: '#1b5c79',
    fontSize: 12,
  },
  infoWrap: {
    marginTop: RFValue(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  maleIcon: {
    marginRight: 9,
  },
  labelWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: RFValue(10),
    alignItems: 'center',
    marginBottom: RFValue(-3),
  },
  label: {
    fontSize: 12,
    lineHeight: 14,
    color: '#3d3d3d',
    marginRight: 5,
    marginTop: 8,
  },
  labelLine: {
    height: 12,
    marginRight: 5,
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#3d3d3d',
  },
  introtag: {
    height: RFValue(18),
    lineHeight: RFValue(18),
    paddingHorizontal: 12,
    textAlign: 'center',
    fontSize: 10,
    color: '#3d3d3d',
    backgroundColor: '#EEF0F0',
    marginRight: 9,
    borderRadius: 12,
    overflow: 'hidden',
  },
  introWrap: {
    lineHeight: 20,
    fontSize: 12,
    color: '#3d3d3d',
    letterSpacing: 1,
    marginTop: RFValue(10),
  },
  headerBtnWrap: {
    flexDirection: 'row',
    marginTop: RFValue(12),
  },
  headerBtn: {
    height: RFValue(35),
    lineHeight: RFValue(35),
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    backgroundColor: '#000',
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
  },
  followBtn: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#000',
    borderColor: '#000',
  },
  unfollowed: {
    flex: 1,
    color: '#3d3d3d',
    backgroundColor: '#fff',
    borderColor: '#bdbdbd',
  },
  editBth: {
    width: '100%',
    color: '#3d3d3d',
    backgroundColor: '#fff',
    borderColor: '#bdbdbd',
  },
  chatBtn: {
    width: VWValue(110),
    color: '#3d3d3d',
    backgroundColor: '#fff',
    marginLeft: 6,
    borderColor: '#bdbdbd',
  },
});

export default AccountDetail;
