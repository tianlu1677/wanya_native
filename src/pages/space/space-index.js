import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getSpacesList} from '@/api/space_api';
import * as action from '@/redux/constants';
import SpaceList from '@/components/List/space-list';
import {Search} from '@/components/NodeComponents';

import {SpaceIndexStyles as styles} from './styles';

const SpaceIndex = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const home = useSelector(state => state.home);

  const [searchKey, setSearchKey] = useState(null);

  const onPress = item => {
    const topics = {...home.savetopic, space: item};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.goBack();
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
      <Text style={styles.title}>热门场地</Text>
      <SpaceList
        request={{api: getSpacesList, params: {type: 'recommend', name_cont: searchKey}}}
        onPress={onPress}
        enableLoadMore={false}
        enableRefresh={false}
      />
    </View>
  );
};

export default SpaceIndex;
