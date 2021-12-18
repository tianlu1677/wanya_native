import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as action from '@/redux/constants';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';
import {BaseRelatedStyle as lstyles} from '@/styles/baseCommon';

const ReturnParams = data => {
  const params = {
    space: null,
    shop_store_ids: [],
    shop_brand_ids: [],
    movement_ids: [],
    product_ids: [],
    ...data,
  };
  return params;
};

export const BaseSpace = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {savetopic} = useSelector(state => state.home);

  const {
    page,
    data: {name, cover_url, desc_tip},
  } = props;

  const handleClick = () => {
    if (page === 'rate') {
      navigation.navigate('NewRate');
    }

    const params = ReturnParams({space: props.data});
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
  };

  return (
    <Pressable style={[lstyles.relatedWrapper, styles.baseWrapper]} onPress={handleClick}>
      <FastImg style={lstyles.relatedImage} source={{uri: cover_url}} />
      <View style={lstyles.relatedInfo}>
        <Text style={lstyles.relatedName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={lstyles.relatedText} numberOfLines={1}>
          {desc_tip}
        </Text>
      </View>
      <Text style={lstyles.relatedBtn}>评价</Text>
    </Pressable>
  );
};

export const BaseMovement = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {savetopic} = useSelector(state => state.home);

  const {
    page,
    data: {name, desc_tip},
  } = props;

  const handleClick = () => {
    if (page === 'rate') {
      navigation.navigate('NewRate');
    }
    if (page === 'topic') {
      navigation.goBack();
    }

    const params = ReturnParams({movement_ids: [props.data]});
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {savetopic} = useSelector(state => state.home);

  const {
    page,
    data: {name, desc_tip},
  } = props;

  const handleClick = () => {
    if (page === 'rate') {
      navigation.navigate('NewRate');
    }

    if (page === 'topic') {
      navigation.goBack();
    }

    const params = ReturnParams({shop_store_ids: [props.data]});
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {savetopic} = useSelector(state => state.home);

  const {
    page,
    data: {name, desc_tip},
  } = props;

  const handleClick = () => {
    if (page === 'rate') {
      navigation.navigate('NewRate');
    }

    if (page === 'topic') {
      navigation.goBack();
    }

    const params = ReturnParams({shop_brand_ids: [props.data]});
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {savetopic} = useSelector(state => state.home);

  const {
    page,
    data: {name, cover_url, category_name, category_brand_type},
  } = props;

  const handleClick = () => {
    if (page === 'rate') {
      navigation.navigate('NewRate');
    }
    if (page === 'topic') {
      navigation.goBack();
    }

    const params = ReturnParams({product_ids: [props.data]});
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
  };

  return (
    <Pressable style={[lstyles.relatedWrapper, styles.baseWrapper]} onPress={handleClick}>
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
    </Pressable>
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
  baseWrapper: {
    marginHorizontal: 14,
    marginBottom: 10,
  },
});
