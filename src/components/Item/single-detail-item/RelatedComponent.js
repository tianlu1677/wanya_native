import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';

const RelatedComponent = props => {
  const navigation = useNavigation();
  const {
    data: {shop_brands, shop_stores, movements},
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
              <Text style={styles.relatedText}>
                {movements[0].category_subset_name} · {movements[0].levelText}技能
              </Text>
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
              <Text style={styles.relatedName}>{shop_stores[0].name.trim()}</Text>
              <Text style={styles.relatedText}>
                {shop_stores[0].category_subset_name} · {shop_stores[0].levelText}技能
              </Text>
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
              <Text style={styles.relatedName}>{shop_brands[0].name.trim()}</Text>
              <Text style={styles.relatedText}>
                {shop_brands[0].category_subset_name} · {shop_brands[0].levelText}技能
              </Text>
            </View>
          </View>
        </Pressable>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  relatedWrapper: {
    marginLeft: 14,
    marginRight: 90,
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
