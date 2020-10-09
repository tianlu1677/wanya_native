import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import TabViewList from '@/components/TabView';
import SingleList from '@/components/List/single-list';

import {Search} from '@/components/NodeComponents';
import {searchApi} from '@/api/search_api';
import {getFollowedPosts, getRecommendLatestPosts} from "@/api/home_api"

const SearchIndex = ({navigation, route}) => {
  const [currentKey, setCurrentKey] = useState('topic');
  const [request, setRequest] = useState('');
  const [searchKey, setSearchKey] = useState('xxx');
  const dispatch = useDispatch();

  const SingleList = () => {
    return <SingleList request={{api: searchApi, params: {name: searchKey, type: currentKey }}} />;
  }


  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  useEffect(() => {
    if (searchKey) {
      // searchTabs({name: searchKey, type: 'topic'})
    } else {
    }
  }, [searchKey]);

  return (
    <View style={{flex: 1}}>
      <Search
        style={styles.search}
        placeholder="顽鸦"
        onChangeText={text => setSearchKey(text)}
        onCancel={() => navigation.goBack()}
      />

      <View style={styles.wrapper}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,

    backgroundColor: 'white',
    position: 'relative',
    zIndex: 1
  },
  search: {
    paddingLeft: 14,
  },
});

export default SearchIndex;
