import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from '@/utils/response-fontsize';

const BaseSpace = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {savetopic} = useSelector(state => state.home);
  const {createNode} = useSelector(state => state.node);
  const {type, data} = props;

  const goDetail = () => {
    const update = {space: data.id === 0 ? null : data, location: null};

    if (type === 'add-space') {
      dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...update}});
      navigation.goBack();
    }

    if (type === 'add-node') {
      dispatch({type: action.CREATE_NODE, value: {...createNode, ...update}});
      navigation.goBack();
    }

    if (type === 'list') {
      navigation.push('SpaceDetail', {spaceId: data.id});
    }
  };

  return (
    <Pressable style={styles.spaceWrapper} onPress={goDetail}>
      <Text style={styles.name}>{data.name}</Text>
      {data.address ? <Text style={styles.address}>{data.address}</Text> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  spaceWrapper: {
    height: RFValue(65),
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 15,
  },
  address: {
    fontSize: 11,
    marginTop: 8,
    color: '#bdbdbd',
  },
});

export default BaseSpace;
