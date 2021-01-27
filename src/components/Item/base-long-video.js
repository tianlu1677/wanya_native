import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, NoActionBottom} from '@/components/Item/single-list-item';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';

const BaseLongVideo = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goArticleDetail = () => {
    navigation.push('TopicDetail', {topicId: data.id});
  };

  return (
    <Pressable style={styles.postSlide} onPress={goArticleDetail}>
      <Header data={data} type="article" onRemove={props.onRemove} />
      <View style={styles.content}>
        <Text style={styles.titleText}>{data.title}</Text>
        <FastImg source={{uri: data.single_cover.cover_url}} style={styles.imageCover} />
        <View style={styles.bottom}>
          <NoActionBottom data={data} />
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
  },
  titleText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
  },
  imageCover: {
    width: '100%',
    height: RFValue(193),
    marginTop: 5,
  },
  bottom: {
    height: RFValue(35),
    justifyContent: 'center',
  },
});

export default BaseLongVideo;
