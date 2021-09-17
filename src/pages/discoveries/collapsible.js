import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, StyleSheet, View, Text} from 'react-native';
import {TabView} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import TabList from '@/components/TabList';
import {SCREEN_WIDTH} from '@/utils/navbar';
import Category from './category';
import ProductList from '@/components/List/product-list';
import {getProducts} from '@/api/product_api';
import TabViews from '@/components/TabView';

const tabBarHeight = 45; // tabbar middle高度
const ShowHeight = 100; // tabbar middle高度

const options = {align: 'left', bottomLine: true, separator: false};

export const RenderCaCategory = props => {
  const {route} = props;
  const {discoveryData} = useSelector(state => state.home);
  const current = discoveryData.find(item => String(item.category_id) === route.key);
  const [currentKey, setCurrentKey] = useState('');
  const [request, setRequest] = useState({});

  const ProductListPage = () => {
    return <ProductList request={request} />;
  };

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

  console.log('currentKeysssss', currentKey);

  // return <Text style={{paddingTop: 100, backgroundColor: 'pink'}}>323232332323</Text>;

  return currentKey ? (
    <View style={{paddingTop: tabBarHeight, height: 900}}>
      <TabViews
        currentKey={currentKey}
        request={request}
        onChange={onChangeKey}
        align="left"
        bottomLine={true}
        separator={false}
        tabData={current.category_brand_type_list.map(item => {
          return {key: `${route.key}${item}`, title: item, component: ProductListPage};
        })}
      />
    </View>
  ) : null;
};

const Collapsible = props => {
  const {tabData, currentKey, onKeyChange} = props;
  const index = tabData.findIndex(v => v.key === currentKey);
  const scrollY = useRef(new Animated.Value(0)).current;

  const routes = tabData.map(v => {
    return {key: v.key, title: v.title};
  });

  const ProductListPage = () => {
    const apiPath = 'q[category_id_eq]=13&q[category_brand_type_cont]=服饰';
    const request = {api: getProducts, params: {}, apiPath};
    return <ProductList request={request} />;
  };

  const RenderScene = ({route}) => {
    const currentIndex = tabData.findIndex(v => v.key === route.key);
    const data = [{key: String(currentIndex)}];
    console.log({key: currentKey});
    const apiPath = 'q[category_id_eq]=13&q[category_brand_type_cont]=服饰';
    const request = {api: getProducts, params: {}, apiPath};

    // return <RenderCaCategory route={route} />;
    // return (
    //   <TabViews
    //     currentKey={currentKey}
    //     request={request}
    //     onChange={onChangeKey}
    //     align="left"
    //     bottomLine={true}
    //     separator={false}
    //     tabData={current.category_brand_type_list.map(item => {
    //       return {key: `${route.key}${item}`, title: item, component: ProductListPage};
    //     })}
    //   />
    // );

    return (
      <View style={styles.listWrapper}>
        <Animated.View
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
            useNativeDriver: true,
          })}>
          <RenderCaCategory route={{key: currentKey, index}} />
        </Animated.View>
        {/* <TabViews
          currentKey={currentKey}
          request={request}
          // onChange={onChangeKey}
          onChange={() => {}}
          align="left"
          bottomLine={true}
          separator={false}
          tabData={current.category_brand_type_list.map(item => {
            return {key: `${route.key}${item}`, title: item, component: ProductListPage};
          })}
        /> */}
        {/* <Animated.FlatList
          onRefresh={false}
          bounces={true}
          useNativeDriver={true}
          contentContainerStyle={{paddingTop: tabBarHeight}}
          renderItem={ProductListPage}
          data={data}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollToOverflowEnabled={true}
          scrollEventThrottle={16}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
            useNativeDriver: true,
          })}
          ListHeaderComponent={<Category category={current} />}
        /> */}
      </View>
    );
  };

  const RenderTabBar = () => {
    const translateY = scrollY.interpolate({
      inputRange: [0, ShowHeight],
      outputRange: [0, 0],
      extrapolateRight: 'clamp',
    });

    const tabChange = item => {
      onKeyChange(item.key, item.title);
    };

    return (
      <Animated.View style={[styles.tabListWrapper, {transform: [{translateY}]}]}>
        <TabList {...options} current={currentKey} tabChange={tabChange} data={routes} />
      </Animated.View>
    );
  };

  const {discoveryData} = useSelector(state => state.home);
  const current = discoveryData.find(item => String(item.category_id) === currentKey);

  const RenderTabView = () => {
    const onIndexChange = i => {
      onKeyChange(tabData[i].key);
    };

    return (
      <TabView
        lazy={true}
        renderScene={RenderScene}
        renderTabBar={RenderTabBar}
        onIndexChange={onIndexChange}
        navigationState={{index: index, routes}}
        initialLayout={{height: 0, width: SCREEN_WIDTH}}
        style={styles.tabViewWrapper}
      />
    );
  };

  const RenderTopHeader = () => {
    const opacity = scrollY.interpolate({
      inputRange: [0, ShowHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.topHeader, {opacity: opacity}]}>
        <Text>StickTopHeader</Text>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
      {RenderTopHeader()}
      {RenderTabView()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    width: '100%',
    height: 50,
    position: 'absolute',
    top: 0,
  },
  tabViewWrapper: {
    flex: 1,
    zIndex: -1,
  },
  tabListWrapper: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  listWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Collapsible;
