import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import AccountsList from '@/components/List/accounts-list';
import {getAccountRecentFollowers} from '@/api/account_api';

const FollowAccounts = () => {
  const currentAccount = useSelector(state => state.account.currentAccount);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <AccountsList
        request={{
          api: getAccountRecentFollowers,
          params: {id: currentAccount.id, per_page: 15},
          right_text: '关注了你',
        }}
        type="newfans"
      />
    </View>
  );
};

export default FollowAccounts;
