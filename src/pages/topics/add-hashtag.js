import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Keyboard, TouchableWithoutFeedback, View, StatusBar} from 'react-native';
import {RFValue} from '@/utils/response-fontsize';
import {BarHeight} from '@/utils/navbar';
import HashtagList from '@/components/List/hash-tag-list';
import {Search} from '@/components/NodeComponents';
import {searchApi} from '@/api/search_api';
import {getHashtagList} from '@/api/hashtag_api';

import {ProWrapper as pstyles} from '@/styles/baseCommon';

const AddHashTag = ({navigation}) => {
  const [searchKey, setSearchKey] = useState(null);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (searchKey) {
      setRequest({
        api: searchApi,
        params: {name: searchKey, type: 'hashtag'},
      });
    } else {
      setRequest({
        api: getHashtagList,
        params: {name_cont: searchKey},
      });
    }
  }, [searchKey]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.wrapper}>
        <View style={{height: BarHeight}} />
        <StatusBar barStyle="dark-content" />
        <Search
          inputStyle={{borderRadius: RFValue(19), backgroundColor: '#F2F3F5'}}
          height={RFValue(36)}
          cancelWidth={RFValue(66)}
          placeholderTextColor="#7F7F81"
          placeholder="搜索更多话题"
          onChangeText={text => setSearchKey(text)}
          cancel={true}
          onCancel={() => navigation.goBack()}
        />
        {request && (
          <HashtagList
            request={request}
            enableRefresh={false}
            type="add-hashtag"
            dataKey={searchKey ? 'items' : 'hashtags'}
            ListHeaderComponent={
              <View style={pstyles.proWrapper}>
                <Text style={pstyles.proTitle}>{searchKey ? '搜索到的话题' : '热门话题'}</Text>
              </View>
            }
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AddHashTag;
