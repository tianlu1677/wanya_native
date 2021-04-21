import React from 'react';
import {useSelector} from 'react-redux';
import AccountsList from '@/components/List/accounts-list';
import {getAccountRecentFollowers} from '@/api/account_api';

const FollowAccounts = () => {
  const currentAccount = useSelector(state => state.account.currentAccount);

  return (
    <AccountsList
      request={{
        api: getAccountRecentFollowers,
        params: {id: currentAccount.id, per_page: 15},
        right_text: '关注了你',
      }}
      type="newfans"
    />
  );
};

export default FollowAccounts;
