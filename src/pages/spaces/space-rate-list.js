import React from 'react';
import {View} from 'react-native';
import SingleList from '@/components/List/single-list';
import {JoinActivity} from '@/components/NodeComponents';
import {getSpacePosts} from '@/api/space_api';

const SpaceRateList = ({navigation, route}) => {
  const {spaceId} = route.params;

  const joinNewTopic = () => {
    navigation.navigate('NewTopic');
  };

  return (
    <View style={{flex: 1}}>
      <SingleList request={{api: getSpacePosts, params: {id: spaceId, type: 'rate'}}} />
      <JoinActivity type={'node'} text="去评价" handleClick={joinNewTopic} />
    </View>
  );
};

export default SpaceRateList;
