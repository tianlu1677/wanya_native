import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useSelector} from 'react-redux';
import {getAccountFollowings} from '@/api/account_api';
import {searchApi} from '@/api/search_api';
import {MentionsAccountList} from '@/components/List/account-list';
import {Search} from '@/components/NodeComponents';
import {ProWrapper as pstyles} from '@/styles/baseCommon';

const MentionAccounts = ({navigation, route}) => {
  const currentAccount = useSelector(state => state.account.currentAccount);
  const [request, setRequest] = useState(null);
  const [searchKey, setSearchKey] = useState(null);

  useEffect(() => {
    if (searchKey) {
      setRequest({
        api: searchApi,
        params: {name: searchKey, type: 'account'},
      });
    } else {
      setTimeout(() => {
        setRequest({
          api: getAccountFollowings,
          params: {id: currentAccount.id, per_page: 20},
        });
      }, 300);
    }
  }, [searchKey]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.wrapper}>
        <Search
          style={styles.search}
          placeholder="搜索更多顽友"
          onChangeText={text => setSearchKey(text)}
          onCancel={() => navigation.goBack()}
        />
        <View style={pstyles.proWrapper}>
          <Text style={pstyles.proTitle}>{searchKey ? '搜索到的顽友' : '关注的顽友'}</Text>
        </View>
        {request && (
          <MentionsAccountList request={request} enableRefresh={false} type={route.params.type} />
        )}
      </View>
    </TouchableWithoutFeedback>
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

export default MentionAccounts;
