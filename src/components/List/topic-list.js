import React, {useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';

const TopicList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    return <BaseTopic data={item} key={item.id} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.topics;
    setLoading(false);
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
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
      {...props}
      style={styles.wrapper}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
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
});

TopicList.propTypes = {
  request: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  ref: PropTypes.any,
};

export default TopicList;
