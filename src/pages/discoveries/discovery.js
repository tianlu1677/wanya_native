import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';
import ProductList from '@/components/List/product-list';
import Loading from '@/components/Loading';
import {RecommendSearch} from '@/components/NodeComponents';
import TabView from '@/components/TabView';
import Collapsible from './collapsible';
import {getAppCardList} from '@/api/discovery_api';
import {getProducts} from '@/api/product_api';
import Category from './category';
import {ScrollView} from 'react-native-gesture-handler';

export const RenderCaCategory = props => {
  const {route} = props;
  const {discoveryData} = useSelector(state => state.home);
  const current = discoveryData.find(item => String(item.category_id) === route.key);
  const [currentKey, setCurrentKey] = useState('');
  const [request, setRequest] = useState({});

  const ProductListPage = () => {
    return <ProductList request={request} />;
  };

  const onChangeKey = key => {
    setCurrentKey(key);
    const defaultType = current.category_brand_type_list[0];
    // const defaultKey = `${route.key}${defaultType}`;
    const apiPath = `q[category_id_eq]=${route.key}&q[category_brand_type_cont]=${defaultType}`;
    setRequest({api: getProducts, params: {}, apiPath});
  };

  useEffect(() => {
    // setCurrentKey(defaultKey);
  }, [route.key]);

  return currentKey ? (
    <ScrollView>
      <Category category={current} />
      <TabView
        currentKey={currentKey}
        request={request}
        onChange={onChangeKey}
        align="left"
        bottomLine={true}
        separator={false}
        tabData={current.category_brand_type_list.map(item => {
          return {key: `${route.key}${item}`, title: item, component: ProductListPage};
        })}
      />
    </ScrollView>
  ) : null;
};

const Discovery = props => {
  const dispatch = useDispatch();
  const [currentKey, setCurrentKey] = useState(null);
  const [tabData, setTabData] = useState([]);
  const [coveryData, setCoveryData] = useState([]);

  const loadData = async () => {
    const res = await getAppCardList();
    const data = res.data.list.map(category => {
      const {category_id, category_name} = category;
      return {key: String(category_id), title: category_name, component: RenderCaCategory};
    });
    dispatch({type: action.UPDATE_DISCOVER_DATA, value: res.data.list});
    setCurrentKey(data[0].key);
    setTabData(data);
    setCoveryData(res.data.list);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <RecommendSearch style={{paddingBottom: 0, paddingLeft: 14}} {...props} page="discovery" />
      {coveryData.length > 0 ? (
        <Collapsible
          coveryData={coveryData}
          currentKey={currentKey}
          onKeyChange={key => setCurrentKey(key)}
          tabData={tabData}
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
  topHeader: {
    width: '100%',
    position: 'absolute',
    top: 100,
    backgroundColor: 'pink',
  },
  tabListWrapper: {
    width: '100%',
    position: 'absolute',
    top: 100,
    zIndex: 1,
    backgroundColor: 'pink',
  },
});

export default Discovery;
