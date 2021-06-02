import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Button} from 'react-native';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import StickTopHeader from '@/components/StickTopHeader';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import ArticleList from '@/components/List/article-list';
import {Avator, PlayScore, BottomModal, TopBack} from '@/components/NodeComponents';
import {
  getAccount,
  getAccountPosts,
  followAccount,
  unfollowAccount,
  getAccountArticles,
} from '@/api/account_api';
import {BarHeight, SCREEN_WIDTH} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';

const HEADER_HEIGHT = Math.ceil((SCREEN_WIDTH * 540) / 750);

const AccountDetail = ({navigation, route}) => {
  const accountId = route.params.accountId;
  const [currentKey, setCurrentKey] = useState('publish');
  const [account, setAccount] = useState({});
  const [showActionSheet, setShowActionSheet] = useState(false);

  const PublishList = () => {
    return (
      <SingleList request={{api: getAccountPosts, params: {id: accountId, type: 'publish'}}} />
    );
  };

  const VideoList = () => {
    return (
      <DoubleList
        request={{api: getAccountPosts, params: {id: accountId, type: 'publish_video'}}}
      />
    );
  };

  const PraiseList = () => {
    return <SingleList request={{api: getAccountPosts, params: {id: accountId, type: 'praise'}}} />;
  };

  const ArticleListPage = () => {
    const params = {id: accountId, type: 'publish'};
    return <ArticleList request={{api: getAccountArticles, params}} />;
  };

  const Header = () => {
    return (
      <>
        <View style={{height: BarHeight, backgroundColor: 'black'}} />
        <TopBack top={BarHeight + RFValue(12)} onReportClick={() => setShowActionSheet(true)} />
      </>
    );
  };

  return (
    <CollapsibleHeader
      tabBarHeight={BarHeight}
      headerHeight={HEADER_HEIGHT + BarHeight}
      currentKey={currentKey}
      onKeyChange={key => setCurrentKey(key)}
      renderTopHeader={<StickTopHeader title={account.nickname} />}
      renderHeader={<Header />}
      tabData={[
        {
          key: 'publish',
          title: '动态',
          component: PublishList,
        },
        {
          key: 'video',
          title: '视频',
          component: VideoList,
        },
        {
          key: 'praise',
          title: '喜欢',
          component: PraiseList,
        },
        {
          key: 'article',
          title: '文章',
          component: ArticleListPage,
        },
      ]}
    />
  );
};

export default AccountDetail;
