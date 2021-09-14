import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Pressable, StyleSheet, TextInput, Dimensions} from 'react-native';
import {Keyboard, KeyboardAvoidingView} from 'react-native';
import IconFont from '@/iconfont';
import {debounce} from 'lodash';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import PersonImg from '@/assets/images/personal.png';
import {CategoryDrawer, CategoryKindDrawer} from '@/components/NodeComponents';

import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';

const {width} = Dimensions.get('window');
const mediaWidth = Math.floor((width - (30 * 2 + 10 * 3)) / 4);
console.log('mediaWidth', mediaWidth);

const CreateProductType = props => {
  // const state = useSelector(state => state);
  const {createProduct} = useSelector(state => state.product);
  const {detail, category, brandType} = createProduct;
  const goodId = createProduct.id || null;

  const isCanClick = 1 ? true : false;

  console.log('cd', createProduct);
  const {navigation} = props;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);

  const isClick = () => (1 ? true : false);

  const onChooseType = () => {
    setVisible(true);
  };

  const handleCategorySubmit = data => {
    console.log(data);
    const value = {...createProduct, category: data};
    dispatch({type: action.CREATE_PRODUCT, value});
    setVisible(false);
  };

  const handleTypeSubmit = data => {
    const item = {...createProduct, brandType: data};
    dispatch({type: action.CREATE_PRODUCT, value: item});
    setTypeVisible(false);
  };

  const onCreateClick = async () => {
    // Toast.showLoading();
    // try {
    //   const {cover} = createNode;
    //   let cover_id = cover.cover_id || null;
    //   if (cover.uri) {
    //     const result = await props.uploadImage({uploadType: 'multipart', ...cover});
    //     cover_id = result.asset.id;
    //   }
    //   const params = {...getValidateForm(), cover_id};
    //   let res = null;
    //   if (nodeId) {
    //     res = await editCheckNodes({check_node: params}, nodeId);
    //   } else {
    //     res = await createCheckNodes({check_node: params});
    //   }
    //   if (res.error) {
    //     res.error.map(detail => {
    //       Toast.showError(detail.name);
    //     });
    //   } else {
    //     await submitCheckNodes(res.check_node.id);
    //     Toast.hide();
    //     props.navigation.reset({
    //       index: 0,
    //       routes: [
    //         {
    //           name: 'CreateNodeResult',
    //           params: {nodeId: res.check_node.id, prevPage: 'create-node-type'},
    //         },
    //       ],
    //     });
    //   }
    // } catch (error) {
    //   Toast.hide();
    // }
  };

  const goStepClick = () => {
    navigation.navigate('CreateProductType');
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>商品领域</Text>
      <Pressable style={styles.slideView} onPress={onChooseType}>
        <Text style={[styles.slidetext, {color: category && !goodId ? '#000' : '#bdbdbd'}]}>
          {category?.name || '请选择商品所属领域（必填）'}
        </Text>
        <IconFont name={'arrow-right'} size={10} color={'#bdbdbd'} />
      </Pressable>

      <Pressable style={styles.slideView} onPress={() => setTypeVisible(true)}>
        <Text style={[styles.slidetext, {color: brandType && !goodId ? '#000' : '#bdbdbd'}]}>
          {brandType || '请选择商品所属品类（必填）'}
        </Text>
        <IconFont name={'arrow-right'} size={10} color={'#bdbdbd'} />
      </Pressable>

      <Pressable style={styles.slideView} onPress={onChooseType}>
        <Text
          style={[
            styles.slidetext,
            {color: createProduct.category && !goodId ? '#000' : '#bdbdbd'},
          ]}>
          {createProduct.category?.name || '请选择商品关联品牌（必填）'}
        </Text>
        <IconFont name={'arrow-right'} size={10} color={'#bdbdbd'} />
      </Pressable>

      <Pressable style={styles.surebtnWrap}>
        <Text
          style={[styles.surebtn, createProduct.category ? styles.canClick : styles.disabled]}
          // onPress={createNode.category ? debounce(onCreateClick, 800) : () => {}}>
          onPress={isCanClick ? debounce(onCreateClick, 800) : () => {}}>
          {/* {goodId ? '确认修改' : '确认创建'} */}
          下一步
        </Text>
      </Pressable>

      {visible && (
        <CategoryDrawer
          currentId={category?.id || null}
          onSubmit={handleCategorySubmit}
          onCancel={() => setVisible(false)}
        />
      )}

      {typeVisible && (
        <CategoryKindDrawer
          current={brandType || null}
          categoryId={category?.id || null}
          onSubmit={handleTypeSubmit}
          onCancel={() => setTypeVisible(false)}
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
