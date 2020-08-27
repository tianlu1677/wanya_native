import React, {Component} from 'react';
import {SafeAreaView, Dimensions, StyleSheet, ScrollView, View, Text, Button} from 'react-native';
// import ViewPager from '@react-native-community/viewpager';
// import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {TabView, SceneMap} from 'react-native-tab-view';
import TabViewList from '../../components/TabView';

const FirstRoute = () => <View style={[styles.scene, {backgroundColor: '#ff4081'}]} />;

const SecondRoute = () => <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />;

const initialLayout = {width: Dimensions.get('window').width};
// import SkeletonContent from 'react-native-skeleton-content';


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
    return (
      <View style={{flex: 1}}>
        {/*<SkeletonContent*/}
        {/*  containerStyle={{ flex: 1, width: 300 }}*/}
        {/*  isLoading={false}*/}
        {/*  layout={[*/}
        {/*    { key: 'someId', width: 220, height: 20, marginBottom: 6 },*/}
        {/*    { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 }*/}
        {/*  ]}*/}
        {/*>*/}
        {/*  <Text style={styles.normalText}>Your content</Text>*/}
        {/*  <Text style={styles.bigText}>Other content</Text>*/}
        {/*</SkeletonContent>*/}
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
  normalText: {
    fontSize: 400,
  },
  bigText: {
    fontSize: 300
  },
  scene: {
    flex: 1,
  },
});
export default TabIndex;
