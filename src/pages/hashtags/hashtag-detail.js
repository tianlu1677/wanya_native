import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import TabViewList from '@/components/TabView';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';

import {getHashtagPosts} from '@/api/hashtag_api';
import {GoBack, JoinActivity} from '@/components/NodeComponents';
import {NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT} from '@/utils/navbar';
import * as action from '@/redux/constants';

const rightLogo =
  'http://file.meirixinxue.com/assets/2020/77963058-7b42-46ea-bc6b-f969e81bbdfd.png';
const bgLogo = 'http://file.meirixinxue.com/assets/2020/ef47c0d6-39c2-4e99-988d-86332a12449e.jpg';

const HashtagDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [hashtag] = useState(route.params.hashtag);
  const [currentKey, setCurrentKey] = useState('published_order');

  const PublishList = () => {
    const request = {
      api: getHashtagPosts,
      params: {hashtag: '滑板', hashtag_name: '滑板', type: 'published_order'},
    };
    return <SingleList request={request} />;
  };

  const HotList = () => {
    const request = {
      api: getHashtagPosts,
      params: {hashtag: '滑板', hashtag_name: '滑板', type: 'hot_order'},
    };
    return <DoubleList request={request} />;
  };

  const joinNewTopic = () => {
    const topics = {
      plan_content: route.params.hashtag,
    };
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.navigate('NewTopic');
  };

  return (
    <View style={{flex: 1}}>
      <GoBack />
      <HeadView>
        <BgCoverImage source={{uri: bgLogo}} />
        <RightCoverImage source={{uri: rightLogo}} style={{top: STATUS_BAR_HEIGHT + 5}} />
        <HashtagText style={{top: NAV_BAR_HEIGHT + 15}}># {hashtag}</HashtagText>
      </HeadView>
      <TabViewList
        currentKey={currentKey}
        separator={true}
        tabData={[
          {
            key: 'published_order',
            title: '最新',
            component: PublishList,
          },
          {
            key: 'hot_order',
            title: '热门',
            component: HotList,
          },
        ]}
        onChange={key => setCurrentKey(key)}
      />
      <JoinActivity type={'node'} text={'参与话题'} handleClick={joinNewTopic} />
    </View>
  );
};

const HeadView = styled(View)`
  position: relative;
  height: 137px;
  background-color: #ff8d00;
`;
const BgCoverImage = styled(Image)`
  height: 137px;
  position: absolute;
  left: 0;
  right: 0;
`;

const RightCoverImage = styled(Image)`
  height: 60px;
  width: 60px;
  position: absolute;
  right: 0;
  top: 0;
`;

const HashtagText = styled(Text)`
  position: absolute;

  left: 0;
  right: 0;
  margin-left: 15px;
  margin-right: 90px;
  font-size: 25px;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 1px;
  z-index: 100;
`;

export default HashtagDetail;
