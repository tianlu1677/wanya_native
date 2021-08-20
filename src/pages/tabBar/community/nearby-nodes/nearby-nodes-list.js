import React, {useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseNode from '@/components/Item/base-node';

const NodeList = props => {
  const {type, request, renderEmpty} = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    return <BaseNode data={item} type={type} />;
  };

  const renderSeparator = () => {
    return <Text style={styles.separator} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.nodes;
    setHeaders(res.headers);
    // setListData(page === 1 ? data : [...listData, ...data]);
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
      renderSeparator={renderSeparator}
      enableRefresh={false}
      renderEmpty={renderEmpty}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#ebebeb',
    height: StyleSheet.hairlineWidth,
    marginLeft: 14 + 49 + 10,
  },
});

NodeList.propTypes = {
  request: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default NodeList;
