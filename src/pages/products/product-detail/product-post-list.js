import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollList} from '@/components';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import BaseTheory from '@/components/Item/base-theory';
import {getPosts} from '@/api/movement_api';

const ProductPostList = props => {
  const productId = props.route.params.productId;

  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const onRemove = index => {
    const data = JSON.parse(JSON.stringify(listData));
    data.splice(index, 1);
    setListData([...data]);
  };

  const ItemMemo = React.memo(({item, index}) => {
    switch (item.item_type) {
      case 'Topic':
        return <BaseTopic data={item.item} onRemove={() => onRemove(index)} />;
      case 'Article':
        return <BaseArticle data={item.item} />;
      case 'Theory':
        return <BaseTheory data={item.item} onRemove={() => onRemove(index)} />;
      default:
        return <View />;
    }
  });

  const RenderItemMemo = useCallback(({item, index}) => <ItemMemo item={item} index={index} />, []);

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const apiPath = `q[item_type_eq]=Topic&q[item_of_Topic_type_products_id_eq]=${productId}`;
    const params = {item_id: productId, item_type: 'Product', page};
    const res = await getPosts(params, apiPath);
    const data = res.data.posts;
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
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
      renderItem={RenderItemMemo}
      enableRefresh={false}
      renderSeparator={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  separator: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 49,
  },
});

export default ProductPostList;
