import React, {useState, useEffect, useCallback} from 'react';
import {Platform} from 'react-native';
import PropTypes from 'prop-types';
import {throttle} from 'lodash';
import ScrollList, {pagination} from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import {getRecommendTopPosts} from '@/api/home_api';

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
    const ItemComponent = () =>
      item.item_type === 'Topic' ? (
        <BaseTopic data={item.item} onRemove={() => onRemove(index)} />
      ) : (
        <BaseArticle data={item.item} />
      );

    if (props.type === 'follow' && index === 0) {
      return (
        <>
          {props.shareComponent()}
          <ItemComponent />
          {props.insertComponent()}
        </>
      );
    }

    return <ItemComponent />;
  });

  const onChangeListDataText = data => {
    // 发布文案修改
    return props.type === 'recommend'
      ? data.map(v => {
          const item = {
            ...v,
            item: {
              ...v.item,
              published_at_text: '发布了',
            },
          };
          return item;
        })
      : data;
  };

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.posts;
    const transdata = page === 1 ? data : [...listData, ...data];
    setListData(onChangeListDataText(transdata));
    setLoading(false);
    setHeaders(res.headers);
  };

  //首页推荐
  const indexLoadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    let itemList = [];
    // 加载首页置顶的
    let top_posts_res = await getRecommendTopPosts();
    itemList = top_posts_res.data.posts;
    itemList = itemList.map(item => ({...item, is_top: true}));
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.posts;
    itemList = itemList.concat(data);
    setListData(onChangeListDataText(itemList));
    setHeaders(res.headers);
    setLoading(false);
  };

  const onRefresh = (page = 1) => {
    if (props.type === 'recommend' && (page === 1 || !page)) {
      indexLoadData(pagination(headers).nextPage);
    } else {
      loadData(page);
    }
  };

  useEffect(() => {
    if (props.type === 'recommend') {
      indexLoadData(1);
    } else {
      loadData();
    }
  }, []);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={throttle(onRefresh, 300)}
      headers={headers}
      renderItem={renderItemMemo}
      style={{
        backgroundColor: '#FAFAFA',
        flex: listData.length === 0 && props.renderEmpty ? 1 : 0,
      }}
      settings={{
        initialNumToRender: 6,
        onEndReachedThreshold: 0.25,
        windowSize: Platform.OS === 'ios' ? 8 : 20,
      }}
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
