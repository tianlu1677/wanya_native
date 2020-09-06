import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {getHashtagList} from '@/api/hashtag_api';
import HashtagList from '@/components/List/hash-tag-list';
import {Search} from '@/components/NodeComponents';

const AddHashTag = () => {
  const [searchKey, setSearchKey] = useState(null);

  return (
    <HashtagList
      request={{api: getHashtagList, params: {name_cont: searchKey}}}
      enableRefresh={false}
      enableLoadMore={false}
      type="add-hash-tag"
      ListHeaderComponent={
        <>
          <Search
            style={styles.search}
            placeholder="搜索更多话题"
            onChangeText={text => setSearchKey(text)}
          />
          <Text style={styles.title}>热门话题</Text>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    marginLeft: 14,
    marginBottom: 6,
  },
  title: {
    height: 40,
    lineHeight: 40,
    paddingLeft: 14,
    color: '#bdbdbd',
    backgroundColor: '#fafafa',
  },
});

export default AddHashTag;
