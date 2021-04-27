import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseShopStore from '@/components/Item/base-shop-store';

const ShopStoreList = props => {
  const {type} = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    return <BaseShopStore data={item} key={item.id} type={type} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.shop_stores;
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [props.request]);

  console.log(listData);
  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      enableRefresh={false}
    />
  );
};

ShopStoreList.propTypes = {
  request: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default ShopStoreList;
