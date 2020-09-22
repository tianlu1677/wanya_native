import React, {Component} from 'react';
import {Badge, withBadge} from 'react-native-elements';

const BadgeMessage = props => {
  return (
    <Badge
      status={props.status}
      value={props.value}
      {...props}
      // badgeStyle={{borderRadius: 7, width: 14, height: 14, fontSize: 9}}
      // containerStyle={{fontSize: 2}}
    />
  );
};

export default BadgeMessage;
