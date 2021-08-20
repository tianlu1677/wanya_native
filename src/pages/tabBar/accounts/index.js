import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseRecommendAccount from '@/components/Item/base-recommend-account';
import BaseTheory from '@/components/Item/base-theory';
import {getRecommendTopPosts} from '@/api/home_api';
import {RecommendSearch} from '@/components/NodeComponents';

const TabBarAccounts = props => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([1, 2, 3, 4, 5, 6]);

  const Child = React.memo(({item, index}) => {
    return <BaseRecommendAccount />;
  });

  const renderItemMemo = useCallback(({item, index}) => <Child item={item} index={index} />, []);

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.posts;
    const transdata = page === 1 ? data : [...listData, ...data];
    // setListData([])
    setLoading(false);
    setHeaders(res.headers);
  };

  useEffect(() => {
    // loadData();
  }, []);

  return (
    <View style={styles.wrapper}>
      <RecommendSearch />
      <ScrollList
        data={listData}
        loading={loading}
        onRefresh={loadData}
        headers={headers}
        renderItem={renderItemMemo}
        renderSeparator={() => <View style={styles.speator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: '#fff',
  },
  speator: {
    backgroundColor: '#EBEBEB',
    height: StyleSheet.hairlineWidth,
    marginLeft: 66,
  },
});

export default TabBarAccounts;
