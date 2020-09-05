import NodeItem from '@/components/Item/node-item';

// const FollowNodes = () => {
//   return(
//     <NodeItem />
//   )
// }

// export default FollowNodes

import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import {View} from 'react-native-animatable';
import {getFollowNodeIndex} from '@/api/node_api';
const TopicItem = props => {
  const {data} = props;
  return (
    <TouchableOpacity key={data.name} style={styles.topic} onPress={() => props.itemOnPress(data)}>
      <Text style={styles.topictext}># {data.name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  topic: {
    flex: 1,
    marginLeft: 14,
    height: 45,
    justifyContent: 'center',
    backgroundColor: '#fff',
    fontSize: 14,
  },
});

const TopicList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    return <TopicItem data={item} itemOnPress={() => props.onPress(item)} />;
  };

  const renderSeparator = () => {
    return <View style={{height: 1, backgroundColor: '#ebebeb', marginLeft: 14}} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.hashtags;
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
      renderSeparator={renderSeparator}
      {...props}
    />
  );
};

// List 属性继承scrollList 默认可下拉加载刷新
TopicList.propTypes = {
  request: PropTypes.object.isRequired, //获取数据请求 {api: api, id: 1, params:params}
  onPress: PropTypes.func,
};

export default TopicList;
