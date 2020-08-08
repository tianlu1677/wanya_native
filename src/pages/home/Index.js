import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {getRecommendPosts} from '@/api/home_api';

const Index = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await getRecommendPosts();
    console.log(res.posts);
    setData(res.posts);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      {data.map(v => {
        const {item} = v;
        return (
          <View>
            <Image source={item.cover_url} />
            <Text key={v.id}>{item.node_name}</Text>
          </View>
        );
      })}
    </View>
  );
};

Index.navigationOptions = {
  headerTitle: 'Noticias en 111'
};

export default Index;
