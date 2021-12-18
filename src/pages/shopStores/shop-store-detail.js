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
  Avator,
  JoinAccounts,
  JoinButton,
  BottomModal,
  ModalInfo,
} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import {
  getShopStoreDetail,
  getShopStoreJoinAccounts,
  getShopStoreJoined,
  getShopStoreExit,
  getShopStorePosts,
} from '@/api/shop_store_api';
import {SCREEN_WIDTH} from '@/utils/navbar';

import PersonImg from '@/assets/images/personal.png';
import BrandImg from '@/assets/images/brand.png';

const ShopStoreDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {shopStoreId} = route.params;

  const savetopic = useSelector(state => state.home.savetopic);
  const [detail, setDetail] = useState(null);
  const [joinAccounts, setJoinAccounts] = useState([]);
  const [rateList, setRateList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [itemList, setItemList] = useState([]);

  const [visible, setVisible] = useState(false);

  const loadAccounts = async () => {
    const res = await getShopStoreJoinAccounts(shopStoreId);
    setJoinAccounts(res.data.accounts.slice(0, 4));
  };

  const loadData = async () => {
    loadAccounts();
    const res = await getShopStoreDetail(shopStoreId);
    setDetail(res.data.shop_store);
  };

  const loadList = async () => {
    const res = await getShopStorePosts({id: shopStoreId, type: 'rate'});
    setRateList(res.data.posts);
    const ret = await getShopStorePosts({id: shopStoreId, type: 'no_rate'});
    setPostList(ret.data.posts);
  };

  const onPreview = type => {
    if (type === 'cover_url') {
      const data = {index: 0, visible: true, images: [{url: detail.cover_url}]};
      dispatch(dispatchPreviewImage(data));
    }

    if (type === 'bg_cover') {
      const data = {index: 0, visible: true, images: detail.medias};
      dispatch(dispatchPreviewImage(data));
    }
  };

  const handleFollowClick = async () => {
    detail.joined ? await getShopStoreExit(shopStoreId) : await getShopStoreJoined(shopStoreId);
    loadData();
    loadAccounts();
  };

  const handleGet = value => setVisible(value);

  const goAddress = () => {
    if (detail.store_type === 'website') {
      return;
    }
    // 起点坐标信息
    const startLocation = {lng: 106.534892, lat: 29.551891, title: '我的位置'};
    const destLocation = {lng: detail.longitude, lat: detail.latitude, title: detail.address};
    if (Platform.OS === 'ios') {
      MapLinking.planRoute({startLocation, destLocation, mode: 'drive'});
    } else {
      setShowActionSheet(true);
      const config = {mode: 'drive', type: 'gcj02', appName: 'MapLinking'};
      const maps = MapLinking.openUrl({...config, startLocation, destLocation});
      const list = maps.map((map, index) => ({
        id: index,
        label: map[0],
        onPress: () => {
          Linking.openURL(map[1]);
        },
      }));
      setItemList(list);
    }
  };

  const handleGoRateList = () => {
    navigation.navigate('ShopStoreRateList', {shopStoreId});
  };

  const handleGoPostList = () => {
    navigation.navigate('ShopStorePostList', {shopStoreId});
  };

  const handelGoTopic = () => {
    navigation.navigate('NewTopic');
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, shop_store_ids: [detail]}});
  };

  const handelGoRate = () => {
    navigation.navigate('NewRate');
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, shop_store_ids: [detail]}});
  };

  useEffect(() => {
    loadData();
    loadList();
  }, []);

  return detail ? (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerWrapper}>
          <View style={styles.coverOpacity} />
          <Pressable onPress={() => onPreview('bg_cover')}>
            <FastImg source={{uri: detail.medias[0].url}} style={styles.imageCover} />
          </Pressable>
          {!detail.account ? (
            <View style={styles.headerAccount}>
              <Avator account={detail.account} size={RFValue(30)} isShowSettledIcon={false} />
              <View style={styles.accountContent}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.accountName}>{detail.account.nickname}</Text>
                  {detail.account.settled_type === 'personal' && (
                    <FastImg style={styles.settledIcon} source={PersonImg} />
                  )}
                  {detail.account.settled_type === 'brand' && (
                    <FastImg style={styles.settledIcon} source={BrandImg} />
                  )}
                </View>
                <Text style={styles.accountText}>已认领</Text>
              </View>
            </View>
          ) : (
            <Pressable style={[styles.headerAccount, {top: 35}]} onPress={() => handleGet(true)}>
              <IconFont name="question" size={16} color={'#fff'} />
              <Text style={styles.noAccount}>未认领</Text>
            </Pressable>
          )}

          <View style={styles.headerContent}>
            <View style={styles.headerInfo}>
              <Pressable onPress={() => onPreview('cover_url')}>
                <FastImg source={{uri: detail.cover_url}} style={styles.cover_url} />
              </Pressable>

              <View style={styles.nameContent}>
                <Text style={styles.name} numberOfLines={1}>
                  {detail.name}
                </Text>
                <Text style={styles.count}>
                  {detail.publish_topics_count + detail.publish_articles_count}
                  篇帖子 · {detail.join_accounts_count}位顽友收藏
                </Text>
              </View>
              <View style={styles.refrence}>
                <JoinButton
                  join={detail.joined}
                  text={detail.joined ? '已收藏' : '收藏'}
                  onPress={handleFollowClick}
                  borderRadius={12}
                  joinedStyle={{color: '#BDBDBD', backgroundColor: '#fff'}}
                  joinStyle={{color: '#000000', backgroundColor: '#fff'}}
                />
                <JoinAccounts
                  accounts={joinAccounts}
                  size={18}
                  style={{marginBottom: RFValue(12), justifyContent: 'flex-end'}}
                />
              </View>
            </View>
            <View style={styles.slideWrapper}>
              <Pressable style={styles.slide} onPress={goAddress}>
                <IconFont name="space-point" size={16} color="#000" />
                <Text style={styles.slideTitle}>所在位置</Text>
                <Text style={styles.slideValue} numberOfLines={1}>
                  {detail.store_type === 'entity' && detail.address}
                  {detail.store_type === 'website' && '网店'}
                </Text>
                <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
              </Pressable>

              <View style={styles.slide}>
                <IconFont name="calendar" size={16} color="#000" />
                <Text style={styles.slideTitle}>营业时间</Text>
                <Text style={styles.slideValue} numberOfLines={1}>
                  {detail.open_time}
                </Text>
              </View>

              <Pressable style={styles.slide} onPress={() => setShowModal(true)}>
                <IconFont name="biaoqian" size={16} color="#000" />
                <Text style={styles.slideTitle}>店铺标签</Text>
                <View style={[styles.slideValue, styles.tagWrapper]}>
                  {detail.tags.slice(0, 3).map(tag => (
                    <Text style={styles.tag} key={tag.id}>
                      {tag.name}
                    </Text>
                  ))}
                </View>
                <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
              </Pressable>
            </View>
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

      {detail.tags.length > 0 && (
        <BottomModal
          visible={showModal}
          cancleClick={() => setShowModal(false)}
          title="店铺标签"
          content={
            <View style={styles.tagWrapper}>
              {detail.tags.map(tag => (
                <Text style={styles.tag} key={tag.id}>
                  {tag.name}
                </Text>
              ))}
            </View>
          }
        />
      )}

      <ActionSheet
        actionItems={itemList}
        showActionSheet={showActionSheet}
        changeModal={() => {
          setShowActionSheet(false);
        }}
      />

      <ModalInfo
        visible={visible}
        content="认领表示该店铺属于本人/机构所有，认领前需联系顽鸦小助手进行账号认证，认领后可获得编辑品牌信息等权益。"
        handleCancel={() => handleGet(false)}
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollView: {
    marginBottom: RFValue(40) + 20,
  },
  headerWrapper: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  imageCover: {
    width: SCREEN_WIDTH,
    height: RFValue(115),
    zIndex: -1,
  },
  coverOpacity: {
    width: SCREEN_WIDTH,
    height: RFValue(115),
    position: 'absolute',
    top: 0,
    backgroundColor: '#000',
    opacity: 0.4,
  },
  headerAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 14,
    top: 20,
  },
  accountContent: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  accountName: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
  accountText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '300',
    marginTop: RFValue(4),
  },
  settledIcon: {
    width: RFValue(8),
    height: RFValue(8),
    marginLeft: 3,
  },
  noAccount: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 5,
  },
  headerContent: {
    marginTop: -RFValue(37),
    paddingHorizontal: 14,
  },
  headerInfo: {
    flexDirection: 'row',
  },
  cover_url: {
    width: RFValue(75),
    height: RFValue(75),
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameContent: {
    justifyContent: 'space-between',
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: RFValue(16),
    color: '#fff',
    marginTop: 3 + RFValue(3),
  },
  count: {
    fontSize: 12,
    color: '#BDBDBD',
    lineHeight: RFValue(20),
    marginBottom: RFValue(10),
  },
  refrence: {
    justifyContent: 'space-between',
    marginLeft: 'auto',
    paddingTop: 3,
  },
  slideWrapper: {
    marginTop: RFValue(3),
  },
  slide: {
    height: RFValue(50),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  slideTitle: {
    marginLeft: 12,
    fontWeight: '400',
    marginRight: 15,
  },
  slideValue: {
    flex: 1,
    marginRight: 14,
    fontWeight: '400',
    textAlign: 'right',
  },
  slideRight: {
    position: 'absolute',
    right: 0,
  },
  tagWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tag: {
    height: RFValue(20),
    lineHeight: RFValue(20),
    paddingHorizontal: 8,
    fontSize: 10,
    color: '#FF8D00',
    borderWidth: 1,
    borderColor: '#FF8D00',
    borderRadius: 2,
    marginLeft: 7,
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

export default ShopStoreDetail;
