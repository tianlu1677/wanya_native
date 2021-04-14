import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';

const BaseShopBrand = props => {
  const navigation = useNavigation();

  const {
    data: {id, cover_url, name, address, store_type, distance, tags},
  } = props;

  console.log(props.data);
  const goDetail = () => {
    navigation.navigate('ShopStoreDetail', {shopStoreId: id});
  };

  return (
    <Pressable style={styles.wrapper} onPress={goDetail}>
      {/* <FastImg source={{uri: cover_url}} style={styles.image} /> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 14,
    flexDirection: 'row',
    backgroundColor: 'pink',
    height: 200,
  },
  separator: {
    height: 9,
    backgroundColor: '#FAFAFA',
  },
});

export default BaseShopBrand;
