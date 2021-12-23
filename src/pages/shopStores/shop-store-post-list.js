import React from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import SingleList from '@/components/List/single-list';
import {JoinActivity} from '@/components/NodeComponents';
import {getShopStorePosts} from '@/api/shop_store_api';

const ShopStorePostList = ({navigation, route}) => {
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);
  const {shopStore} = route.params;
  const shopStoreId = shopStore.id;

  const joinNewTopic = () => {
    navigation.navigate('NewTopic');
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, shop_store_ids: [shopStore]}});
  };

  return (
    <View style={{flex: 1}}>
      <SingleList request={{api: getShopStorePosts, params: {id: shopStoreId, type: 'no_rate'}}} />
      <JoinActivity type={'node'} text="去打卡" handleClick={joinNewTopic} />
    </View>
  );
};

export default ShopStorePostList;
