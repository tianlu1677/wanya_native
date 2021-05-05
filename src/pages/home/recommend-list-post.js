import React, {useState, useEffect, useCallback} from 'react';
import {View, Platform} from 'react-native';
import {throttle} from 'lodash';
import {TransFormType} from '@/utils';
import ScrollList, {pagination} from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import BaseTheory from '@/components/Item/base-theory';
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

  const RenderItem = React.memo(({item, index}) => {
    const data = {...item.item, published_at_text: `发布了${TransFormType(item.item)}`};
    switch (item.item_type) {
      case 'Topic':
        return <BaseTopic data={data} onRemove={() => onRemove(index)} />;
      case 'Article':
        return <BaseArticle data={data} />;
      case 'Theory':
        return <BaseTheory data={data} onRemove={() => onRemove(index)} />;
      default:
        return <View />;
    }
  });

  const renderItemMemo = useCallback(itemProps => <RenderItem {...itemProps} />, [listData]);

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
      renderSeparator={() => <View style={{backgroundColor: '#fff', height: 5}} />}
    />
  );
};

export default RecommendListPost;
