import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImg from '@/components/FastImg';
import {Header, Bottom, PlainContent} from '@/components/Item/single-list-item';
import IconFont from '@/iconfont';
import {dispatchPreviewImage} from '@/redux/actions';

const calculateImg = (width, height) => {
  let newWidth = 500;
  let newHeight = 500;
  let x = (width / height).toFixed(2);
  let attr = {};
  if (x > 0 && x <= 0.33) {
    newHeight = 420;
    newWidth = newHeight / 3;
    attr = {width: newWidth, height: newHeight};
  } else if (x > 0.33 && x <= 1) {
    newHeight = 420;
    newWidth = newHeight * x;
    attr = {width: newWidth, height: newHeight};
  } else if (x > 1 && x <= 2) {
    newWidth = 480;
    newHeight = (height * newWidth) / width;
    attr = {width: newWidth, height: newHeight};
  } else if (x > 2 && x <= 2.89) {
    newHeight = 240;
    newWidth = newHeight * x;
    attr = {width: newWidth, height: newHeight};
  } else if (x > 2.89) {
    newHeight = 240;
    newWidth = newHeight * 2.89;
    attr = {width: newWidth, height: newHeight};
  }
  return {...attr, x: x};
};

export const TopicImageContent = props => {
  const dispatch = useDispatch();
  const {single_cover, medias} = props.data;
  const imgStyle = medias.length === 1 ? 'single' : 'multi';
  const imgAttr = calculateImg(single_cover.width, single_cover.height);

  const onPreview = (index = 0) => {
    const data = {
      images: medias.map(v => {
        return {url: v};
      }),
      visible: true,
      index,
    };
    dispatch(dispatchPreviewImage(data));
  };

  return imgStyle === 'single' ? (
    <Pressable
      style={{width: imgAttr.width / 2.0}}
      onPress={() => {
        onPreview();
      }}>
      <FastImg
        source={{uri: single_cover.cover_url}}
        style={{height: imgAttr.height / 2.0, width: imgAttr.width / 2.0}}
      />
    </Pressable>
  ) : (
    <ScrollView horizontal={true}>
      {medias.map((media, index) => (
        <Pressable onPress={() => onPreview(index)} key={media}>
          <FastImg key={media} source={{uri: media}} style={styles.imageMulti} />
        </Pressable>
      ))}
    </ScrollView>
  );
};

export const TopicVideoContent = props => {
  const {single_cover} = props.data;
  const videoAttr = calculateImg(
    single_cover.width ? single_cover.width : 100,
    single_cover.height ? single_cover.height : 100
  );

  return (
    <>
      <FastImg
        source={{uri: single_cover.link_url}}
        style={{width: videoAttr.width / 2, height: videoAttr.height / 2, position: 'relative'}}>
        <Image style={styles.playImage} source={require('@/assets/images/video-play.png')} />
      </FastImg>
    </>
  );
};

export const TopicLinkContent = props => {
  const navigation = useNavigation();

  const goLinkDetail = () => {
    navigation.push('WebView', {
      sourceUrl: props.data.topic_link.raw_link,
      title: props.data.topic_link.title,
    });
  };

  return (
    <Pressable style={styles.linkWrap} onPress={goLinkDetail}>
      <FastImg source={{uri: props.data.topic_link.cover_url}} style={{flex: 1, height: 167}} />
      <View style={styles.linkTitleBg}>
        <Text style={styles.linkTitle}>{props.data.topic_link.title}</Text>
      </View>
    </Pressable>
  );
};

const BaseTopic = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goSpaceDetail = () => {
    navigation.push('SpaceDetail', {spaceId: data.space.id});
  };

  const goTopicDetail = () => {
    navigation.push('TopicDetail', {topicId: data.id});
  };

  return (
    <Pressable style={styles.postSlide} onPress={goTopicDetail}>
      <Header data={data} type="topic" />
      {data.content_style === 'text' ? (
        <View style={{paddingTop: 13}} />
      ) : (
        <View style={{paddingTop: 13, paddingBottom: 13}}>
          {data.content_style === 'img' && <TopicImageContent data={data} />}
          {data.content_style === 'video' && <TopicVideoContent data={data} />}
          {data.content_style === 'link' && <TopicLinkContent data={data} />}
        </View>
      )}
      <PlainContent data={data} style={styles.multiLineText} numberOfLines={5} />
      {data.space && (
        <Pressable style={styles.spaceWrapper} onPress={goSpaceDetail}>
          <IconFont name="space-point" size={14} color={'#45ea6a'} />
          <Text style={styles.spaceText}>{data.space.name}</Text>
        </Pressable>
      )}
      <Bottom data={data} type="topic" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  postSlide: {
    padding: 14,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  multiText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#1f1f1f',
  },
  hashtagText: {
    color: '#ff8d00',
    paddingLeft: 2,
    paddingRight: 2,
  },
  spaceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  spaceText: {
    color: '#45ea6a',
    marginLeft: 6,
    fontSize: 14,
    lineHeight: 20,
  },
  imageMulti: {
    width: 167,
    height: 167,
    marginRight: 5,
    borderRadius: 2,
  },
  playImage: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -15,
    marginLeft: -15,
  },
  linkTitleBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 64,
  },
  linkTitle: {
    paddingLeft: 11,
    paddingRight: 11,
    paddingTop: 11,
    paddingBottom: 11,
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 22,
    zIndex: 2,
  },
});

export default BaseTopic;
