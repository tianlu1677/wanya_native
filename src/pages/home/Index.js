import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, ScrollView, RefreshControl} from 'react-native';
import {getRecommendPosts} from '@/api/home_api';

export const pagination = (headers = {}) => {
  const currentPage = parseInt(headers['x-current-page']);
  const perPage = parseInt(headers['x-per-page'] || headers['X-Page-Items']);
  const total = parseInt(headers['x-total']);
  const hasMore = currentPage * perPage < total;
  const nextPage = hasMore ? currentPage + 1 : currentPage;
  return {hasMore: hasMore, nextPage: nextPage, page: currentPage, total: total};
};

const ScrollList = props => {
  const [pagin, setPagin] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const {data, renderItem, itemKey, headers} = props;

  const startOnRefresh = () => {
    console.log('refresh');
    setRefreshing(true);
    props.onRefresh();
  };

  const onEndReached = () => {
    console.log('onEndReached');
    if (!pagin.hasMore) {
      console.log('加载完毕');
      return;
    }
    props.onRefresh(pagin.nextPage);
  };

  useEffect(() => {
    console.log(headers);
    setRefreshing(false);
    setPagin(pagination(headers));
  }, [headers]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => String(item[itemKey])}
      refreshing={refreshing}
      onRefresh={props.onRefresh ? startOnRefresh : null}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
    />
  );
};

const Index = () => {
  const [headers, setHeaders] = useState();
  const [data, setData] = useState([]);
  const [height, setHeight] = useState(10);
  const [selectedId, setSelectedId] = useState(null);

  const onPress = id => {
    setSelectedId(id);
    console.log(id);
  };

  const renderItem = ({item}) => {
    const defaultUrl = 'https://reactnative.dev/img/tiny_logo.png';
    return (
      <View onPress={() => onPress(item.id)}>
        <Image
          style={{width: 100, height: 200}}
          source={{uri: item.item.single_cover.cover_url || defaultUrl}}
        />
        <Text>{item.item.node_name}</Text>
      </View>
    );
  };

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = current => {
    console.log(current);
    loadData(current);
  };

  const loadData = async (page = 1) => {
    const res = await getRecommendPosts({page, per_page: 4});
    setData(res.data.posts);
    setHeaders(res.headers);
    console.log(res.data.posts);
  };

  useEffect(() => {
    loadData();
  }, []);

  //
  return (
    <View>
      <Text>Pull down to see RefreshControl indicator</Text>
      <ScrollList
        data={data}
        renderItem={renderItem}
        itemKey={'id'}
        onRefresh={onRefresh}
        headers={headers}
      />
      <Text>底部</Text>
    </View>
  );
};

export default Index;
