import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import {BaseSpace, BaseMovement, BaseShopStore, BaseShopBrand, BaseProduct} from './related-item';

const RelatedList = props => {
  const {type, pageFrom, request} = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    switch (type) {
      case 'space':
        return <BaseSpace data={item} pageFrom={pageFrom} />;
      case 'movement':
        return <BaseMovement data={item} pageFrom={pageFrom} />;
      case 'shop_store':
        return <BaseShopStore data={item} pageFrom={pageFrom} />;
      case 'shop_brand':
        return <BaseShopBrand data={item} pageFrom={pageFrom} />;
      case 'product':
        return <BaseProduct data={item} pageFrom={pageFrom} />;
      default:
        return <View />;
    }
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = request;
    const res = await api({...params, page, per_page: 50});
    setHeaders(res.headers);
    const ReturnKey = res.data.items || res.data.spaces || res.data.shop_stores;
    setListData(page === 1 ? ReturnKey : [...listData, ...ReturnKey]);
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
  pageFrom: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 14,
  },
});

export default RelatedList;
