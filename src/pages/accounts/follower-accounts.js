import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import AccountsList from '@/components/List/accounts-list';
import {getAccountFollowers} from '@/api/account_api';

const FollowerAccounts = ({navigation, route}) => {
  const [accountId] = useState(route.params.accountId);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <AccountsList request={{api: getAccountFollowers, params: {id: accountId}}} type="normal" />
    </>
  );
};

export default FollowerAccounts;
