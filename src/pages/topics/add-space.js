import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getSpacesList, getLocation} from '@/api/space_api';
import * as action from '@/redux/constants';
import SpaceList from '@/components/List/space-list';
import {Search} from '@/components/NodeComponents';
import IconFont from '@/iconfont';

import {ProWrapper as pstyles} from '@/styles/baseCommon';

const AddSpace = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const home = useSelector(state => state.home);
  const [searchKey, setSearchKey] = useState(null);

  const onPress = item => {
    const topics = {...home.savetopic, space: item};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.goBack();
  };

  const goChooseCity = () => {
    props.navigation.navigate('ChooseCity');
  };

  const loadCity = async () => {
    const {latitude, longitude} = home.location;
    const res = await getLocation({latitude, longitude});
    const {city} = res.data;
    dispatch({
      type: action.GET_LOCATION,
      value: {...home.location, positionCity: city, chooseCity: city},
    });
  };

  useEffect(() => {
    loadCity();
  }, []);

  return (
    <SpaceList
      request={{
        api: getSpacesList,
        params: {
          latitude: home.location.latitude,
          longitude: home.location.longitude,
          name_cont: searchKey,
          city: home.location.chooseCity,
        },
      }}
      onPress={onPress}
      enableLoadMore={false}
      enableRefresh={false}
      style={styles.wrapper}
      ListHeaderComponent={
        <>
          <Search
            style={styles.search}
            placeholder="搜索更多场地"
            onChangeText={text => setSearchKey(text)}
            onCancel={() => props.navigation.goBack()}
          />
          <TouchableOpacity style={pstyles.proWrapper} onPress={goChooseCity}>
            <Text style={pstyles.proTitle}>
              {searchKey
                ? '搜索到的场地'
                : home.location.positionCity === home.location.chooseCity
                ? '附近场地'
                : '热门场地'}
            </Text>
            <View style={pstyles.proCity}>
              <IconFont name="space-point" size={12} style={pstyles.proAddressIcon} />
              <Text style={pstyles.proCityText}>{home.location.chooseCity || '全国'}</Text>
              <IconFont name="backdown" size={6} style={pstyles.proDownIcon} />
            </View>
          </TouchableOpacity>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    paddingLeft: 14,
  },
});

export default AddSpace;
