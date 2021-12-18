import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import {BaseSpace, BaseMovement, BaseShopStore, BaseShopBrand, BaseProduct} from './related-item';

const RelatedList = props => {
  const {type, page, request} = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    switch (type) {
      case 'space':
        return <BaseSpace data={item} page={page} />;
      case 'movement':
        return <BaseMovement data={item} page={page} />;
      case 'shop_store':
        return <BaseShopStore data={item} page={page} />;
      case 'shop_brand':
        return <BaseShopBrand data={item} page={page} />;
      case 'product':
        return <BaseProduct data={item} page={page} />;
      default:
        return <View />;
    }
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = request;
    const res = await api({...params, page, per_page: 50});
    setHeaders(res.headers);
    setListData(page === 1 ? res.data.items : [...listData, ...res.data.items]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [request]);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      enableRefresh={false}
      enableLoadMore={false}
      renderSeparator={() => <View style={styles.separator} />}
    />
  );
};

RelatedList.propTypes = {
  request: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 14,
  },
});

export default RelatedList;
