import React, {Component} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const initialLayout = {
  width: Dimensions.get('window').width,
};

class TabViewIndex extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    routes: [],
    index: '0',
    onChange: () => {},
    scenes: {},
    tabBarPosition: 'top',
    lazy: false,
    lazyPreloadDistance: 1,
    removeClippedSubviews: false,
    keyboardDismissMode: 'auto',
    swipeEnabled: true,
    renderLazyPlaceholder: null,
  };

  onChange = index => {
    this.props.onChange(index);
  };

  renderScene = SceneMap(this.props.scenes);

  render() {
    const {
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

    return (
      <TabView
        renderTabBar={props => <TabBar {...props} />}
        navigationState={{index, routes}}
        renderScene={this.renderScene}
        onIndexChange={this.onChange}
        initialLayout={initialLayout}
        tabBarPosition={tabBarPosition}
        lazy={lazy}
        swipeEnabled={swipeEnabled}
        renderLazyPlaceholder={renderLazyPlaceholder}
        lazyPreloadDistance={lazyPreloadDistance}
        removeClippedSubviews={removeClippedSubviews}
        keyboardDismissMode={keyboardDismissMode}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({});
export default TabViewIndex;
