import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Button, FlatList, View, Text} from 'react-native';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import {getRecommendPosts, getFollowedPosts} from '@/api/home_api';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';

// const HEADER_HEIGHT = 144;
const TAB_BAR_HEIGHT = 55;

function renderItem({item}) {
  console.log('reding', item);
  return (
    <View style={{height: 100, backgroundColor: 'green'}}>
      <Text>{item.content}</Text>
    </View>
  );
}

export default React.memo(renderItem);

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
