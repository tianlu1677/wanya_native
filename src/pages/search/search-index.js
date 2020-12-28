import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {debounce} from 'lodash';
import TopicList from '@/components/List/topic-list';
import ArticleList from '@/components/List/article-list';
import NodeList from '@/components/List/node-list';
import DoubleList from '@/components/List/double-list';
import SpaceList from '@/components/List/space-list';
import HashtagList from '@/components/List/hash-tag-list';
import {AccountList} from '@/components/List/account-list';
import {Search} from '@/components/NodeComponents';
import TabViewList from '@/components/TabView';
import TabList from '@/components/TabList';

import {searchApi} from '@/api/search_api';
import {BOTTOM_HEIGHT, IsIos} from '@/utils/navbar';

const topHeader = IsIos ? (BOTTOM_HEIGHT > 20 ? BOTTOM_HEIGHT : 10) : 0;

const SearchIndex = ({navigation, route}) => {
  const [inputRef, setinputRef] = useState(null);
  const [currentKey, setCurrentKey] = useState('topic');
  const [searchKey, setSearchKey] = useState(null); //'考拉'
  const [request, setRequest] = useState({
    api: searchApi,
    params: {name: searchKey, type: currentKey},
  });

  const TopicListPage = () => <TopicList request={request} enableRefresh={false} dataKey="items" />;

  const ArticleListPage = () => (
    <ArticleList request={request} enableRefresh={false} dataKey="items" />
  );

  const NodeListPage = () => <NodeList request={request} enableRefresh={false} dataKey="items" />;

  const ShortVideoPage = () => (
    <DoubleList request={request} enableRefresh={false} dataKey="items" />
  );

  const SpaceListPage = () => <SpaceList request={request} enableRefresh={false} dataKey="items" />;

  const HashtagListPage = () => (
    <HashtagList request={request} enableRefresh={false} dataKey="items" />
  );

  const AccountListPage = () => (
    <AccountList request={request} enableRefresh={false} dataKey="items" />
  );

  const onChangeText = text => {
    setSearchKey(text);
    // setRequest({api: searchApi, params: {name: text, type: currentKey}});
  };

  const onChangeKey = key => {
    setCurrentKey(key);
    // setRequest({api: searchApi, params: {name: searchKey, type: key}});
  };

  const tabChange = item => {
    setCurrentKey(item.key);
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    setRequest({api: searchApi, params: {name: searchKey, type: currentKey}});
  }, [searchKey, currentKey]);

  const tabData = [
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
  ];

  return (
    <View style={styles.wrapper}>
      <View style={{height: topHeader, backgroundColor: '#fff'}} />
      <Search
        getRef={refs => setinputRef(refs)}
        inputStyle={{borderRadius: 18, backgroundColor: '#F2F3F5'}}
        height={36}
        cancelWidth={50}
        textColor="#000"
        placeholderTextColor="#000"
        placeholder="搜索帖子、文章、圈子等内容"
        onChangeText={debounce(onChangeText, 700)}
        onCancel={() => navigation.goBack()}
      />

      <TabList
        data={tabData}
        current={currentKey}
        tabChange={tabChange}
        bottomLine={true}
        center={false}
      />

      {currentKey === 'topic' && <TopicListPage />}
      {currentKey === 'article' && <ArticleListPage />}
      {currentKey === 'node' && <NodeListPage />}
      {currentKey === 'duanshipin' && <ShortVideoPage />}
      {currentKey === 'space' && <SpaceListPage />}
      {currentKey === 'hashtag' && <HashtagListPage />}
      {currentKey === 'account' && <AccountListPage />}

      {/* <TabViewList
        bottomLine={true}
        center={false}
        currentKey={currentKey}
        onChange={onChangeKey}
        request={request}
        tabData={[
          {
            key: 'topic',
            title: '帖子',
            component: TopicListPage,
          },
          // {
          //   key: 'article',
          //   title: '文章',
          //   component: ArticleListPage,
          // },
          // {
          //   key: 'node',
          //   title: '圈子',
          //   component: NodeListPage,
          // },
          // {
          //   key: 'space',
          //   title: '场地',
          //   component: SpaceListPage,
          // },
          // {
          //   key: 'hashtag',
          //   title: '话题',
          //   component: HashtagListPage,
          // },
          {
            key: 'account',
            title: '用户',
            component: AccountListPage,
          },
        ]}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default SearchIndex;
