import React, {useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getAccountFollowers} from '@/api/account_api';
import {searchApi} from '@/api/search_api';
import * as action from '@/redux/constants';
import {MentiosAccountList} from '@/components/List/account-list';
import {Search} from '@/components/NodeComponents';
import {ProWrapper as pstyles} from '@/styles/baseCommon';

const MentionAccounts = ({navigation}) => {
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);
  const currentAccount = useSelector(state => state.account.currentAccount);

  const [request, setRequest] = useState({
    api: getAccountFollowers,
    params: {id: currentAccount.id},
  });

  const [searchKey, setSearchKey] = useState(null);

  const onPress = item => {
    const topics = {
      ...savetopic,
      plan_content: savetopic.plan_content
        ? `${savetopic.plan_content}@${item.nickname}`
        : `@${item.nickname}`,
      mention: savetopic.mention ? [...savetopic.mention, item] : [item],
    };
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.goBack();
  };

  useEffect(() => {
    if (searchKey) {
      setRequest({
        api: searchApi,
        params: {name: searchKey, type: 'account'},
      });
    } else {
      setRequest({
        api: getAccountFollowers,
        params: {id: currentAccount.id},
      });
    }
  }, [searchKey]);

  return (
    <MentiosAccountList
      request={request}
      onPress={onPress}
      enableLoadMore={false}
      enableRefresh={false}
      style={styles.wrapper}
      ListHeaderComponent={
        <>
          <Search
            style={styles.search}
            placeholder="搜索更多顽友"
            onChangeText={text => setSearchKey(text)}
            onCancel={() => navigation.goBack()}
          />
          <Text style={[pstyles.proCityText, pstyles.proWrapper]}>关注的顽友</Text>
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
    paddingLeft: 14,
  },
});

export default MentionAccounts;
