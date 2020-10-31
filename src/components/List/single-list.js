import React, {useState, useEffect, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import {View, FlatList, RefreshControl} from 'react-native';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';

const SingleList = props => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    // console.log('ite', item.id);
    if (item.item_type === 'Topic') {
      return <BaseTopic data={item.item} />;
    } else if (item.item_type === 'Article') {
      return <BaseArticle data={item.item} />;
    }
  };

  const renderItemMemo = useCallback(
    ({item}) =>
      item.item_type === 'Topic' ? (
        <BaseTopic data={item.item} />
      ) : (
        <BaseArticle data={item.item} />
      ),
    []
  );

  const loadData = async (page = 1) => {
    // console.log('loadding', loading);
    setLoading(true);

    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.posts;
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
    setHeaders(res.headers);
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
      renderItem={renderItemMemo}
      style={{backgroundColor: '#FAFAFA'}}
      settings={{initialNumToRender: 6}}
      {...props}
    />
  );
};

// List 属性继承scrollList 默认可下拉加载刷新
SingleList.propTypes = {
  request: PropTypes.object.isRequired, //获取数据请求 {api: api, id: 1, params:params}
  dataKey: PropTypes.string, // single-list 默认posts
};

export default SingleList;
