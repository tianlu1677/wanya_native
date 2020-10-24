import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import {getRecommendPosts, getFollowedPosts} from '@/api/home_api';

// const HEADER_HEIGHT = 144;
const TAB_BAR_HEIGHT = 55;

const CollapsibleHeaderExample = props => {
  const [currentKey, setCurrentKey] = useState('article');

  const renderTabOne = () => {
    return <DoubleList request={{api: getRecommendPosts}} type="recommend" />;
  };

  const renderTabTwo = () => {
    return <SingleList request={{api: getFollowedPosts}} />;
  };

  return (
    <CollapsibleHeader
      tabBarHeight={TAB_BAR_HEIGHT}
      headerHeight={props.headerHeight}
      currentKey={currentKey}
      onKeyChange={key => setCurrentKey(key)}
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
      renderHeader={props.renderHeader}
      // <View style={[styles.headerRow, {height: props.headerHeight}]}>
      //   <View style={styles.headerCol}>
      //     <Text style={styles.text}>Collapsible Header</Text>
      //   </View>
      // </View>
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
    // height: HEADER_HEIGHT,
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
