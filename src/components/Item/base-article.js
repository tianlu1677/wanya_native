import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, NoActionBottom} from '@/components/Item/single-list-item';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';

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
        <View style={styles.titleInfo}>
          <Text style={styles.titleText} numberOfLines={2}>
            {data.title}
          </Text>
          <NoActionBottom data={data} />
        </View>
        <View style={styles.imageCover}>
          <FastImg source={{uri: data.cover_url}} style={styles.image} mode={'cover'} />
        </View>
      </View>
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
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  titleInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
  },
  imageCover: {
    width: RFValue(105),
    height: RFValue(75),
    marginLeft: RFValue(22),
    position: 'relative',
  },
  image: {
    width: RFValue(105),
    height: RFValue(75),
  },
  excellentLabel: {
    width: 30,
    height: 16,
    lineHeight: 16,
    textAlign: 'center',
    fontSize: 10,
    color: 'white',
    backgroundColor: '#FF2242',
    borderRadius: 2,
    overflow: 'hidden',
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 1,
  },
});

export default BaseArticle;
