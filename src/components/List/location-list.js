import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import ScrollList from '@/components/ScrollList';
import BaseLocation from '@/components/Item/base-location';

const noLocation = {id: 0, name: '不选择位置'};

const LocationList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);
  const {location} = useSelector(state => state.home);
  const {positionCity} = location;

  const {type} = props;

  const renderItem = ({item}) => {
    return <BaseLocation data={item} type={type} />;
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});

    let data = res.data.answer.tips;

    if (type === 'add-location' && data.length > 0) {
      data = [
        noLocation,
        {
          id: '000',
          name: positionCity.includes('市') ? positionCity : `${positionCity}市`,
          location: '',
        },
        ...data,
      ];
    }
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
      renderSeparator={renderSeparator}
      settings={props}
    />
  );
};

LocationList.propTypes = {
  request: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  ref: PropTypes.any,
};

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 14,
  },
});

export default LocationList;
