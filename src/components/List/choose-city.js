import React, {useEffect, useState, useLayoutEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCities} from '@/api/space_api';
import {Text, View, StyleSheet, Pressable, Dimensions} from 'react-native';
import * as action from '@/redux/constants';
import ScrollList from '@/components/ScrollList';
import Toast from '@/components/Toast';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';

const windowWidth = Dimensions.get('window').width;

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

const CitySelect = ({navigation}) => {
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
    navigation.goBack();
  };

  useEffect(() => {
    loadCities();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerRight: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>取消</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

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
              <View style={styles.hotCityNameWrap}>
                {hotCity.map((v, index) => (
                  <Pressable onPress={() => chooseCity(v)} key={v}>
                    <Text
                      key={v}
                      style={[
                        styles.hotCityName,
                        {
                          width: (windowWidth - 27 - 50) / 4,
                          color: home.location.chooseCity === v ? '#6190E8' : '#000',
                          marginRight: (index + 1) % 4 === 0 ? 0 : 9,
                        },
                      ]}>
                      {v}
                    </Text>
                  </Pressable>
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
    marginRight: 34,
  },
  hotCityTitle: {
    lineHeight: 48,
    height: 48,
    fontSize: 14,
  },
  hotCityNameWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hotCityName: {
    backgroundColor: '#F2F3F5',
    marginBottom: 9,
    height: 30,
    lineHeight: 30,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '300',
    borderRadius: 5,
    overflow: 'hidden',
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
    width: 36,
    position: 'absolute',
    right: 0,
    top: '17%',
    zIndex: 2,
  },
  keyTitle: {
    fontSize: 11,
    color: '#bdbdbd',
    paddingTop: 2,
    paddingBottom: 2,
    textAlign: 'center',
  },
  cancel: {
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
    fontSize: 15,
    color: '#bdbdbd',
  },
});

export default CitySelect;
