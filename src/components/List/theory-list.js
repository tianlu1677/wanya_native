import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseTheory from '@/components/Item/base-theory';

const TheoryList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const {type} = props;

  const renderItem = ({item}) => <BaseTheory data={item} type={type} />;

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    console.log(res);

    const data = props.dataKey ? res.data[props.dataKey] : res.data.theory;
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
      {...props}
    />
  );
};

TheoryList.propTypes = {
  request: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

export default TheoryList;
