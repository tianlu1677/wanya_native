import React, {useState} from 'react';
import AccountsList from '@/components/List/accounts-list';
import {getAccountFollowings} from '@/api/account_api';

const FollowAccounts = ({route}) => {
  const [accountId] = useState(route.params.accountId);

  return (
    <AccountsList request={{api: getAccountFollowings, params: {id: accountId}}} type="list" />
  );
};

export default FollowAccounts;
