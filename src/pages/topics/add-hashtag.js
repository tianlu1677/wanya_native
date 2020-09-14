import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {getHashtagList} from '@/api/hashtag_api';
import HashtagList from '@/components/List/hash-tag-list';
import {Search} from '@/components/NodeComponents';
import {ProWrapper as pstyles} from '@/styles/baseCommon';
import {searchApi} from '@/api/search_api';

const AddHashTag = () => {
  const [searchKey, setSearchKey] = useState(null);
  const [request, setRequest] = useState({
    api: getHashtagList,
    params: {name_cont: searchKey},
  });

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
    <HashtagList
      request={request}
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
