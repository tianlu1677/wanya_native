import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ScrollList from '@/components/ScrollList';
import {useNavigation} from '@react-navigation/native';
import * as action from '@/redux/constants';

const HashtagList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);

  const onPress = item => {
    if (props.type === 'add-hash-tag') {
      const topics = {
        ...savetopic,
        plan_content: savetopic.plan_content
          ? `${savetopic.plan_content} #${item.name}`
          : `#${item.name}`,
      };
      dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
      navigation.goBack();
    } else {
      navigation.navigate('HashtagDetail', {hashtag: item.name});
    }
  };

  const renderItem = ({item}) => {
    return (
      <Pressable style={styles.hashtagWrap} key={item} onPress={() => onPress(item)}>
        <Text style={styles.hashtagName}>#{item.name}</Text>
        {item.id === 0 && <Text style={styles.newHashTag}>新话题</Text>}
      </Pressable>
    );
  };

  const renderSeparator = () => {
    return <View style={{height: 1, backgroundColor: '#ebebeb', marginLeft: 14}} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = params.name ? res.data.items : res.data.hashtags;
    setLoading(false);
    setHeaders(res.headers);
    if (params.name && data.length === 0) {
      setListData([{name: params.name, id: 0}]);
    } else {
      setListData(page === 1 ? data : [...listData, ...data]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [props.request]);

  return (
    <ScrollList
      style={styles.wraper}
      data={listData}
      loading={loading}
      headers={headers}
      renderItem={renderItem}
      renderSeparator={renderSeparator}
      itemKey={'name'}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  wraper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  hashtagWrap: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hashtagName: {
    height: 45,
    lineHeight: 45,
    marginLeft: 15,
    color: '#FF8D00',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
  },
  newHashTag: {
    marginLeft: 'auto',
    marginRight: 15,
    fontSize: 13,
    color: '#bdbdbd',
  },
});

export default HashtagList;
