import React, {useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BarHeight, IsIos} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';
import Search from './Search';
import CurrentAvator from '@/pages/tabBar/current-avator';

const RecommendSearch = props => {
  const navigation = useNavigation();
  const {border} = props;

  const [inputRef, setinputRef] = useState(null);

  return (
    <View style={[border && styles.searchWrapper]}>
      <View style={{height: IsIos ? BarHeight : 0, backgroundColor: '#fff'}} />
      <StatusBar barStyle="dark-content" translucent={false} />
      <Search
        getRef={refs => setinputRef(refs)}
        style={{backgroundColor: '#fff', paddingRight: 14}}
        inputStyle={{borderRadius: RFValue(18), backgroundColor: '#f2f3f5'}}
        height={RFValue(36)}
        placeholderTextColor="#aaa"
        placeholder="搜索顽法、帖子、文章、圈子等内容"
        cancel={false}
        onFocus={() => {
          inputRef.blur();
          navigation.push('SearchIndex');
        }}
        prefix={
          <View style={styles.avatorWrap}>
            <CurrentAvator />
          </View>
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
});

export default RecommendSearch;
