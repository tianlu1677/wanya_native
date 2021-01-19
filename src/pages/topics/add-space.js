import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {debounce} from 'lodash';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import SpaceList from '@/components/List/space-list';
import LocationList from '@/components/List/location-list';
import {Search} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import TabViewList from '@/components/TabView';
import {getSpacesList} from '@/api/space_api';
import {createLocations, getLocationsList} from '@/api/location_api';

const AddSpace = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {savetopic, location} = useSelector(state => state.home);
  const {createNode} = useSelector(state => state.node);
  const {latitude, longitude, positionCity, chooseCity} = location;
  const [searchKey, setSearchKey] = useState('');
  const [currentKey, setCurrentKey] = useState('space');

  const returnParams = (key = 'space', text = '') => {
    let requestParams = {};
    if (key === 'space') {
      const params = {city: chooseCity, currentcity: positionCity, name_cont: text};
      requestParams = {
        type: 'space',
        api: getSpacesList,
        params: {latitude, longitude, ...params},
      };
    }
    if (key === 'location') {
      requestParams = {
        type: 'location',
        api: getLocationsList,
        params: {location: [latitude, longitude].join(), city: chooseCity, keyword: text},
      };
    }
    return requestParams;
  };

  const [request, setRequest] = useState(returnParams());

  const dispatchData = data => {
    const {type} = props.route.params;
    if (type === 'topic') {
      dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...data}});
    }
    if (type === 'node') {
      dispatch({type: action.CREATE_NODE, value: {...createNode, ...data}});
    }
  };

  const onPress = async item => {
    if (currentKey === 'location') {
      let data = item;
      if (item.id !== 0) {
        const params = {
          name: item.name,
          address: `${item.district}${item.address}`,
          latitude: item.location.split(',')[1],
          longitude: item.location.split(',')[0],
        };
        const res = await createLocations({location: params});
        console.log('res', res)
        data = res.data.location;
      }
      const update = {location: data.id === 0 ? null : data, space: null};
      dispatchData(update);
    } else {
      const update = {space: item.id === 0 ? null : item, location: null};
      dispatchData(update);
    }
    navigation.goBack();
  };

  const SpaceListPage = () => {
    return request.type === 'space' ? (
      <SpaceList request={request} onPress={onPress} enableRefresh={false} type="add-space" />
    ) : null;
  };

  const LocationListPage = () => {
    return request.type === 'location' ? (
      <LocationList request={request} onPress={onPress} enableRefresh={false} type="add-location" />
    ) : null;
  };

  const onChangeText = text => {
    setRequest(returnParams(currentKey, text));
    setSearchKey(text);
  };

  const onChangeKey = key => {
    setCurrentKey(key);
    setRequest(returnParams(key, searchKey));
  };

  const goChooseCity = () => {
    props.navigation.navigate('ChooseCity');
  };

  useEffect(() => {
    setRequest(returnParams(currentKey, searchKey));
  }, [location]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <Search
          inputStyle={{borderRadius: RFValue(19), backgroundColor: '#F2F3F5'}}
          height={RFValue(36)}
          cancelWidth={RFValue(66)}
          placeholderTextColor="#7F7F81"
          placeholder="搜索更多场地位置"
          onChangeText={debounce(onChangeText, 500)}
          onCancel={() => navigation.goBack()}
          prefix={
            <Pressable style={styles.proCity} onPress={goChooseCity}>
              <IconFont name="space-point" size={14} />
              <Text style={styles.proCityText}>{location.chooseCity || '全国'}</Text>
            </Pressable>
          }
        />

        <TabViewList
          center={false}
          bottomLine={true}
          lazy={true}
          currentKey={currentKey}
          onChange={onChangeKey}
          request={request}
          size="small"
          tabData={[
            {
              key: 'space',
              title: '场地',
              component: SpaceListPage,
            },
            {
              key: 'location',
              title: '位置',
              component: LocationListPage,
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  proCity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proCityText: {
    marginRight: RFValue(17),
    marginLeft: RFValue(7),
    fontSize: 15,
  },
});

export default AddSpace;
