import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import ScrollList from '@/components/ScrollList';
import BaseRecommendAccount from '@/components/Item/base-recommend-account';
import {RecommendSearch} from '@/components/NodeComponents';
import {VWValue} from '@/utils/response-fontsize';
import {getRecommendAccounts} from '@/api/home_api';
import {Cstyles} from '@/pages/tabBar/style';
import {uniqBy} from 'lodash';

const TabBarAccounts = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const RenderItem = ({item, index}) => {
    return <BaseRecommendAccount data={item} key={`recommend_account${item.id}`} />;
  };

  const loadData = async (page = 1, params) => {
    if (page === 1) {
      setLoading(true);
    }
    const res = await getRecommendAccounts({page, ...params});
    if (page === 1) {
      setListData(res.data.accounts);
    } else {
      let newaccounts = uniqBy(listData.concat(res.data.accounts), 'id');
      setListData(newaccounts);
    }
    setLoading(false);
    setHeaders(res.headers);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={Cstyles.wrapper}>
      <RecommendSearch {...props} border={true} style={{paddingHorizontal: 14}} page="accounts" />
      <ScrollList
        data={listData}
        loading={loading}
        onRefresh={loadData}
        headers={headers}
        renderItem={RenderItem}
        renderSeparator={() => <View style={styles.speator} />}
        style={{backgroundColor: '#fff'}}
        keyExtractor={(item, index) => `account${item.id}`}
        settings={{
          initialNumToRender: 15,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  speator: {
    backgroundColor: '#EBEBEB',
    height: StyleSheet.hairlineWidth,
    marginLeft: 14 + VWValue(45) + 12,
    marginRight: 14,
  },
});

export default TabBarAccounts;
