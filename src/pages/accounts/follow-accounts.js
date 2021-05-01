import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import AccountsList from '@/components/List/accounts-list';
import {getAccountFollowings} from '@/api/account_api';

const FollowAccounts = ({route}) => {
  const [accountId] = useState(route.params.accountId);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <AccountsList request={{api: getAccountFollowings, params: {id: accountId}}} type="list" />
    </>
  );
};

export default FollowAccounts;
