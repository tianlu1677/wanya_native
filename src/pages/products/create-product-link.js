import React, {useState, useLayoutEffect} from 'react';
import {View, Text, Pressable, StyleSheet, TextInput, Platform} from 'react-native';
import {Keyboard, KeyboardAvoidingView} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {Toast} from '@/components';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import {getProductsItemDetail} from '@/api/product_api';

const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};
const CreateProductLink = props => {
  const dispatch = useDispatch();
  const {navigation} = props;
  const [value, setValue] = useState('');

  const onChangeText = text => setValue(text);

  const onAnalysis = async (data = value) => {
    const params = {type: 'taobao', url: data};
    try {
      Toast.showLoading();
      const res = await getProductsItemDetail(params);
      Toast.hide();

      if (res.data.error) {
        Toast.showError(res.data.error);
        dispatch({type: action.CREATE_PRODUCT, value: {}});
      } else {
        dispatch({type: action.CREATE_PRODUCT, value: {detail: res.data}});
        navigation.navigate('CreateProductInfo');
      }
    } catch {
      Toast.hide();
    }
  };

  const handleClick = async () => {
    if (value) {
      onAnalysis();
    } else {
      const res = await Clipboard.getString();
      if (res) {
        setValue(res);
        onAnalysis(res);
      } else {
        Toast.showError('请输入淘宝链接地址');
      }
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '添加顽物',
      headerLeft: () => (
        <Pressable hitSlop={hitSlop} onPress={navigation.goBack}>
          <IconFont name="close" size={14} />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable style={styles.wrapper} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>商品链接</Text>
          <TextInput
            value={value}
            style={styles.textInput}
            autoFocus={true}
            clearButtonMode="always"
            selectionColor="#ff193a"
            placeholderTextColor="#bdbdbd"
            placeholder="复制淘宝平台商品链接"
            onChangeText={text => onChangeText(text)}
          />
          <Text style={[styles.btn, value ? styles.active : styles.normal]} onPress={handleClick}>
            黏贴并解析商品信息
          </Text>
          <View style={{flex: 1}} />
        </View>
      </Pressable>
    </KeyboardAvoidingView>
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: RFValue(80),
  },
  title: {
    color: '#3D3D3D',
    fontWeight: '500',
    fontSize: 15,
  },
  textInput: {
    height: RFValue(50),
    backgroundColor: '#fff',
    paddingHorizontal: RFValue(15),
    fontSize: 14,
    fontWeight: '300',
    marginTop: 15,
    borderRadius: 6,
    ...boxShadow,
  },
  btn: {
    height: RFValue(50),
    lineHeight: RFValue(50),
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 15,
    color: '#BDBDBD',
    borderRadius: 6,
    overflow: 'hidden',
  },
  active: {
    color: '#fff',
    backgroundColor: '#000',
  },
  normal: {
    color: '#BDBDBD',
    backgroundColor: '#fafafa',
  },
});

export default CreateProductLink;
