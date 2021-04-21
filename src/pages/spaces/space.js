import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import SpaceListDetail from '@/components/List/space-list-detail';
import {getSpaces} from '@/api/space_api';
import {Pressable} from 'react-native';

const Space = props => {
  const {category} = props.route.params;
  const {location} = useSelector(state => state.home);
  const {latitude, longitude, positionCity, chooseCity} = location;
  const params = {category, latitude, longitude, currentcity: positionCity, city: chooseCity};
  const [request] = useState({api: getSpaces, params});

  const goChooseCity = () => {
    props.navigation.navigate('ChooseCity');
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{chooseCity === positionCity ? '附近场地' : '热门场地'}</Text>
        <Pressable style={styles.address} onPress={goChooseCity}>
          <IconFont name="space-point" size={12} color={'#000'} />
          <Text style={styles.city}>{chooseCity || '城市'}</Text>
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
    backgroundColor: '#fff',
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

export default Space;
