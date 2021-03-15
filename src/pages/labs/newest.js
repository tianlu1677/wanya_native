import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import SingleList from '@/components/List/single-list';

import {getRecommendLatestPosts} from '@/api/home_api';

const Newest = props => {

  return (
    <View style={{flex: 1}}>
      {/*<SingleList request={{api: getRecommendLatestPosts}} />*/}
    </View>
  );
};

const styles = StyleSheet.create({

});

export default Newest;
