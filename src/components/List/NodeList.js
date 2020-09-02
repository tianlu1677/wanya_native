import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import ScrollList from '@/components/ScrollList';
import {useNavigation} from '@react-navigation/native';

const NodeItem = props => {
  // const [node, setNode] = useState({})
  const {node} = props;
  const navigation = useNavigation();

  const goDetail = () => {
    navigation.navigate('NodeDetail', {nodeId: node.id});
  };

  return (
    <View>
      <View
        style={styles.cover}
        onClick={() => {
          goDetail();
        }}/>
      <View style={styles.content}>
        <Text
          style={styles.nodeName}
          onClick={() => {
            goDetail();
          }}>
          {node.name}
        </Text>

        <Text
          style={styles.nodeDesc}
          onClick={() => {
            goDetail();
          }}>
          {node.topics_count}篇帖子 · {node.accounts_count}位{node.nickname || '圈友'}
        </Text>

        <TouchableWithoutFeedback onClick={this.followNode}>
          <Text className={node.followed ? 'joined' : 'join'}>
            {node.followed ? '已加入' : '加入'}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const NodeList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    return (
      <NodeItem node={item} />
    );
  };

  const renderSeparator = () => {
    return <View style={{height: 1, backgroundColor: '#ebebeb', marginLeft: 14}} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.spaces;
    setLoading(false);
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
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

const styles = StyleSheet.create({
  //底部默认样式
  cover: {
    height: 44,
    width: 44,
    border: 3,
    borderRadius: 5,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
    width: '100%',
  },

  nodeName: {
    fontSize: 15,
    fontWeight: 500,
  },
  nodeDesc: {
    marginTop: 2.5,
    height: 20,
    fontSize: 11,
    fontWeight: 400,
    color: 'rgba(189,189,189,1)',
  },
});

export default NodeList;
