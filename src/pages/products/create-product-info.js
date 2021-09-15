import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, TextInput, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import MediasPicker from '@/components/MediasPicker';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {SCREEN_WIDTH} from '@/utils/navbar';
import PermissionModal, {checkPermission} from '@/pages/topics/new-topic/photo-permission';

const CloseImg = require('@/assets/images/close.png');
const AddPhoto = require('@/assets/images/add-photo.png');
const LoadingImg = require('@/assets/images/loading.gif');
const mediaWidth = Math.floor((SCREEN_WIDTH - (30 * 2 + 10 * 3)) / 4);

const CreateProductLink = props => {
  const {navigation, removeAllPhoto, imagePick, uploadImage} = props;
  const {
    createProduct: {detail = {}},
  } = useSelector(state => state.product);
  const [permissionModal, setPermissionModal] = useState(false);
  const [imageSource, setImageSource] = useState(detail ? detail.small_images.string : []);

  const isCanClick = () => (imageSource.length > 0 ? true : false);

  const deleteMedia = index => {
    const image = imageSource.filter((v, i) => i !== index);
    setImageSource(image);
  };

  const onImagePicker = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) {
      setPermissionModal(true);
      return;
    }
    removeAllPhoto();
    const options = {imageCount: 9 - imageSource.length, isCamera: false};
    imagePick(options, async (err, res) => {
      if (err) {
        return;
      }
      const allImage = [...imageSource, ...res];
      setImageSource([...allImage]);
      for (let [index, file] of new Map(allImage.map((item, i) => [i, item]))) {
        if (file.uri) {
          const result = await uploadImage({uploadType: 'multipart', ...file});
          allImage[index] = result.asset.url;
          setImageSource([...allImage]);
        }
      }
    });
  };

  const goStepClick = () => {
    navigation.navigate('CreateProductType');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollWrapper}>
        <Text style={styles.title}>商品链接</Text>
        <TextInput
          editable={false}
          style={styles.content}
          selectionColor="#ff193a"
          value={detail.item_url}
        />
        <Text style={styles.title}>商品名称</Text>
        <TextInput
          editable={false}
          style={styles.content}
          selectionColor="#ff193a"
          value={detail.title}
        />
        <Text style={styles.title}>商品价格</Text>
        <TextInput
          editable={false}
          style={styles.content}
          selectionColor="#ff193a"
          value={`¥ ${detail.reserve_price}`}
        />
        <Text style={styles.title}>商品图片</Text>
        <View style={styles.imageContent}>
          {[...imageSource].map((item, index) => {
            const ImageStyles = {marginRight: (index + 1) % 4 === 0 ? 0 : 10};
            return item.uri ? (
              <FastImg key={index} style={[styles.imageWrap, ImageStyles]} source={LoadingImg} />
            ) : (
              <View key={index} style={[styles.imageWrap, ImageStyles]}>
                <FastImg style={styles.image} source={{uri: item}} mode="cover" />
                <Pressable style={styles.mediaCloseWrap} onPress={() => deleteMedia(index)}>
                  <FastImg style={styles.closeIcon} source={CloseImg} />
                </Pressable>
              </View>
            );
          })}
          {imageSource.length < 9 && (
            <Pressable
              onPress={onImagePicker}
              style={[
                styles.imageWrap,
                {marginRight: (imageSource.length + 1) % 4 === 0 ? 0 : 10},
              ]}>
              <FastImg source={AddPhoto} mode="cover" style={styles.image} />
            </Pressable>
          )}
        </View>
      </ScrollView>
      <Text
        style={[styles.surebtn, isCanClick() ? styles.canClick : styles.disabled]}
        onPress={goStepClick}>
        下一步
      </Text>
      <PermissionModal visible={permissionModal} cancleClick={() => setPermissionModal(false)} />
    </View>
  );
};

const boxShadow = {
  shadowColor: '#bdbdbd',
  shadowRadius: 3,
  shadowOpacity: 0.2,
  shadowOffset: {width: 1, height: 2},
  elevation: 3,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollWrapper: {
    paddingHorizontal: 30,
    marginBottom: RFValue(70),
    paddingBottom: RFValue(70),
  },
  title: {
    color: '#3D3D3D',
    fontWeight: '500',
    fontSize: 15,
    marginVertical: RFValue(18),
  },
  content: {
    height: RFValue(50),
    paddingHorizontal: VWValue(15),
    color: '#BDBDBD',
    fontSize: 14,
    fontWeight: '300',
    borderRadius: 6,
    backgroundColor: '#fff',
    ...boxShadow,
  },
  imageContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrap: {
    width: mediaWidth,
    height: mediaWidth,
    marginBottom: 10,
  },
  image: {
    width: mediaWidth,
    height: mediaWidth,
  },
  mediaCloseWrap: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  closeIcon: {
    width: 15,
    height: 15,
  },
  surebtn: {
    height: RFValue(50),
    lineHeight: RFValue(50),
    textAlign: 'center',
    borderRadius: 3,
    overflow: 'hidden',
    fontWeight: '500',
    fontSize: 16,
    marginTop: RFValue(60),
    position: 'absolute',
    bottom: RFValue(20),
    left: 30,
    right: 30,
  },
  canClick: {
    backgroundColor: '#000',
    color: '#fff',
  },
  disabled: {
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
  },
});

export default MediasPicker(CreateProductLink);
