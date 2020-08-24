import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import ScrollList from '@/components/ScrollList';
import {BaseTopic, BaseArticle} from '@/components/Item/PostListItem';

// List 属性继承scrollList
const PostList = props => {
  console.log(props);
  const renderItem = ({item}) => {
    if (item.item_type === 'Topic') {
      return <BaseTopic data={item.item} />;
    } else if (item.item_type === 'Article') {
      return <BaseArticle data={item.item} />;
    }

    return <Text>其他</Text>;
  };

  return <ScrollList {...props} renderItem={renderItem} />;
};

export default PostList;
