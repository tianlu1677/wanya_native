import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {useNavigation} from '@react-navigation/native';
import {throttle} from 'lodash';
import {ScrollList, FastImg} from '@/components';
import {RFValue} from '@/utils/response-fontsize';

export const BaseSingleProduct = props => {
  const {data, type} = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {savetopic} = useSelector(state => state.home);

  const handleClick = () => {
    if (type === 'add-product') {
      const params = {
        movement_ids: [],
        shop_store_ids: [],
        shop_brand_ids: [],
        product: data,
      };
      dispatch({type: action.SAVE_NEW_TOPIC, value: {...savetopic, ...params}});
      navigation.goBack();
    }

    if (type === 'search-product') {
      navigation.navigate('ProductDetail', {productId: data.id});
    }
  };

  return (
    <Pressable style={styles.wrapper} onPress={handleClick}>
      <FastImg style={styles.image} source={{uri: data.cover_url}} />
      <View style={styles.infoWrap}>
        <Text style={styles.name} numberOfLines={1}>
          {data.name}
        </Text>
        <Text style={styles.text}>
          {data.category_name}
          {data.category_brand_type ? ' · ' : ''}
          {data.category_brand_type ? data.category_brand_type.split(',').join('/') : ''}
        </Text>
      </View>
    </Pressable>
  );
};

const ProductSingleList = props => {
  const {request, dataKey, type} = props;
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const ItemMemo = React.memo(({item}) => <BaseSingleProduct data={item} type={type} />);

  const RenderItemMemo = useCallback(({item, index}) => <ItemMemo item={item} index={index} />, []);

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const {api, params, apiPath} = request;
    const res = await api({...params, page}, apiPath);
    const data = dataKey ? res.data[dataKey] : res.data.products;
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
    setHeaders(res.headers);
  };

  useEffect(() => {
    loadData();
  }, [request]);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={throttle(loadData, 100)}
      headers={headers}
      renderItem={RenderItemMemo}
      enableRefresh={false}
      renderSeparator={() => <View style={{height: 9}} />}
      settings={{style: {flex: 1, paddingTop: 10, backgroundColor: '#fff'}}}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: RFValue(10),
    marginHorizontal: 14,
    backgroundColor: '#000',
    borderRadius: 9,
  },
  image: {
    width: RFValue(33),
    height: RFValue(33),
    marginRight: 8,
    borderRadius: 6,
  },
  infoWrap: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  text: {
    color: '#bdbdbd',
    fontSize: RFValue(10),
    fontWeight: '300',
    marginTop: 4,
  },
});

export default ProductSingleList;
