import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, NoActionBottom} from '@/components/Item/single-list-item';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';
import VideoPlayImg from "@/assets/images/video-play.png"

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
        <Text style={styles.titleText} numberOfLines={2}>
          {data.title}
          {/*NIHAOnihaonihao你好NIHAOnihaonihao你好NIHAOnihaonihao你好NIHAOnihaonihao你好NIHAOnihaonihao你好NIHAOnihaonihao你好NIHAOnihaonihao你好NIHAOnihaonihao你好*/}
        </Text>
        <FastImg source={{uri: data.single_cover.cover_url}} style={styles.imageCover} mode={'cover'} />
        <FastImg style={styles.playImage} source={VideoPlayImg} />
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
    marginTop: RFValue(13),
  },
  titleText: {
    fontSize: 14,
    lineHeight: RFValue(21),
    textAlign: 'justify',
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
  imageCover: {
    width: '100%',
    height: RFValue(193),
    marginTop: RFValue(5),
  },
  bottom: {
    height: RFValue(35),
    justifyContent: 'center',
  },
});

export default BaseLongVideo;
