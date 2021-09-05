import React from 'react';
import {View, Text, StatusBar, Pressable, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import {dispatchPreviewImage} from '@/redux/actions';
import FastImg from '@/components/FastImg';
import {SAFE_TOP} from '@/utils/navbar';
import {PlainContent} from '@/components/Item/single-list-item';
import {
  PublishAccount,
  PublishRelated,
  RelatedComponent,
} from '@/components/Item/single-detail-item';
import {scaleDetailImage} from '@/utils/scale';

const RenderImage = props => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const {account_id, media_images, excellent, plain_content, location, space} = props.detail;
  const isSelf = currentAccount.id !== account_id;

  const mediaImages = scaleDetailImage(media_images);

  const onPreview = index => {
    const data = {
      images: mediaImages.map(v => {
        return {url: v.image_url.split('?')[0]};
      }),
      visible: true,
      index,
    };
    dispatch(dispatchPreviewImage(data));
  };

  const heightImages = mediaImages.map(item => item.height);
  const maxIndex = heightImages.findIndex(item => item === Math.max.apply(null, heightImages));
  const maxHeight = heightImages[maxIndex];

  const viewStyle = {width: mediaImages[0].width, height: maxHeight};

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} translucent={false} />
      <View style={{height: SAFE_TOP, backgroundColor: '#000'}} />
      <View style={viewStyle}>
        {excellent && <Text style={styles.excellentLabel}>精选</Text>}
        <Swiper
          index={0}
          loop={false}
          activeDotColor="yellow"
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

      <PublishAccount data={props.detail} showFollow={isSelf} space={space} location={location} />
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
    padding: 15,
    paddingRight: 24,
    // paddingBottom: 10,
    paddingBottom: 0,
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
