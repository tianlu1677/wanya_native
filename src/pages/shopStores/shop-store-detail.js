import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import {Avator, JoinAccounts, JoinButton} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
// import {getActivityDetail, joinAccountsActivity, exitActivity} from '@/api/activity_api';
import {
  getShopStoreDetail,
  getShopStoreJoinAccounts,
  shopStoreJoined,
  shopStoreExit,
} from '@/api/shop_store_api';

import wxIcon from '@/assets/images/wx-icon.png';
const {width} = Dimensions.get('window');

console.log(width);
const ShopStoreDetail = props => {
  const {route, navigation} = props;
  const {shopStoreId} = route.params;
  const account = useSelector(state => state.account);

  const [detail, setDetail] = useState(null);
  const [joined, setJoined] = useState(false);

  const [joinAccounts, setJoinAccounts] = useState([]);

  const handleJoin = async () => {
    console.log(joined);
    if (joined) {
      await shopStoreExit(shopStoreId);
      Toast.showError('已取消收藏');
    } else {
      await shopStoreJoined(shopStoreId);
      Toast.showError('已收藏');
    }
    setJoined(!joined);
  };

  const loadData = async () => {
    const res = await getShopStoreDetail(shopStoreId);
    // setDetail({
    //   ...res.data.activity,
    //   // account_id: 310,
    //   joined: false,
    //   finish_at: '2021-10-31T20:34:00.000+08:00',
    //   max_limit_people: 10,
    //   // source_type: 'outside',
    // });
    setJoined(res.data.shop_store.joined);
    setDetail(res.data.shop_store);
  };

  const loadJoinAccounts = async () => {
    const res = await getShopStoreJoinAccounts(shopStoreId, {sort: 'publish_order'});
    const accounts = res.data.accounts.slice(0, 4);
    setJoinAccounts(accounts);
  };

  useEffect(() => {
    loadJoinAccounts();
    loadData();
  }, []);

  console.log('detail', detail);

  return detail ? (
    <View style={styles.wrapper}>
      <View style={styles.coverOpacity} />
      <FastImg source={{uri: detail.medias[0].url}} style={styles.bgCoverImage} />
      <View style={styles.header}>
        <FastImg source={{uri: detail.cover_url}} style={styles.cover_url} />
        <View style={styles.nameContent}>
          <Text style={styles.name}>{detail.name}</Text>
          <Text style={styles.count}>
            {detail.publish_topics_count + detail.publish_articles_count}
            篇帖子 · {detail.join_accounts_count}位顽友收藏
          </Text>
        </View>
        <View style={styles.refrence}>
          <View style={{marginTop: 3}}>
            <JoinButton
              join={joined}
              text={joined ? '已收藏' : '收藏'}
              onPress={handleJoin}
              joinedStyle={{color: '#BDBDBD', backgroundColor: '#fff'}}
              joineStyle={{color: '#000000', backgroundColor: '#fff'}}
            />
          </View>
          <View style={{marginBottom: RFValue(12)}}>
            <JoinAccounts accounts={joinAccounts} size={18} />
          </View>
        </View>
      </View>
      <View style={styles.slideWrapper}>
        {/* 所在位置 */}
        <View style={styles.slide}>
          <IconFont name="space-point" size={16} color="#000" />
          <Text style={styles.slideTitle}>所在位置</Text>
          <Text style={styles.slideValue} numberOfLines={1}>
            {detail.store_type === 'entity' && detail.address}
            {detail.store_type === 'website' && '网店'}
          </Text>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </View>
        {/* 营业时间 */}
        <View style={styles.slide}>
          <IconFont name="calendar" size={16} color="#000" />
          <Text style={styles.slideTitle}>营业时间</Text>
          <Text style={styles.slideValue} numberOfLines={1}>
            {detail.open_time}
          </Text>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </View>
        {/* 店铺标签 */}
        <View style={styles.slide}>
          <IconFont name="biaoqian" size={16} color="#000" />
          <Text style={styles.slideTitle}>店铺标签</Text>
          <Text style={styles.slideValue} numberOfLines={1}>
            {detail.open_time}
          </Text>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </View>
      </View>
    </View>
  ) : (
    <Loading />
  );
};

const positionCenter = {position: 'absolute', top: 0, left: 0, right: 0};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgCoverImage: {
    width: width,
    height: 230,
  },
  coverOpacity: {
    ...positionCenter,
    height: 230,
    backgroundColor: '#000',
    opacity: 0.4,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    marginLeft: 19,
    marginRight: 17,
    marginTop: -RFValue(75),
    zIndex: 3,
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
  },
  slideWrapper: {
    marginTop: -RFValue(37),
    paddingTop: RFValue(37) + RFValue(3),
    paddingHorizontal: 14,
    zIndex: 2,
    backgroundColor: '#fff',
    // backgroundColor: 'pink',
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
});

export default ShopStoreDetail;
