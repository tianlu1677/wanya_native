import React, {useState} from 'react';
import {StyleSheet, View, Pressable, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {BarHeight} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';
import {Search} from '@/components/NodeComponents';

const RecommendSearch = () => {
  const navigation = useNavigation();
  const [inputRef, setinputRef] = useState(null);
  const {currentAccount} = useSelector(state => state.account);

  return (
    <>
      <View style={{height: BarHeight, backgroundColor: 'black'}} />
      <StatusBar barStyle="light-content" translucent={false} />
      <Search
        getRef={refs => setinputRef(refs)}
        style={{backgroundColor: '#000', paddingRight: 14}}
        inputStyle={{borderRadius: RFValue(18), backgroundColor: '#fff'}}
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