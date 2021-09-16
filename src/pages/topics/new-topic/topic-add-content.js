import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';

const RelatedImage = require('@/assets/images/topic-related.png');

const TopicAddContent = props => {
  const {
    navigation,
    savetopic: {node, movement_ids, shop_store_ids, shop_brand_ids, product},
  } = props;

  return (
    <>
      <View style={styles.addWrapper}>
        <Pressable style={styles.addSlide} onPress={() => navigation.navigate('AddNode')}>
          <Text style={styles.addText}>关联圈子</Text>
          {node && node.name ? (
            <View style={styles.checkTextWrap}>
              <IconFont name="node-solid" size={15} color={'#1B5C79'} />
              <Text style={styles.checkText}>{node?.name}</Text>
            </View>
          ) : null}
          <IconFont name="arrow-right" size={10} color="#c2c2c2" />
        </Pressable>
        <Pressable style={styles.addSlide} onPress={() => navigation.navigate('AddRelated')}>
          <Text style={styles.addText}>关联顽招/Van Store/品牌/顽物等</Text>
          <IconFont name="arrow-right" size={10} color="#c2c2c2" />
        </Pressable>
      </View>

      {movement_ids?.length > 0 ? (
        <View style={styles.relatedWrapper}>
          <View style={styles.related}>
            <FastImg style={styles.relatedImage} source={RelatedImage} />
            <View style={styles.relatedInfo}>
              <Text style={styles.relatedName}>{movement_ids[0].name.trim()}</Text>
              <Text style={styles.relatedText}>{movement_ids[0].desc_tip}</Text>
            </View>
          </View>
        </View>
      ) : null}

      {shop_store_ids?.length > 0 ? (
        <View style={styles.relatedWrapper}>
          <View style={styles.related}>
            <FastImg style={styles.relatedImage} source={{uri: shop_store_ids[0].cover_url}} />
            <View style={styles.relatedInfo}>
              <Text style={styles.relatedName}>{shop_store_ids[0].name.trim()}</Text>
              <Text style={styles.relatedText}>{shop_store_ids[0].desc_tip}</Text>
            </View>
          </View>
        </View>
      ) : null}

      {shop_brand_ids?.length > 0 ? (
        <View style={styles.relatedWrapper}>
          <View style={styles.related}>
            <FastImg style={styles.relatedImage} source={{uri: shop_brand_ids[0].cover_url}} />
            <View style={styles.relatedInfo}>
              <Text style={styles.relatedName}>{shop_brand_ids[0].name.trim()}</Text>
              <Text style={styles.relatedText}>{shop_brand_ids[0].desc_tip}</Text>
            </View>
          </View>
        </View>
      ) : null}

      {product ? (
        <View style={styles.relatedWrapper}>
          <View style={styles.related}>
            <FastImg
              style={styles.relatedImage}
              source={{uri: product.cover_url ? product.cover_url : product.images_list[0]}}
            />
            <View style={styles.relatedInfo}>
              <Text style={styles.relatedName}>{product.name}</Text>
              <Text style={styles.relatedText}>{product.category_name}</Text>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  addWrapper: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb',
    marginTop: RFValue(14),
  },
  addSlide: {
    flexDirection: 'row',
    alignItems: 'center',
    height: RFValue(50),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb',
    paddingRight: 7,
  },
  addText: {
    fontSize: 14,
    color: '#000000',
    marginRight: 'auto',
  },
  checkTextWrap: {
    height: RFValue(25),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    paddingHorizontal: RFValue(10),
    marginRight: 7,
  },
  checkText: {
    fontSize: 11,
    marginLeft: 5,
    color: '#1B5C79',
    fontWeight: '300',
  },
  relatedWrapper: {
    height: RFValue(55),
    backgroundColor: '#000',
    borderRadius: 9,
    justifyContent: 'center',
    paddingLeft: RFValue(10),
    marginTop: RFValue(13),
  },
  related: {
    flexDirection: 'row',
  },
  relatedImage: {
    width: RFValue(33),
    height: RFValue(33),
    marginRight: 8,
    borderRadius: 6,
  },
  relatedInfo: {
    justifyContent: 'center',
  },
  relatedName: {
    color: '#fff',
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  relatedText: {
    color: '#bdbdbd',
    fontSize: RFValue(10),
    fontWeight: '300',
    marginTop: 4,
  },
});

export default TopicAddContent;
