import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import {RFValue} from '@/utils/response-fontsize';
import {useSelector} from 'react-redux';

const noLocation = {id: 0, name: '不选择位置'};

const LocationItem = props => {
  const {data} = props;
  return (
    <Pressable style={styles.spaceWrapper} onPress={() => props.itemOnPress(data)}>
      <Text style={styles.name}>{data.name}</Text>
      {data.address || data.district ? (
        <Text style={styles.address}>{data.address ? data.address : data.district}</Text>
      ) : null}
    </Pressable>
  );
};

const LocationList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);
  const {location} = useSelector(state => state.home);
  const {positionCity} = location;

  const renderItem = ({item}) => {
    return <LocationItem data={item} itemOnPress={() => props.onPress(item)} />;
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    let data = res.data.answer.tips;

    if (props.type === 'add-location' && data.length > 0) {
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
  spaceWrapper: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingLeft: 14,
    backgroundColor: '#fff',
    height: RFValue(65),
  },
  name: {
    fontSize: 15,
  },
  address: {
    fontSize: 11,
    marginTop: 8,
    color: '#bdbdbd',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 14,
  },
});

export default LocationList;
