import React from 'react';
import {View} from 'react-native';
import SingleList from '@/components/List/single-list';
import {JoinActivity} from '@/components/NodeComponents';
import {getShopStorePosts} from '@/api/shop_store_api';

const ShopStorePostList = ({navigation, route}) => {
  const {shopStoreId} = route.params;

  const joinNewTopic = () => {
    navigation.navigate('NewTopic');
  };

  return (
    <View style={{flex: 1}}>
      <SingleList request={{api: getShopStorePosts, params: {id: shopStoreId, type: 'no_rate'}}} />
      <JoinActivity type={'node'} text="去打卡" handleClick={joinNewTopic} />
    </View>
  );
};

export default ShopStorePostList;
