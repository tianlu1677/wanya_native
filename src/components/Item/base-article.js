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
      <Header data={data} type="article" onRemove={props.onRemove} />
      <View style={styles.content}>
        {data.excellent && <Text style={styles.excellentLabel}>精选</Text>}
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
    borderRadius: 2,
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
  excellentLabel: {
    width: 30,
    height: 16,
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 16,
    backgroundColor: '#FF2242',
    borderRadius: 2,
    overflow: 'hidden',
    color: 'white',
    position: 'absolute',
    left: 8,
    top: 8,
    zIndex: 1,
  },
});

export default BaseArticle;
