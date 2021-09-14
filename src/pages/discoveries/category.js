import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RFValue} from '@/utils/response-fontsize';
import * as action from '@/redux/constants';
import FastImg from '@/components/FastImg';
import {SCREEN_WIDTH} from '@/utils/navbar';
import {VWValue} from '@/utils/response-fontsize';
import ProductList from '@/components/List/product-list';

import IconFont from '@/iconfont';
import Loading from '@/components/Loading';
import {RecommendSearch} from '@/components/NodeComponents';
import TabView from '@/components/TabView';
import {getAppCardList} from '@/api/discovery_api';

const width = Math.floor((SCREEN_WIDTH - VWValue(30 * 5)) / 5);

const Category = props => {
  const dispatch = useDispatch();
  const {location} = useSelector(state => state.home);

  const {
    navigation,
    category,
    category: {movement, space, activity, shop_store, shop_brand},
  } = props;

  const goPageMethod = name => {
    const value = {...location, chooseCity: location.positionCity || '全国'};
    dispatch({type: action.GET_LOCATION, value});
    navigation.navigate(name, {category: category.category_name});
  };

  return (
    <View style={styles.content}>
      <Pressable style={styles.slideItem} onPress={() => goPageMethod('Movement')}>
        <FastImg source={require('@/assets/discovery/lesson.png')} style={styles.slideImage} />
        <Text style={styles.title}>教学</Text>
      </Pressable>

      <Pressable style={styles.slideItem} onPress={() => goPageMethod('Space')}>
        <FastImg source={require('@/assets/discovery/space.png')} style={styles.slideImage} />
        <Text style={styles.title}>场地</Text>
      </Pressable>

      <Pressable style={styles.slideItem} onPress={() => goPageMethod('Activity')}>
        <FastImg source={require('@/assets/discovery/activity.png')} style={styles.slideImage} />
        <Text style={styles.title}>顽士多</Text>
      </Pressable>

      <Pressable style={styles.slideItem} onPress={() => goPageMethod('ShopStore')}>
        <FastImg source={require('@/assets/discovery/shop_store.png')} style={styles.slideImage} />
        <Text style={styles.title}>品牌</Text>
      </Pressable>

      <Pressable style={styles.slideItem} onPress={() => goPageMethod('ShopBrand')}>
        <FastImg source={require('@/assets/discovery/shop_brand.png')} style={styles.slideImage} />
        <Text style={styles.title}>活动</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  slideItem: {
    alignItems: 'center',
  },
  itemRight: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  slideImage: {
    width,
    height: width,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
  },
});

export default Category;
