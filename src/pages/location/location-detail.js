import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import SingleList from '@/components/List/single-list';
import {getLocationDetail, getLocationsPosts} from '@/api/location_api';
import {RFValue} from '@/utils/response-fontsize';
import MapLinking from '@/components/MapLink';

import IconFont from '@/iconfont';

const LocationDetail = ({route, navigation}) => {
  const [locationId] = useState(route.params.locationId);
  const [detail, setDetail] = useState(null);

  const loadData = async () => {
    const res = await getLocationDetail(locationId);
    setDetail(res.location);
    console.log('res', res);
    navigation.setOptions({title: res.location.name || '位置'});
  };

  useEffect(() => {
    loadData();
  }, []);

  //https://github.com/iwubida/react-native-map-linking
  const handleChange = () => {
    // 起点坐标信息
    const startLocation = {
      lng: 106.534892,
      lat: 29.551891,
      title: '李子坝抗战遗址公园',
    };

    // 终点坐标信息
    const destLocation = {
      lng: 106.27613,
      lat: 29.972084,
      title: '合川区邮政局(重庆市南园路198号)',
    };

    MapLinking.planRoute({startLocation, destLocation});
  };

  return detail ? (
    <View style={styles.wrapper}>
      <SingleList
        request={{api: getLocationsPosts, params: {id: locationId}}}
        enableRefresh={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.name}>{detail.name}</Text>
            <Text style={styles.address}>{detail.address}</Text>
            <Text onPress={handleChange}>ssss</Text>
            <Pressable onPress={handleChange}>
              <FastImg
                style={styles.image}
                source={{uri: detail.address_cover_url}}
                mode={'center'}
              />
            </Pressable>
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
