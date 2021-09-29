import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';

const RelatedComponent = props => {
  const navigation = useNavigation();
  const {
    data: {shop_brands, shop_stores, movements, product},
  } = props;

  const handleMovementDetail = () => {
    navigation.navigate('MovementDetail', {movementId: movements[0].id});
  };

  const handleStoreDetail = () => {
    navigation.navigate('ShopStoreDetail', {shopStoreId: shop_stores[0].id});
  };

  const handleBrandDetail = () => {
    navigation.navigate('ShopBrandDetail', {shopBrandId: shop_brands[0].id});
  };

  return (
    <>
      {/* movements */}
      {movements?.length > 0 ? (
        <Pressable style={styles.relatedWrapper} onPress={handleMovementDetail}>
          <View style={styles.related}>
            <FastImg
              style={styles.relatedImage}
              source={require('@/assets/images/topic-related.png')}
            />
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.relatedName}>{movements[0].name.trim()}</Text>
              <Text style={styles.relatedText}>{movements[0].desc_tip}</Text>
            </View>
          </View>
        </Pressable>
      ) : null}

      {/* shop_stores */}
      {shop_stores?.length > 0 ? (
        <Pressable style={styles.relatedWrapper} onPress={handleStoreDetail}>
          <View style={styles.related}>
            <FastImg style={styles.relatedImage} source={{uri: shop_stores[0].cover_url}} />
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.relatedName}>{shop_stores[0].name}</Text>
              <Text style={styles.relatedText}>{shop_stores[0].desc_tip}</Text>
            </View>
          </View>
        </Pressable>
      ) : null}

      {/* shop_brands */}
      {shop_brands?.length > 0 ? (
        <Pressable style={styles.relatedWrapper} onPress={handleBrandDetail}>
          <View style={styles.related}>
            <FastImg style={styles.relatedImage} source={{uri: shop_brands[0].cover_url}} />
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.relatedName}>{shop_brands[0].name}</Text>
              <Text style={styles.relatedText}>{shop_brands[0].desc_tip}</Text>
            </View>
          </View>
        </Pressable>
      ) : null}

      {/* product */}
      {product ? (
        <View style={styles.relatedWrapper}>
          <FastImg
            style={styles.relatedImage}
            source={{uri: product.cover_url ? product.cover_url : product.images_list[0]}}
          />
          <View style={styles.relatedInfo}>
            <Text style={styles.relatedName} numberOfLines={1}>
              {product.name}
            </Text>
            <Text style={styles.relatedText}>
              {product.category_name}
              {product.category_brand_type ? ' · ' : ''}
              {product.category_brand_type ? product.category_brand_type.split(',').join('/') : ''}
            </Text>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  relatedWrapper: {
    marginLeft: 14,
    marginRight: 45,
    height: RFValue(55),
    backgroundColor: '#000',
    borderRadius: 9,
    justifyContent: 'center',
    paddingLeft: RFValue(10),
    marginTop: RFValue(14),
  },
  related: {
    flexDirection: 'row',
  },
  relatedImage: {
    width: RFValue(33),
    height: RFValue(33),
    marginRight: 8,
    borderRadius: 6,
  },
  relatedName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  relatedText: {
    color: '#bdbdbd',
    fontSize: 10,
    fontWeight: '300',
    marginTop: 3,
  },
});

export default RelatedComponent;
