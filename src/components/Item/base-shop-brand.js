import React from 'react';
import {Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';

const {width} = Dimensions.get('window');
const imagewidth = parseInt((width - 28 - 18) / 3);

const BaseShopBrand = props => {
  const navigation = useNavigation();

  const {
    data: {id, cover_url, name},
  } = props;

  const goDetail = () => {
    navigation.navigate('ShopBrandDetail', {shopBrandId: id});
  };

  return (
    <Pressable style={styles.wrapper} onPress={goDetail}>
      <FastImg source={{uri: cover_url}} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: imagewidth,
    height: imagewidth,
    backgroundColor: '#000',
  },
  name: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: RFValue(20),
    paddingTop: RFValue(6),
    paddingBottom: RFValue(12),
  },
});

export default BaseShopBrand;
