import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import SingleList from '@/components/List/single-list';
import {getLocations, getLocationsPosts} from '@/api/location_api';
import {RFValue} from '@/utils/response-fontsize';

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
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.name}>{detail.name}</Text>
            <Text style={styles.address}>{detail.address}</Text>
            <FastImg
              style={styles.image}
              source={{uri: detail.address_cover_url}}
              resizeMode={'contain'}
            />
          </View>
        }
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
  header: {
    padding: 14,
  },
  name: {
    fontSize: 18,
    lineHeight: 20,
  },
  address: {
    fontSize: 11,
    lineHeight: 13,
    color: '#BDBDBD',
    marginTop: 7,
    marginBottom: 14,
  },
  image: {
    width: '100%',
    height: RFValue(160),
  },
});

export default LocationDetail;
