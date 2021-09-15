import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {debounce} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import {Toast} from '@/components';
import {RFValue} from '@/utils/response-fontsize';
import {getCategoryDetail} from '@/api/category_api';
import {getShopBrands} from '@/api/shop_brand_api';
import {createProducts} from '@/api/product_api';
import OpenDrawer from './open-drawer';

const CreateProductType = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {
    home: {categoryList},
    product: {createProduct},
  } = useSelector(state => state);
  const {detail, category, brandType, brand} = createProduct;
  const [visible, setVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeData, setTypeData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const isCanClick = category && brandType ? true : false;

  console.log('createProduct', createProduct);

  const handleChooseCategory = () => {
    setVisible(true);
  };

  const handleChooseType = () => {
    category ? setTypeVisible(true) : Toast.showError('请先选择商品领域');
  };

  const handleChooseBrand = () => {
    setBrandVisible(true);
  };

  const handleCategorySubmit = async data => {
    const value = {...createProduct, category: data, brandType: null};
    dispatch({type: action.CREATE_PRODUCT, value});
    setVisible(false);
    const res = await getCategoryDetail(data.id);
    const type_list = res.category_brand_type_list.map((item, index) => {
      return {id: index, name: item};
    });
    setTypeData(type_list);
  };

  const handleTypeSubmit = data => {
    const value = {...createProduct, brandType: data};
    dispatch({type: action.CREATE_PRODUCT, value});
    setTypeVisible(false);
  };

  const handleBrandSubmit = data => {
    const value = {...createProduct, brand: data};
    dispatch({type: action.CREATE_PRODUCT, value});
    setBrandVisible(false);
  };

  const onCreateClick = async () => {
    if (!isCanClick) {
      return;
    }
    const params = {
      product: {
        name: detail.cat_name,
        desc: detail.title,
        price: detail.reserve_price,
        category_id: category.id,
        shop_brand_type: brandType.name,
        shop_brand_id: brand?.id || '',
        images_list: detail.small_images.string,
        item_url: detail.item_url,
        item_uid: detail.num_iid,
        item_category: 'taobao',
      },
    };

    try {
      Toast.showLoading();
      const res = await createProducts(params);
      const value = {product: {...res.data.product, assets: res.data.product.images_list}};
      console.log('value', value);
      dispatch({type: action.SAVE_NEW_TOPIC, value});
      navigation.navigate('NewTopic');
      setTimeout(() => {
        dispatch({type: action.CREATE_PRODUCT, value: {}});
      }, 2000);
      Toast.hide();
    } catch (err) {
      Toast.hide();
    }
  };

  const loadBrand = async () => {
    const res = await getShopBrands({page: 1, per_page: 999});
    setBrandData(res.data.shop_brands);
  };

  useEffect(() => {
    loadBrand();
  }, []);

  const Color = state => (state ? '#000' : '#bdbdbd');

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>商品领域</Text>
      <Pressable style={styles.slideView} onPress={handleChooseCategory}>
        <Text style={[styles.slidetext, {color: Color(category)}]}>
          {category?.name || '请选择商品所属领域（必填）'}
        </Text>
        <IconFont name="arrow-right" size={10} color="#bdbdbd" />
      </Pressable>

      <Pressable style={styles.slideView} onPress={handleChooseType}>
        <Text style={[styles.slidetext, {color: Color(brandType)}]}>
          {brandType?.name || '请选择商品所属品类（必填）'}
        </Text>
        <IconFont name="arrow-right" size={10} color="#bdbdbd" />
      </Pressable>

      <Pressable style={styles.slideView} onPress={handleChooseBrand}>
        <Text style={[styles.slidetext, {color: Color(brand)}]}>
          {brand?.name || '请选择商品关联品牌（选填）'}
        </Text>
        <IconFont name="arrow-right" size={10} color="#bdbdbd" />
      </Pressable>

      <Pressable style={styles.surebtnWrap}>
        <Text
          style={[styles.surebtn, isCanClick ? styles.canClick : styles.disabled]}
          onPress={debounce(onCreateClick, 800)}>
          下一步
        </Text>
      </Pressable>

      {visible && (
        <OpenDrawer
          current={category?.id || null}
          data={categoryList}
          onSubmit={handleCategorySubmit}
          onCancel={() => setVisible(false)}
        />
      )}

      {typeVisible && (
        <OpenDrawer
          current={brandType?.id || null}
          data={typeData}
          onSubmit={handleTypeSubmit}
          onCancel={() => setTypeVisible(false)}
        />
      )}

      {brandVisible && (
        <OpenDrawer
          current={brand?.id || null}
          data={brandData}
          onSubmit={handleBrandSubmit}
          onCancel={() => setBrandVisible(false)}
        />
      )}
    </View>
  );
};

const boxShadow = {
  shadowColor: '#bdbdbd',
  shadowRadius: 3,
  shadowOpacity: 0.2,
  shadowOffset: {width: 1, height: 2},
  elevation: 3,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  title: {
    color: '#3D3D3D',
    fontWeight: '500',
    fontSize: 15,
    marginVertical: RFValue(18),
  },
  slideView: {
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: RFValue(15),
    paddingRight: 15,
    marginBottom: RFValue(20),
    fontSize: 12,
    ...boxShadow,
  },
  slidetext: {
    fontSize: 14,
    fontWeight: '300',
  },
  surebtn: {
    height: RFValue(50),
    lineHeight: RFValue(50),
    textAlign: 'center',
    borderRadius: 3,
    overflow: 'hidden',
    fontWeight: '500',
    fontSize: 16,
    marginTop: RFValue(60),
  },
  canClick: {
    backgroundColor: '#000',
    color: '#fff',
  },
  disabled: {
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
  },
});

export default CreateProductType;
