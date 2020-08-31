import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import SafeAreaPlus from '../../components/safe_area_plus';
import {getUnLoginHotPosts, getRecommendPosts, getFollowedTopics} from '@/api/home_api';
import TabViewList from '@/components/TabView';
import SingleList from '@/components/List/SingleList';
import DoubleList from '@/components/List/DoubleList';

const Index = () => {
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
    <SafeAreaPlus>
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
    </SafeAreaPlus>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Index;
