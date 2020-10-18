import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';

const SpaceItem = props => {
  const {data} = props;
  return (
    <TouchableWithoutFeedback onPress={() => props.itemOnPress(data)}>
      <View style={styles.spaceWrapper}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.address}>{data.address}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const SpaceList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    return <SpaceItem data={item} itemOnPress={() => props.onPress(item)} />;
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.spaces;
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

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
      {...props}
    />
  );
};

SpaceList.propTypes = {
  request: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  ref: PropTypes.any,
};

const styles = StyleSheet.create({
  spaceWrapper: {
    justifyContent: 'flex-start',
    paddingTop: 12,
    paddingBottom: 12,
    marginLeft: 15,
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

export default SpaceList;
