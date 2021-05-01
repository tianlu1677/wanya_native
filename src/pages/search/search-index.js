import React, {useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {debounce} from 'lodash';
import SearchAllList from '@/pages/search/search-all/search-all-list';
import TheoryList from '@/components/List/theory-list';
import TopicList from '@/components/List/topic-list';
import ArticleList from '@/components/List/article-list';
import NodeList from '@/components/List/node-list';
import DoubleList from '@/components/List/double-list';
import LongVideoList from '@/components/List/long-video-list';
import MovementList from '@/components/List/movement-list';
import SpaceList from '@/components/List/space-list';
import ActivityList from '@/components/List/activity-list';
import ShopStoreList from '@/components/List/shop-store-list';
import ShopBrandList from '@/components/List/shop-brand-list';
import HashtagList from '@/components/List/hash-tag-list';
import AccountsList from '@/components/List/accounts-list';
import {Search} from '@/components/NodeComponents';
import TabView from '@/components/TabView';
import {searchApi} from '@/api/search_api';
import {SAFE_TOP, BarHeight} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';

const SearchIndex = ({navigation, route}) => {
  const [currentKey, setCurrentKey] = useState(route.params?.key || 'all');
  const [searchKey, setSearchKey] = useState(null);
  const [request, setRequest] = useState({
    api: searchApi,
    params: {name: searchKey, type: currentKey},
  });

  const {type} = request.params;

  const AllListPage = () =>
    currentKey === 'all' ? <SearchAllList request={request} onChangeKey={onChangeKey} /> : <View />;

  const TopicListPage = () =>
    type === 'topic' ? (
      <TopicList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <View />
    );

  const TheoryListPage = () =>
    type === 'theory' ? (
      <TheoryList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <View />
    );

  const ArticleListPage = () =>
    type === 'article' ? (
      <ArticleList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <View />
    );

  const NodeListPage = () =>
    type === 'node' ? <NodeList request={request} dataKey="items" type={'list'} /> : <View />;

  const ShortVideoPage = () =>
    type === 'duanshipin' ? (
      <DoubleList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <View />
    );

  const LongVideoPage = () =>
    type === 'long_video' ? (
      <LongVideoList request={request} enableRefresh={false} dataKey="items" type="list" />
    ) : (
      <View />
    );

  const MovementPage = () =>
    type === 'movement' ? (
      <MovementList request={request} enableRefresh={false} dataKey="items" type="list" />
    ) : (
      <View />
    );

  const SpaceListPage = () =>
    type === 'space' ? (
      <SpaceList request={request} enableRefresh={false} dataKey="items" type="list" />
    ) : (
      <View />
    );

  const ActivityListPage = () =>
    type === 'activity' ? (
      <ActivityList request={request} enableRefresh={false} dataKey="items" type="list" />
    ) : (
      <View />
    );

  const ShopStoreListPage = () =>
    type === 'shop_store' ? (
      <ShopStoreList request={request} enableRefresh={false} dataKey="items" type="list" />
    ) : (
      <View />
    );

  const ShopBrandListPage = () =>
    type === 'shop_brand' ? (
      <ShopBrandList request={request} enableRefresh={false} dataKey="items" type="list" />
    ) : (
      <View />
    );

  const HashtagListPage = () =>
    type === 'hashtag' ? (
      <HashtagList request={request} enableRefresh={false} dataKey="items" type="list" />
    ) : (
      <View />
    );

  const AccountListPage = () =>
    type === 'account' ? (
      <AccountsList request={request} dataKey="items" type="search" />
    ) : (
      <View />
    );

  const onChangeText = text => {
    setRequest({api: searchApi, params: {name: text, type: currentKey}});
    setSearchKey(text);
  };

  const onChangeKey = key => {
    setRequest({api: searchApi, params: {name: searchKey, type: key}});
    setCurrentKey(key);
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" />
      <View style={{height: BarHeight, backgroundColor: '#fff'}} />
      <Search
        inputStyle={{borderRadius: RFValue(18), backgroundColor: '#F2F3F5'}}
        height={RFValue(38)}
        textColor="#000"
        placeholderTextColor="#aaa"
        placeholder="搜索顽法、帖子、文章、圈子等内容"
        autoFocus={true}
        onChangeText={debounce(onChangeText, 500)}
        cancel={true}
        cancelWidth={RFValue(50)}
        onCancel={() => navigation.goBack()}
      />
      <TabView
        currentKey={currentKey}
        request={request}
        onChange={onChangeKey}
        type="index"
        align="left"
        textStyle={{color: '#000'}}
        activeLineColor="#000"
        bottomLine={true}
        tabData={[
          {
            key: 'all',
            title: '全部',
            component: AllListPage,
          },
          {
            key: 'theory',
            title: '顽法',
            component: TheoryListPage,
          },
          {
            key: 'topic',
            title: '帖子',
            component: TopicListPage,
          },
          {
            key: 'article',
            title: '文章',
            component: ArticleListPage,
          },
          {
            key: 'node',
            title: '圈子',
            component: NodeListPage,
          },
          {
            key: 'duanshipin',
            title: '短视频',
            component: ShortVideoPage,
          },
          {
            key: 'long_video',
            title: '长视频',
            component: LongVideoPage,
          },
          {
            key: 'movement',
            title: '顽招',
            component: MovementPage,
          },
          {
            key: 'space',
            title: '场地',
            component: SpaceListPage,
          },
          {
            key: 'activity',
            title: '活动',
            component: ActivityListPage,
          },
          {
            key: 'shop_store',
            title: 'Van Store',
            component: ShopStoreListPage,
          },
          {
            key: 'shop_brand',
            title: '品牌',
            component: ShopBrandListPage,
          },
          {
            key: 'hashtag',
            title: '话题',
            component: HashtagListPage,
          },
          {
            key: 'account',
            title: '用户',
            component: AccountListPage,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default SearchIndex;
