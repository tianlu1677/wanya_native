import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import ScrollList from '@/components/ScrollList';
import BaseActivity from '@/components/Item/base-activity';

const ActivityList = props => {
  const {type, ListHeaderComponent, ListTopHeader} = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    return <BaseActivity data={item} key={item.id} type={type} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.activities;
    console.log('list data', data);
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

ActivityList.propTypes = {
  request: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default ActivityList;
