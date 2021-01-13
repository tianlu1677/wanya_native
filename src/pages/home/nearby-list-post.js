import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {throttle} from 'lodash';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import {NearbyShareComponent} from './share-component';
import {getNearbyPosts} from '@/api/home_api';
import {getLocation} from './getLocation';

const NearByListPost = () => {
  const dispatch = useDispatch();
  const {location} = useSelector(state => state.home);

  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const onRemove = index => {
    const data = JSON.parse(JSON.stringify(listData));
    data.splice(index, 1);
    setListData([...data]);
  };

  const RenderItem = React.memo(({item, index}) => {
    const data = {...item.item, location: item.location};
    return (
      <>
        {index === 0 && NearbyShareComponent()}
        {item.item_type === 'Topic' ? (
          <BaseTopic data={data} onRemove={() => onRemove(index)} />
        ) : (
          <BaseArticle data={data} />
        )}
      </>
    );
  });

  const renderItemMemo = useCallback(itemProps => <RenderItem {...itemProps} />, [listData]);

  const onOpenLocation = () => {
    // location为false 不同判断
    getLocation(true, result => {
      if (result) {
        dispatch({
          type: action.GET_LOCATION,
          value: {getLocation: true, ...result.position.coords},
        });
      } else {
        dispatch({type: action.GET_LOCATION, value: {getLocation: false}});
      }
    });
  };

  const onRefresh = (page = 1) => {
    loadData(page);
  };

  const loadData = async (page = 1, params) => {
    if (page === 1) {
      setLoading(true);
    }
    const res = await getNearbyPosts({page, ...params});
    setListData(page === 1 ? res.data.posts : [...listData, ...res.data.posts]);
    setLoading(false);
    setHeaders(res.headers);
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const {latitude, longitude} = location;
      // loadData(1, {latitude, longitude});
      loadData(1, {latitude: 39.908491, longitude: 116.374328});
    }
  }, [location]);

  // console.log('nearby location', location);

  return location.latitude && location.longitude ? (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={throttle(onRefresh, 300)}
      headers={headers}
      renderItem={renderItemMemo}
      initialNumToRender={6}
      onEndReachedThreshold={0.25}
      windowSize={Platform.OS === 'ios' ? 8 : 20}
      renderEmpty={
        <View style={styles.emptyWrap}>
          <View style={styles.emptyTextWrap}>
            <Text style={styles.emptyText}>附近还没有更多顽友</Text>
            <Text style={styles.emptyText}>邀请小伙伴一起玩呀</Text>
          </View>
          <Text style={styles.moreNode}>分享给身边好友</Text>
        </View>
      }
    />
  ) : (
    <View style={styles.emptyWrap}>
      <View style={styles.emptyTextWrap}>
        <Text style={styles.emptyText}>你还没有开启【定位服务】权限</Text>
        <Text style={styles.emptyText}>在【设置】中授权后将获得更多附近信息</Text>
      </View>
      <Text style={styles.moreNode} onPress={onOpenLocation}>
        开启位置访问权限
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
  },
  emptyTextWrap: {
    flexDirection: 'column',
    marginTop: 110,
  },
  emptyText: {
    lineHeight: 23,
    fontSize: 14,
    textAlign: 'center',
    color: '#BDBDBD',
  },
  moreNode: {
    width: 243,
    height: 45,
    lineHeight: 45,
    backgroundColor: '#000',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
  },
});

export default NearByListPost;
