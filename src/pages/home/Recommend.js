import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {getUnLoginHotPosts, getRecommendPosts, getFollowedTopics} from '@/api/home_api';
import TabViewList from '@/components/TabView';
import PostList from '@/components/List/PostList';
import DoubleList from '@/components/List/DoubleList';

const Recommend = props => {
  const [currentKey, setCurrentKey] = useState('follow');

  const RecommendList = () => {
    return <DoubleList request={{api: getRecommendPosts}} />;
  };

  const FollowList = () => {
    return <PostList request={{api: getRecommendPosts}} />;
  };

  const LastedList = () => {
    return <PostList request={{api: getRecommendPosts}} />;
  };

  return (
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
          component: FollowList,
        },
        {
          key: 'lasted',
          title: '最新',
          component: LastedList,
        },
      ]}
      onChange={key => setCurrentKey(key)}
    />
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Recommend;
