import React, {useState} from 'react';
import {StyleSheet, View, Pressable, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {BarHeight} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';
import Search from '@/components/NodeComponents/Search';

const RecommendSearch = () => {
  const navigation = useNavigation();
  const [inputRef, setinputRef] = useState(null);
  const {currentAccount} = useSelector(state => state.account);

  return (
    <>
      <View style={{height: BarHeight, backgroundColor: '#fff'}} />
      <StatusBar barStyle="dark-content" translucent={true} />
      <Search
        getRef={refs => setinputRef(refs)}
        style={{backgroundColor: '#fff', paddingRight: 14, paddingBottom: 0}}
        inputStyle={{borderRadius: RFValue(18), backgroundColor: '#f2f3f5'}}
        height={RFValue(38)}
        placeholderTextColor="#aaa"
        placeholder="搜索顽法、帖子、文章、圈子等内容"
        cancel={false}
        onFocus={() => {
          inputRef.blur();
          navigation.push('SearchIndex');
        }}
        prefix={
          <Pressable onPress={() => navigation.openDrawer()}>
            <FastImg style={styles.avator} source={{uri: currentAccount.avatar_url}} />
          </Pressable>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  avator: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RFValue(15),
    marginRight: 14,
  },
});

export default RecommendSearch;
