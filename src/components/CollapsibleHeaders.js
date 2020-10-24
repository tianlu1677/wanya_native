import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, View, Text} from 'react-native';
import {TabView} from 'react-native-tab-view';
import TabList from '@/components/TabList';
import {NAVIGATION_BAR_HEIGHT} from '@/utils/navbar';

const tabBarHeight = 45; // tabbar middle高度
const titleHeight = NAVIGATION_BAR_HEIGHT; // 标题高度

const CollapsibleHeader = props => {
  const {tabData, currentKey, headerHeight} = props;
  const index = tabData.findIndex(v => v.key === currentKey);
  const navigationState = {
    index: index,
    routes: props.tabData.map(v => {
      return {key: v.key, title: v.title};
    }),
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);

  useEffect(() => {
    scrollY.addListener(({value}) => {
      listOffset.current[currentKey] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [tabData, scrollY, currentKey]);

  const syncScrollOffset = () => {
    listRefArr.current.forEach(item => {
      if (item.key === currentKey) {
        return;
      }

      if (scrollY._value < headerHeight && scrollY._value >= 0) {
        if (item.value) {
          item.value.scrollToOffset({
            offset: scrollY._value,
            animated: false,
          });
          listOffset.current[item.key] = scrollY._value;
        }
      } else if (
        scrollY._value >= headerHeight &&
        (listOffset.current[item.key] < headerHeight || listOffset.current[item.key] == null) &&
        item.value
      ) {
        item.value.scrollToOffset({
          offset: headerHeight,
          animated: false,
        });
        listOffset.current[item.key] = headerHeight;
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

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const renderScene = ({route}) => {
    const i = navigationState.routes.findIndex(v => v.key === route.key);
    const renderItem = tabData[i].component;
    const contentContainerStyle = {
      paddingTop: headerHeight + tabBarHeight,
      zIndex: 100,
    };

    return (
      <>
        <View style={{flex: 1, height: tabBarHeight}} />
        <Animated.FlatList
          scrollToOverflowEnabled
          scrollEventThrottle={16}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
            useNativeDriver: true,
          })}
          onRefresh={false}
          // bounces={false}
          // refreshing={true}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          contentContainerStyle={contentContainerStyle}
          data={[{key: String(i)}]}
          ref={ref => {
            if (ref) {
              const found = listRefArr.current.find(e => e.key === route.key);
              if (!found) {
                listRefArr.current.push({
                  key: route.key,
                  value: ref,
                });
              }
            }
          }}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
        />
      </>
    );
  };

  const renderTabBarWithWrapper = innerProps => {
    const y = scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [headerHeight, titleHeight],
      extrapolateRight: 'clamp',
    });

    const viewStyles = {
      top: 0,
      zIndex: 1,
      position: 'absolute',
      transform: [{translateY: y}],
      width: '100%',
    };

    return (
      <Animated.View style={viewStyles}>
        <TabList
          data={navigationState.routes}
          current={props.currentKey}
          tabChange={tab => props.onKeyChange(tab.key)}
          size={props.size}
          bottomLine={props.bottomLine}
          {...innerProps}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    const onIndexChange = i => {
      const key = tabData[i].key;
      props.onKeyChange(key);
    };

    return (
      <TabView
        onIndexChange={onIndexChange}
        navigationState={navigationState}
        renderScene={renderScene}
        renderTabBar={renderTabBarWithWrapper}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
        style={{flex: 1, backgroundColor: '#fff', zIndex: -1}}
      />
    );
  };

  const renderHeaderWithWrapper = () => {
    const y = scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [0, -headerHeight],
      extrapolateRight: 'clamp',
    });

    return (
      <Animated.View
        style={[localStyles.headerContent, {transform: [{translateY: y}], height: headerHeight}]}>
        {props.renderHeader}
      </Animated.View>
    );
  };

  const renderHeader = () => {
    const opacity = scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[localStyles.header, {opacity: opacity, height: titleHeight}]}>
        {props.renderTopHeader}
      </Animated.View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {renderTabView()}
        {renderHeader()}
        {renderHeaderWithWrapper()}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  headerContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: -1,
  },
  header: {
    width: '100%',
    position: 'absolute',
    top: 0,
    // // backgroundColor: '#000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default CollapsibleHeader;
