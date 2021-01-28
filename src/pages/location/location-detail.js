import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Platform, Linking} from 'react-native';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import SingleList from '@/components/List/single-list';
import {getLocationDetail, getLocationsPosts} from '@/api/location_api';
import {RFValue} from '@/utils/response-fontsize';
import MapLinking from '@/components/MapLink';
import {SCREEN_WIDTH} from '@/utils/navbar';
import IconFont from '@/iconfont';
import ActionSheet from '@/components/ActionSheet.android';

const LocationDetail = ({route, navigation}) => {
  const [locationId] = useState(route.params.locationId);
  const [detail, setDetail] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [showActionSheet, setShowActionSheet] = useState(false);

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
      title: '我的位置',
    };

    // 终点坐标信息
    const destLocation = {
      lng: detail.longitude,
      lat: detail.latitude,
      title: detail.name,
    };
    if (Platform.OS === 'ios') {
      MapLinking.planRoute({startLocation, destLocation, mode: 'drive'});
    } else {
      setShowActionSheet(true);
      const maps = MapLinking.openUrl({
        startLocation,
        destLocation,
        mode: 'drive',
        type: 'gcj02',
        appName: 'MapLinking',
      });
      // console.log('maps', maps);
      const list = maps.map((map, index) => ({
        id: index,
        label: map[0],
        onPress: () => {
          Linking.openURL(map[1]);
        },
      }));
      setItemList(list);
    }
  };

  return detail ? (
    <View style={{flex: 1}}>
      <View style={styles.wrapper}>
        <SingleList
          request={{api: getLocationsPosts, params: {id: locationId}}}
          enableRefresh={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.name}>{detail.name}</Text>
              <Text style={styles.address}>{detail.address}</Text>
              <Pressable onPress={handleChange}>
                <FastImg
                  style={styles.image}
                  source={{uri: detail.address_cover_url}}
                  // mode={'center'}
                />
              </Pressable>
            </View>
          }
        />
      </View>
      <ActionSheet
        actionItems={itemList}
        showActionSheet={showActionSheet}
        changeModal={() => {
          setShowActionSheet(false);
        }}
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
    width: SCREEN_WIDTH - 28,
    height: RFValue(160),
  },
});

export default LocationDetail;
