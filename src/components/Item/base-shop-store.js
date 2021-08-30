import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {ScaleDistance} from '@/utils';

const BaseShopstore = props => {
  const navigation = useNavigation();

  const {
    type,
    data: {id, cover_url, name, address, store_type, distance = 10, tags},
  } = props;

  const goDetail = () => {
    if (type === 'list') {
      navigation.navigate('ShopStoreDetail', {shopStoreId: id});
    }
  };

  return (
    <Pressable style={styles.wrapper} onPress={goDetail}>
      <FastImg source={{uri: cover_url}} style={styles.image} />
      <View style={styles.infoWrapper}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.addressWrapper}>
          {store_type === 'entity' && (
            <IconFont name="space-point" size={12} color={'#9C9C9C'} style={styles.spaceIcon} />
          )}
          <Text style={styles.addressName} numberOfLines={2}>
            {store_type === 'entity' && address}
            {store_type === 'website' && '网店'}
          </Text>
          <Text style={styles.distance}>
            {store_type === 'entity' && distance > 0 ? ScaleDistance(distance) : ''}
          </Text>
        </View>
        <View style={styles.tagWrapper}>
          {tags.map(tag => (
            <Text style={styles.tag} key={tag.id}>
              {tag.name}
            </Text>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 14,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  image: {
    width: 104,
    height: 75,
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '500',
  },
  addressWrapper: {
    flexDirection: 'row',
    marginTop: RFValue(10),
  },
  spaceIcon: {
    marginTop: 4,
    marginRight: 5,
  },
  addressName: {
    flex: 1,
    lineHeight: 20,
    color: '#9C9C9C',
    fontSize: 12,
  },
  distance: {
    width: 70,
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'right',
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: RFValue(10),
  },
  tag: {
    height: RFValue(20),
    lineHeight: RFValue(20),
    paddingHorizontal: 8,
    fontSize: 10,
    color: '#FF8D00',
    borderWidth: 1,
    borderColor: '#FF8D00',
    borderRadius: 2,
    marginRight: 7,
    marginBottom: 7,
  },
  separator: {
    height: 9,
    backgroundColor: '#FAFAFA',
  },
});

export default BaseShopstore;
