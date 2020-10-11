import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import {getRecommendPosts, getFollowedPosts, getRecommendLatestPosts} from '@/api/home_api';

const HEADER_HEIGHT = 144;
const TAB_BAR_HEIGHT = 48;

const CollapsibleHeaderExample = () => {
  const [index, setIndex] = useState(1);
  const [currentKey, setCurrentKey] = useState('article');

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
      />
    );
  };

  const renderTabOne = () => {
    return <DoubleList request={{api: getRecommendPosts}} type="recommend" />;
  };

  const renderTabTwo = () => {
    return <SingleList request={{api: getFollowedPosts}} />;
  };

  return (
    <CollapsibleHeader
      // tabDataAA={[[{key: '0'}], [{key: '1'}], [{key: '2'}]]}
      tabBarHeight={TAB_BAR_HEIGHT}
      headerHeight={HEADER_HEIGHT}
      // renderTabItems={[renderTabOne, renderTabTwo]}
      renderTabBar={renderTabBar}
      onIndexChange={i => setIndex(i)}
      currentKey={currentKey}
      onKeyChange={key => setCurrentKey(key)}
      navigationState={{
        index: index,
        routes: [
          {key: 'article', title: '动态'},
          {key: 'contacts', title: '帖子'},
        ],
      }}
      tabData={[
        {
          key: 'article',
          title: '动态',
          component: renderTabOne,
        },
        {
          key: 'contacts',
          title: '帖子',
          component: renderTabTwo,
        },
      ]}
      renderHeader={
        <View style={styles.headerRow}>
          <View style={styles.headerCol}>
            <Text style={styles.text}>Collapsible Header</Text>
          </View>
        </View>
      }
      separator={true}
    />
  );
};

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#3f51b5',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    fontWeight: '400',
  },
  headerRow: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    backgroundColor: '#429BB8',
  },
  headerCol: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
  },
});

export default CollapsibleHeaderExample;
