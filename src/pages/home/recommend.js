import React, {useState} from 'react';
import {
  getUnLoginHotPosts,
  getRecommendPosts,
  getFollowedTopics,
  getRecommendVideoListPosts,
  getRecommendLatestPosts,
} from '@/api/home_api';
import TabViewList from '@/components/TabView';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';

const Recommend = props => {
  const [currentKey, setCurrentKey] = useState('recommend');

  const RecommendList = () => {
    return <DoubleList request={{api: getUnLoginHotPosts}} />;
  };

  const FollowList = () => {
    return <SingleList request={{api: getRecommendPosts}} />;
  };

  const LastedList = () => {
    return <SingleList request={{api: getRecommendLatestPosts}} />;
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

export default Recommend;
