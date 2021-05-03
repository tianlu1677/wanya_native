import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Image, StyleSheet, Pressable, StatusBar, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {EmptyImg} from '@/utils/default-image';
import {RFValue} from '@/utils/response-fontsize';
import IconFont from '@/iconfont';
import BaseShopStore from '@/components/Item/base-shop-store';
import ShopStoreList from '@/components/List/shop-store-list';
import {getShopStores} from '@/api/shop_store_api';

const ShopStore = props => {
  const {navigation} = props;
  const {category} = props.route.params;
  const {location, categoryList} = useSelector(state => state.home);
  const categoryId = categoryList.find(item => item.name === category).id;
  const {latitude, longitude, positionCity, chooseCity} = location;
  const [listdata, setListData] = useState([]);
  const [request, setRequest] = useState(null);

  const isCurrentCity = positionCity === chooseCity;
  const isPosition = latitude && longitude && positionCity ? true : false;
  const city = chooseCity === '全国' ? 'china' : chooseCity;
  const commonParams = {latitude, longitude, currentcity: positionCity, city};
  const params = {'q[category_id_eq]': categoryId};

  console.log('isCurrentCity', isCurrentCity, isPosition);

  const goChooseCity = () => {
    props.navigation.navigate('ChooseCity');
  };

  const loadNearBy = async () => {
    if (isPosition && isCurrentCity) {
      const query = {...commonParams, ...params, per_page: 100};
      // console.log('top params', JSON.stringify(query));
      const res = await getShopStores(query);
      setListData(res.data.shop_stores);
      // console.log('top data', res.data.shop_stores);
      const id_not_in = res.data.shop_stores.map(item => item.id).join();
      const listQuery = {'q[category_id_eq]': categoryId, 'q[id_not_in]': id_not_in, city: 'china'};
      console.log('list params', JSON.stringify(listQuery));
      setRequest({api: getShopStores, params: listQuery});
    } else {
      const listQuery = {...commonParams, ...params};
      console.log('list params', JSON.stringify(listQuery));
      setRequest({api: getShopStores, params: listQuery});
    }
  };

  useEffect(() => {
    loadNearBy();
  }, [chooseCity]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${category}Van Store`,
      headerRight: () => (
        <Pressable
          onPress={() => navigation.push('SearchIndex', {key: 'shop_store'})}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          <IconFont name="search" size={16} />
        </Pressable>
      ),
    });
  }, [navigation]);

  const CityComponent = (
    <Pressable style={styles.address} onPress={goChooseCity}>
      <IconFont name="space-point" size={12} color={'#000'} />
      <Text style={styles.city}>{chooseCity || '全国'}</Text>
      <IconFont name="backdown" size={8} color={'#000'} />
    </Pressable>
  );

  const Empty = () => {
    return (
      <View style={styles.emptyWrap}>
        <Image style={styles.emptyImg} source={{uri: EmptyImg}} />
        <Text style={{color: '#DADADA', fontSize: 13}}>{'暂时还没有内容哦'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      {request && (
        <ShopStoreList
          request={request}
          type="list"
          ListHeaderComponent={
            isPosition && isCurrentCity ? (
              <ScrollView>
                <View style={styles.header}>
                  <Text style={styles.title}>附近Van Store</Text>
                  {CityComponent}
                </View>
                {listdata.length > 0 ? (
                  listdata.map((item, index) => (
                    <View key={item.id}>
                      <BaseShopStore data={item} key={item.id} type="list" />
                      {index + 1 !== listdata.length && <View style={styles.separator} />}
                    </View>
                  ))
                ) : (
                  <Empty />
                )}
              </ScrollView>
            ) : (
              <View />
            )
          }
          ListTopHeader={
            <View style={styles.header}>
              <Text style={styles.title}>
                {isPosition
                  ? isCurrentCity
                    ? '其他城市热门Van Store'
                    : '热门Van Store'
                  : chooseCity === '全国'
                  ? '全部Van Store'
                  : '其他城市热门Van Store'}
              </Text>
              {!(isPosition && isCurrentCity) ? CityComponent : <View />}
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: RFValue(35),
    paddingHorizontal: 14,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 12,
    color: '#BDBDBD',
  },
  address: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    flexShrink: 1,
  },
  city: {
    fontSize: 12,
    marginHorizontal: 5,
  },
  separator: {
    backgroundColor: '#FAFAFA',
    height: 5,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: RFValue(10),
  },
  emptyImg: {
    width: 64,
    height: 64,
    marginBottom: 18,
  },
});

export default ShopStore;
