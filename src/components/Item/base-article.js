import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, NoActionBottom} from '@/components/Item/single-list-item';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';
import {SCREEN_WIDTH} from '@/utils/navbar';

const BaseArticle = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goArticleDetail = () => {
    navigation.push('ArticleDetail', {articleId: data.id});
  };

  const AvatarSmallPicContent = () => {
    const imageStyle = {width: RFValue(105), height: RFValue(75)};
    return (
      <>
        <Header data={data} type="article" onRemove={props.onRemove} />
        <View style={[styles.content, {marginTop: 13}]}>
          <View style={styles.titleInfo}>
            <Text style={styles.titleText} numberOfLines={2}>
              {data.title}
            </Text>
            <NoActionBottom data={data} />
          </View>
          <View style={[styles.imageCover, {marginLeft: 22}]}>
            {data.excellent && <Text style={styles.excellentLabel}>精选</Text>}
            <FastImg source={{uri: data.cover_url}} style={imageStyle} mode={'cover'} />
          </View>
        </View>
      </>
    );
  };

  const BigPcContent = () => {
    const width = SCREEN_WIDTH - 28;
    const imageStyle = {width, height: (width * 386) / 690};
    return (
      <>
        <Text style={styles.titleText} numberOfLines={2}>
          {data.title}
        </Text>
        <View style={[styles.imageCover, {marginTop: RFValue(5)}]}>
          {data.excellent && <Text style={styles.excellentLabel}>精选</Text>}
          <FastImg source={{uri: data.cover_url}} style={imageStyle} mode={'cover'} />
        </View>
        <NoActionBottom
          data={data}
          avator={data.account.nickname}
          style={{height: RFValue(35), lineHeight: RFValue(35)}}
        />
      </>
    );
  };

  const NormalSmallPicContent = () => {
    const imageStyle = {width: RFValue(105), height: RFValue(75)};
    return (
      <>
        <View style={styles.content}>
          <View style={styles.titleInfo}>
            <Text style={styles.titleText} numberOfLines={2}>
              {data.title}
            </Text>
            <NoActionBottom data={data} avator={data.account.nickname} />
          </View>
          <View style={[styles.imageCover, {marginLeft: 22}]}>
            {data.excellent && <Text style={styles.excellentLabel}>精选</Text>}
            <FastImg source={{uri: data.cover_url}} style={imageStyle} mode={'cover'} />
          </View>
        </View>
      </>
    );
  };

  const MultiSmallPic = () => {
    const scale = 160 / 226;
    const imageWidth = Math.floor((SCREEN_WIDTH - 28 - 6) / 3);
    const imageStyle = {width: imageWidth, height: imageWidth * scale, marginBottom: 3};
    return (
      <>
        <Text style={styles.titleText} numberOfLines={2}>
          {data.title}
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: RFValue(5)}}>
          {data.images_info.map((media, index) => (
            <Pressable key={media.url}>
              <FastImg
                source={{uri: media.url}}
                style={{...imageStyle, marginRight: (index + 1) % 3 === 0 ? 0 : 3}}
                mode="cover"
              />
            </Pressable>
          ))}
        </View>
        <NoActionBottom
          data={data}
          avator={data.account.nickname}
          style={{height: RFValue(35), lineHeight: RFValue(35)}}
        />
      </>
    );
  };

  return (
    <Pressable style={styles.postSlide} onPress={goArticleDetail}>
      {data.card_style === 'avatar_small_pic' ? <AvatarSmallPicContent /> : <View />}
      {data.card_style === 'big_pc' ? <BigPcContent /> : <View />}
      {data.card_style === 'normal_small_pic' ? <NormalSmallPicContent /> : <View />}
      {data.card_style === 'multi_small_pic' ? <MultiSmallPic /> : <View />}
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
    lineHeight: RFValue(21),
    color: '#3c3c3c',
    letterSpacing: 0.5,
    textAlign: 'justify',
  },
  imageCover: {
    position: 'relative',
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
