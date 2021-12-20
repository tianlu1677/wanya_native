import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Linking, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchPreviewImage} from '@/redux/actions';
import * as action from '@/redux/constants';
import MapLinking from '@/components/MapLink';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import ActionSheet from '@/components/ActionSheet.android';
import IconFont from '@/iconfont';
import BaseTopic from '@/components/Item/base-topic';
import {
  PlayScore,
  RateScore,
  Avator,
  JoinAccounts,
  JoinButton,
  BottomModal,
} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';

import {
  getSpaceDetail,
  getSpacesJoinAccounts,
  getSpacesJoin,
  getSpacesExit,
  getSpacePosts,
} from '@/api/space_api';

import {SCREEN_WIDTH} from '@/utils/navbar';

const SpaceDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {spaceId} = route.params;
  const savetopic = useSelector(state => state.home.savetopic);
  const [detail, setDetail] = useState(null);
  const [joinAccounts, setJoinAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [rateList, setRateList] = useState([]);
  const [postList, setPostList] = useState([]);

  const loadAccounts = async () => {
    const res = await getSpacesJoinAccounts(spaceId);
    setJoinAccounts(res.data.accounts);
  };

  const loadData = async () => {
    loadAccounts();
    const res = await getSpaceDetail(spaceId);
    setDetail(res.data.space);
  };

  const loadList = async () => {
    const res = await getSpacePosts({id: spaceId, type: 'rate'});
    setRateList(res.data.posts);
    const ret = await getSpacePosts({id: spaceId, type: 'no_rate'});
    setPostList(ret.data.posts);
  };

  const handleFollowClick = async () => {
    detail.joined ? await getSpacesExit(spaceId) : await getSpacesJoin(spaceId);
    loadData();
    loadAccounts();
  };

  const handleClickImage = index => {
    if (index === 0 || index === 1) {
      const images = detail.medias.map(item => {
        return {url: item.split('?')[0]};
      });
      const data = {index, visible: true, images};
      dispatch(dispatchPreviewImage(data));
    }
    if (index === 2) {
      handleGoImageInfo();
    }
  };

  const onPreview = () => {
    const data = {index: 0, visible: true, images: [{url: detail.cover_url}]};
    dispatch(dispatchPreviewImage(data));
  };

  const handelGoAccountDetail = () => {
    navigation.navigate('AccountDetail', {accountId: detail.account.id});
  };

  const handleGoImageInfo = () => {
    navigation.navigate('SpaceImageInfo', {medias: detail.medias});
  };

  const handleGoRateList = () => {
    navigation.navigate('SpaceRateList', {spaceId});
  };

  const handleGoPostList = () => {
    navigation.navigate('SpacePostList', {spaceId});
  };

  const handelGoTopic = () => {
    navigation.navigate('NewTopic');
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, space: detail}});
  };

  const handelGoRate = () => {
    navigation.navigate('NewRate');
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, space: detail}});
  };

  const handlePhone = () => {
    const phone = `'tel:${detail.phone}`;
    Linking.canOpenURL(phone).then(supported => {
      if (supported) {
        return Linking.openURL(phone);
      }
    });
  };

  const handleChange = () => {
    // 起点坐标信息 || 终点坐标信息
    const startLocation = {lng: 106.534892, lat: 29.551891, title: '我的位置'};
    const destLocation = {lng: detail.longitude, lat: detail.latitude, title: detail.name};
    if (Platform.OS === 'ios') {
      MapLinking.planRoute({startLocation, destLocation, mode: 'drive'});
    } else {
      setShowActionSheet(true);
      const options = {mode: 'drive', type: 'gcj02', appName: 'MapLinking'};
      const maps = MapLinking.openUrl({...options, startLocation, destLocation});
      const list = maps.map((map, index) => ({
        id: index,
        label: map[0],
        onPress: () => Linking.openURL(map[1]),
      }));
      setItemList(list);
    }
  };

  useEffect(() => {
    loadData();
    loadList();
  }, []);

  return detail ? (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.topContent}>
          <View style={styles.image}>
            <Pressable onPress={onPreview}>
              <FastImg source={{uri: detail.cover_url}} style={styles.coverImage} />
            </Pressable>
            <View style={styles.scoreOpacity}>
              <PlayScore
                score={detail.play_score}
                imageStyle={{width: 12, height: 13}}
                text="顽力"
              />
            </View>
          </View>
          <Text style={styles.name}>{detail.name}</Text>
          <View style={styles.info}>
            <RateScore score={detail.rate_score} size={14} />
            <Text style={styles.infoCount}>{detail.publish_rate_topics_count}条评价</Text>
            <Text style={styles.infoCount}>{detail.publish_topics_count}条动态</Text>
          </View>
          <Pressable style={styles.info} onPress={handelGoAccountDetail}>
            <Avator account={detail.account} size={20} />
            <Text style={styles.accountText}>{detail.account.nickname} 创建</Text>
          </Pressable>
          {detail.tag_list.length > 0 ? (
            <View style={[styles.info, styles.tagsInfo]}>
              {detail.tag_list.map((tag, index) => (
                <Text style={styles.tag} key={index}>
                  {tag}
                </Text>
              ))}
            </View>
          ) : null}
          <View style={[styles.info, styles.addressInfo]}>
            <Text style={styles.addressText}>{detail.address}</Text>
            <View style={styles.addressRight}>
              <Pressable style={styles.addressIconWrap} onPress={handleChange}>
                <IconFont name="ditu" size={16} />
                <Text style={styles.addressIconText}>地图</Text>
              </Pressable>
              {detail.phone ? (
                <Pressable style={styles.addressIconWrap} onPress={handlePhone}>
                  <IconFont name="dianhua" size={16} />
                  <Text style={styles.addressIconText}>电话</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
          <View style={[styles.info, styles.joinAccountsInfo]}>
            {joinAccounts.length > 0 ? (
              <JoinAccounts
                accounts={joinAccounts.slice(0, 4)}
                size={RFValue(25)}
                style={{marginRight: 4}}
              />
            ) : null}
            <Text style={styles.accountText}>
              {joinAccounts.length > 0 ? `${joinAccounts.length}个顽友已收藏` : '还没有顽友收藏'}
            </Text>
            <JoinButton
              join={detail.joined}
              text={detail.joined ? '已收藏' : '收藏'}
              borderRadius={13}
              onPress={handleFollowClick}
              joinedStyle={{color: '#BDBDBD', backgroundColor: '#fff'}}
              joineStyle={{color: '#000000', backgroundColor: '#fff'}}
            />
          </View>
        </View>

        <View style={[styles.intro]}>
          <View style={styles.introTitleInfo}>
            <Text style={styles.introTitle}>简介</Text>
            {detail.medias.length > 3 ? (
              <Text style={styles.introTips} onPress={handleGoImageInfo}>
                查看全部
              </Text>
            ) : null}
          </View>
          <View style={styles.introImageInfo}>
            <View style={styles.imageInfo}>
              {detail.medias.slice(0, 3).map((item, index) => {
                return (
                  <Pressable
                    style={styles.introImageWrapper}
                    key={index}
                    onPress={() => handleClickImage(index)}>
                    <FastImg source={{uri: detail.cover_url}} style={styles.introImage} />
                    {index === 2 && detail.medias.length > 3 ? (
                      <Text style={styles.introImageOpacity}>{detail.medias.length}张图片</Text>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.introText} numberOfLines={2} onPress={() => setShowModal(true)}>
              {detail.intro}
            </Text>
          </View>
        </View>

        {rateList.length > 0 ? (
          <View style={[styles.intro]}>
            <View style={styles.introTitleInfo}>
              <Text style={styles.introTitle}>评价</Text>
              <Text style={styles.introTips} onPress={handleGoRateList}>
                查看全部
              </Text>
            </View>
            <View style={styles.listWrapper}>
              {rateList.slice(0, 3).map(item => (
                <BaseTopic data={item.item} />
              ))}
            </View>
          </View>
        ) : null}

        {postList.length > 0 ? (
          <View style={[styles.intro]}>
            <View style={styles.introTitleInfo}>
              <Text style={styles.introTitle}>动态</Text>
              <Text style={styles.introTips} onPress={handleGoPostList}>
                查看全部
              </Text>
            </View>
            <View style={styles.listWrapper}>
              {postList.slice(0, 3).map(item => (
                <BaseTopic data={item.item} />
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>

      <BottomModal
        visible={showModal}
        cancleClick={() => setShowModal(false)}
        title={detail.name}
        content={detail.intro}
      />
      <ActionSheet
        actionItems={itemList}
        showActionSheet={showActionSheet}
        changeModal={() => {
          setShowActionSheet(false);
        }}
      />

      <View style={[styles.btnWrap]}>
        <Pressable style={[styles.btn, styles.punchBtn]} onPress={handelGoTopic}>
          <IconFont name="takephoto" size={22} color="white" />
          <Text style={styles.btnText}>去打卡</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.commentBtn]} onPress={handelGoRate}>
          <IconFont name="xie" size={22} color="white" />
          <Text style={styles.btnText}>写评价</Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <Loading />
  );
};

const opacity = {
  paddingVertical: 5,
  paddingHorizontal: 10,
  position: 'absolute',
  bottom: 14,
  right: 14,
  borderRadius: 15,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  overflow: 'hidden',
  color: '#fff',
  fontSize: 11,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollView: {
    marginBottom: RFValue(40) + 20,
  },
  topContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingBottom: 15,
  },
  coverImage: {
    width: SCREEN_WIDTH - 28,
    height: ((SCREEN_WIDTH - 28) * 390) / 690,
    borderRadius: 8,
  },
  scoreOpacity: {
    ...opacity,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 14,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(10),
  },
  infoCount: {
    marginLeft: 9,
    fontSize: 13,
  },
  accountText: {
    fontSize: 12,
    marginLeft: 5,
    marginRight: 'auto',
  },
  tagsInfo: {
    marginBottom: -10,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontSize: 10,
    color: '#FF6633',
    backgroundColor: '#FFF2E7',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 7,
    marginBottom: 7,
  },
  addressInfo: {
    justifyContent: 'space-between',
  },
  addressText: {
    fontSize: 13,
  },
  addressRight: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  addressIconWrap: {
    alignItems: 'center',
    marginLeft: 30,
  },
  addressIconText: {
    color: '#8B8B8B',
    fontSize: 10,
    marginTop: 3,
  },
  joinAccountsInfo: {
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#bdbdbd',
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    elevation: 10,
    zIndex: -1,
  },
  intro: {
    marginTop: 15,
    marginHorizontal: 14,
    paddingVertical: 15,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  introTitleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  introTips: {
    color: '#AAAAAA',
    fontSize: 12,
  },
  introImageInfo: {
    marginTop: 16,
  },
  imageInfo: {
    flexDirection: 'row',
  },
  introImageWrapper: {
    position: 'relative',
  },
  introImage: {
    width: 108,
    height: 108,
    marginRight: 3,
  },
  introImageOpacity: {
    ...opacity,
    left: 16,
    top: 42,
    width: 75,
    height: 23,
    borderRadius: 13,
  },
  introText: {
    lineHeight: RFValue(14),
    marginTop: RFValue(12),
  },
  listWrapper: {
    marginHorizontal: -14,
  },
  btnWrap: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ebebeb',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  btn: {
    width: (SCREEN_WIDTH - 70) / 2,
    height: RFValue(40),
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 13,
  },
  punchBtn: {
    backgroundColor: '#000',
  },
  commentBtn: {
    backgroundColor: '#FF2242',
    marginLeft: 20,
  },
});

export default SpaceDetail;
