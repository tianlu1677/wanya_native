import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Swiper from 'react-native-swiper';
import {dispatchPreviewImage} from '@/redux/actions';
import FastImg from '@/components/FastImg';
import {PlainContent} from '@/components/Item/single-list-item';
import {PublishRelated, RelatedComponent} from '@/components/Item/single-detail-item';
import {scaleDetailImage} from '@/utils/scale';

const RenderImage = props => {
  const dispatch = useDispatch();
  const {media_images, excellent, plain_content} = props.detail;
  const mediaImages = scaleDetailImage(media_images);

  const onPreview = index => {
    const images = mediaImages.map(v => {
      return {url: v.image_url.split('?')[0]};
    });
    const data = {images, visible: true, index};
    dispatch(dispatchPreviewImage(data));
  };

  const heightImages = mediaImages.map(item => item.height);
  const maxIndex = heightImages.findIndex(item => item === Math.max.apply(null, heightImages));
  const maxHeight = heightImages[maxIndex];

  const viewStyle = {width: mediaImages[0].width, height: maxHeight};

  return (
    <>
      <View style={viewStyle}>
        {excellent && <Text style={styles.excellentLabel}>精选</Text>}
        <Swiper
          index={0}
          loop={false}
          activeDotColor="#ff2242"
          dotColor="white"
          removeClippedSubviews={false}
          loadMinimal
          style={{backgroundColor: '#000'}}
          showsPagination={mediaImages.length > 0}>
          {mediaImages.map((media, index) => {
            const {width, height, image_url, mode} = media;
            const paddingTop = (maxHeight - height) / 2;
            return (
              <Pressable key={image_url} onPress={() => onPreview(index)} style={{paddingTop}}>
                <FastImg source={{uri: image_url}} style={{width, height}} mode={mode} />
              </Pressable>
            );
          })}
        </Swiper>
      </View>

      <RelatedComponent data={props.detail} />

      {plain_content ? (
        <View style={styles.content}>
          <PlainContent data={props.detail} style={styles.multiLineText} />
        </View>
      ) : null}

      <PublishRelated data={props.detail} type="topic" />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 14,
    paddingBottom: 0,
    marginTop: 15,
  },
  multiLineText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#000',
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
    left: 40,
    zIndex: 1,
    marginTop: 9,
  },
});

export default RenderImage;
