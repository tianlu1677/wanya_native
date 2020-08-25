import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SafeAreaPlus from '../../components/safe_area_plus'
import {getUnLoginHotPosts, getRecommendPosts, getFollowedTopics} from '@/api/home_api';
import TabList from '@/components/TabList';
import PostList from '@/components/List/PostList';
import DoubleList from '@/components/List/DoubleList';
import TabViewList from '@/components/TabView';

const DoubleListPage = () => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const loadData = async (page = 1) => {
    setLoading(true);
    const res = await getRecommendPosts({page});
    const data = res.data.posts;
    setLoading(false);
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return <DoubleList data={listData} loading={loading} onRefresh={loadData} headers={headers} />;
};

const PostListPage = () => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const loadData = async (page = 1) => {
    setLoading(true);
    const res = await getRecommendPosts({page});
    const data = res.data.posts;
    setLoading(false);
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return <PostList data={listData} loading={loading} onRefresh={loadData} headers={headers} />;
};

const LastedListPage = () => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const loadData = async (page = 1) => {
    setLoading(true);
    const res = await getRecommendPosts({page});
    const data = res.data.posts;
    setLoading(false);
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return <PostList data={listData} loading={loading} onRefresh={loadData} headers={headers} />;
};

const Index = () => {
  const [currentKey, setCurrentKey] = useState('follow');

  const onChangeTab = key => {
    setCurrentKey(key);
  };

  return (
    <SafeAreaPlus>
      <TabViewList
        currentKey={currentKey}
        tabData={[
          {
            key: 'recommend',
            title: '推荐',
            component: DoubleListPage,
          },
          {
            key: 'follow',
            title: '关注',
            component: PostListPage,
          },
          {
            key: 'lasted',
            title: '最新',
            component: LastedListPage,
          },
        ]}
        onChange={onChangeTab}
      />
    </SafeAreaPlus>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default Index;
