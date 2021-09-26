import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Animated, View, Text} from 'react-native';
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

const ShowHeight = 200;

export const RenderCaCategory = props => {
  const scrollY = useRef(new Animated.Value(0)).current;

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
  };

  useEffect(() => {
    const defaultType = current.category_brand_type_list[0];
    const defaultKey = `${route.key}${defaultType}`;
    const apiPath = `q[category_id_eq]=${route.key}&q[category_brand_type_cont]=${defaultType}`;
    setRequest({api: getProducts, params: {}, apiPath});
    setCurrentKey(defaultKey);
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
  const scrollY = useRef(new Animated.Value(0)).current;

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
    <>
      <RecommendSearch style={{paddingBottom: 0, paddingLeft: 14}} {...props} page="discovery" />
      {/* <Collapsible
          coveryData={coveryData}
          currentKey={currentKey}
          onKeyChange={key => setCurrentKey(key)}
          renderTopHeader={<StickTopHeader />}
          tabData={coveryData.map(category => {
            const options = {
              key: category.category_key,
              title: category.category_name,
              // component: <RenderCaCategory category={category} coveryData={coveryData} />,
              // component: (category, coveryData) => <Text>323232</Text>,
              component: <RenderCaCategory category={category} coveryData={coveryData} />,
            };
            return options;
          })}
        /> */}

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
    </>
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
