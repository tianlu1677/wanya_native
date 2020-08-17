import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {getUnLoginHotPosts, getRecommendPosts, getFollowedTopics} from '@/api/home_api';
import TabList from '@/components/TabList';
import PostList from '@/components/List/PostList';
import DoubleList from '@/components/List/DoubleList';

const tabData = [
  {
    key: 'recommend',
    title: '推荐',
  },
  {
    key: 'follow',
    title: '关注',
  },
  {
    key: 'lasted',
    title: '最新',
  },
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);
  const [currentKey, setCurrentKey] = useState('recommend');

  const onRefresh = current => {
    loadData(current);
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    let data = [];
    let res = null;
    switch (currentKey) {
      case 'recommend':
        res = await getRecommendPosts({page, per_page: 10});
        setHeaders(res.headers);
        data = res.data.posts;
        break;
      case 'follow':
        res = await getRecommendPosts({page});
        setHeaders(res.headers);
        data = res.data.posts;
        break;
      case 'lasted':
        res = await getRecommendPosts({page});
        setHeaders(res.headers);
        data = res.data.posts;
        break;
    }
    setLoading(false);
    setListData(page === 1 ? data : [...listData, ...data]);
  };

  const tabChange = item => {
    setListData([]);
    setCurrentKey(item.key);
  };

  // didmount update willMount

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [currentKey]);

  return (
    <SafeAreaView style={styles.containter}>
      <TabList data={tabData} tabChange={tabChange} current={currentKey} />

      {/* 推荐 */}
      {currentKey === 'recommend' && (
        <DoubleList data={listData} loading={loading} onRefresh={onRefresh} headers={headers} />
      )}

      {/* 关注 */}
      {currentKey === 'follow' && (
        <PostList data={listData} loading={loading} onRefresh={onRefresh} headers={headers} />
      )}

      {/* 最新 */}
      {currentKey === 'lasted' && (
        <PostList data={listData} loading={loading} onRefresh={onRefresh} headers={headers} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
  },
});

export default Index;
