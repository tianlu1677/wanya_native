import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getAccountFollowings} from '@/api/account_api';
import {searchApi} from '@/api/search_api';
import AccountsList from '@/components/List/accounts-list';
import {Search} from '@/components/NodeComponents';
import {ProWrapper as pstyles} from '@/styles/baseCommon';
import {RFValue} from '@/utils/response-fontsize';
import * as action from '@/redux/constants';

const MentionAccounts = ({navigation, route}) => {
  const {type} = route.params;
  const currentAccount = useSelector(state => state.account.currentAccount);
  const dispatch = useDispatch();
  const [request, setRequest] = useState(null);
  const [searchKey, setSearchKey] = useState(null);
  const comment = useSelector(state => state.home.commentContent);

  const goBack = () => {
    navigation.goBack();
    dispatch({type: action.SAVE_COMMENT_CONTENT, value: {...comment, content: comment.content}});
  };

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
          inputStyle={{
            borderRadius: RFValue(19),
            lineHeight: RFValue(36),
            backgroundColor: '#F2F3F5',
          }}
          height={RFValue(36)}
          cancelWidth={RFValue(66)}
          placeholderTextColor="#7F7F81"
          placeholder="搜索更多顽友"
          onChangeText={text => setSearchKey(text)}
          onCancel={() => goBack()}
        />

        <View style={pstyles.proWrapper}>
          <Text style={pstyles.proTitle}>{searchKey ? '搜索到的顽友' : '关注的顽友'}</Text>
        </View>

        {request && <AccountsList request={request} enableRefresh={false} type={type} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default MentionAccounts;
