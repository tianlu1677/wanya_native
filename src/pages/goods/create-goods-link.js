import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Pressable, StyleSheet, TextInput, Platform} from 'react-native';
import {Keyboard, KeyboardAvoidingView} from 'react-native';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';

const CreateGoodsLink = props => {
  const {navigation} = props;
  const [value, setValue] = useState('');

  const isCanClick = value ? true : false;

  const onChangeText = text => {
    setValue(text);
  };

  const handleClick = () => {
    navigation.navigate('CreateGoodsInfo');
  };

  useLayoutEffect(() => {
    const hitSlop = {top: 10, bottom: 10, left: 5, right: 5};
    navigation.setOptions({
      headerTitle: '添加顽物',
      headerLeft: () => (
        <Pressable hitSlop={hitSlop}>
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
            style={styles.textInput}
            value={value}
            selectionColor="#ff193a"
            placeholderTextColor="#bdbdbd"
            placeholder="复制淘宝平台商品链接"
            onChangeText={text => onChangeText(text)}
          />
          <Text
            style={[styles.btn, value ? styles.active : styles.normal]}
            onPress={isCanClick ? handleClick : null}>
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
  content: {
    flex: 1,
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

export default CreateGoodsLink;
