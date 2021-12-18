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

  const {
    pageFrom,
    data: {id, name, district, address, location},
  } = props;

  const goDetail = async () => {
    let params = null;
    if (id === 0) {
      params = {location: null, space: null};
    } else {
      const [latitude, longitude] = location.split(',');
      const query = {name, address: `${district}${address}`, latitude, longitude};
      const res = await createLocations({location: query});
      params = {location: res.data.location, space: null};
    }

    if (pageFrom === 'topic') {
      dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
    }

    if (pageFrom === 'node') {
      dispatch({type: action.CREATE_NODE, value: {...createNode, ...params}});
    }

    navigation.goBack();
  };

  return (
    <Pressable style={styles.spaceWrapper} onPress={goDetail}>
      <Text style={styles.name}>{name}</Text>
      {address || district ? (
        <Text style={styles.address}>{address ? address : district}</Text>
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
