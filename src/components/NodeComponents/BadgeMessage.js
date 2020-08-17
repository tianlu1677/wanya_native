import React, {Component} from 'react';
import {Badge, withBadge} from 'react-native-elements';


const BadgeMessage = props => {
  return (<Badge status={props.status} value={props.value} {...props} />);
};
export default BadgeMessage;