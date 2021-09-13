import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {RFValue} from '@/utils/response-fontsize';
import * as action from '@/redux/constants';
import FastImg from '@/components/FastImg';
import ProductList from '@/components/List/product-list';
import IconFont from '@/iconfont';
import Loading from '@/components/Loading';
import {RecommendSearch} from '@/components/NodeComponents';
import TabView from '@/components/TabView';
import {getAppCardList} from '@/api/discovery_api';
import {getProductsPost} from '@/api/product_api';
import Category from './category';

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
        request={{api: getProductsPost, params: {queryUrl}}}
        ListHeaderComponent={<Category {...props} category={current} currentKey={currentKey} />}
      />
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.wrapper}>
      <RecommendSearch style={{paddingBottom: 0}} />
      {coveryData.length > 0 ? (
        <TabView
          currentKey={currentKey}
          request={{}}
          onChange={key => setCurrentKey(key)}
          align="left"
          bottomLine={true}
          separator={false}
          tabData={coveryData.map(category => {
            return {
              key: category.category_key,
              title: category.category_name,
              component: RenderCaCategory,
            };
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
