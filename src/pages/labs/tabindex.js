import React, {Component} from 'react';
import {SafeAreaView, Dimensions, StyleSheet, ScrollView, View, Text, Button} from 'react-native';
// import ViewPager from '@react-native-community/viewpager';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {TabView, SceneMap} from 'react-native-tab-view';
import TabViewList from '../../components/TabView';

const FirstRoute = () => <View style={[styles.scene, {backgroundColor: '#ff4081'}]} />;

const SecondRoute = () => <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />;

const initialLayout = {width: Dimensions.get('window').width};

class TabIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: 'First'},
        {key: 'second', title: 'Second'},
      ],
    };
  }

  onChangeTab = (index, tab) => {
    console.log('index', index, tab);
    this.setState({index: index});
  };

  render() {
    const {index, routes} = this.state;
    const scenes = {
      first: FirstRoute,
      second: SecondRoute,
      first1: FirstRoute,
    };
    return (
      <View style={{flex: 1}}>
        <TabViewList
          index={this.state.index}
          routes={this.state.routes}
          scenes={scenes}
          onChange={this.onChangeTab}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 0,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  scene: {
    flex: 1,
  },
});
export default TabIndex;
