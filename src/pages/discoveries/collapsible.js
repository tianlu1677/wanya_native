import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {TabView} from 'react-native-tab-view';
import TabList from '@/components/TabList';
import {SCREEN_WIDTH} from '@/utils/navbar';

const tabBarHeight = 45; // tabbar middle高度
const ShowHeight = 200; // tabbar middle高度

const options = {align: 'left', bottomLine: true, separator: false};

const Collapsible = props => {
  const {tabData, currentKey, coveryData, onKeyChange} = props;
  const index = tabData.findIndex(v => v.key === currentKey);
  const {category_brand_type_list} = coveryData[index];
  const scrollY = useRef(new Animated.Value(0)).current;
  const [offset, setOffset] = useState(0);

  console.log('offset', offset);

  const routes = tabData.map(v => {
    return {key: v.key, title: v.title};
  });

  const typesRoutes = category_brand_type_list.map((item, i) => {
    return {key: String(i), title: item};
  });

  const RenderScene = ({route}) => {
    const currentIndex = tabData.findIndex(v => v.key === route.key);
    const renderItem = tabData[currentIndex].component;
    const data = [{key: String(currentIndex)}];

    return (
      <View style={styles.listWrapper}>
        <Animated.FlatList
          onRefresh={false}
          bounces={true}
          useNativeDriver={true}
          contentContainerStyle={{paddingTop: tabBarHeight}}
          renderItem={renderItem}
          data={data}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollToOverflowEnabled={true}
          scrollEventThrottle={16}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
            useNativeDriver: true,
          })}
        />
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
      console.log('item', item);
      onKeyChange(item.key, item.title);
    };

    const data = offset > ShowHeight ? typesRoutes : routes;
    const current =
      offset > ShowHeight
        ? data.map(item => item.key).includes(currentKey)
          ? currentKey
          : typesRoutes[0].key
        : currentKey;

    console.log('currentKey', current, data);
    return (
      <Animated.View style={[styles.tabListWrapper, {transform: [{translateY}]}]}>
        <TabList {...options} current={current} tabChange={tabChange} data={data} />
        {/* {offset > tabBarHeight ? (
          <TabList {...options} current={currentKey} tabChange={tabChange} data={typesRoutes} />
        ) : (
          <TabList {...options} current={currentKey} tabChange={tabChange} data={routes} />
        )} */}
      </Animated.View>
    );
  };

  const StickTopHeader = () => {
    const tabChange = item => {
      console.log('item11111', item);

      // onKeyChange(item.key, item.title);
    };

    const data = category_brand_type_list.map((item, i) => {
      return {key: String(i), title: item};
    });

    const currentType = data[0].key;
    console.log('types data', data);

    return <TabList {...options} current={currentType} tabChange={tabChange} data={data} />;
  };

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
        <StickTopHeader />
      </Animated.View>
    );
  };

  useEffect(() => {
    scrollY.addListener(({value}) => {
      setOffset(value);
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [scrollY]);

  return (
    <View style={{flex: 1}}>
      {RenderTopHeader()}
      {RenderTabView()}
    </View>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    width: '100%',
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
