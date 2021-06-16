import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {throttle} from 'lodash';
import {TransFormType} from '@/utils';
import ScrollList from '@/components/ScrollList';
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
    return useMemo(() => {
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
    }, [item.id]);
  });

  const renderItemMemo = useCallback(itemProps => <RenderItem {...itemProps} />, [listData]);

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    if (page === 1) {
      // 加载置顶
      const topItemList = (await getRecommendTopPosts()).data.posts;
      const res = await getRecommendPosts({page});
      const data = JSON.parse(JSON.stringify(topItemList.concat(res.data.posts)));
      setListData(data);
      setHeaders(res.headers);
    } else {
      const newData = JSON.parse(JSON.stringify(listData));
      const res = await getRecommendPosts({page});
      setListData([...newData, ...res.data.posts]);
      setHeaders(res.headers);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollList
      keyExtractor={useCallback(item => `${item.id}${item.item_type}`, [])}
      data={listData}
      loading={loading}
      onRefresh={throttle(loadData, 300)}
      headers={headers}
      renderItem={renderItemMemo}
      initialNumToRender={6}
      onEndReachedThreshold={0.25}
      windowSize={Platform.OS === 'ios' ? 8 : 20}
      renderSeparator={() => <View style={styles.speator} />}
    />
  );
};

const styles = StyleSheet.create({
  speator: {
    backgroundColor: '#ebebeb',
    height: StyleSheet.hairlineWidth,
    marginLeft: 14,
  },
});

export default RecommendListPost;
