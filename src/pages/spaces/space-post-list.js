import React from 'react';
import {View} from 'react-native';
import SingleList from '@/components/List/single-list';
import {JoinActivity} from '@/components/NodeComponents';
import {getSpacePosts} from '@/api/space_api';

const SpacePostList = ({navigation, route}) => {
  const {spaceId} = route.params;

  const joinNewTopic = () => {
    navigation.navigate('NewTopic');
  };

  return (
    <View style={{flex: 1}}>
      <SingleList request={{api: getSpacePosts, params: {id: spaceId, type: 'no_rate'}}} />
      <JoinActivity type={'node'} text="去打卡" handleClick={joinNewTopic} />
    </View>
  );
};

export default SpacePostList;
