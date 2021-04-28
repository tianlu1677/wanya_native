import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {RFValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {RecommendSearch} from '@/components/NodeComponents';
import TabView from '@/components/TabView';
import {getAppCardList} from '@/api/discovery_api';

const CategoryComponent = props => {
  const {
    navigation,
    currentKey,
    category: {movement, space, activity, shop_store, shop_brand},
  } = props;

  const goPageMethod = name => {
    navigation.navigate(name, {category: currentKey});
  };

  return (
    <View style={styles.content}>
      {/* movement */}
      <Pressable style={styles.slideItem} onPress={() => goPageMethod('Movement')}>
        <FastImg source={require('@/assets/discovery/movement.png')} style={styles.slideImage} />
        <FastImg source={require('@/assets/discovery/movement_text.png')} style={styles.text} />
        <View style={styles.itemRight}>
          <Text style={styles.itemText}>
            {movement.count > 0 ? `${movement.count}个` : '还没有'}
            {currentKey}技巧
          </Text>
          <IconFont name="arrow-right" size={13} color={'#bdbdbd'} />
        </View>
      </Pressable>
      <View style={styles.separator} />

      {/* space */}
      <Pressable style={styles.slideItem} onPress={() => goPageMethod('Space')}>
        <FastImg source={require('@/assets/discovery/space.png')} style={styles.slideImage} />
        <FastImg source={require('@/assets/discovery/space_text.png')} style={styles.text} />
        <View style={styles.itemRight}>
          <Text style={styles.itemText}>
            {space.count > 0 ? `${space.count}个` : '还没有'}
            {currentKey}场地
          </Text>
          <IconFont name="arrow-right" size={13} color={'#bdbdbd'} />
        </View>
      </Pressable>
      <View style={styles.separator} />

      {/*  activity */}
      <Pressable style={styles.slideItem} onPress={() => goPageMethod('Activity')}>
        <FastImg source={require('@/assets/discovery/activity.png')} style={styles.slideImage} />
        <FastImg source={require('@/assets/discovery/activity_text.png')} style={styles.text} />
        <View style={styles.itemRight}>
          <Text style={styles.itemText}>
            {activity.count > 0 ? `${activity.count}个` : '还没有'}
            {currentKey}活动
          </Text>
          <IconFont name="arrow-right" size={13} color={'#bdbdbd'} />
        </View>
      </Pressable>
      <View style={styles.separator} />

      {/*  shop_store */}
      <Pressable style={styles.slideItem} onPress={() => goPageMethod('ShopStore')}>
        <FastImg source={require('@/assets/discovery/shop_store.png')} style={styles.slideImage} />
        <FastImg source={require('@/assets/discovery/shop_store_text.png')} style={styles.store} />
        <View style={styles.itemRight}>
          <Text style={styles.itemText}>
            {shop_store.count > 0 ? `${shop_store.count}个` : '还没有'}
            {currentKey}店
          </Text>
          <IconFont name="arrow-right" size={13} color={'#bdbdbd'} />
        </View>
      </Pressable>
      <View style={styles.separator} />

      {/* shop_brand */}
      <Pressable style={styles.slideItem} onPress={() => goPageMethod('ShopBrand')}>
        <FastImg source={require('@/assets/discovery/shop_brand.png')} style={styles.slideImage} />
        <FastImg source={require('@/assets/discovery/shop_brand_text.png')} style={styles.text} />
        <View style={styles.itemRight}>
          <Text style={styles.itemText}>
            {shop_brand.count > 0 ? `${shop_brand.count}个` : '还没有'}
            {currentKey}品牌
          </Text>
          <IconFont name="arrow-right" size={13} color={'#bdbdbd'} />
        </View>
      </Pressable>
      <View style={styles.separator} />
    </View>
  );
};

const DiscoveryIndex = props => {
  const dispatch = useDispatch();
  const {categoryList, discoveryData} = useSelector(state => state.home);
  const [currentKey, setCurrentKey] = useState(categoryList[0].name);

  const loadData = async () => {
    const res = await getAppCardList();
    dispatch({type: action.CHANGE_DISCOVERY_DATA, value: res.data.list});
  };

  const onChange = key => {
    loadData();
    setCurrentKey(key);
  };

  const RenderCaCategory = () => {
    const current = discoveryData.find(item => item.category_name === currentKey);
    return <CategoryComponent {...props} category={current} currentKey={currentKey} />;
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.wrapper}>
      <RecommendSearch />
      {discoveryData.length > 0 ? (
        <TabView
          currentKey={currentKey}
          request={currentKey}
          onChange={onChange}
          type="index"
          align="left"
          textStyle={{color: '#AAAA'}}
          activeLineColor="#FF2242"
          bottomLine={true}
          tabData={discoveryData.map(category => {
            return {
              key: category.category_name,
              title: category.category_name,
              component: RenderCaCategory,
            };
          })}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    backgroundColor: '#fff',
  },
  slideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: RFValue(17),
    backgroundColor: '#fff',
  },
  itemRight: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  slideImage: {
    width: RFValue(45),
    height: RFValue(45),
    marginRight: 12,
  },
  text: {
    width: (132 * RFValue(16)) / 62,
    height: RFValue(16),
  },
  store: {
    width: 80,
    height: 12,
  },
  itemText: {
    color: '#bdbdbd',
    marginRight: 5,
    fontSize: RFValue(13),
  },
  separator: {
    marginLeft: 45 + 12 + 15,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#EBEBEB',
  },
});

export default DiscoveryIndex;