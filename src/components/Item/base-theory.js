import React from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, NoActionBottom} from '@/components/Item/single-list-item';
import FastImg from '@/components/FastImg';
import VideoPlayImg from '@/assets/images/video-play.png';
import {RFValue} from '@/utils/response-fontsize';

const {width} = Dimensions.get('window');

const BaseTheory = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goArticleDetail = () => {
    navigation.push('TheoryDetail', {theoryId: data.id});
  };

  const {
    single_cover: {cover_url, category},
  } = data;

  return (
    <Pressable style={styles.postSlide} onPress={goArticleDetail}>
      <Header data={data} type="theory" onRemove={props.onRemove} />
      <View style={styles.content}>
        <Text style={styles.titleText}>{data.title}</Text>
        <FastImg source={{uri: cover_url}} style={styles.imageCover} mode={'cover'} />
        {category === 'video' && <FastImg style={styles.playImage} source={VideoPlayImg} />}
        <View style={styles.bottom}>
          <NoActionBottom data={data} />
        </View>
      </View>
    </Pressable>
  );
};

const ImageHeight = Math.floor((width * 420) / 750);
const styles = StyleSheet.create({
  postSlide: {
    padding: 14,
    paddingBottom: 0,
    backgroundColor: 'white',
  },
  content: {
    marginTop: RFValue(13),
  },
  titleText: {
    fontSize: 14,
    lineHeight: RFValue(21),
    color: '#3c3c3c',
    letterSpacing: 1,
    textAlign: 'justify',
  },
  imageCover: {
    width: '100%',
    height: ImageHeight,
    marginTop: RFValue(5),
  },
  playImage: {
    width: RFValue(40),
    height: RFValue(40),
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -RFValue(20),
    marginLeft: -RFValue(20),
  },
  bottom: {
    height: RFValue(35),
    justifyContent: 'center',
  },
});

export default BaseTheory;
