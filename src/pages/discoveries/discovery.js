import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {RFValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {RecommendSearch} from '@/components/NodeComponents';
import TabViewList from '@/components/TabView';
import {getAppCardList} from '@/api/discovery_api';

const CategoryComponent = props => {
  const {
    navigation,
    currentKey,
    category: {movement, space, activity, shop_store, shop_brand},
  } = props;

  return (
    <View style={styles.content}>
      {/* movement */}
      <Pressable
        style={styles.slideItem}
        onPress={() => navigation.navigate('Movement', {category: currentKey})}>
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
      <Pressable
        style={styles.slideItem}
        onPress={() => navigation.navigate('Space', {category: currentKey})}>
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
      <Pressable style={styles.slideItem} onPress={() => navigation.navigate('Activity')}>
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
      <Pressable style={styles.slideItem} onPress={() => navigation.navigate('ShopStore')}>
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
      <Pressable
        style={styles.slideItem}
        onPress={() => navigation.navigate('ShopBrand', {category: currentKey})}>
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
  const [currentKey, setCurrentKey] = useState(null);
  const [listData, setListData] = useState([]);

  const loadData = async () => {
    const res = await getAppCardList();
    setCurrentKey(res.data.list[0].category_name);
    setListData(res.data.list);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.wrapper}>
      <RecommendSearch />
      {listData.length > 0 ? (
        <TabViewList
          bottomLine={true}
          center={false}
          currentKey={currentKey}
          request={currentKey}
          onChange={key => setCurrentKey(key)}
          size="small"
          lineColor="#FF2242"
          tabData={listData.map(category => {
            return {
              key: category.category_name,
              title: category.category_name,
              component: () => (
                <CategoryComponent {...props} category={category} currentKey={currentKey} />
              ),
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
    paddingTop: RFValue(12),
    paddingBottom: RFValue(17),
    backgroundColor: '#fff',
  },
  itemRight: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  slideImage: {
    width: 45,
    height: 45,
    marginRight: 12,
  },
  text: {
    width: 33,
    height: 16,
  },
  store: {
    width: 80,
    height: 12,
  },
  itemText: {
    color: '#bdbdbd',
    fontSize: 13,
    marginRight: 5,
  },
  separator: {
    marginLeft: 45 + 12 + 15,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#EBEBEB',
  },
});

export default DiscoveryIndex;
