import React from 'react';
import {View, Text, StatusBar, Pressable, StyleSheet, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import {dispatchPreviewImage} from '@/redux/actions';
import FastImg from '@/components/FastImg';
import {SAFE_TOP} from '@/utils/navbar';
import {PublishAccount, PublishRelated} from '@/components/Item/single-detail-item';
import {PlainContent} from '@/components/Item/single-list-item';

const {width: screenWidth} = Dimensions.get('window');
let maxHeight = 100;

const RenderImage = props => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const {detail} = props;
  let media_images = detail.media_images || [];
  media_images.map(img => {
    const imgHeight = Math.floor((screenWidth / img.width) * img.height);
    if (imgHeight > maxHeight) {
      maxHeight = imgHeight;
    }
  });

  media_images = media_images.map(img => {
    const imgHeight = (screenWidth / img.width) * img.height;
    if (imgHeight < maxHeight) {
      return {...img, imgHeight: imgHeight, paddingTop: (maxHeight - imgHeight) / 2};
    } else {
      return {...img, imgHeight: imgHeight, paddingTop: 0};
    }
  });

  const onPreview = index => {
    const data = {
      images: media_images.map(v => {
        return {url: v.image_url.split('?')[0]};
      }),
      visible: true,
      index,
    };
    dispatch(dispatchPreviewImage(data));
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <View style={{minHeight: maxHeight, width: screenWidth, position: 'relative'}}>
        <View style={{height: SAFE_TOP, backgroundColor: 'black'}} />
        {props.detail.excellent && <Text style={styles.excellentLabel}>精选</Text>}
        <Swiper
          index={0}
          loop={false}
          activeDotColor={'yellow'}
          dotColor={'white'}
          removeClippedSubviews={false}
          loadMinimal
          style={{height: maxHeight, backgroundColor: 'black'}}
          showsPagination={media_images.length > 0}>
          {media_images.map((media, index) => (
            <Pressable
              onPress={() => onPreview(index)}
              key={media.image_url}
              style={{paddingTop: media.paddingTop, height: media.imgHeight}}>
              <FastImg
                key={media.image_url}
                source={{uri: media.image_url}}
                style={{width: screenWidth, height: media.imgHeight}}
                mode={'contain'}
              />
            </Pressable>
          ))}
        </Swiper>
      </View>
      <PublishAccount
        data={props.detail}
        showFollow={currentAccount.id !== detail.account_id}
        space={props.detail.space}
        location={props.detail.location}
      />
      {detail.plain_content ? (
        <View style={styles.content}>
          <PlainContent data={detail} style={styles.multiLineText} numberOfLines={0} />
        </View>
      ) : null}
      <PublishRelated data={detail} type="topic" />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 15,
    paddingRight: 24,
    paddingBottom: 10,
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
    top: SAFE_TOP,
    zIndex: 1,
    marginTop: 9,
  },
});

export default RenderImage;
