import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, Bottom} from '@/components/Item/single-list-item';
import FastImg from '@/components/FastImg';
import LinearGradient from 'react-native-linear-gradient';

const BaseArticle = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goArticleDetail = () => {
    navigation.push('ArticleDetail', {articleId: data.id});
  };

  return (
    <Pressable style={styles.postSlide} onPress={goArticleDetail}>
      <Header data={data} type="article" />
      <View style={styles.content}>
        <FastImg source={{uri: data.cover_url}} style={styles.imageCover} />
        <LinearGradient
          style={styles.titleWrapper}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}>
          <Text style={styles.titleText}>{data.title}</Text>
        </LinearGradient>
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
  titleWrapper: {
    height: 64,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingLeft: 11,
    paddingRight: 11,
    paddingTop: 7,
  },
  titleText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '500',
    textAlign: 'justify',
  },
  imageCover: {
    borderRadius: 2,
    width: '100%',
    height: 167,
  },
});

export default BaseArticle;
