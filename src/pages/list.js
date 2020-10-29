/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import {getFollowedPosts} from '@/api/home_api';

const pagination = (headers = {}) => {
  const currentPage = Number(headers['x-current-page']);
  const perPage = Number(headers['x-per-page'] || headers['X-Page-Items']);
  const total = Number(headers['x-total']);
  const hasMore = currentPage * perPage < total;
  const nextPage = hasMore ? currentPage + 1 : currentPage;
  return {hasMore: hasMore, nextPage: nextPage, page: currentPage, total: total};
};

const list = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagin, setPagin] = useState(null); //{hasMore: true, nextPage: 2, page: 1, total: 643}

  const loadData = async (page = 1) => {
    setLoading(true);
    const res = await getFollowedPosts({page});
    setPagin(pagination(res.headers));
    page === 1 ? setdata(res.data.posts) : setdata([...data, ...res.data.posts]);
    setLoading(false);
  };

  const renderItem = ({item, index}) => {
    if (item.id === 895) {
      console.log(item);
    }
    return (
      <View style={styles.item}>
        <Text>
          {item.id}——{item.item.node_name} 第{index + 1}个
        </Text>
      </View>
    );
  };

  const ItemSeparatorComponent = () => {
    return <View style={{height: 10, backgroundColor: '#F5DEB3'}} />;
  };

  const ListFooterComponent = () => {
    let footer = null;

    if (!pagin) {
      footer = null;
    }

    if (pagin && pagin.hasMore) {
      footer = (
        <View style={styles.footer}>
          <ActivityIndicator
            size={'small'}
            animating={true}
            color={'#000'}
            style={{marginBottom: 5}}
          />
          <Text>正在加载更多</Text>
        </View>
      );
    }

    if (pagin && !pagin.hasMore) {
      return <Text>加载到底了</Text>;
    }

    return footer;
  };

  const onEndReachedloadData = () => {
    if (!pagin.hasMore) {
      console.log('加载到底了');
      return;
    }
    loadData(pagin.nextPage);
  };

  useEffect(() => {
    loadData();
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // useEffect(() => {
  //   console.log(loading);
  // }, [loading]);

  const FlatListMemo = useMemo(() => {
    return (
      <View style={{flex: 1, backgroundColor: 'pink'}}>
        <FlatList
          horizontal={false}
          data={data}
          extraData={loading}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={ListFooterComponent}
          onEndReached={onEndReachedloadData}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              title={'loading'}
              colors={'#000'}
              refreshing={loading}
              onRefresh={loadData}
              progressViewOffset={100}
            />
          }
        />
      </View>
    );
  }, [loading]);

  return FlatListMemo;
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#B0E0E6',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});
export default list;
