import React, {useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import NodeItem from '@/components/Item/node-item';

const NodeList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    return <NodeItem node={item} key={item.id} type="list" />;
  };

  const renderSeparator = () => {
    return <Text style={styles.separator} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    //console.log('api', api)
    const res = await api({...params, page});
    const data = res.data.nodes;
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      renderSeparator={renderSeparator}
      {...props}
      style={styles.wrapper}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
  },
  follow: {
    flexDirection: 'row',
    paddingLeft: 14,
    paddingRight: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 14,
    paddingBottom: 14,
  },
  nickname: {
    fontSize: 14,
    marginLeft: 10,
  },
  btn: {
    marginLeft: 'auto',
  },
  separator: {
    backgroundColor: '#ebebeb',
    height: StyleSheet.hairlineWidth,
    marginLeft: 60,
  },
});

NodeList.propTypes = {
  request: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  ref: PropTypes.any,
};

export default NodeList;
