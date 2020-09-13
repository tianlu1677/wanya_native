import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImg from '@/components/FastImg';
import {Header, Bottom} from '@/components/Item/single-list-item';
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

export const TopicImageCenterContent = props => {
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
    <TouchableOpacity onPress={() => onPreview()}>
      <Image
        source={{uri: single_cover.cover_url}}
        style={{height: imgAttr.height / 2.0, width: imgAttr.width / 2.0}}
      />
    </TouchableOpacity>
  ) : (
    <ScrollView horizontal={true}>
      {medias.map((media, index) => (
        <TouchableOpacity onPress={() => onPreview(index)}>
          <FastImg key={media} source={{uri: media}} style={styles.imageMulti} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export const TopicVideoCenterContent = props => {
  const {single_cover} = props.data;

  const videoAttr = calculateImg(
    single_cover.width ? single_cover.width : 100,
    single_cover.height ? single_cover.height : 100
  );
  return (
    <View>
      {single_cover.link_url && (
        <FastImg
          source={{uri: single_cover.link_url}}
          style={{width: videoAttr.width / 2, height: videoAttr.height / 2}}
        />
      )}
      <Image style={styles.playImage} source={require('@/assets/images/video-play.png')} />
    </View>
  );
};

export const BaseTopicContent = props => {
  const {data} = props;

  return (
    <View style={props.style}>
      <Text numberOfLines={2} style={styles.multiText}>
        {data.hashtag_content_json ? (
          data.hashtag_content_json.map((v, index) => {
            return (
              <Text key={index}>
                {v.is_hashtag && <Text style={styles.hashtagText}>{v.content}</Text>}
                {v.is_mention && <Text style={styles.hashtagText}>{v.content}</Text>}
                {!v.is_hashtag && !v.is_mention && <Text space="nbsp">{v.content}</Text>}
              </Text>
            );
          })
        ) : (
          <Text>{data.plain_content}</Text>
        )}
      </Text>
      <View>{data.content_style === 'link' && <Text>外链</Text>}</View>
      <View>{data.content_style === 'text' && <Text>文字</Text>}</View>
    </View>
  );
};

const BaseTopic = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goSpaceDetail = () => {
    navigation.navigate('SpaceDetail', {spaceId: data.space.id});
  };

  const goTopicDetail = () => {
    navigation.navigate('TopicDetail', {topicId: data.id});
  };

  return (
    <TouchableOpacity style={styles.postSlide} onPress={goTopicDetail}>
      <Header data={data} type="topic" />
      <View style={{marginTop: 13, marginBottom: 13}}>
        {data.content_style === 'img' && <TopicImageCenterContent data={data} />}
        {data.content_style === 'video' && <TopicVideoCenterContent data={data} />}
      </View>
      <BaseTopicContent data={data} />
      {data.space && (
        <TouchableOpacity style={styles.spaceWrapper} onPress={goSpaceDetail}>
          <IconFont name="space-point" size={16} color={'#45ea6a'} />
          <Text style={styles.spaceText}>{data.space.name}</Text>
        </TouchableOpacity>
      )}
      <Bottom data={data} type="topic" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postSlide: {
    padding: 14,
    backgroundColor: 'white',
  },
  multiText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#1f1f1f',
  },
  hashtagText: {
    color: '#ff8d00',
    marginRight: 3,
  },
  spaceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  spaceText: {
    color: '#45ea6a',
    marginLeft: 6,
    fontSize: 14,
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
    top: '40%',
    left: '25%',
    right: '25%',
    bottom: '50%',
    margin: 'auto',
  },
});

export default BaseTopic;
