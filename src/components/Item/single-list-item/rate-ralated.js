import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImg from '@/components/FastImg';
import {BaseRelatedStyle as lstyles} from '@/styles/baseCommon';

const RateRelated = props => {
  const navigation = useNavigation();
  const {
    data: {is_rate, space, shop_stores},
    style = {},
  } = props;

  let rateType = '';
  let current = '';

  if (space) {
    rateType = 'space';
    current = space;
  }

  if (shop_stores.length > 0) {
    rateType = 'shop_store';
    current = shop_stores[0];
  }

  const handleClick = () => {
    if (rateType === 'space') {
      navigation.push('SpaceDetail', {spaceId: space.id});
    }

    if (rateType === 'shop_store') {
      navigation.navigate('ShopStoreDetail', {shopStoreId: shop_stores[0].id});
    }
  };

  console.log(current);
  return is_rate ? (
    <Pressable style={[lstyles.relatedWrapper, styles.baseWrapper, style]} onPress={handleClick}>
      <FastImg style={lstyles.relatedImage} source={{uri: current.cover_url}} />
      <View style={lstyles.relatedInfo}>
        <Text style={lstyles.relatedName} numberOfLines={1}>
          {current.name}
        </Text>
        <Text style={lstyles.relatedText} numberOfLines={1}>
          {current.desc_tip}
        </Text>
      </View>
    </Pressable>
  ) : null;
};

const styles = StyleSheet.create({
  baseWrapper: {
    marginTop: 13,
  },
});

export default RateRelated;
