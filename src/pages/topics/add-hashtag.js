import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getHashtagList} from '@/api/hashtag_api';
import * as action from '@/redux/constants';
import TopicList from '@/components/List/TopicList';
import {Search} from '@/components/NodeComponents';

const AddHashTag = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);

  const onPress = item => {
    const topics = {
      ...savetopic,
      plan_content: `${savetopic.plan_content} #${item.name}`,
    };
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      <Search style={styles.search} placeholder="搜索更多话题" />
      <Text style={styles.title}>热门话题</Text>
      <TopicList
        request={{api: getHashtagList}}
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

export default AddHashTag;
