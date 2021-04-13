import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ShopStoreList from '@/components/List/shop-store-list';
import {getShopStores} from '@/api/shop_store_api';

const ShopStore = props => {
  const [request] = useState({api: getShopStores});

  return (
    <View>
      <ShopStoreList request={request} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ShopStore;
