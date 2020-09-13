import React, {useEffect, useState, useRef} from 'react';
import {useDispatch} from 'react-redux';

import {getCities} from '../../api/space_api';
import {Text, View, StyleSheet} from 'react-native';
import * as action from '@/redux/constants';
import ScrollList from '@/components/ScrollList';
import Toast from '@/components/Toast';
import Loading from '@/components/Loading';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CitySelect = props => {
  const dispatch = useDispatch();
  const [cities, setCities] = useState(null);
  const scrollRef = useRef();
  const loadCities = async () => {
    const res = await getCities();
    setCities(res);
  };

  const scrollToKey = (key, index) => {
    console.log(index);
    console.log(scrollRef);
  };

  const chooseCity = city => {
    console.log(props);
    dispatch({type: action.CHOOSE_CITY, value: city.name});
    props.navigation.goBack();
  };

  useEffect(() => {
    loadCities();
  }, []);

  return cities ? (
    <View style={styles.wrapper}>
      <ScrollList
        ref={scrollRef}
        enableLoadMore={false}
        enableRefresh={false}
        data={cities}
        itemKey={'title'}
        renderItem={({item}) => {
          return (
            <View key={item.title} style={styles.cityWrap}>
              <Text style={styles.title}>{item.title}</Text>
              {item.items.map(city => {
                return (
                  <TouchableOpacity
                    key={city.name}
                    style={styles.cityBottom}
                    onPress={() => chooseCity(city)}>
                    <Text style={styles.cityText}>{city.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
      />
      <View style={styles.keyWrap}>
        {cities.map((v, index) => (
          <Text style={styles.keyTitle} onPress={() => scrollToKey(v, index)}>
            {v.title}
          </Text>
        ))}
      </View>
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
  cityWrap: {},
  title: {
    height: 36,
    lineHeight: 36,
    paddingLeft: 15,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    color: '#bdbdbd',
  },
  cityBottom: {
    borderColor: '#fafafa',
    borderBottomWidth: 1,
    marginLeft: 16,
  },
  cityText: {
    height: 45,
    lineHeight: 45,
  },
  keyWrap: {
    position: 'absolute',
    right: 12,
    top: '20%',
  },
  keyTitle: {
    fontSize: 20,
    color: '#bdbdbd',
    textAlign: 'justify',
  },
});

export default CitySelect;
