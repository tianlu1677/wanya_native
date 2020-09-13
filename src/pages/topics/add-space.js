import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getSpacesList} from '@/api/space_api';
import * as action from '@/redux/constants';
import SpaceList from '@/components/List/space-list';
import {Search} from '@/components/NodeComponents';
import IconFont from '@/iconfont';

import {ProWrapper as pstyles} from '@/styles/baseCommon';

const AddSpace = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const home = useSelector(state => state.home);

  const [searchKey, setSearchKey] = useState(null);

  const onPress = item => {
    const topics = {...home.savetopic, space: item};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.goBack();
  };

  const goChooseCity = () => {
    props.navigation.navigate('ChooseCity');
  };

  useEffect(() => {
    console.log(searchKey);
  }, [searchKey]);

  return (
    <View style={styles.wrapper}>
      <Search
        style={styles.search}
        placeholder="搜索更多场地"
        onChangeText={text => setSearchKey(text)}
      />
      <TouchableOpacity style={pstyles.proWrapper} onPress={goChooseCity}>
        <Text style={pstyles.proTitle}>热门场地</Text>
        <View style={pstyles.proCity}>
          <IconFont name="space-point" size={12} style={pstyles.proAddressIcon} />
          <Text style={pstyles.proCityText}>全国</Text>
          <IconFont name="fanhui2" size={6} style={pstyles.proDownIcon} />
        </View>
      </TouchableOpacity>
      <SpaceList
        request={{api: getSpacesList, params: {type: 'recommend', name_cont: searchKey}}}
        onPress={onPress}
        enableLoadMore={false}
        enableRefresh={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    paddingLeft: 14,
  },
});

export default AddSpace;
