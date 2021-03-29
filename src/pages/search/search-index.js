import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {debounce} from 'lodash';
import TopicList from '@/components/List/topic-list';
import ArticleList from '@/components/List/article-list';
import NodeList from '@/components/List/node-list';
import DoubleList from '@/components/List/double-list';
import LongVideoList from '@/components/List/long-video-list';
import SpaceList from '@/components/List/space-list';
import HashtagList from '@/components/List/hash-tag-list';
import {Search} from '@/components/NodeComponents';
import TabViewList from '@/components/TabView';
import {searchApi} from '@/api/search_api';
import {SAFE_TOP} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';
import AccountsNormalList from '@/components/List/accounts-normal-list';
import SearchAllList from '@/pages/search/search-all/search-all-list';

export const Type = {
  all: 'all',
  node: 'node_content',
  space: 'space_content',
  hashtag: 'hashtag_content',
  account: 'account_content',
  theory: 'theory_content',
  longTopic: 'long_topic_content',
  article: 'article_content',
  topic: 'topic_content',
};

const SearchIndex = ({navigation, route}) => {
  const [currentKey, setCurrentKey] = useState('all');
  const [searchKey, setSearchKey] = useState(null);
  const [request, setRequest] = useState({
    api: searchApi,
    params: {name: searchKey, type: currentKey},
  });

  const {type} = request.params;

  const AllListPage = () =>
    type === 'all' ? <SearchAllList request={request} onChangeKey={onChangeKey} /> : <View />;

  const TopicListPage = () =>
    type === 'topic' ? (
      <TopicList request={request} enableRefresh={false} dataKey="items" />
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
    type === 'node' ? (
      <NodeList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <View />
    );

  const ShortVideoPage = () =>
    type === 'duanshipin' ? (
      <DoubleList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <View />
    );

  const LongVideoPage = () =>
    type === 'long_video' ? (
      <LongVideoList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <View />
    );

  const SpaceListPage = () =>
    type === 'space' ? (
      <SpaceList request={request} enableRefresh={false} dataKey="items" type="list" />
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
      <AccountsNormalList
        request={request}
        enableRefresh={false}
        dataKey="items"
        itemType="normal"
      />
    ) : (
      <View />
    );

  const onChangeText = text => {
    setSearchKey(text);
    setRequest({api: searchApi, params: {name: text, type: currentKey}});
  };

  const onChangeKey = key => {
    setCurrentKey(key);
    setRequest({api: searchApi, params: {name: searchKey, type: key}});
  };

  return (
    <View style={styles.wrapper}>
      <View style={{height: SAFE_TOP, backgroundColor: '#fff'}} />
      <Search
        inputStyle={{borderRadius: RFValue(19), backgroundColor: '#F2F3F5'}}
        height={RFValue(38)}
        cancelWidth={RFValue(50)}
        textColor="#000"
        placeholderTextColor="#000"
        placeholder="搜索帖子、文章、圈子等内容"
        autoFocus={false}
        onChangeText={debounce(onChangeText, 500)}
        onCancel={() => navigation.goBack()}
      />

      <TabViewList
        bottomLine={true}
        center={false}
        currentKey={currentKey}
        onChange={onChangeKey}
        request={request}
        size="small"
        tabData={[
          {
            key: 'all',
            title: '全部',
            component: AllListPage,
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
            key: 'space',
            title: '场地',
            component: SpaceListPage,
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
