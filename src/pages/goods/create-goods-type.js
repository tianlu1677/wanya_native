import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Pressable, StyleSheet, TextInput, Dimensions} from 'react-native';
import {Keyboard, KeyboardAvoidingView} from 'react-native';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import PersonImg from '@/assets/images/personal.png';

const {width} = Dimensions.get('window');
const mediaWidth = Math.floor((width - (30 * 2 + 10 * 3)) / 4);
console.log('mediaWidth', mediaWidth);

const CreateGoodsType = props => {
  const {navigation} = props;
  const [value, setValue] = useState('');

  const isClick = () => (1 ? true : false);

  const goStepClick = () => {
    navigation.navigate('CreateGoodsType');
  };

  useLayoutEffect(() => {
    const hitSlop = {top: 10, bottom: 10, left: 5, right: 5};
    navigation.setOptions({headerTitle: '添加顽物'});
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>商品领域</Text>
      <Pressable style={styles.slideView}>
        <Text
          style={[
            styles.slidetext,
            // {color: createNode.category && !nodeId ? '#000' : '#bdbdbd'},
          ]}>
          {/* {createNode.category?.name || '请选择圈子所属分类（必填）'} */}
          请选择商品所属领域（必填）
        </Text>
        <IconFont name={'arrow-right'} size={10} color={'#bdbdbd'} />
      </Pressable>

      <Pressable style={styles.slideView}>
        <Text
          style={[
            styles.slidetext,
            // {color: createNode.category && !nodeId ? '#000' : '#bdbdbd'},
          ]}>
          {/* {createNode.category?.name || '请选择圈子所属分类（必填）'} */}
          请选择商品所属品类（必填）
        </Text>
        <IconFont name={'arrow-right'} size={10} color={'#bdbdbd'} />
      </Pressable>
      <Pressable style={styles.slideView}>
        <Text
          style={[
            styles.slidetext,
            // {color: createNode.category && !nodeId ? '#000' : '#bdbdbd'},
          ]}>
          {/* {createNode.category?.name || '请选择圈子所属分类（必填）'} */}
          请选择商品所属品牌（选填）
        </Text>
        <IconFont name={'arrow-right'} size={10} color={'#bdbdbd'} />
      </Pressable>
      <Text
        style={[styles.surebtn, isClick() ? styles.canClick : styles.disabled]}
        onPress={goStepClick}>
        下一步
      </Text>
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

export default CreateGoodsType;
