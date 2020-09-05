import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getAccountFollowers} from '@/api/account_api';
import {searchApi} from '@/api/search_api';
import * as action from '@/redux/constants';
import {MentiosAccountList} from '@/components/List/account-list';
import {Search} from '@/components/NodeComponents';

import {BaseSearchText as styles} from '@/styles/baseCommon';

const MentionAccounts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);

  const [request, setRequest] = useState({
    api: getAccountFollowers,
    params: {id: 310},
  });

  const [searchKey, setSearchKey] = useState(null);

  const onPress = item => {
    const topics = {
      ...savetopic,
      plan_content: `${savetopic.plan_content} @${item.nickname}`,
      mention: [...savetopic.mention, item],
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
        params: {id: 310},
      });
    }
  }, [searchKey]);

  return (
    <View>
      <Search
        style={styles.search}
        placeholder="搜索更多顽友"
        onChangeText={text => setSearchKey(text)}
      />
      <Text style={styles.title}>{searchKey ? '搜索到的顽友' : '关注的顽友'}</Text>
      <MentiosAccountList
        request={request}
        onPress={onPress}
        enableLoadMore={false}
        enableRefresh={false}
      />
    </View>
  );
};

export default MentionAccounts;
