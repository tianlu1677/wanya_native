import React, {useState} from 'react';
import {AccountList} from '@/components/List/account-list';
import {getAccountFollowings} from '@/api/account_api';

const FollowAccounts = ({navigation, route}) => {
  const [accountId] = useState(route.params.accountId);
  return <AccountList request={{api: getAccountFollowings, params: {id: accountId}}} />;
};

export default FollowAccounts;
