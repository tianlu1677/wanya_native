import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import { Platform } from 'react-native';
const SingleList = props => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const onRemove = index => {
    const data = JSON.parse(JSON.stringify(listData));
    data.splice(index, 1);
    setListData([...data]);
  };

  const renderItemMemo = useCallback(({item, index}) => <Child item={item} index={index} />, [
    listData,
  ]);

  const Child = React.memo(({item, index}) => {
    return item.item_type === 'Topic' ? (
      <BaseTopic data={item.item} onRemove={() => onRemove(index)} />
    ) : (
      <BaseArticle data={item.item} />
    );
  });

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
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
      style={{
        backgroundColor: '#FAFAFA',
        flex: listData.length === 0 && props.renderEmpty ? 1 : 0,
      }}
      settings={{initialNumToRender: 6, onEndReachedThreshold: 0.25, windowSize: Platform.OS === 'ios' ? 8 : 20}}
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
