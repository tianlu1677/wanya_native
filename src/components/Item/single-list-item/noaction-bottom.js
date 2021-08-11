import React from 'react';
import {Text, StyleSheet} from 'react-native';

export const NoActionBottom = props => {
  const {
    avator,
    style,
    data: {node_name, praises_count, comments_count},
  } = props;

  return (
    <Text style={[nbstyles.infotext, style]}>
      {avator ? avator : ''}
      {avator && node_name ? ' · ' : ''}
      {node_name ? `${node_name}` : ''}
      {(avator || node_name) && praises_count ? ' · ' : ''}
      {praises_count ? `赞${praises_count}` : ''}
      {(avator || node_name || praises_count) && comments_count ? ' · ' : ''}
      {comments_count ? `评论${comments_count}` : ''}
    </Text>
  );
};

const nbstyles = StyleSheet.create({
  infotext: {
    color: '#BDBDBD',
    fontSize: 11,
    backgroundColor: '#fff',
  },
});

export default NoActionBottom;
