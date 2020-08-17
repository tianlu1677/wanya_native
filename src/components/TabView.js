import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TabList from './TabList'

const initialLayout = {
  width: Dimensions.get('window').width,
};

class TabViewIndex extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    routes: [],
    index: 0,
    onChange: () => {},
    scenes: {},
    tabBarPosition: 'top',
    lazy: false,
    lazyPreloadDistance: 0,
    removeClippedSubviews: false,
    keyboardDismissMode: 'auto',
    swipeEnabled: true,
    renderTabBar: <TabBar />,
  };

  onChange = index => {
    let tab = this.props.routes[index];
    this.props.onChange(index, tab);
    console.log('routes[index].key', tab.key)
  };

  tabChange = (item, index) => {
    this.props.onChange(index);
  };

  render() {
    const {
      renderTabBar,
      index,
      routes,
      swipeEnabled,
      renderLazyPlaceholder,
      tabBarPosition,
      lazy,
      lazyPreloadDistance,
      removeClippedSubviews,
      keyboardDismissMode,
    } = this.props;

    const renderScene = SceneMap(this.props.scenes);
    return (
      <TabView
        renderTabBar={() => <TabList data={routes} current={routes[index].key} tabChange={this.tabChange} />}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={this.onChange}
        initialLayout={initialLayout}
        tabBarPosition={tabBarPosition}
        lazy={lazy}
        swipeEnabled={swipeEnabled}
        lazyPreloadDistance={lazyPreloadDistance}
        removeClippedSubviews={removeClippedSubviews}
        keyboardDismissMode={keyboardDismissMode}
      />
    );
  }
}

const styles = StyleSheet.create({});
export default TabViewIndex;