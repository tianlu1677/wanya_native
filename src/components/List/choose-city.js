import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCities} from '@/api/space_api';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import * as action from '@/redux/constants';
import ScrollList from '@/components/ScrollList';
import Toast from '@/components/Toast';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';

const hotCity = [
  '北京',
  '上海',
  '深圳',
  '广州',
  '杭州',
  '成都',
  '南京',
  '武汉',
  '重庆',
  '西安',
  '天津',
  '厦门',
];

const CitySelect = props => {
  const dispatch = useDispatch();
  const home = useSelector(state => state.home);
  const [cities, setCities] = useState(null);
  const [scrollRef, setScrollRef] = useState(null);

  const loadCities = async () => {
    const res = await getCities();
    setCities(res.data);
  };

  const scrollTop = () => {
    Toast.show('Top');
    scrollRef.scrollToOffset({offset: 0});
  };

  const scrollToKey = (index, title) => {
    Toast.show(title);
    scrollRef.scrollToIndex({index: index});
  };

  const chooseCity = city => {
    dispatch({type: action.GET_LOCATION, value: {...home.location, chooseCity: city}});
    props.navigation.goBack();
  };

  useEffect(() => {
    loadCities();
  }, []);

  return cities ? (
    <>
      <ScrollList
        style={styles.wrapper}
        getRref={refs => setScrollRef(refs)}
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
                  <Pressable
                    key={city.name}
                    style={styles.cityBottom}
                    onPress={() => chooseCity(city.name)}>
                    <Text style={styles.cityText}>{city.name}</Text>
                  </Pressable>
                );
              })}
            </View>
          );
        }}
        ListHeaderComponent={
          <>
            <View style={styles.city}>
              <IconFont name="space-point" size={16} />
              <Text style={{fontWeight: '300', marginLeft: 10, marginRight: 10}}>当前定位城市</Text>
              <Text style={{fontSize: 14, fontWeight: '500'}}>
                {home.location.positionCity || '未知'}
              </Text>
            </View>
            <View style={styles.hotCityWrap}>
              <Text style={styles.hotCityTitle}>热门城市</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {hotCity.map((v, index) => (
                  <Text
                    key={v}
                    onPress={() => chooseCity(v)}
                    style={[
                      styles.hotCityName,
                      {
                        color: home.location.chooseCity === v ? '#6190E8' : '#000',
                        marginRight: (index + 1) % 4 === 0 ? 0 : 9,
                      },
                    ]}>
                    {v}
                  </Text>
                ))}
              </View>
            </View>
          </>
        }
      />
      <View style={styles.keyWrap}>
        <Text style={styles.keyTitle} onPress={scrollTop}>
          Top
        </Text>
        {cities.map((v, index) => (
          <Text key={v.title} style={styles.keyTitle} onPress={() => scrollToKey(index, v.title)}>
            {v.title}
          </Text>
        ))}
      </View>
    </>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  city: {
    borderColor: '#fafafa',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    marginLeft: 16,
  },
  hotCityWrap: {
    marginLeft: 16,
    marginRight: 33,
  },
  hotCityTitle: {
    lineHeight: 48,
    height: 48,
  },
  hotCityName: {
    width: 75,
    backgroundColor: '#F2F3F5',
    marginBottom: 9,
    height: 30,
    lineHeight: 30,
    textAlign: 'center',
  },
  cityWrap: {},
  title: {
    height: 36,
    lineHeight: 36,
    paddingLeft: 15,
    backgroundColor: '#fafafa',
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: '#bdbdbd',
  },
  cityBottom: {
    borderColor: '#fafafa',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 16,
  },
  cityText: {
    height: 45,
    lineHeight: 45,
  },
  keyWrap: {
    position: 'absolute',
    right: 10,
    top: '25%',
    zIndex: 2,
  },
  keyTitle: {
    fontSize: 14,
    color: '#bdbdbd',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    textAlign: 'center',
  },
});

export default CitySelect;
