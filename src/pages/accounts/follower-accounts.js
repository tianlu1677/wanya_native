import React, {useState} from 'react';
import {AccountList} from '@/components/List/account-list';
import {getAccountFollowers} from '@/api/account_api';

const FollowerAccounts = ({navigation, route}) => {
  const [accountId] = useState(route.params.accountId);
  return <AccountList request={{api: getAccountFollowers, params: {id: accountId}}} />;
};

export default FollowerAccounts;
