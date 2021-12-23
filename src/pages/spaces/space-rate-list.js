import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import SingleList from '@/components/List/single-list';
import {getSpacePosts} from '@/api/space_api';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import {BOTTOM_HEIGHT, SCREEN_WIDTH} from '@/utils/navbar';

const SpaceRateList = ({navigation, route}) => {
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);
  const {space} = route.params;
  const spaceId = space.id;

  const joinNewTopic = () => {
    navigation.navigate('NewRate');
    dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, space}});
  };

  return (
    <View style={{flex: 1}}>
      <SingleList request={{api: getSpacePosts, params: {id: spaceId, type: 'rate'}}} />
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
    // paddingVertical: 10,
    position: 'absolute',
    bottom: BOTTOM_HEIGHT,
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

export default SpaceRateList;
