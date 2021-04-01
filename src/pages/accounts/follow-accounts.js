import React, {useState} from 'react';
import AccountsList from '@/components/List/accounts-list';
import {getAccountFollowings} from '@/api/account_api';

const FollowAccounts = ({navigation, route}) => {
  const [accountId] = useState(route.params.accountId);

  return (
    <AccountsList
      request={{api: getAccountFollowings, params: {id: accountId}}}
      type="list"
      enableRefresh={false}
    />
  );
};

export default FollowAccounts;
