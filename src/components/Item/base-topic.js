import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import FastImg from '@/components/FastImg';
import styled from 'styled-components/native';
import {Header, Bottom} from '@/components/Item/single-list-item';

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
  const {single_cover, medias} = props.data;
  const imgStyle = medias.length === 1 ? 'single' : 'multi';
  const imgAttr =
    medias.length === 1
      ? calculateImg(single_cover.width, single_cover.height)
      : {
          width: 500,
          height: 300,
        };

  return (
    <View>
      {imgStyle === 'single' && (
        <Image
          source={{uri: single_cover.cover_url}}
          style={{height: imgAttr.height / 2.0, width: imgAttr.width / 2.0}}
        />
      )}

      {imgStyle === 'multi' && (
        <ScrollView scrollX>
          <View className="image-multi">
            {medias.map((media, media_index) => {
              return (
                <Image
                  src={media}
                  mode="widthFix"
                  key={media_index}
                  style={{width: 167, height: 167, marginRight: 5, borderRadius: 2}}
                />
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const BaseTopicStyle = {
  MultiLineText: styled(Text)`
    font-size: 14px;
    line-height: 24px;
    color: #1f1f1f;
  `,
  VideoPlayImage: styled(Image)`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 40%;
    left: 25%;
    right: 25%;
    bottom: 50%;
    margin: auto;
  `,
  HashtagText: styled(Text)`
    color: #ff8d00;
    margin-right: 3px;
  `,
};

const {MultiLineText, VideoPlayImage, HashtagText} = BaseTopicStyle;

export const TopicVideoCenterContent = props => {
  const {id, single_cover} = props.data;
  const videoAttr = calculateImg(single_cover.width, single_cover.height);
  return (
    <View>
      <FastImg
        source={{uri: single_cover.link_url}}
        style={{width: videoAttr.width / 2, height: videoAttr.height / 2}}
      />
      <VideoPlayImage source={require('@/assets/images/video-play.png')} />
    </View>
  );
};

export const BaseTopicContent = props => {
  const {data} = props;
  return (
    <View style={props.style}>
      <MultiLineText numberOfLines={2}>
        {data.hashtag_content_json ? (
          data.hashtag_content_json.map((v, index) => {
            return (
              <Text key={index}>
                {v.is_hashtag && <HashtagText>{v.content}</HashtagText>}
                {v.is_mention && <HashtagText>{v.content}</HashtagText>}
                {!v.is_hashtag && !v.is_mention && <Text space="nbsp">{v.content}</Text>}
              </Text>
            );
          })
        ) : (
          <Text>{data.plain_content}</Text>
        )}
      </MultiLineText>
      <View>{data.content_style === 'link' && <Text>外链</Text>}</View>
      <View>{data.content_style === 'text' && <Text>文字</Text>}</View>
    </View>
  );
};

const BaseTopic = props => {
  const {data} = props;
  return (
    <TouchableOpacity style={styles.postSlide}>
      <Header data={data} type="topic" />
      <View style={{marginTop: 13, marginBottom: 13}}>
        {data.content_style === 'img' && <TopicImageCenterContent data={data} />}
        {data.content_style === 'video' && <TopicVideoCenterContent data={data} />}
      </View>
      <BaseTopicContent data={data} />
      <Bottom data={data} type="topic" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postSlide: {
    padding: 14,
    backgroundColor: 'white',
  },
});

export default BaseTopic;
