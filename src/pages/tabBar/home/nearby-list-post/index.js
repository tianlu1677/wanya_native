import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, Text, Pressable, Platform, StyleSheet, AppState} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {throttle} from 'lodash';
import {RFValue} from '@/utils/response-fontsize';
import IconFont from '@/iconfont';
import {BlurView} from '@/components/NodeComponents';
import FastImg from '@/components/FastImg';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import BaseTheory from '@/components/Item/base-theory';
import {getNearbyPosts} from '@/api/home_api';
import {loadLocation} from '@/utils/get-location';
import {useNavigation} from '@react-navigation/native';
import {ListEmpty as lstyles, ShareWrapper as styles} from '@/styles/baseCommon';
import ShareNearByImg from '@/assets/images/share-nearby.png';

const RenderPermission = () => {
  const dispatch = useDispatch();

  const onOpenLocation = () => {
    loadLocation(dispatch);
  };

  return (
    <View style={lstyles.emptyWrap}>
      <View style={[lstyles.emptyTextWrap, {marginTop: RFValue(165)}]}>
        <Text style={lstyles.emptyText}>你还没有开启【定位服务】权限</Text>
        <Text style={lstyles.emptyText}>在【设置】中授权后将获得更多附近信息</Text>
      </View>
      <Text style={lstyles.moreNode} onPress={onOpenLocation}>
        开启位置访问权限
      </Text>
    </View>
  );
};

const RenderEmpty = () => {
  const navigation = useNavigation();

  return (
    <Pressable style={lstyles.emptyWrap} onPress={() => navigation.navigate('InviteDetail')}>
      <View style={[lstyles.emptyTextWrap, {marginTop: RFValue(165)}]}>
        <Text style={lstyles.emptyText}>附近还没有更多顽友</Text>
        <Text style={lstyles.emptyText}>邀请小伙伴一起玩呀</Text>
      </View>
      <Text style={lstyles.moreNode}>分享给身边好友</Text>
    </Pressable>
  );
};

const NearbyShareComponent = props => {
  const {shareNearbyStatus, dispatch, navigation} = props;

  const onShareClose = () => {
    dispatch({type: action.CHANGE_SHARE_NEARBY_STATUS, value: false});
  };

  const onShare = () => {
    navigation.navigate('InviteDetail');
  };

  return shareNearbyStatus ? (
    <Pressable style={styles.followShareWrap} onPress={onShare}>
      <BlurView
        blurType="light"
        blurAmount={100}
        reducedTransparencyFallbackColor="white"
        style={styles.followShare}>
        <FastImg style={styles.followShareImage} source={ShareNearByImg} />
        <View>
          <Text style={styles.shareTitle}>获取更多附近信息</Text>
          <Text style={styles.shareText}>分享给身边好友，邀请小伙伴一起玩呀！</Text>
        </View>
        <Pressable
          style={styles.deleteIcon}
          hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
          onPress={onShareClose}>
          <IconFont name="qingkong" size={16} />
        </Pressable>
      </BlurView>
    </Pressable>
  ) : null;
};

const NearByListPost = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    home: {location, shareNearbyStatus},
  } = useSelector(state => state);
  const openAddress = location.latitude && location.longitude ? true : false;

  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const onRemove = index => {
    const data = JSON.parse(JSON.stringify(listData));
    data.splice(index, 1);
    setListData([...data]);
  };

  const RenderItem = React.memo(({item, index}) => {
    return useMemo(() => {
      return (
        <View style={{marginBottom: index === listData.length - 1 ? 60 : 0}}>
          {index === 0 && (
            <NearbyShareComponent
              shareNearbyStatus={shareNearbyStatus}
              dispatch={dispatch}
              navigation={navigation}
            />
          )}
          {item.item_type === 'Topic' && (
            <BaseTopic data={item.item} onRemove={() => onRemove(index)} />
          )}
          {item.item_type === 'Article' && <BaseArticle data={item.item} />}
          {item.item_type === 'Theory' && (
            <BaseTheory data={item.item} onRemove={() => onRemove(index)} />
          )}
        </View>
      );
    }, [item.id]);
  });

  const renderItemMemo = useCallback(itemProps => <RenderItem {...itemProps} />, [listData]);

  const loadData = async (page = 1, params) => {
    if (page === 1) {

    }
    setLoading(true);
    const res = await getNearbyPosts({page, ...params});
    setListData(page === 1 ? res.data.posts : [...listData, ...res.data.posts]);
    setLoading(false);
    setHeaders(res.headers);
  };

  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      loadLocation(dispatch);
    }
  };

  const onRefresh = (page = 1) => {
    const {latitude, longitude} = location;
    loadData(page, {latitude, longitude});
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    if (openAddress) {
      loadData(1);
    }
  }, [openAddress]);

  return openAddress ? (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={throttle(onRefresh, 300)}
      headers={headers}
      renderItem={renderItemMemo}
      initialNumToRender={6}
      onEndReachedThreshold={0.25}
      windowSize={Platform.OS === 'ios' ? 8 : 20}
      renderSeparator={() => <View style={nstyles.speator} />}
      renderEmpty={<RenderEmpty />}
    />
  ) : (
    <RenderPermission />
  );
};

const nstyles = StyleSheet.create({
  speator: {
    backgroundColor: '#ebebeb',
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 14,
  },
});

export default NearByListPost;
