import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Swiper from 'react-native-swiper';
import {useDispatch} from 'react-redux';
import {dispatchPreviewImage} from '@/redux/actions';
import {FastImg} from '@/components';
import {FilterScore} from '@/utils';
import {VWValue} from '@/utils/response-fontsize';
import {SCREEN_WIDTH} from '@/utils/navbar';

const imageStyle = {width: SCREEN_WIDTH, height: SCREEN_WIDTH};

const ProductInfo = props => {
  const dispatch = useDispatch();

  const {
    detail: {assets, price, category_name, hot_score, name, shop_brand},
  } = props;

  const onPreview = index => {
    const data = {index, images: assets, visible: true};
    dispatch(dispatchPreviewImage(data));
  };

  return (
    <View>
      <View style={{...imageStyle}}>
        <Swiper
          index={0}
          loop={false}
          activeDotColor="yellow"
          dotColor="white"
          removeClippedSubviews={false}
          loadMinimal
          showsPagination={assets.length > 0}>
          {assets.map((media, index) => (
            <Pressable key={media.url} onPress={() => onPreview(index)}>
              <FastImg source={{uri: media.url}} style={{...imageStyle}} />
            </Pressable>
          ))}
        </Swiper>
      </View>
      <View style={styles.slideView}>
        <View style={styles.productInfo}>
          <Text style={styles.symbol}>¥</Text>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.tags}>{category_name}</Text>
          {hot_score ? <Text style={styles.discuss}>热度 {FilterScore(hot_score)}</Text> : null}
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
      {shop_brand ? (
        <View style={[styles.slideView, styles.shopBrandWrap]}>
          <FastImg source={{uri: shop_brand.cover_url}} style={styles.brandImage} />
          <View style={styles.brandInfo}>
            <Text style={styles.brandName}>{shop_brand.name}</Text>
            <Text style={styles.branddiscuss}>{FilterScore(shop_brand.play_score)} 收藏</Text>
          </View>
          <Text style={styles.discuss}>查看品牌</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  slideView: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 10,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  symbol: {
    fontSize: 16,
    color: '#FF2242',
    fontWeight: '500',
  },
  price: {
    fontSize: 23,
    color: '#FF2242',
    fontWeight: '500',
    marginBottom: -3,
    marginLeft: 3,
    marginRight: 8,
  },
  tags: {
    fontSize: 12,
    color: '#FF2242',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FF2242',
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 2,
    marginRight: 6,
  },
  discuss: {
    fontSize: 12,
    color: '#AAAAAA',
    fontWeight: '300',
    marginLeft: 'auto',
  },
  name: {
    fontSize: 16,
    lineHeight: 26,
    color: '#3D3D3D',
    marginTop: 12,
  },
  shopBrandWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandImage: {
    width: VWValue(45),
    height: VWValue(45),
    marginRight: 10,
  },
  brandInfo: {},
  brandName: {
    fontSize: 14,
    color: '#3D3D3D',
    fontWeight: '500',
  },
  branddiscuss: {
    fontSize: 10,
    color: '#BDBDBD',
    fontWeight: '300',
    marginTop: 6,
  },
});

export default ProductInfo;
