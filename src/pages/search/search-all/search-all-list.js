import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ScrollList from '@/components/ScrollList';
import {
  NodeItemContent,
  SpaceItemContent,
  HashtagItemContent,
  AccountItemContent,
  TheoryItemContent,
  LongVideoTopicItemContent,
  ArticleItemContent,
  TopicItemContent,
} from '@/pages/search/search-all/all-item';

import AllItem from '@/pages/search/search-all/all-item';

export const Type = {
  node: 'node_content',
  space: 'space_content',
  hashtag: 'hashtag_content',
  account: 'account_content',
  theory: 'theory_content',
  longTopic: 'long_topic_content',
  article: 'article_content',
  topic: 'topic_content',
};

const SearchAllList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item, index}) => {
    const itemProps = {type: item.type, data: item.data};

    switch (item.type) {
      case Type.node:
        return <AllItem {...itemProps} key="node" title="圈子" />;
      case Type.space:
        return <AllItem {...itemProps} key="space" title="圈子" />;
      case Type.hashtag:
        return <AllItem {...itemProps} key="node" title="圈子" />;
      case Type.account:
        return <AllItem {...itemProps} key="node" title="圈子" />;
      case Type.theory:
        return <AllItem {...itemProps} key="node" title="圈子" />;
      case Type.longTopic:
        return <AllItem {...itemProps} key="node" title="圈子" />;
      case Type.article:
        return <AllItem {...itemProps} key="node" title="圈子" />;
      case Type.topic:
        return <AllItem {...itemProps} key="node" title="圈子" />;
      default:
        return <View />;
    }
  };

  const loadData = async () => {
    const {api, params} = props.request;
    const res = await api({...params, name: '板', page: 1});
    const filterData = Object.entries(res.data).filter(data => data[1].items.length > 0);
    const newData = filterData.map((item, index) => {
      return {id: index, type: item[0], data: item[1]};
    });

    setListData(newData);
    setHeaders(res.headers);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [props.request]);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollList
        data={listData}
        loading={loading}
        headers={headers}
        renderItem={renderItem}
        enableRefresh={false}
        enableLoadMore={false}
        scrollIndicatorInsets={0}
      />
    </View>
  );
};

export default SearchAllList;
