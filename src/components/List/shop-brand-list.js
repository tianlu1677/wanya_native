import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseShopBrand from '@/components/Item/base-shop-brand';

const ShopBrandList = props => {
  const {type} = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item, index}) => {
    return <BaseShopBrand data={item} key={item.id} type={type} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params, apiPath} = props.request;
    const res = await api({...params, page}, apiPath);
    const data = props.dataKey ? res.data[props.dataKey] : res.data.shop_brands;
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [props.request]);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      renderSeparator={() => <View />}
      enableRefresh={false}
      numColumns={3}
      columnWrapperStyle={{paddingHorizontal: 14}}
      style={styles.wrapper}
      settings={{
        showsVerticalScrollIndicator: false,
      }}
    />
  );
};

ShopBrandList.propTypes = {
  request: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingTop: 9,
  },
});

export default ShopBrandList;
