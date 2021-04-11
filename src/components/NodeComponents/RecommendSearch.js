import React, {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SAFE_TOP} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import {Search} from '@/components/NodeComponents';

const RecommendSearch = () => {
  const navigation = useNavigation();
  const [inputRef, setinputRef] = useState(null);
  const {currentAccount} = useSelector(state => state.account);

  return (
    <>
      <View style={{height: SAFE_TOP, backgroundColor: 'black'}} />
      <FocusAwareStatusBar barStyle="light-content" translucent={false} />
      <Search
        getRef={refs => setinputRef(refs)}
        style={{backgroundColor: '#000', paddingRight: RFValue(14)}}
        inputStyle={{borderRadius: RFValue(18), backgroundColor: '#fff'}}
        height={RFValue(38)}
        placeholderTextColor="#000"
        placeholder="搜索帖子、文章、圈子等内容"
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
    marginRight: RFValue(14),
  },
});

export default RecommendSearch;
