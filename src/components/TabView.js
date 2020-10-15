import React, {useEffect, useState} from 'react';
import {Dimensions, View, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import PropTypes from 'prop-types';
import TabList from './TabList';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const TabViewIndex = props => {
  const [routes, setRoutes] = useState([]);
  const [scenes, setScenes] = useState([]);
  const [index, setIndex] = useState(0);

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
            separator={props.separator}
          />
        )}
        navigationState={{index, routes}}
        renderScene={SceneMap(scenes)}
        onIndexChange={onIndexChange}
        initialLayout={initialLayout}
        tabBarPosition={props.tabBarPosition || 'top'}
        lazy={props.lazy || true}
        swipeEnabled={props.swipeEnabled || true}
        renderLazyPlaceholder={() => <View style={{flex: 1}}><Text>Loading</Text></View>}
        // lazyPreloadDistance={props.lazyPreloadDistance || 10}
        removeClippedSubviews={props.removeClippedSubviews || false}
        keyboardDismissMode={props.keyboardDismissMode || 'on-drag'}
        style={props.style}
        {...props}
      />
    )
  );
};

TabViewIndex.propTypes = {
  tabData: PropTypes.array.isRequired, //tabList接收的数据[{key, value, component: () => <View />}]
  onChange: PropTypes.func.isRequired, //onChange 返回key
  currentKey: PropTypes.string, // 需要高亮第几项key 默认0
  separator: PropTypes.bool, // 是否显示分割线
};

export default TabViewIndex;
