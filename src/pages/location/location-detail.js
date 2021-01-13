import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '@/components/Loading';
import SingleList from '@/components/List/single-list';
import {getLocations, getLocationsPosts} from '@/api/location_api';

const LocationDetail = ({route}) => {
  const [locationId] = useState(route.params.locationId);
  const [detail, setDetail] = useState(null);

  const loadData = async () => {
    const res = await getLocations(locationId);
    setDetail(res.data.location);
  };

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <View style={styles.wrapper}>
      <SingleList
        request={{api: getLocationsPosts, params: {id: locationId}}}
        enableRefresh={false}
        ListHeaderComponent={<Text>{detail.address}</Text>}
      />
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default LocationDetail;
