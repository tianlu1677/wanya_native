import React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import SingleList from '@/components/List/single-list';
import {JoinActivity} from '@/components/NodeComponents';
import {getShopStorePosts} from '@/api/shop_store_api';
import IconFont from "@/iconfont"
import {RFValue} from "@/utils/response-fontsize"
import {BOTTOM_HEIGHT, SCREEN_WIDTH} from "@/utils/navbar"

const ShopStoreRateList = ({navigation, route}) => {
  const {shopStoreId} = route.params;

  const joinNewTopic = () => {
    navigation.navigate('NewTopic');
  };

  return (
    <View style={{flex: 1}}>
      <SingleList request={{api: getShopStorePosts, params: {id: shopStoreId, type: 'rate'}}} />

      <View style={[styles.btnWrap]}>
        <Pressable style={[styles.btn, styles.commentBtn]} onPress={joinNewTopic}>
          <IconFont name="xie" size={22} color="white" />
          <Text style={styles.btnText}>写评价</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrap: {
    // backgroundColor: '#fff',
    // borderWidth: 1,
    borderColor: '#ebebeb',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    position: 'absolute',
    bottom: BOTTOM_HEIGHT / 2,
    left: 0,
    right: 0,
  },
  btn: {
    width: (SCREEN_WIDTH - 70) / 2,
    height: RFValue(40),
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 13,
  },
  punchBtn: {
    backgroundColor: '#000',
  },
  commentBtn: {
    backgroundColor: '#FF2242',
    marginLeft: 20,
  },
});


export default ShopStoreRateList;
