import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Pressable, StatusBar, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
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
  const {latitude, longitude, positionCity, chooseCity = '全国'} = location;
  const [listdata, setListData] = useState([]);
  const [request, setRequest] = useState(null);

  const isCurrentCity = positionCity === chooseCity;
  const isPosition = latitude && longitude && positionCity;
  const city = chooseCity === '全国' ? 'china' : chooseCity;
  const commonParams = {latitude, longitude, currentcity: positionCity, city};
  const params = {'q[category_id_eq]': categoryId};

  const goChooseCity = () => {
    props.navigation.navigate('ChooseCity');
  };

  const loadNearBy = async () => {
    if (isPosition && isCurrentCity) {
      const query = {...commonParams, ...params, per_page: 100};
      console.log('top params', JSON.stringify(query));
      const res = await getShopStores(query);
      setListData(res.data.activities);
      console.log('top data', res.data.activities);
      const id_not_in = res.data.activities.map(item => item.id).join();
      const listQuery = {category, 'q[id_not_in]': id_not_in};
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

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" />
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
                {listdata.map((item, index) => (
                  <View key={item.id}>
                    <BaseShopStore data={item} key={item.id} type="list" />
                    {index + 1 !== listdata.length && <View style={styles.separator} />}
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View />
            )
          }
          ListTopHeader={
            <View style={styles.header}>
              <Text style={styles.title}>
                {isPosition && isCurrentCity && '其他城市热门Van Store'}
                {isPosition && !isCurrentCity && '热门Van Store'}
                {!isPosition && chooseCity === '全国' && '全部Van Store'}
                {!isPosition && chooseCity !== '全国' && '其他城市热门Van Store'}
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
});

export default ShopStore;
