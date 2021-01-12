import React, {useState, useEffect, useCallback} from 'react';
import {Platform} from 'react-native';
// import PropTypes from 'prop-types';
import {throttle} from 'lodash';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import {getNearbyPosts} from '@/api/home_api';

const NearByListPost = props => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const onRemove = index => {
    const data = JSON.parse(JSON.stringify(listData));
    data.splice(index, 1);
    setListData([...data]);
  };

  const RenderItem = React.memo(({item, index}) => {
    const ItemComponent = () =>
      item.item_type === 'Topic' ? (
        <BaseTopic data={item.item} onRemove={() => onRemove(index)} />
      ) : (
        <BaseArticle data={item.item} />
      );

    if (index === 0) {
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

  const renderItemMemo = useCallback(({item, index}) => <RenderItem item={item} index={index} />, [
    listData,
  ]);

  const onRefresh = (page = 1) => {
    loadData(page);
  };

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.posts;
    setListData(data);
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

export default NearByListPost;
