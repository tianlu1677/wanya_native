import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseMovement from '@/components/Item/base-movement';

const MovementList = props => {
  const {type} = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    return <BaseMovement data={item} key={item.id} type={type} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params, apiPath} = props.request;
    const res = await api(apiPath, {...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.movements;
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
      enableRefresh={false}
      renderSeparator={() => <View style={styles.separator} />}
    />
  );
};

MovementList.propTypes = {
  request: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 14,
  },
});

export default MovementList;
