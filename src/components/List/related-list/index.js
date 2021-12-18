import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Keyboard, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {debounce} from 'lodash';
import TabView from '@/components/TabView';
import {Search} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import {searchApi} from '@/api/search_api';

// import RelatedList from '@/pages/topics/add-related/related-list';
import RelatedScrollList from './related-scroll-list';

// import ProductSingleList from '@/components/List/product-single-list';

const AddRelated = props => {
  const {navigation, keys, page} = props;

  const {savetopic} = useSelector(state => state.home);
  const [searchKey, setSearchKey] = useState('');

  const defaultKey = () => {
    return (savetopic.space_id || []).length > 0
      ? 'space'
      : (savetopic.movement_ids || []).length > 0
      ? 'movement'
      : (savetopic.shop_store_ids || []).length > 0
      ? 'shop_store'
      : (savetopic.shop_brand_ids || []).length > 0
      ? 'shop_brand'
      : (savetopic.product_ids || []).length > 0
      ? 'product'
      : keys[0];
  };

  const [currentKey, setCurrentKey] = useState(defaultKey);

  const [request, setRequest] = useState({
    api: searchApi,
    params: {name: searchKey, type: currentKey, random: 1},
  });

  const SpaceListPage = () => <RelatedScrollList request={request} type="space" page={page} />;

  const MovementListPage = () => (
    <RelatedScrollList request={request} type="movement" page={page} />
  );

  const ShopStoreListPage = () => (
    <RelatedScrollList request={request} type="shop_store" page={page} />
  );

  const ShopBrandListPage = () => (
    <RelatedScrollList request={request} type="shop_brand" page={page} />
  );

  const ProductListPage = () => <RelatedScrollList request={request} type="product" page={page} />;

  // 搜索(naem有值)一个接口 没值另一个接口
  const onChangeText = text => {
    setRequest({api: searchApi, params: {name: text, type: currentKey, random: 1}});
    setSearchKey(text);
  };

  const onChangeKey = key => {
    setRequest({api: searchApi, params: {name: searchKey, type: key, random: 1}});
    setCurrentKey(key);
  };

  return (
    <SafeAreaView onPress={Keyboard.dismiss} style={styles.wrapper}>
      <View style={styles.wrapper}>
        <StatusBar barStyle="dark-content" backgroundColor={'white'} />
        <Search
          inputStyle={{borderRadius: RFValue(19), backgroundColor: '#F2F3F5'}}
          height={RFValue(36)}
          cancelWidth={RFValue(66)}
          placeholderTextColor="#7F7F81"
          placeholder="搜索顽招/顽士多/品牌/顽物"
          onChangeText={debounce(onChangeText, 500)}
          cancel={true}
          onCancel={() => navigation.goBack()}
        />
        {request ? (
          <TabView
            currentKey={currentKey}
            request={request}
            onChange={onChangeKey}
            align="left"
            bottomLine={false}
            separator={true}
            tabData={[
              {
                key: 'space',
                title: '场地',
                component: SpaceListPage,
              },
              {
                key: 'movement',
                title: '顽招',
                component: MovementListPage,
              },
              {
                key: 'shop_store',
                title: '顽士多',
                component: ShopStoreListPage,
              },
              {
                key: 'shop_brand',
                title: '品牌',
                component: ShopBrandListPage,
              },
              {
                key: 'product',
                title: '顽物',
                component: ProductListPage,
              },
            ].filter(item => keys.includes(item.key))}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AddRelated;
