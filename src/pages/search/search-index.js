import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import IconFont from '@/iconfont';
import TopicList from '@/components/List/topic-list';
import ArticleList from '@/components/List/article-list';
import NodeList from '@/components/List/node-list';
import SpaceList from '@/components/List/space-list';
import HashtagList from '@/components/List/hash-tag-list';
import {AccountList} from '@/components/List/account-list';

import TabViewList from '@/components/TabView';
import {searchApi} from '@/api/search_api';

const SearchIndex = ({navigation, route}) => {
  const [currentKey, setCurrentKey] = useState('topic');
  const [searchKey, setSearchKey] = useState(null);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (searchKey) {
      setRequest({api: searchApi, params: {name: searchKey, type: currentKey}});
    }
  }, [searchKey, currentKey]);

  const RenderIntro = () => {
    return <Text style={{backgroundColor: 'pink', height: 100}}>顽鸦介绍</Text>;
  };

  const TopicListPage = () =>
    request ? (
      <TopicList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <RenderIntro />
    );

  const ArticleListPage = () =>
    request ? (
      <ArticleList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <RenderIntro />
    );

  const NodeListPage = () =>
    request ? (
      <NodeList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <RenderIntro />
    );

  const SpaceListPage = () =>
    request ? (
      <SpaceList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <RenderIntro />
    );

  const HashtagListPage = () =>
    request ? (
      <HashtagList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <RenderIntro />
    );

  const AccountListPage = () =>
    request ? (
      <AccountList request={request} enableRefresh={false} dataKey="items" />
    ) : (
      <RenderIntro />
    );

  return (
    <View style={styles.wrapper}>
      <View style={{height: 50, backgroundColor: 'black'}} />
      <View style={styles.searchWrapper}>
        <View style={styles.inputContent}>
          <IconFont name="sousuo" size={12} color={'#000'} style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="搜索帖子、文章、圈子等内容"
            onChangeText={text => setSearchKey(text)}
            selectionColor={'#ff193a'}
            clearButtonMode={'always'}
            textAlign={'left'}
            returnKeyType={'search'}
          />
        </View>
        <Text style={styles.cancel} onPress={() => navigation.goBack()}>
          取消
        </Text>
      </View>
      {/* {request && ( */}
      <View style={styles.content}>
        <TabViewList
          bottomLine={true}
          center={false}
          currentKey={currentKey}
          onChange={key => setCurrentKey(key)}
          request={request}
          tabData={[
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
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchWrapper: {
    paddingLeft: 14,
    flexDirection: 'row',
  },
  inputContent: {
    height: 36,
    flex: 1,
    position: 'relative',
  },
  textInput: {
    padding: 0,
    fontSize: 13,
    backgroundColor: '#F2F3F5',
    color: '#000',
    height: 36,
    borderRadius: 37,
    paddingLeft: 33,
  },
  icon: {
    width: 30,
    zIndex: 2,
    position: 'absolute',
    top: '50%',
    marginTop: -6,
    left: 14,
    fontSize: 10,
  },
  cancel: {
    width: 48,
    lineHeight: 36,
    textAlign: 'center',
    fontSize: 15,
    color: '#bdbdbd',
  },
  content: {
    flex: 1,
  },
});

export default SearchIndex;
