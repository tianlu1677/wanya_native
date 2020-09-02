import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ScrollList from '@/components/ScrollList';
import { useNavigation } from '@react-navigation/native';

const HashtagList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const navigation = useNavigation()

  const renderItem = ({item}) => {
    return (
      <View style={styles.hashtagWrap} key={item.name} onClick={() => {}}>
        <Text style={styles.hashtagName}>#{item.name}</Text>
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={{height: 1, backgroundColor: '#ebebeb', marginLeft: 14}} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.spaces;
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
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      renderSeparator={renderSeparator}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  //底部默认样式
  hashtagWrap: {
    backgroundColor: 'white',
  },
  hashtagName: {
    height: 45,
    lineHeight: 45,
    marginLeft: 15,
    color: '#FF8D00',
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: 1,
  },
});

export default HashtagList;
