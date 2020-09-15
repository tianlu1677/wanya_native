import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';

const SingleList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    if (item.item_type === 'Topic') {
      return <BaseTopic data={item.item} />;
    } else if (item.item_type === 'Article') {
      return <BaseArticle data={item.item} />;
    }
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.posts;
    console.log(data);

    setLoading(false);
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
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
      renderItem={renderItem}
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
