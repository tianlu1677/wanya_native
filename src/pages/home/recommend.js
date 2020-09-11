import React, {useState} from 'react';
import {
  getUnLoginHotPosts,
  getRecommendPosts,
  getFollowedTopics,
  getRecommendVideoListPosts,
  getRecommendLatestPosts,
} from '@/api/home_api';
import {View} from 'react-native';
import TabViewList from '@/components/TabView';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Recommend = props => {
  const insets = useSafeAreaInsets();
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

  // console.log('insets', insets)
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'red', paddingTop: Math.max(insets.bottom, 20)}} edges={['right', 'left']} mode="padding"  >
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
    </SafeAreaView>
  );
};

export default Recommend;
