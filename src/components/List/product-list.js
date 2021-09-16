import React, {useEffect, useState} from 'react';
import ScrollList from '@/components/ScrollList';
import BaseProduct, {SearchBaseProduct} from '@/components/Item/base-product';

const ProductList = props => {
  const {request, type, dataKey} = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item, index}) => {
    return type === 'list' ? (
      <SearchBaseProduct index={index} data={item} />
    ) : (
      <BaseProduct index={index} data={item} />
    );
  };

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const {api, params, apiPath} = request;
    const res = await api({...params, page}, apiPath);
    const data = dataKey ? res.data[dataKey] : res.data.products;
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [request]);

  return (
    <ScrollList
      numColumns={2}
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      enableRefresh={false}
      renderSeparator={() => null}
      settings={{style: {flex: 1, paddingTop: 10, backgroundColor: '#f2f3f5'}}}
      {...props}
    />
  );
};

export default ProductList;
