import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {getRecommendPosts} from '@/api/home_api';
import ScrollList from '@/components/ScrollList';
import TabList from '@/components/TabList';

const tabData = [
  {
    key: 'recommend',
    value: '推荐',
  },
  {
    key: 'follow',
    value: '关注',
  },
  {
    key: 'lasted',
    value: '最新',
  },
];

const Index = () => {
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);
  const [height, setHeight] = useState(10);
  const [selectedId, setSelectedId] = useState(null);
  const [currentKey, setCurrentKey] = useState('follow');

  const onPress = id => {
    setSelectedId(id);
  };

  const renderItem = ({item}) => {
    const defaultUrl = 'https://reactnative.dev/img/tiny_logo.png';
    return (
      <View onPress={() => onPress(item.id)} style={styles.slide}>
        <Image
          style={{width: 100, height: 200}}
          source={{uri: item.item.single_cover.cover_url || defaultUrl}}
        />
        <Text>{item.item.node_name}</Text>
      </View>
    );
  };

  const onRefresh = current => {
    loadData(current);
  };

  const loadData = async (page = 1) => {
    const res = await getRecommendPosts({page, per_page: 4});
    const data = page === 1 ? res.data.posts : [...listData, ...res.data.posts];
    setListData(data);
    setHeaders(res.headers);
  };

  const tabChange = item => {
    console.log(item);
    setCurrentKey(item.key);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.containter}>
      <TabList data={tabData} tabChange={tabChange} />

      {/* 推荐 */}
      {currentKey === 'recommend' && <Text>推荐</Text>}

      {/* 关注 */}
      {currentKey === 'follow' && (
        <ScrollList
          data={listData}
          renderItem={renderItem}
          itemKey={'id'}
          onRefresh={onRefresh}
          headers={headers}
          style={[styles.containter, styles.pageContainter]}
        />
      )}

      {/* 最新 */}
      {currentKey === 'lasted' && <Text>最新</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
  },
});

export default Index;
