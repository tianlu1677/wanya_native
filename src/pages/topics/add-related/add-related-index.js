import React, {useState} from 'react';
import {View, StyleSheet, Keyboard, TouchableWithoutFeedback, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {debounce} from 'lodash';
import {BarHeight} from '@/utils/navbar';
import {Search} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import TabView from '@/components/TabView';
import {searchApi} from '@/api/search_api';
import RelatedList from '@/pages/topics/add-related/related-list';
import ProductSingleList from '@/components/List/product-single-list';

const AddRelatedIndex = props => {
  const navigation = useNavigation();
  const {savetopic} = useSelector(state => state.home);
  const [searchKey, setSearchKey] = useState('');
  const defaultKey = () => {
    return (savetopic.movement_ids || []).length > 0
      ? 'movement'
      : (savetopic.shop_store_ids || []).length > 0
      ? 'shop_store'
      : (savetopic.shop_brand_ids || []).length > 0
      ? 'shop_brand'
      : 'movement';
  };

  const [currentKey, setCurrentKey] = useState(defaultKey);

  const [request, setRequest] = useState({
    api: searchApi,
    params: {name: searchKey, type: currentKey, random: 1},
  });

  const SpaceListPage = () => {
    return <RelatedList request={request} type="space" />;
  };

  const MovementListPage = () => {
    return <RelatedList request={request} type="movement" />;
  };

  const ShopStoreListPage = () => {
    return <RelatedList request={request} type="shop_store" />;
  };

  const ShopBrandListPage = () => {
    return <RelatedList request={request} type="shop_brand" />;
  };

  const ProductListPage = () => {
    return (
      <ProductSingleList
        request={request}
        enableRefresh={false}
        dataKey="items"
        type="add-product"
      />
    );
  };

  const onChangeText = text => {
    setRequest({api: searchApi, params: {name: text, type: currentKey, random: 1}});
    setSearchKey(text);
  };

  const onChangeKey = key => {
    setRequest({api: searchApi, params: {name: searchKey, type: key, random: 1}});
    setCurrentKey(key);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <View style={{height: BarHeight}} />
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
            ]}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  proCity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proCityText: {
    marginRight: RFValue(17),
    marginLeft: RFValue(7),
    fontSize: 15,
  },
});

export default AddRelatedIndex;
