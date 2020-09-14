import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {getUnLoginHotPosts, getRecommendPosts, getRecommendLatestPosts} from '@/api/home_api';
import TabViewList from '@/components/TabView';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import IconFont from '@/iconfont';
import {STATUS_BAR_HEIGHT} from '@/utils/navbar';

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
    <View style={styles.wrapper}>
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
      <TouchableOpacity
        onPress={() => props.navigation.navigate('NotifyIndex')}
        style={styles.message}>
        <IconFont name="notice" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: 'white',
  },
  message: {
    position: 'absolute',
    right: 16,
    zIndex: 2,
    top: 15 + STATUS_BAR_HEIGHT,
  },
});

export default Recommend;
