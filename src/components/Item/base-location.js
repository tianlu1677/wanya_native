import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from '@/utils/response-fontsize';
import {createLocations} from '@/api/location_api';

const BaseLocation = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {savetopic} = useSelector(state => state.home);
  const {createNode} = useSelector(state => state.node);

  const {type, data} = props;

  const goDetail = async () => {
    let update = null;
    if (data.id === 0) {
      update = {location: null, space: null};
    } else {
      const params = {
        name: data.name,
        address: `${data.district}${data.address}`,
        latitude: data.location.split(',')[1],
        longitude: data.location.split(',')[0],
      };
      const res = await createLocations({location: params});
      update = {location: res.data.location, space: null};
    }

    if (type === 'add-location') {
      dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...update}});
      navigation.goBack();
    }

    if (type === 'add-node') {
      dispatch({type: action.CREATE_NODE, value: {...createNode, ...update}});
      navigation.goBack();
    }
  };

  return (
    <Pressable style={styles.spaceWrapper} onPress={goDetail}>
      <Text style={styles.name}>{data.name}</Text>
      {data.address || data.district ? (
        <Text style={styles.address}>{data.address ? data.address : data.district}</Text>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  spaceWrapper: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingLeft: 14,
    backgroundColor: '#fff',
    height: RFValue(65),
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

export default BaseLocation;
