import React, {useState} from 'react';
import {View, Text, Pressable, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {RFValue} from '@/utils/response-fontsize';
import {getFollowNodeIndex} from '@/api/node_api';
import NearbyNodesList from './nearby-nodes-list';
import {ListEmpty as lstyles, ShareWrapper as styles} from '@/styles/baseCommon';
import {getLocation} from '@/pages/home/getLocation';

const NearbyNodes = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    account: {currentAccount},
    home: {location},
  } = useSelector(state => state);

  const accountId = currentAccount.id;
  console.log(location);

  const onOpenLocation = () => {
    // location为false 不同判断
    getLocation(true, result => {
      if (result) {
        dispatch({
          type: action.GET_LOCATION,
          value: {...result.position.coords},
        });
        const {latitude, longitude} = result.position.coords;
        // loadData(1, {latitude, longitude});
      } else {
        dispatch({type: action.GET_LOCATION, value: {}});
      }
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />

      {location ? (
        <NearbyNodesList
          request={{api: getFollowNodeIndex, params: {account_id: accountId}}}
          type="list"
          renderEmpty={
            <Pressable
              style={lstyles.emptyWrap}
              onPress={() => navigation.navigate('InviteDetail')}>
              <View style={[lstyles.emptyTextWrap, {marginTop: RFValue(165)}]}>
                <Text style={lstyles.emptyText}>所在地区还没有青年社区</Text>
                <Text style={lstyles.emptyText}>你可以创建当地首个圈子</Text>
              </View>
              <Text style={lstyles.moreNode} onPress={() => navigation.navigate('CreateNodeIntro')}>
                开始创建本地圈子
              </Text>
            </Pressable>
          }
        />
      ) : (
        <View style={lstyles.emptyWrap}>
          <View style={[lstyles.emptyTextWrap, {marginTop: RFValue(165)}]}>
            <Text style={lstyles.emptyText}>你还没有授权地理位置权限</Text>
            <Text style={lstyles.emptyText}>授权后可看到更多本地圈子</Text>
          </View>
          <Text style={lstyles.moreNode} onPress={onOpenLocation}>
            授权地理位置权限
          </Text>
        </View>
      )}
    </>
  );
};

export default NearbyNodes;
