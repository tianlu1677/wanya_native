import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImg from '@/components/FastImg';
import {Header, Bottom, PlainContent} from '@/components/Item/single-list-item';
import LocationBar from '@/components/LocationBar';
import {dispatchTopicDetail, dispatchPreviewImage} from '@/redux/actions';
import IconFont from '@/iconfont';
import {VWValue, RFValue} from '@/utils/response-fontsize';
import {calculateImg} from '@/utils/scale';
import {SCREEN_WIDTH} from '@/utils/navbar';
import VideoPlayImg from '@/assets/images/video-play.png';
import FastImageGif from '@/components/FastImageGif';
import ExcellentImage from '@/assets/images/excellent.png';
import BaseLongVideo from '@/components/Item/base-long-video';

export const TopicImageContent = props => {
  const dispatch = useDispatch();
  const {single_cover, medias} = props.data;
  const imgStyle = medias.length === 1 ? 'single' : 'multi';
  const imgAttr = calculateImg(single_cover.width, single_cover.height);

  if (!single_cover.cover_url) {
    return <View />;
  }

  const singleStyle = {width: VWValue(imgAttr.width), height: VWValue(imgAttr.height)};

  const onPreview = index => {
    const data = {
      index,
      visible: true,
      images: medias.map(v => {
        return {url: v.split('?')[0]};
      }),
    };
    dispatch(dispatchPreviewImage(data));
  };

  return imgStyle === 'single' ? (
    <Pressable onPress={() => onPreview(0)} style={singleStyle}>
      <FastImg source={{uri: single_cover.cover_url}} style={singleStyle} />
    </Pressable>
  ) : (
    <View style={styles.imageMultiWrapper}>
      {medias.map((media, index) => (
        <Pressable key={media} onPress={() => onPreview(index)}>
          <FastImg
            key={media}
            source={{uri: media}}
            style={{...styles.imageMulti, marginRight: (index + 1) % 3 === 0 ? 0 : 3}}
          />
        </Pressable>
      ))}
    </View>
  );
};

export const TopicVideoContent = props => {
  const navigation = useNavigation();

  const {
    data: {id, single_cover},
  } = props;

  const onGoDetail = () => {
    navigation.push('TopicDetail', {topicId: id});
  };

  const videoAttr = calculateImg(single_cover.width || 100, single_cover.height || 100);
  const videoAttrStyle = {width: VWValue(videoAttr.width), height: VWValue(videoAttr.height)};

  return (
    <Pressable style={{flex: 1, ...videoAttrStyle}} onPress={onGoDetail}>
      <FastImageGif
        gif_url={single_cover.link_url}
        source={{uri: `${single_cover.link_url}?imageView2/2/w/720/interlace/1/format/jpg/q/80`}}
        style={{...styles.imageCover, ...videoAttrStyle}}
      />
      <Image resizeMethod={'resize'} style={styles.playImage} source={VideoPlayImg} />
    </Pressable>
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
            style={{width: VWValue(45), height: VWValue(45)}}
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
  const {data, type} = props;
  const {content_style} = data;
  const navigation = useNavigation();
  const goNodeDetail = () => {
    navigation.push('NodeDetail', {nodeId: data.node_id});
  };

  const goTopicDetail = () => {
    navigation.push('TopicDetail', {topicId: data.id});
  };

  return content_style === 'video' && data.is_long_video ? (
    <BaseLongVideo data={props.data} />
  ) : (
    <Pressable style={styles.postSlide} onPress={goTopicDetail}>
      <Header data={data} type="topic" typeHeader={type} onRemove={props.onRemove} />
      {data.plain_content ? (
        <PlainContent data={data} numberOfLines={5} style={{marginTop: RFValue(13)}} />
      ) : (
        <View />
      )}
      {['img', 'video', 'link'].includes(content_style) ? (
        <View style={{marginTop: data.plain_content ? RFValue(5) : RFValue(13)}}>
          {content_style === 'img' && <TopicImageContent data={data} />}
          {content_style === 'video' && <TopicVideoContent data={data} />}
          {content_style === 'link' && <TopicLinkContent data={data} />}
          {data.excellent && (
            <FastImg
              style={styles.excellentImage}
              source={ExcellentImage}
              resizeMode={'contain'}
              resizeMethod={'resize'}
            />
          )}
        </View>
      ) : (
        <View />
      )}

      {type === 'recommend-node' && (
        <View style={[styles.infoViewWrap, {marginTop: content_style === 'text' ? 11 : 16}]}>
          <LocationBar space={data.space} location={data.location} style={styles.infoView} />
        </View>
      )}

      {type !== 'recommend-node' && (
        <View style={[styles.infoViewWrap, {marginTop: content_style === 'text' ? 11 : 16}]}>
          <Pressable style={styles.infoView} onPress={goNodeDetail}>
            <IconFont name="node-solid" size={15} color={'#1B5C79'} />
            <Text style={styles.nodeName}>{data.node_name}</Text>
          </Pressable>
        </View>
      )}

      <Bottom data={data} type="topic" share={true} />
    </Pressable>
  );
};

const imageMultiWidth = Math.floor((SCREEN_WIDTH - 28 - 6) / 3);
const styles = StyleSheet.create({
  postSlide: {
    padding: 14,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  imageMultiWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageMulti: {
    width: imageMultiWidth,
    height: imageMultiWidth,
    marginBottom: 3,
    borderRadius: 2,
  },
  imageCover: {
    borderRadius: 2,
    position: 'relative',
  },
  playImage: {
    width: VWValue(30),
    height: VWValue(30),
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -15,
    marginLeft: -15,
  },
  excellentImage: {
    width: VWValue(30),
    height: VWValue(17),
    position: 'absolute',
    top: 8,
    left: 8,
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
    color: '#1B5C79',
    fontWeight: '300',
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
