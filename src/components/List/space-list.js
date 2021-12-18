import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseSpace from '@/components/Item/base-space';

const noSpace = {id: 0, name: '不选择场地'};

const SpaceList = props => {
  const {pageFrom, request, dataKey} = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => <BaseSpace data={item} pageFrom={pageFrom} />;

  const renderSeparator = () => <View style={styles.separator} />;

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = request;
    const res = await api({...params, page});
    let data = dataKey ? res.data[dataKey] : res.data.spaces;
    if (pageFrom === 'topic') {
      data = [noSpace, ...data];
    }

    if (pageFrom === 'node') {
      data = [...data];
    }

    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
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
      {...props}
    />
  );
};

SpaceList.propTypes = {
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

export default SpaceList;
