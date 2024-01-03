import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import ScrollList from '@/components/ScrollList';
import BaseSpceDetail from '@/components/Item/base-space-detail';

const SpaceListDetail = props => {
  const {type, ListHeaderComponent, ListTopHeader} = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    return <BaseSpceDetail data={item} key={item.id} type={type} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.spaces;
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
      ListHeaderComponent={
        <>
          {listData.length > 0 ? ListHeaderComponent : <View />}
          {ListTopHeader}
        </>
      }
    />
  );
};

SpaceListDetail.propTypes = {
  request: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default SpaceListDetail;
