import React, {useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import SpaceListDetail from '@/components/List/space-list-detail';
import {getSpaces} from '@/api/space_api';
import {Pressable} from 'react-native';

const Space = props => {
  const {navigation} = props;
  const {category} = props.route.params;
  const {location} = useSelector(state => state.home);
  const {latitude, longitude, positionCity, chooseCity} = location;
  const params = {
    category,
    latitude,
    longitude,
    currentcity: positionCity,
    city: chooseCity === '全国' ? 'china' : chooseCity,
  };
  const [request] = useState({api: getSpaces, params});

  const goChooseCity = () => {
    navigation.navigate('ChooseCity');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${category}场地`,
      headerRight: () => (
        <Pressable
          onPress={() => navigation.push('SearchIndex', {key: 'space'})}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          <IconFont name="search" size={16} />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>{chooseCity === positionCity ? '附近场地' : '热门场地'}</Text>
        <Pressable style={styles.address} onPress={goChooseCity}>
          <IconFont name="space-point" size={12} color={'#000'} />
          <Text style={styles.city}>{chooseCity || '全国'}</Text>
          <IconFont name="backdown" size={8} color={'#000'} />
        </Pressable>
      </View>
      <SpaceListDetail request={request} type="list" />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: RFValue(35),
    paddingHorizontal: 14,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 12,
    color: '#BDBDBD',
  },
  address: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    flexShrink: 1,
  },
  city: {
    fontSize: 12,
    marginHorizontal: 5,
  },
});

export default Space;
