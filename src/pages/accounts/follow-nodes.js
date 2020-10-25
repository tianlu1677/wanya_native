import React, {useState} from 'react';
import {getFollowNodeIndex} from '@/api/node_api';

import NodeList from '@/components/List/node-list';

const FollowNodes = ({navigation, route}) => {
  const [accountId] = useState(route.params.accountId);

  return (
    <NodeList
      request={{api: getFollowNodeIndex, params: {account_id: accountId}}}
      enableRefresh={false}
    />
  );
};

export default FollowNodes;
