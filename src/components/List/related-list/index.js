import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Keyboard, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {debounce} from 'lodash';
import TabView from '@/components/TabView';
import {Search} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import {searchApi} from '@/api/search_api';
import {getSpaces} from '@/api/space_api';
import {getShopStores} from '@/api/shop_store_api';

import RelatedScrollList from './related-scroll-list';

const AddRelated = props => {
  const {navigation, keys, page, placeholder} = props;
  const {
    savetopic,
    location: {positionCity = '', latitude = '', longitude = ''},
  } = useSelector(state => state.home);
  const [searchKey, setSearchKey] = useState('');

  const defaultKey = () => {
    return (savetopic.space_id || []).length > 0
      ? 'space'
      : (savetopic.movement_ids || []).length > 0
      ? 'movement'
      : (savetopic.shop_store_ids || []).length > 0
      ? 'shop_store'
      : (savetopic.shop_brand_ids || []).length > 0
      ? 'shop_brand'
      : (savetopic.product_ids || []).length > 0
      ? 'product'
      : keys[0];
  };

  const [currentKey, setCurrentKey] = useState(defaultKey());

  const ReturnApi = (activeKey, searchValue) => {
    let api = {};
    if (page === 'rate') {
      if (searchValue) {
        api = {api: searchApi, params: {name: searchValue, type: activeKey, random: 1}};
      } else {
        const params = {currentcity: positionCity, latitude, longitude, need_count: 50};
        if (activeKey === 'space') {
          api = {api: getSpaces, params};
        }

        if (activeKey === 'shop_store') {
          api = {api: getShopStores, params};
        }
      }
    }

    if (page === 'topic') {
      api = {api: searchApi, params: {name: searchValue, type: activeKey, random: 1}};
    }

    return api;
  };

  const [request, setRequest] = useState(ReturnApi(defaultKey(), searchKey));

  const SpaceListPage = () => <RelatedScrollList request={request} type="space" pageFrom={page} />;

  const MovementListPage = () => (
    <RelatedScrollList request={request} type="movement" pageFrom={page} />
  );

  const ShopStoreListPage = () => (
    <RelatedScrollList request={request} type="shop_store" pageFrom={page} />
  );

  const ShopBrandListPage = () => (
    <RelatedScrollList request={request} type="shop_brand" pageFrom={page} />
  );

  const ProductListPage = () => (
    <RelatedScrollList request={request} type="product" pageFrom={page} />
  );

  const onChangeText = text => {
    setRequest(ReturnApi(currentKey, text));
    setSearchKey(text);
  };

  const onChangeKey = key => {
    setRequest(ReturnApi(key, searchKey));
    setCurrentKey(key);
  };

  return (
    <SafeAreaView onPress={Keyboard.dismiss} style={styles.wrapper}>
      <View style={styles.wrapper}>
        <StatusBar barStyle="dark-content" backgroundColor={'white'} />
        <Search
          inputStyle={{borderRadius: RFValue(19), backgroundColor: '#F2F3F5'}}
          height={RFValue(36)}
          cancelWidth={RFValue(66)}
          placeholderTextColor="#7F7F81"
          placeholder={placeholder}
          onChangeText={debounce(onChangeText, 500)}
          cancel={true}
          onCancel={() => navigation.goBack()}
        />
        {request ? (
          <TabView
            currentKey={currentKey}
            request={request}
            onChange={onChangeKey}
            align="left"
            bottomLine={false}
            separator={true}
            tabData={[
              {
                key: 'space',
                title: '场地',
                component: SpaceListPage,
              },
              {
                key: 'movement',
                title: '顽招',
                component: MovementListPage,
              },
              {
                key: 'shop_store',
                title: '顽士多',
                component: ShopStoreListPage,
              },
              {
                key: 'shop_brand',
                title: '品牌',
                component: ShopBrandListPage,
              },
              {
                key: 'product',
                title: '顽物',
                component: ProductListPage,
              },
            ].filter(item => keys.includes(item.key))}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AddRelated;
