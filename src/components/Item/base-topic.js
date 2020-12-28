import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImg from '@/components/FastImg';
import {Header, Bottom, PlainContent} from '@/components/Item/single-list-item';
import {dispatchTopicDetail, dispatchPreviewImage} from '@/redux/actions';
import IconFont from '@/iconfont';
import VideoPlayImg from '@/assets/images/video-play.png';
import FastImageGif from '@/components/FastImageGif';

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
        return {url: v.split('?')[0]};
      }),
      visible: true,
      index,
    };
    dispatch(dispatchPreviewImage(data));
  };

  if (!single_cover.cover_url) {
    return <View />;
  }

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
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
    <View style={{flex: 1, width: videoAttr.width / 2, height: videoAttr.height / 2}}>
      <FastImageGif
        gif_url={single_cover.link_url}
        source={{uri: single_cover.cover_url}}
        style={{
          ...styles.imageCover,
          ...{width: videoAttr.width / 2, height: videoAttr.height / 2},
        }}
      />
      <Image resizeMethod={'resize'} style={styles.playImage} source={VideoPlayImg} />
    </View>
  );
};

// 外链
export const TopicLinkContent = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data} = props;
  const onGoDetail = () => {
    dispatch(dispatchTopicDetail(null));
    navigation.push('TopicLinkDetail', {topicId: data.id});
  };

  return (
    <Pressable onPress={onGoDetail}>
      <View style={styles.linkWrapper}>
        <View style={styles.linkImageWrap}>
          <FastImg
            source={{uri: data.topic_link.cover_url}}
            mode={'cover'}
            style={{width: 45, height: 45}}
          />
          {data.topic_link.outlink_type === 'music' && (
            <IconFont name="sanjiaoxing" size="12" style={styles.linkImage} />
          )}
        </View>
        <Text style={styles.linkText} numberOfLines={2}>
          {data.topic_link.title || data.topic_link.raw_link}
        </Text>
      </View>
    </Pressable>
  );
};

const BaseTopic = props => {
  const {data} = props;
  const navigation = useNavigation();
  const goNodeDetail = () => {
    navigation.push('NodeDetail', {nodeId: data.node_id});
  };

  const goTopicDetail = () => {
    navigation.push('TopicDetail', {topicId: data.id});
  };

  return (
    <Pressable style={styles.postSlide} onPress={goTopicDetail}>
      <Header data={data} type="topic" onRemove={props.onRemove} />
      <View style={{marginTop: 13}}>
        {data.content_style === 'img' && <TopicImageContent data={data} />}
        {data.content_style === 'video' && <TopicVideoContent data={data} />}
        {data.content_style === 'link' && <TopicLinkContent data={data} />}
        {data.excellent && <Text style={styles.excellentLabel}>精选</Text>}
      </View>

      {data.plain_content ? (
        <PlainContent
          data={data}
          numberOfLines={5}
          style={{paddingTop: data.content_style === 'text' ? 0 : 13}}
        />
      ) : null}
      <View style={[styles.infoViewWrap, {marginTop: data.plain_content ? 10 : 16}]}>
        <Pressable style={styles.infoView} onPress={goNodeDetail}>
          <IconFont name="node-solid" size={12} color={'#000'} />
          <Text style={styles.nodeName}>{data.node_name}</Text>
        </Pressable>
      </View>
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
  imageMulti: {
    width: 167,
    height: 167,
    marginRight: 5,
    borderRadius: 2,
  },
  imageCover: {
    borderRadius: 2,
    position: 'relative',
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
  },
  infoViewWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    height: 25,
    borderRadius: 13,
    paddingHorizontal: 10,
  },
  nodeName: {
    fontSize: 11,
    marginLeft: 4,
  },
  linkWrapper: {
    flex: 1,
    backgroundColor: '#F2F3F5',
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    minHeight: 60,
    alignItems: 'center',
  },
  linkImageWrap: {
    position: 'relative',
  },
  linkImage: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -6,
    marginLeft: -6,
  },
  linkText: {
    fontSize: 13,
    lineHeight: 20,
    marginVertical: 3,
    color: '#3F3F3F',
    marginLeft: 10,
    textAlign: 'justify',
    flex: 1,
  },
});

export default BaseTopic;
