import React, {useState} from 'react';
import {StyleSheet, Text, View, StatusBar, Pressable} from 'react-native';
import IconFont from '@/iconfont';
import {BarHeight, IsIos} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';
import Search from './Search';
import CurrentAvator from '@/pages/tabBar/current-avator';

const RecommendSearch = props => {
  const {border, style, navigation} = props;
  const [inputRef, setinputRef] = useState(null);

  const onCreateProduct = () => {
    navigation.navigate('CreateProductLink');
  };

  return (
    <View style={[border && styles.searchWrapper]}>
      <View style={{height: IsIos ? BarHeight : 0, backgroundColor: '#fff'}} />
      <StatusBar barStyle="dark-content" translucent={false} backgroundColor="white" />
      <Search
        getRef={refs => setinputRef(refs)}
        style={{...style, backgroundColor: '#fff'}}
        inputStyle={{borderRadius: RFValue(18), backgroundColor: '#f2f3f5'}}
        height={RFValue(36)}
        placeholderTextColor="#aaa"
        placeholder="搜索顽法、帖子、文章、圈子等内容"
        onFocus={() => {
          inputRef.blur();
          navigation.push('SearchIndex');
        }}
        cancel={false}
        prefix={
          <View style={styles.avatorWrap}>
            <CurrentAvator />
          </View>
        }
        suffix={
          <Pressable style={styles.productWrap} onPress={onCreateProduct}>
            <IconFont size={14} name="plus" color="#000" />
            <Text style={styles.title}>顽物</Text>
          </Pressable>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatorWrap: {
    position: 'relative',
    zIndex: 2,
    marginRight: 14,
  },
  productWrap: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#2C2C2C',
    marginLeft: 5,
  },
});

export default RecommendSearch;
