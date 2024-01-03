import React, {useEffect, useState} from 'react';
import {Dimensions, View, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Helper from '@/utils/helper';
import * as RootNavigation from '@/navigator/root-navigation';
import PropTypes from 'prop-types';
import TabList from './TabList';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const TabViewIndex = props => {
  const [tab, setTab] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [scenes, setScenes] = useState([]);
  const [index, setIndex] = useState(0);

  const onIndexChange = i => {
    const key = routes[i].key;
    const title = routes[i].title;
    props.onChange(key, title);
  };

  const tabChange = item => {
    props.onChange(item.key, item.title);
    const data = RootNavigation.getCurrentPage();
    Helper.recordVisit({
      event: `tab_${item.key}_${data.name}`,
      name: `${item.title}_${data.name}`,
      project_name: 'tab点击',
      meta: data,
    });
  };

  const initScene = () => {
    const scene = Object.assign({}, ...props.tabData.map(v => ({[v.key]: v.component})));
    setScenes(scene);
  };

  useEffect(() => {
    initScene();
    const route = props.tabData.map(v => ({key: v.key, title: v.title}));
    setRoutes(route);
  }, []);

  useEffect(() => {
    // 适配搜索页面
    initScene();
  }, [props.request]);

  useEffect(() => {
    const findIndex = props.tabData.findIndex(v => v.key === props.currentKey);
    const i = findIndex > -1 ? findIndex : 0;
    setIndex(i);
  }, [props.currentKey]);

  useEffect(() => {
    const data = props.tabData.map(v => ({key: v.key, title: v.title}));
    setTab(data);
  }, [props.tabData]);

  return (
    routes.length > 0 && (
      <TabView
        renderTabBar={() => (
          <TabList
            current={props.currentKey}
            bottomLine={props.bottomLine}
            separator={props.separator}
            align={props.align}
            tabChange={tabChange}
            data={tab}
            tabStyle={props.tabStyle}
            tabScrollStyle={props.tabScrollStyle}
          />
        )}
        navigationState={{index, routes}}
        renderScene={SceneMap(scenes)}
        onIndexChange={onIndexChange}
        initialLayout={initialLayout}
        tabBarPosition={props.tabBarPosition || 'top'}
        lazy={true}
        swipeVelocityImpact={0.1}
        swipeEnabled={props.swipeEnabled || true}
        renderLazyPlaceholder={() => (
          <View style={{flex: 1}}>
            <Text>Loading</Text>
          </View>
        )}
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
  // tabData: PropTypes.array.isRequired, //tabList接收的数据[{key, value, component: () => <View />}]
  // onChange: PropTypes.func.isRequired, //onChange 返回key
  // currentKey: PropTypes.string, // 需要高亮第几项key 默认0
  // separator: PropTypes.bool, // 是否显示分割线
  align: PropTypes.string.isRequired, //对齐方式
  bottomLine: PropTypes.bool.isRequired, //是否显示底部分界线
  separator: PropTypes.bool.isRequired, //是否显示底部分界线
  currentKey: PropTypes.string.isRequired, // 默认高亮第几项key
  onChange: PropTypes.func.isRequired, //onChange 返回item
  tabData: PropTypes.array.isRequired, //tabList接收的数据

  request: PropTypes.object, //tabList接收的数据
};

export default TabViewIndex;
