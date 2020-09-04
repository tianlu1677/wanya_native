import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getSpacesList} from '@/api/space_api';
import * as action from '@/redux/constants';
import SpaceList from '@/components/List/SpaceList';
import {Search} from '@/components/NodeComponents';

const AddSpace = () => {
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    marginLeft: 14,
    marginBottom: 6,
  },
  title: {
    height: 40,
    lineHeight: 40,
    paddingLeft: 14,
    color: '#bdbdbd',
    backgroundColor: '#fafafa',
  },
});

export default AddSpace;
