import React, {useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {RFValue} from '@/utils/response-fontsize';
import IconFont from '@/iconfont';
import ActivityList from '@/components/List/activity-list';
import {getActivityList} from '@/api/activity_api';

const Activity = props => {
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

  const [request] = useState({api: getActivityList, params});

  const goChooseCity = () => {
    props.navigation.navigate('ChooseCity');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${category}活动`,
      headerRight: () => (
        <Pressable
          onPress={() => navigation.push('SearchIndex', {key: 'activity'})}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          <IconFont name="search" size={16} />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>{chooseCity === positionCity ? '附近活动' : '热门活动'}</Text>
        <Pressable style={styles.address} onPress={goChooseCity}>
          <IconFont name="space-point" size={12} color={'#000'} />
          <Text style={styles.city}>{chooseCity || '全国'}</Text>
          <IconFont name="backdown" size={8} color={'#000'} />
        </Pressable>
      </View>
      <ActivityList request={request} type="list" />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: RFValue(35),
    paddingHorizontal: 14,
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

export default Activity;
