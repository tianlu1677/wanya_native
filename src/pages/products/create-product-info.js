import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Pressable, StyleSheet, TextInput, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import PersonImg from '@/assets/images/personal.png';

const {width} = Dimensions.get('window');
const mediaWidth = Math.floor((width - (30 * 2 + 10 * 3)) / 4);
console.log('mediaWidth', mediaWidth);

const CreateProductLink = props => {
  const {navigation} = props;
  const {createProduct} = useSelector(state => state.product);
  const {detail} = createProduct;

  const [value, setValue] = useState('');

  console.log('createProduct', createProduct);
  const isClick = () => (1 ? true : false);

  const goStepClick = () => {
    navigation.navigate('CreateProductType');
  };

  useLayoutEffect(() => {
    const hitSlop = {top: 10, bottom: 10, left: 5, right: 5};
    navigation.setOptions({headerTitle: '添加顽物'});
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
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
        {detail.small_images.string.map((item, index) => (
          <View
            key={index}
            style={[styles.imageWrap, {marginRight: (index + 1) % 4 === 0 ? 0 : 10}]}>
            <FastImg style={styles.image} source={{uri: item}} mode="cover" />
            <FastImg style={styles.image} source={require('@/assets/images/add-photo.png')} />

            <Pressable style={styles.mediaCloseWrap}>
              <FastImg style={styles.closeIcon} source={require('@/assets/images/close.png')} />
            </Pressable>
          </View>
        ))}
        <View style={[styles.imageWrap]}>
          <FastImg style={styles.image} source={require('@/assets/images/add-photo.png')} />
          <Pressable style={styles.mediaCloseWrap}>
            <FastImg style={styles.closeIcon} source={require('@/assets/images/close.png')} />
          </Pressable>
        </View>
      </View>
      <Text
        style={[styles.surebtn, isClick() ? styles.canClick : styles.disabled]}
        onPress={goStepClick}>
        下一步
      </Text>
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
    paddingHorizontal: 30,
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
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: mediaWidth,
    height: mediaWidth,
  },
  mediaCloseWrap: {
    position: 'absolute',
    right: 0,
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

export default CreateProductLink;
