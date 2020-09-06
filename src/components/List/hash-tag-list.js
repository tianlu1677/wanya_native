import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
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

  const onPress = (item, index) => {
    if (props.type === 'add-hash-tag') {
      const topics = {
        ...savetopic,
        plan_content: `${savetopic.plan_content} #${item.name}`,
      };
      dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
      navigation.goBack();
    } else {
      navigation.navigate('HashtagDetail', {hashtag: item.name});
    }
  };

  const renderItem = ({item, index}) => {
    console.log(item.name);

    return (
      <TouchableOpacity
        style={styles.hashtagWrap}
        key={item.name}
        onPress={() => onPress(item, index)}>
        <Text style={styles.hashtagName}>#{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => {
    return <View style={{height: 1, backgroundColor: '#ebebeb', marginLeft: 14}} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.hashtags;
    setLoading(false);
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [props.request]);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      headers={headers}
      renderItem={renderItem}
      renderSeparator={renderSeparator}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  hashtagWrap: {
    backgroundColor: 'white',
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
});

export default HashtagList;
