import React, {Component} from 'react';
import {SafeAreaView, Dimensions, StyleSheet, ScrollView, View, Text, Button} from 'react-native';
// import ViewPager from '@react-native-community/viewpager';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {TabView, SceneMap} from 'react-native-tab-view';

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
        {key: 'first1', title: 'First'},
        {key: 'second2', title: 'Second'},
        {key: 'second3', title: 'Second'},
        {key: 'second4', title: 'Second'},
        {key: 'second5', title: 'Second'},
      ],
    };
  }

  renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    first1: FirstRoute,
    second2: SecondRoute,
    second3: SecondRoute,
    second4: SecondRoute,
    second5: SecondRoute,

  });

  render() {
    const {index, routes} = this.state;
    return (
      <View style={{flex: 1}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={this.renderScene}
          onIndexChange={index => {
            this.setState({index: index});
          }}
          initialLayout={initialLayout}
        />
      </View>
      // <ScrollableTabView
      //   style={{ marginTop: 20 }}
      //   initialPage={0}
      //   renderTabBar={() => <ScrollableTabBar />}
      // >
      //   <Text tabLabel='Tab #1' style={{flex: 1, color: 'red'}}>My</Text>
      //   <Text tabLabel='Tab #2 word word'>favorite</Text>
      //   <Text tabLabel='Tab #3 word word word'>project</Text>
      //   <Text tabLabel='Tab #4 word word word word'>favorite</Text>
      //   <Text tabLabel='Tab #5'>project</Text>
      // </ScrollableTabView>
      // <View>
      //   <ScrollableTabView
      //     style={styles.container}
      //     renderTabBar={() => <DefaultTabBar backgroundColor="rgba(255, 255, 255, 0.7)" />}
      //     tabBarPosition="top"
      //     onChangeTab={evet => {
      //       console.log('evet', evet);
      //     }}>
      //     <ScrollView tabLabel="iOS">
      //       <Text style={styles.icon}>A</Text>
      //       <Text style={styles.icon}>B</Text>
      //       <Text style={styles.icon}>C</Text>
      //
      //       <Text style={styles.icon}>F</Text>
      //
      //       <Button
      //         title={'webview'}
      //         onPress={() => {
      //           this.props.navigation.navigate('LabWebview');
      //         }}
      //       />
      //       <Text style={styles.icon}>D</Text>
      //     </ScrollView>
      //     <ScrollView tabLabel="Android">
      //       <Text style={styles.icon}>G1</Text>
      //       <Text style={styles.icon}>G3</Text>
      //       <Text style={styles.icon}>G4</Text>
      //       <Text style={styles.icon}>G6</Text>
      //     </ScrollView>
      //   </ScrollableTabView>
      // </View>
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
    flex: 1
  }
});
export default TabIndex;
