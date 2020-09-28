import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, Bottom} from '@/components/Item/single-list-item';
import FastImg from '@/components/FastImg';

const BaseTopic = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goArticleDetail = () => {
    navigation.push('ArticleDetail', {topicId: data.id});
  };

  return (
    <Pressable style={styles.postSlide} onPress={goArticleDetail}>
      <Header data={data} type="article" />
      <View style={styles.content}>
        <FastImg source={{uri: data.cover_url}} style={styles.imageCover} />
        <Text style={styles.titleText}>{data.title}</Text>
      </View>
      <Bottom data={data} type="article" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  postSlide: {
    padding: 14,
    paddingBottom: 0,
    backgroundColor: 'white',
  },
  content: {
    marginTop: 13,
    position: 'relative',
  },
  titleText: {
    position: 'absolute',
    top: 7,
    left: 11,
    right: 11,
    color: 'white',
    fontSize: 16,
    lineHeight: 25,
  },
  imageCover: {
    borderRadius: 2,
    width: '100%',
    height: 167,
  },
});

export default BaseTopic;
