import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import SpaceList from '@/components/List/space-list';
import {Search} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import TabViewList from '@/components/TabView';
import {getSpacesList} from '@/api/space_api';

const AddSpace = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {savetopic, location} = useSelector(state => state.home);
  const {latitude, longitude, currentcity} = location;
  const [searchKey, setSearchKey] = useState(null);
  const [currentKey, setCurrentKey] = useState('space');
  const params = {latitude, longitude, currentcity, city: searchKey};
  console.log(params);

  const onPress = item => {
    const topics = {...savetopic, space: item.id === 0 ? null : item};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.goBack();
  };

  const SpaceListPage = () => {
    return (
      <SpaceList
        request={{api: getSpacesList, params}}
        onPress={onPress}
        enableRefresh={false}
        type="add-space"
      />
    );
  };

  const AddressListPage = () => {
    return (
      <SpaceList
        request={{api: getSpacesList, params}}
        onPress={onPress}
        enableRefresh={false}
        type="add-space"
      />
    );
  };

  const goChooseCity = () => {
    props.navigation.navigate('ChooseCity');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <Search
          inputStyle={{borderRadius: RFValue(5), backgroundColor: '#EBEBEB'}}
          height={RFValue(30)}
          cancelWidth={RFValue(66)}
          placeholderTextColor="#7F7F81"
          placeholder="搜索更多场地"
          onChangeText={text => setSearchKey(text)}
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
          onChange={key => setCurrentKey(key)}
          size="small"
          tabData={[
            {
              key: 'space',
              title: '场地',
              component: SpaceListPage,
            },
            {
              key: 'address',
              title: '位置',
              component: AddressListPage,
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
