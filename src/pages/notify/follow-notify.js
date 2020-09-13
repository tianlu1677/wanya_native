import React, {useState} from 'react';
import {AccountList} from '@/components/List/account-list';
import {getAccountRecentFollowers} from '@/api/account_api';
import {connect, useSelector} from 'react-redux';

const FollowAccounts = ({navigation, route}) => {
  // const [accountId] = useState(route.params.accountId);
  const currentAccount = useSelector(state => state.account.currentAccount);
  return (
    <AccountList
      request={{
        api: getAccountRecentFollowers,
        params: {id: currentAccount.id},
        account_type: 'account_recent_follow',
        right_text: '关注了你'
      }}
    />
  );
};

export default FollowAccounts;
