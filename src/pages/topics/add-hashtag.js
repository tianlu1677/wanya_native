import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {getHashtagList} from '@/api/hashtag_api';
import HashtagList from '@/components/List/hash-tag-list';
import {Search} from '@/components/NodeComponents';
import {ProWrapper as pstyles} from '@/styles/baseCommon';

const AddHashTag = () => {
  const [searchKey, setSearchKey] = useState(null);

  return (
    <HashtagList
      request={{api: getHashtagList, params: {name_cont: searchKey}}}
      enableRefresh={false}
      enableLoadMore={false}
      type="add-hash-tag"
      style={styles.wrapper}
      searchKey={searchKey}
      ListHeaderComponent={
        <>
          <Search
            style={styles.search}
            placeholder="搜索更多场地"
            onChangeText={text => setSearchKey(text)}
          />
          <Text style={[pstyles.proCityText, pstyles.proWrapper]}>热门话题</Text>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  search: {
    paddingLeft: 14,
  },
});

export default AddHashTag;
