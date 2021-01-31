import React, {useState, useEffect, useCallback} from 'react';
import {Platform} from 'react-native';
import {throttle} from 'lodash';
import ScrollList, {pagination} from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import {getRecommendPosts, getRecommendTopPosts} from '@/api/home_api';

const RecommendListPost = () => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const onRemove = index => {
    const data = JSON.parse(JSON.stringify(listData));
    data.splice(index, 1);
    setListData([...data]);
  };

  const RenderItem = React.memo(({item, index}) =>
    item.item_type === 'Topic' ? (
      <BaseTopic data={item.item} onRemove={() => onRemove(index)} />
    ) : (
      <BaseArticle data={item.item} />
    )
  );

  const renderItemMemo = useCallback(itemProps => <RenderItem {...itemProps} />, [listData]);

  const onChangeListDataText = data => {
    const changeData = data.map(v => {
      const newItem = {...v.item, published_at_text: '发布了'};
      const item = {...v, item: newItem};
      return item;
    });
    return changeData;
  };

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    // 加载置顶
    let top_posts_res = await getRecommendTopPosts();
    let topItemList = top_posts_res.data.posts;
    const res = await getRecommendPosts({page});
    let itemList =
      page === 1 ? [...topItemList, ...res.data.posts] : [...listData, ...res.data.posts];
    itemList = itemList.concat(topItemList);
    itemList = onChangeListDataText(itemList);
    setListData(itemList);
    setLoading(false);
    setHeaders(res.headers);
  };

  const indexLoadData = async (page = 1) => {
    let itemList = [];
    const res = await getRecommendPosts({page});
    itemList = itemList.concat(res.data.posts);
    setListData(itemList);
    setLoading(false);
    setHeaders(res.headers);
  };

  const onRefresh = (page = 1) => {
    if (page === 1 || !page) {
      indexLoadData(pagination(headers).nextPage);
    } else {
      loadData(page);
    }
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
      initialNumToRender={6}
      onEndReachedThreshold={0.25}
      windowSize={Platform.OS === 'ios' ? 8 : 20}
    />
  );
};

export default RecommendListPost;
