import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ShopBrandList from '@/components/List/shop-store-list';
import {getShopBrands} from '@/api/shop_brand_api';

const ShopBrandDetail = props => {
  const [request] = useState({api: getShopBrands});

  return (
    <View>
      <Text>ShopBrandDetail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ShopBrandDetail;
