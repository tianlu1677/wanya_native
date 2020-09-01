import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getUnLoginHotPosts, getRecommendPosts, getFollowedTopics} from '@/api/home_api';
import TabViewList from '@/components/TabView';
import SingleList from '@/components/List/SingleList';
import DoubleList from '@/components/List/DoubleList';

const Index = () => {
  const navigation = useNavigation();
  const [currentKey, setCurrentKey] = useState('follow');

  const RecommendList = () => {
    return <DoubleList request={{api: getRecommendPosts}} />;
  };

  const FllowList = () => {
    return <SingleList request={{api: getUnLoginHotPosts}} />;
  };

  const LastedList = () => {
    return <SingleList request={{api: getRecommendPosts}} />;
  };

  return (
    <View style={{flex: 1, paddingTop: 100}}>
      <Button title="去上传" onPress={() => navigation.navigate('NewTopic')} />
      <TabViewList
        currentKey={currentKey}
        tabData={[
          {
            key: 'recommend',
            title: '推荐',
            component: RecommendList,
          },
          {
            key: 'follow',
            title: '关注',
            component: FllowList,
          },
          {
            key: 'lasted',
            title: '最新',
            component: LastedList,
          },
        ]}
        onChange={key => setCurrentKey(key)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Index;
