import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as action from '@/redux/constants';
import FastImg from '@/components/FastImg';
import {SCREEN_WIDTH} from '@/utils/navbar';
import {VWValue} from '@/utils/response-fontsize';

const width = Math.floor((SCREEN_WIDTH - VWValue(30 * 5)) / 5);

const Category = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {location} = useSelector(state => state.home);

  const {category} = props;

  const goPageMethod = name => {
    const value = {...location, chooseCity: location.positionCity || '全国'};
    dispatch({type: action.GET_LOCATION, value});

    navigation.navigate(name, {categoryId: category.id, category: category.name});
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

      <Pressable style={styles.slideItem} onPress={() => goPageMethod('ShopBrand')}>
        <FastImg source={require('@/assets/discovery/shop_brand.png')} style={styles.slideImage} />
        <Text style={styles.title}>品牌</Text>
      </Pressable>

      <Pressable style={styles.slideItem} onPress={() => goPageMethod('ShopStore')}>
        <FastImg source={require('@/assets/discovery/shop_store.png')} style={styles.slideImage} />
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
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10,
  },
});

export default Category;
