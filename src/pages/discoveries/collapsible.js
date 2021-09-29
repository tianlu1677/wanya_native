import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, StyleSheet, View, Text} from 'react-native';
import {TabView, ScrollPager, SceneMap} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import TabList from '@/components/TabList';
import {SCREEN_WIDTH} from '@/utils/navbar';
import ProductList from '@/components/List/product-list';
import {getProducts} from '@/api/product_api';
import TabViews from '@/components/TabView';
import Category from './category';

const tabBarHeight = 45; // tabbar middle高度
const ShowHeight = 100; // tabbar middle高度

const options = {align: 'left', bottomLine: true, separator: false};

export const RenderCaCategory = props => {
  const {route, ListHeaderComponent} = props;
  const {discoveryData} = useSelector(state => state.home);
  const current = discoveryData.find(item => String(item.category_id) === route.key);
  const currentChildKeys = current.category_brand_type_list.map(
    item => `${current.category_id}${item}`
  );
  const [currentKey, setCurrentKey] = useState('');
  const [request, setRequest] = useState({});

  const ProductListPage = () => {
    return <ProductList request={request} ListHeaderComponent={ListHeaderComponent} />;
  };

  const tabData = current.category_brand_type_list.map(item => {
    return {key: `${route.key}${item}`, title: item, component: ProductListPage};
  });

  const index = tabData.findIndex(v => v.key === currentKey);

  const routes = tabData.map(v => {
    return {key: v.key, title: v.title};
  });

  const tabChange = item => {
    // onKeyChange(item.key, item.title);
    setCurrentKey(item.key);
  };

  const onIndexChange = i => {
    // onKeyChange(tabData[i].key);
    setCurrentKey(tabData[i].key);
  };

  const RenderScene = () => (
    <>
      <ProductList request={request} />
    </>
  );

  const RenderTabBar = () => (
    <TabList {...options} current={currentKey} tabChange={tabChange} data={routes} />
  );

  const onChangeKey = key => {
    setCurrentKey(key);
  };

  useEffect(() => {
    const defaultType = current.category_brand_type_list[0];
    const defaultKey = `${route.key}${defaultType}`;
    const apiPath = `q[category_id_eq]=${route.key}&q[category_brand_type_cont]=${defaultType}`;
    setRequest({api: getProducts, params: {}, apiPath});
    setCurrentKey(defaultKey);
  }, [route.key]);

  return currentKey ? (
    currentChildKeys.includes(currentKey) ? (
      <TabView
        lazy={false}
        renderScene={RenderScene}
        renderTabBar={() => <RenderTabBar tabStyle={{backgroundColor: 'pink'}} />}
        onIndexChange={onIndexChange}
        navigationState={{index: index, routes}}
      />
    ) : null
  ) : null;
};

const Collapsible = props => {
  const {tabData, currentKey, onKeyChange} = props;
  const index = tabData.findIndex(v => v.key === currentKey);
  const scrollY = useRef(new Animated.Value(0)).current;

  const routes = tabData.map(v => {
    return {key: v.key, title: v.title};
  });

  const onIndexChange = i => {
    onKeyChange(tabData[i].key);
  };

  const tabChange = item => {
    onKeyChange(item.key, item.title);
  };

  const RenderTabBar = () => (
    <TabList {...options} current={currentKey} tabChange={tabChange} data={routes} />
  );

  console.log('scrollYxxx', );

  const RenderScene = () => (
    <>
      <Category category={{name: routes.find(item => item.key.toString() === currentKey)?.title, id: currentKey}} />
      <RenderCaCategory
        route={{key: currentKey, index}}
        ListHeaderComponent={RenderTabBar}
        scrollY={scrollY}
      />
    </>
  );

  return (
    <TabView
      lazy={true}
      renderScene={RenderScene}
      renderTabBar={RenderTabBar}
      onIndexChange={onIndexChange}
      swipeEnabled={true}
      navigationState={{index: index, routes}}
      initialLayout={{height: 0, width: SCREEN_WIDTH}}
    />
  );
};

const styles = StyleSheet.create({});

export default Collapsible;
