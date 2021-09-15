import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {RFValue} from '@/utils/response-fontsize';
import * as action from '@/redux/constants';
import FastImg from '@/components/FastImg';
import ProductList from '@/components/List/product-list';
import IconFont from '@/iconfont';
import Loading from '@/components/Loading';
import {RecommendSearch} from '@/components/NodeComponents';
import TabView from '@/components/TabView';
import Collapsible from './collapsible';
import {getAppCardList} from '@/api/discovery_api';
import {getProductsList} from '@/api/product_api';
import Category from './category';
import TabList from '@/components/TabList';

const Discovery = props => {
  const [currentKey, setCurrentKey] = useState(null);
  const [coveryData, setCoveryData] = useState([]);

  const loadData = async () => {
    const res = await getAppCardList();
    setCurrentKey(res.data.list[0].category_key);
    setCoveryData(res.data.list);
  };

  const RenderCaCategory = () => {
    const queryUrl = `q[shop_brand_id_eq]=${1}`;
    const current = coveryData.find(item => item.category_key === currentKey);
    return (
      <ProductList
        request={{api: getProductsList, params: {queryUrl}}}
        ListHeaderComponent={<Category {...props} category={current} currentKey={currentKey} />}
      />
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const StickTopHeader = () => {
    const options = {align: 'left', bottomLine: true, separator: false};

    const tabChange = item => {
      // onKeyChange(item.key, item.title);
    };

    const routes = [
      {key: '32', title: '服饰'},
      {key: '321', title: '服饰'},
    ];
    return <TabList {...options} current={'32'} tabChange={tabChange} data={routes} />;
  };

  return (
    <View style={styles.wrapper}>
      <RecommendSearch style={{paddingBottom: 0}} />
      {coveryData.length > 0 ? (
        <Collapsible
          coveryData={coveryData}
          currentKey={currentKey}
          onKeyChange={key => setCurrentKey(key)}
          renderTopHeader={<StickTopHeader />}
          tabData={coveryData.map(category => {
            const options = {
              key: category.category_key,
              title: category.category_name,
              component: RenderCaCategory,
            };
            return options;
          })}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  content: {
    backgroundColor: '#fff',
  },
  slideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: RFValue(17),
    backgroundColor: '#fff',
  },
  itemRight: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  slideImage: {
    width: RFValue(45),
    height: RFValue(45),
    marginRight: 12,
  },
  text: {
    width: (132 * RFValue(16)) / 62,
    height: RFValue(16),
  },
  store: {
    width: 80,
    height: 12,
  },
  itemText: {
    color: '#bdbdbd',
    marginRight: 5,
    fontSize: RFValue(13),
  },
  separator: {
    marginLeft: 45 + 12 + 15,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#EBEBEB',
  },
});

export default Discovery;
