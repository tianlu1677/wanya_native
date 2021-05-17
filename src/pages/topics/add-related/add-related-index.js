import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {debounce} from 'lodash';
import * as action from '@/redux/constants';
import {BarHeight} from '@/utils/navbar';
import IconFont from '@/iconfont';
import SpaceList from '@/components/List/space-list';
import LocationList from '@/components/List/location-list';
import {Search} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import TabView from '@/components/TabView';
import {getSpacesList} from '@/api/space_api';
import {createLocations, getLocationsList} from '@/api/location_api';
import {searchApi} from '@/api/search_api';

import RelatedList from '@/pages/topics/add-related/related-list';

const BaseMovement = () => {};
const AddSpace = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {savetopic, location} = useSelector(state => state.home);
  const {createNode} = useSelector(state => state.node);
  const {latitude, longitude, positionCity, chooseCity} = location;
  const [searchKey, setSearchKey] = useState('');
  const [currentKey, setCurrentKey] = useState('movement');

  const [request, setRequest] = useState({
    api: searchApi,
    params: {name: searchKey, type: currentKey},
  });

  // const returnParams = (key = 'space', text = '') => {
  //   let requestParams = {};
  //   if (key === 'movement') {
  //     const params = {city: chooseCity, currentcity: positionCity, name_cont: text};
  //     requestParams = {
  //       type: 'space',
  //       api: getSpacesList,
  //       params: {latitude, longitude, ...params},
  //     };
  //   }
  //   if (key === 'location') {
  //     requestParams = {
  //       type: 'location',
  //       api: getLocationsList,
  //       params: {location: [latitude, longitude].join(), city: chooseCity, keyword: text},
  //     };
  //   }
  //   return requestParams;
  // };

  // const [request, setRequest] = useState(returnParams('space', ''));

  // const dispatchData = data => {
  //   const {type} = props.route.params;
  //   if (type === 'topic') {
  //     dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...data}});
  //   }
  //   if (type === 'node') {
  //     dispatch({type: action.CREATE_NODE, value: {...createNode, ...data}});
  //   }
  // };

  // const onPress = async item => {
  //   if (currentKey === 'location') {
  //     let data = item;
  //     if (item.id !== 0) {
  //       const params = {
  //         name: item.name,
  //         address: `${item.district}${item.address}`,
  //         latitude: item.location.split(',')[1],
  //         longitude: item.location.split(',')[0],
  //       };
  //       const res = await createLocations({location: params});
  //       data = res.data.location;
  //     }
  //     const update = {location: data.id === 0 ? null : data, space: null};
  //     dispatchData(update);
  //   } else {
  //     const update = {space: item.id === 0 ? null : item, location: null};
  //     dispatchData(update);
  //   }
  //   navigation.goBack();
  // };

  // const SpaceListPage = () => (
  //   <SpaceList
  //     request={request}
  //     enableRefresh={false}
  //     type="topic"
  //     // type={props.route.params.type === 'topic' ? 'add-space' : 'add-node'}
  //   />
  // );

  // const LocationListPage = () => (
  //   <LocationList
  //     request={request}
  //     enableRefresh={false}
  //     type="topic"

  //     // type={props.route.params.type === 'topic' ? 'add-location' : 'add-node'}
  //   />
  // );

  const MovementListPage = () => {
    return <RelatedList request={request} type="movement" />;
  };

  const ShopStoreListPage = () => {
    return <RelatedList request={request} type="shop_store" />;
  };

  const ShopBrandListPage = () => {
    return <RelatedList request={request} type="shop_brand" />;
  };

  const onChangeText = text => {
    setSearchKey(text);
    setRequest({api: searchApi, params: {name: text, type: currentKey}});
  };

  const onChangeKey = key => {
    setCurrentKey(key);
    setRequest({api: searchApi, params: {name: searchKey, type: key}});
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <View style={{height: BarHeight}} />
        <StatusBar barStyle="dark-content" backgroundColor={'white'} />
        <Search
          inputStyle={{borderRadius: RFValue(19), backgroundColor: '#F2F3F5'}}
          height={RFValue(36)}
          cancelWidth={RFValue(66)}
          placeholderTextColor="#7F7F81"
          placeholder="搜索顽招/Van Store/品牌"
          onChangeText={debounce(onChangeText, 500)}
          cancel={true}
          onCancel={() => navigation.goBack()}
        />
        {request ? (
          <TabView
            currentKey={currentKey}
            request={currentKey}
            onChange={onChangeKey}
            type="index"
            align="left"
            textStyle={{color: '#000', fontWeight: '300'}}
            activeLineColor="#000"
            separator={true}
            tabData={[
              {
                key: 'movement',
                title: '顽招',
                component: MovementListPage,
              },
              {
                key: 'shop_store',
                title: 'Van Store',
                component: ShopStoreListPage,
              },
              {
                key: 'shop_brand',
                title: '品牌',
                component: ShopBrandListPage,
              },
            ]}
          />
        ) : null}
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
