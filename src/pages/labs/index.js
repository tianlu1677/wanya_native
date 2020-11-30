import React, {useState, useEffect} from 'react';
import TabViewList from '@/components/TabView';
import {getFollowedPosts} from '@/api/home_api';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import ScrollList from './ScrollList';

export const SingleList = props => {
  const [loading, setLoading] = useState(true);
  // const [headers, setHeaders] = useState({'x-current-page': 1});
  const [headers, setHeaders] = useState(null);
  const [listData, setListData] = useState([]);

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.posts;
    setListData(page === 1 ? data : [...listData, ...data]);
    setHeaders(res.headers);
    setLoading(false);
  };

  const RenderItem = ({item}) => {
    if (item.id === 955) {
      console.log(item.id);
    }
    if (item.item_type === 'Topic') {
      return <BaseTopic data={item.item} />;
    } else if (item.item_type === 'Article') {
      return <BaseArticle data={item.item} />;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={RenderItem}
      // enableRefresh={false}
    />
  );
};

export const Recommend = () => {
  const [currentKey, setCurrentKey] = useState('recommend');

  const RecommendList = () => {
    return <SingleList request={{api: getFollowedPosts}} />;
  };

  return (
    <TabViewList
      size="big"
      lazy={true}
      currentKey={currentKey}
      tabData={[
        {
          key: 'recommend',
          title: '推荐',
          component: RecommendList,
        },
      ]}
      onChange={key => setCurrentKey(key)}
    />
  );
};

export default Recommend;
