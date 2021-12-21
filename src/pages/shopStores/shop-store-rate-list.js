import React from 'react';
import {View} from 'react-native';
import SingleList from '@/components/List/single-list';
import {JoinActivity} from '@/components/NodeComponents';
import {getShopStorePosts} from '@/api/shop_store_api';

const ShopStoreRateList = ({navigation, route}) => {
  const {shopStoreId} = route.params;

  const joinNewTopic = () => {
    navigation.navigate('NewTopic');
  };

  return (
    <View style={{flex: 1}}>
      <SingleList request={{api: getShopStorePosts, params: {id: shopStoreId, type: 'rate'}}} />
      <JoinActivity type={'node'} text="去评价" handleClick={joinNewTopic} />
    </View>
  );
};

export default ShopStoreRateList;
