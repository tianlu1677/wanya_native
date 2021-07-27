import React from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, NoActionBottom} from '@/components/Item/single-list-item';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';
import VideoPlayImg from '@/assets/images/video-play.png';
const {width} = Dimensions.get('window');

const BaseLongVideo = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goArticleDetail = () => {
    navigation.push('TopicDetail', {topicId: data.id});
  };

  const isShowBottom = data.node_name || data.praises_count || data.comments_count;

  return (
    <Pressable
      style={[styles.postSlide, {paddingBottom: isShowBottom ? 0 : 16}]}
      onPress={goArticleDetail}>
      <Header data={data} type="article" onRemove={props.onRemove} />
      <View style={styles.content}>
        <Text style={styles.titleText} numberOfLines={2}>
          {data.title}
        </Text>
        <FastImg
          source={{uri: data.single_cover.link_url}}
          style={styles.imageCover}
          mode={'cover'}
        />
        <FastImg style={styles.playImage} source={VideoPlayImg} />
        {isShowBottom ? (
          <View style={styles.bottom}>
            <NoActionBottom data={data} />
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

const ImageHeight = Math.ceil((width * 420) / 750);
const styles = StyleSheet.create({
  postSlide: {
    padding: 14,
    // backgroundColor: 'pink',
  },
  content: {
    marginTop: RFValue(13),
  },
  titleText: {
    fontSize: 14,
    lineHeight: RFValue(21),
    color: '#3c3c3c',
    letterSpacing: 0.5,
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
    height: ImageHeight,
    marginTop: RFValue(5),
  },
  bottom: {
    paddingVertical: 12,
    justifyContent: 'center',
  },
});

export default BaseLongVideo;
