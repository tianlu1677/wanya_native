import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ShopBrandList from '@/components/List/shop-brand-list';
import {getShopBrands} from '@/api/shop_brand_api';

const ShopBrand = props => {
  const [request] = useState({api: getShopBrands});

  console.log(3232323);
  console.log(1111);
  return (
    <View>
      <ShopBrandList request={request} />
      <Text>323232</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ShopBrand;
