import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as action from '@/redux/constants';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';
import {BaseRelatedStyle as lstyles} from '@/styles/baseCommon';

export const BaseSpace = props => {
  const {
    data: {name, cover_url, desc_tip},
  } = props;
  console.log(props);

  return (
    <View style={[lstyles.relatedWrapper, styles.baseWrapper]}>
      <FastImg style={lstyles.relatedImage} source={{uri: cover_url}} />
      <View style={lstyles.relatedInfo}>
        <Text style={lstyles.relatedName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={lstyles.relatedText} numberOfLines={1}>
          {desc_tip}
        </Text>
      </View>
    </View>
  );
};

export const BaseMovement = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {savetopic} = useSelector(state => state.home);
  const {
    data: {name, desc_tip},
  } = props;

  const handleClick = () => {
    const params = {
      shop_store_ids: [],
      shop_brand_ids: [],
      movement_ids: [props.data],
      product: null,
    };
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
    navigation.goBack();
  };

  return (
    <Pressable style={styles.wrapper} onPress={handleClick}>
      <View style={styles.info}>
        <Text style={styles.name}>{name.trim()}</Text>
        <Text style={styles.intro} numberOfLines={1}>
          {desc_tip}
        </Text>
      </View>
    </Pressable>
  );
};

export const BaseShopStore = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {savetopic} = useSelector(state => state.home);
  const {
    data: {name, desc_tip},
  } = props;

  const handleClick = () => {
    const params = {
      movement_ids: [],
      shop_brand_ids: [],
      shop_store_ids: [props.data],
      product: null,
    };
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
    navigation.goBack();
  };

  return (
    <Pressable style={styles.wrapper} onPress={handleClick}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.intro} numberOfLines={1}>
          {desc_tip}
        </Text>
      </View>
    </Pressable>
  );
};

export const BaseShopBrand = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {savetopic} = useSelector(state => state.home);
  const {
    data: {name, desc_tip},
  } = props;

  const handleClick = () => {
    const params = {
      movement_ids: [],
      shop_store_ids: [],
      shop_brand_ids: [props.data],
      product: null,
    };
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
    navigation.goBack();
  };

  return (
    <Pressable style={styles.wrapper} onPress={handleClick}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.intro} numberOfLines={1}>
          {desc_tip}
        </Text>
      </View>
    </Pressable>
  );
};

export const BaseProduct = props => {
  const {
    data: {cover_url, name, category_name, category_brand_type},
    type,
  } = props;

  const handleClick = () => {};

  return (
    <View style={[lstyles.relatedWrapper, styles.baseWrapper]}>
      <FastImg style={lstyles.relatedImage} source={{uri: cover_url}} />
      <View style={lstyles.relatedInfo}>
        <Text style={lstyles.relatedName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={lstyles.relatedText} numberOfLines={1}>
          {category_name}
          {category_brand_type ? ' · ' : ''}
          {category_brand_type ? category_brand_type.split(',').join('/') : ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: RFValue(66),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  info: {
    marginRight: 'auto',
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
  },
  intro: {
    fontSize: 11,
    color: '#BDBDBD',
    lineHeight: 20,
    marginTop: RFValue(5),
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 14,
  },
  baseWrapper: {
    marginHorizontal: 14,
    marginBottom: 10,
  },
});
