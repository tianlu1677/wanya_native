import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import ScrollList from '@/components/ScrollList';
import BaseRecommendAccount from '@/components/Item/base-recommend-account';
import {RecommendSearch} from '@/components/NodeComponents';
import {getRecommendAccounts} from '@/api/home_api';
import {Cstyles} from '@/pages/tabBar/style';

const TabBarAccounts = () => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const RenderItem = ({item}) => {
    return <BaseRecommendAccount data={item} key={item.id} />;
  };

  const loadData = async (page = 1, params) => {
    if (page === 1) {
      setLoading(true);
    }
    const res = await getRecommendAccounts({page, ...params});
    setListData(page === 1 ? res.data.accounts : [...listData, ...res.data.accounts]);
    setLoading(false);
    setHeaders(res.headers);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={Cstyles.wrapper}>
      <RecommendSearch />
      <ScrollList
        data={listData.slice(0, 2)}
        loading={loading}
        onRefresh={loadData}
        headers={headers}
        renderItem={RenderItem}
        renderSeparator={() => <View style={styles.speator} />}
        style={{backgroundColor: '#fff'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  speator: {
    backgroundColor: '#EBEBEB',
    height: StyleSheet.hairlineWidth,
    marginLeft: 66,
  },
});

export default TabBarAccounts;
