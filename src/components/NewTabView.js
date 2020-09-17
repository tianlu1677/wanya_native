import React, {useEffect, useState, useRef} from 'react';
import {Dimensions, View, Animated, Text, StyleSheet} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import PropTypes from 'prop-types';
import TabList from './TabList';

const TabBarHeight = 48;
const HeaderHeight = 300;

const initialLayout = {
  width: Dimensions.get('window').width,
};

const TabViewIndex = props => {
  const [routes, setRoutes] = useState([]);
  const [scenes, setScenes] = useState([]);
  const [index, setIndex] = useState(0);


  const scrollY = useRef(new Animated.Value(0)).current;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[index].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, index]);


  const syncScrollOffset = () => {
    const curRouteKey = routes[index].key;
    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };


  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onIndexChange = i => {
    const key = routes[i].key;
    props.onChange(key);
  };

  const tabChange = item => {
    props.onChange(item.key);
  };

  useEffect(() => {
    const route = props.tabData.map(v => ({key: v.key, title: v.title}));
    const scene = Object.assign({}, ...props.tabData.map(v => ({[v.key]: v.component})));
    setScenes(scene);
    setRoutes(route);
  }, []);

  useEffect(() => {
    const findIndex = props.tabData.findIndex(v => v.key === props.currentKey);
    const i = findIndex > -1 ? findIndex : 0;
    setIndex(i);
  }, [props.currentKey]);

  return (
    routes.length > 0 && (
      <TabView
        renderTabBar={() => (
          <TabList
            data={routes}
            current={props.currentKey}
            tabChange={tabChange}
            size={props.size}
            bottomLine={props.bottomLine}
          />
        )}
        navigationState={{index, routes}}
        renderScene={SceneMap(scenes)}
        onIndexChange={onIndexChange}
        initialLayout={initialLayout}
        tabBarPosition={props.tabBarPosition || 'top'}
        lazy={props.lazy || true}
        swipeEnabled={props.swipeEnabled || true}
        lazyPreloadDistance={props.lazyPreloadDistance || 0}
        removeClippedSubviews={props.removeClippedSubviews || false}
        keyboardDismissMode={props.keyboardDismissMode || 'auto'}
      />
    )
  );
};

TabViewIndex.propTypes = {
  tabData: PropTypes.array.isRequired, //tabList接收的数据[{key, value, component: () => <View />}]
  onChange: PropTypes.func.isRequired, //onChange 返回key
  currentKey: PropTypes.string, // 需要高亮第几项key 默认0
};

export default TabViewIndex;
