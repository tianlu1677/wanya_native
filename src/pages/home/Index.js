import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {getRecommendPosts} from '@/api/home_api';
import ScrollList from '@/components/ScrollList';

const Index = () => {
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);
  const [height, setHeight] = useState(10);
  const [selectedId, setSelectedId] = useState(null);

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

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.containter}>
      <Text>top</Text>
      <ScrollList
        data={listData}
        renderItem={renderItem}
        itemKey={'id'}
        onRefresh={onRefresh}
        headers={headers}
        style={[styles.containter, styles.pageContainter]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1
  }
});

export default Index;
