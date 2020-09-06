import React, {useState} from 'react';
import {getFollowNodeIndex} from '@/api/node_api';

import NodeList from '@/components/List/node-list';

const FollowNodes = ({navigation, route}) => {
  const [accountId] = useState(route.params.accountId);
  console.log(route);

  return <NodeList request={{api: getFollowNodeIndex, params: {account_id: accountId}}} />;
};

export default FollowNodes;
