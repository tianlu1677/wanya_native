import React, {useState, useEffect, useCallback} from 'react';
import {Platform, View, Text, Pressable, ScrollView, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as action from '@/redux/constants';
import {throttle} from 'lodash';
import Toast from '@/components/Toast';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import {BlurView} from '@/components/NodeComponents';
import FastImg from '@/components/FastImg';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import {getFollowedPosts} from '@/api/home_api';
import {recommendAccounts} from '@/api/mine_api';
import {followAccount} from '@/api/account_api';
import {RFValue} from '@/utils/response-fontsize';
import {ShareWrapper as lstyles} from '@/styles/baseCommon';

export const FollowShareComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {shareStatus} = useSelector(state => state.home);

  const onShareClose = () => {
    dispatch({type: action.CHANGE_SHARE_STATUS, value: false});
  };

  const onShare = () => {
    navigation.navigate('InviteDetail');
  };

  return shareStatus ? (
    <Pressable style={lstyles.followShareWrap} onPress={onShare}>
      <BlurView blurType="light" blurAmount={100} reducedTransparencyFallbackColor="white" style={{backgroundColor: '#F2F3F5', borderRadius: 10}}>
        <View style={lstyles.followShare}>
          <FastImg style={lstyles.followShareImage} source={require('@/assets/images/share.png')} />
          <View>
            <Text style={lstyles.shareTitle}>获取更多好友动态</Text>
            <Text style={lstyles.shareText}>分享给身边好友，邀请小伙伴一起玩呀！</Text>
          </View>
          <Pressable
            style={lstyles.deleteIcon}
            hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
            onPress={onShareClose}>
            <IconFont name="qingkong" size={16} />
          </Pressable>
        </View>
      </BlurView>
    </Pressable>
  ) : null;
};

const RelatedRecommend = () => {
  const navigation = useNavigation();
  const [account, setAccount] = useState([]);

  const loadData = async () => {
    const res = await recommendAccounts();
    setAccount(res.data.accounts);
  };

  const onFollow = async (item, index) => {
    if (item.followed === false) {
      await followAccount(item.id);
      Toast.showError('关注成功');
      account[index].followed = true;
      setAccount([...account]);
    }

    setTimeout(() => {
      account.splice(index, 1);
      setAccount([...account]);
    }, 1000);
  };

  const goDetail = item => {
    navigation.navigate('AccountDetail', {accountId: item.id});
  };

  const goRelatedDetail = () => {
    navigation.navigate('RelatedAccounts');
  };

  useEffect(() => {
    loadData();
  }, []);

  return account.length > 0 ? (
    <View style={styles.wrapper}>
      <Pressable style={styles.title} onPress={goRelatedDetail}>
        <Text>为您推荐</Text>
        <View style={styles.right}>
          <Text style={{marginRight: 2}}>相关推荐</Text>
          <IconFont name="arrow-right" color={'#000'} size={RFValue(8)} />
        </View>
      </Pressable>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {account.map((item, index) => (
            <Pressable key={item.id} style={styles.card} onPress={() => goDetail(item)}>
              <Avator account={{avatar_url: item.avatar_url, id: item.id}} size={70} />
              <Text style={styles.cardtext} numberOfLines={1}>
                {item.nickname}
              </Text>
              <Text
                style={[styles.cardbtn, item.followed ? styles.hasfollow : styles.notfollow]}
                onPress={() => onFollow(item, index)}>
                {item.followed ? '已关注' : '关注'}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  ) : null;
};

const FollowListPost = () => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const onRemove = index => {
    const data = JSON.parse(JSON.stringify(listData));
    data.splice(index, 1);
    setListData([...data]);
  };

  const RenderItem = React.memo(({item, index}) => {
    return (
      <>
        {item.item_type === 'Topic' ? (
          <BaseTopic data={item.item} onRemove={() => onRemove(index)} />
        ) : (
          <BaseArticle data={item.item} />
        )}
      </>
    );
  });

  const renderItemMemo = useCallback(
    itemProps => {
      console.log('itemProps....', itemProps, itemProps.id === 0);
      if (itemProps.index === 1) {
        return (
          <View>
            <RelatedRecommend />
            <RenderItem {...itemProps} />
          </View>
        );
      } else {
        return <RenderItem {...itemProps} />;
      }
    },
    [listData]
  );
  const onRefresh = (page = 1) => {
    loadData(page);
  };

  const loadData = async (page = 1, params) => {
    if (page === 1) {
      setLoading(true);
    }
    const res = await getFollowedPosts({page, ...params});
    setListData(page === 1 ? res.data.posts : [...listData, ...res.data.posts]);
    setHeaders(res.headers);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={throttle(onRefresh, 300)}
      headers={headers}
      renderItem={renderItemMemo}
      initialNumToRender={6}
      onEndReachedThreshold={0.25}
      windowSize={Platform.OS === 'ios' ? 10 : 20}
      ListHeaderComponent={FollowShareComponent()}
      renderEmpty={
        <View>
          {FollowShareComponent()}
          {RelatedRecommend()}
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 14,
    backgroundColor: '#fafafa',
  },
  title: {
    height: RFValue(40),
    lineHeight: RFValue(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 14,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    width: RFValue(125),
    backgroundColor: '#F2F3F5',
    alignItems: 'center',
    paddingVertical: RFValue(16),
    marginRight: RFValue(10),
    borderRadius: 2,
    overflow: 'hidden',
  },
  cardtext: {
    lineHeight: 18,
    marginTop: RFValue(10),
    marginBottom: RFValue(15),
    marginLeft: RFValue(9),
    marginRight: RFValue(9),
  },
  cardbtn: {
    width: RFValue(90),
    height: RFValue(30),
    lineHeight: RFValue(30),
    textAlign: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    fontSize: 13,
    fontWeight: '500',
  },
  hasfollow: {
    backgroundColor: '#FAFAFA',
    color: '#BDBDBD',
  },
  notfollow: {
    backgroundColor: '#000',
    color: '#fff',
  },
});

export default FollowListPost;
