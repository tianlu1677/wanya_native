import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import TabViewList from '@/components/TabView';

const HashtagDetail = ({navigation, route}) => {
  const [hashtag, setHashtag] = useState('');
  const [currentKey, setCurrentKey] = useState('published_order');
  const dispatch = useDispatch();
  const rightLogo =
    'http://file.meirixinxue.com/assets/2020/77963058-7b42-46ea-bc6b-f969e81bbdfd.png';
  const bgLogo = 'http://file.meirixinxue.com/assets/2020/ef47c0d6-39c2-4e99-988d-86332a12449e.jpg';

  useLayoutEffect(() => {
    let hashtag = route.params.hashtag;
    hashtag = decodeURIComponent(hashtag).replace('#', '');
    setHashtag(hashtag);
    navigation.setOptions({
      // headerBackTitleVisible: false,
      // headerTintColor: 'white',
      title: hashtag,
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <HeadView>
        <BgCoverImage source={{uri: bgLogo}} />
        <RightCoverImage source={{uri: rightLogo}} />
        <HashtagText># {hashtag}</HashtagText>
      </HeadView>


      <TabViewList
        currentKey={currentKey}
        tabData={[
          {
            key: 'published_order',
            title: '最新',
            component: (<View>1最新</View>),
          },
          {
            key: 'hot_order',
            title: '帖子',
            component: (<View>热门</View>),
          },

        ]}
        onChange={key => setCurrentKey(key)}
      />
    </SafeAreaView>
  );
};

const HeadView = styled(View)`
  position: relative;
  height: 137px;
`;
const BgCoverImage = styled(Image)`
  height: 137px;
  position: absolute;
  left: 0;
  top: 0;
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
  top: 25px;
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
