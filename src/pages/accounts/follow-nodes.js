import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {getFollowNodeIndex} from '@/api/node_api';
import NodeList from '@/components/List/node-list';

const FollowNodes = ({route}) => {
  const [accountId] = useState(route.params.accountId);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <NodeList request={{api: getFollowNodeIndex, params: {account_id: accountId}}} type="list" />
    </>
  );
};

export default FollowNodes;
