import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FastImg} from '@/components';
import {FilterScore} from '@/utils';
import {SCREEN_WIDTH} from '@/utils/navbar';
import {VWValue} from '@/utils/response-fontsize';

const width = Math.floor((SCREEN_WIDTH - 30) / 2);

const BaseProduct = props => {
  const navigation = useNavigation();

  const {
    index,
    listData,
    data: {id, cover_url, name, price, hot_score},
  } = props;

  const handleGodetail = () => {
    navigation.navigate('ProductDetail', {productId: id});
  };

  return (
    <View style={{marginBottom: listData.length - 1 === index ? 40 : 0}}>
      <Pressable
        style={[styles.wrapper, {marginRight: (index + 1) % 2 === 0 ? 10 : 0}]}
        onPress={handleGodetail}>
        <FastImg source={{uri: cover_url}} style={styles.image} />
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.goodInfo}>
          <Text style={styles.symbol}>¥</Text>
          <Text style={styles.price}>{price}</Text>
          {hot_score ? <Text style={styles.num}>热度 {FilterScore(hot_score)}</Text> : null}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width,
    marginHorizontal: 10,
    marginTop: 10,
    paddingBottom: 17,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: width,
    height: width,
  },
  title: {
    fontSize: 14,
    fontWeight: '300',
    color: '#2F2F2F',
    textAlign: 'justify',
    lineHeight: 20,
    minHeight: 40,
    marginTop: 10,
    paddingHorizontal: VWValue(12),
  },
  goodInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: VWValue(12),
    marginTop: VWValue(10),
  },
  symbol: {
    color: '#2F2F2F',
    fontSize: 13,
    fontWeight: '500',
    marginRight: 3,
  },
  price: {
    color: '#2F2F2F',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 2,
  },
  num: {
    color: '#AAAAAA',
    fontSize: 11,
    fontWeight: '300',
    marginLeft: 'auto',
  },
});

export default BaseProduct;
