import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Pressable, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {RFValue} from '@/utils/response-fontsize';
import IconFont from '@/iconfont';
import BaseActivity from '@/components/Item/base-activity';
import ActivityList from '@/components/List/activity-list';
import {getActivityList} from '@/api/activity_api';
import {ScrollView} from 'react-native-gesture-handler';

const Activity = props => {
  const {navigation} = props;
  const {category} = props.route.params;
  const {location} = useSelector(state => state.home);
  const {latitude, longitude, positionCity, chooseCity} = location;
  const [listdata, setListData] = useState([]);
  const [request, setRequest] = useState(null);

  const goChooseCity = () => {
    props.navigation.navigate('ChooseCity');
  };

  const loadNearBy = async () => {
    const query = {
      category,
      latitude,
      longitude,
      currentcity: positionCity,
      city: chooseCity === '全国' ? 'china' : chooseCity,
      per_page: 100,
    };
    console.log('top params', JSON.stringify(query));
    const res = await getActivityList(query);
    setListData(res.data.activities);
    console.log('top data', res.data.activities);
    const listQuery = {category, 'q[id_not_in]': res.data.activities.map(item => item.id).join()};
    console.log('list params', JSON.stringify(listQuery));
    setRequest({api: getActivityList, params: listQuery});
  };

  const isCurrentCity = positionCity === chooseCity;
  const isHasAuth = latitude && longitude && positionCity;

  useEffect(() => {
    loadNearBy();
  }, [chooseCity]);

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

  const CityComponent = (
    <Pressable style={styles.address} onPress={goChooseCity}>
      <IconFont name="space-point" size={12} color={'#000'} />
      <Text style={styles.city}>{chooseCity || '全国'}</Text>
      <IconFont name="backdown" size={8} color={'#000'} />
    </Pressable>
  );

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" />
      {/* <View style={styles.header}>
        <Text style={styles.title}>{chooseCity === positionCity ? '附近活动' : '热门活动'}</Text>
        <Pressable style={styles.address} onPress={goChooseCity}>
          <IconFont name="space-point" size={12} color={'#000'} />
          <Text style={styles.city}>{chooseCity || '全国'}</Text>
          <IconFont name="backdown" size={8} color={'#000'} />
        </Pressable>
      </View> */}
      {/* <ActivityList request={request} type="list" /> */}
      {request && (
        <ActivityList
          request={request}
          type="list"
          ListHeaderComponent={
            <ScrollView>
              <View style={styles.header}>
                <Text style={styles.title}>
                  {isCurrentCity ? '附近活动' : `${chooseCity}附近活动`}
                </Text>
                {CityComponent}
              </View>
              {listdata.map((item, index) => (
                <>
                  <BaseActivity data={item} key={item.id} type="list" />
                  {index + 1 !== listdata.length && <View style={styles.separator} />}
                </>
              ))}
            </ScrollView>
          }
          ListTopHeader={
            <View style={styles.header}>
              <Text style={styles.title}>{isHasAuth ? '其他城市热门活动' : '全国活动'}</Text>
            </View>
          }
        />
      )}
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
  separator: {
    backgroundColor: '#FAFAFA',
    height: 5,
  },
});

export default Activity;
