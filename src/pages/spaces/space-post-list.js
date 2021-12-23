import React from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import SingleList from '@/components/List/single-list';
import {JoinActivity} from '@/components/NodeComponents';
import {getSpacePosts} from '@/api/space_api';

const SpacePostList = ({navigation, route}) => {
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);
  const {space} = route.params;
  const spaceId = space.id;

  const joinNewTopic = () => {
    navigation.navigate('NewTopic');
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, space}});
  };

  return (
    <View style={{flex: 1}}>
      <SingleList request={{api: getSpacePosts, params: {id: spaceId, type: 'no_rate'}}} />
      <JoinActivity type={'node'} text="去打卡" handleClick={joinNewTopic} />
    </View>
  );
};

export default SpacePostList;
