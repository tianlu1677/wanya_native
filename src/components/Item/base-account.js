import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {RFValue} from '@/utils/response-fontsize';
import {Avator} from '@/components/NodeComponents';

const BaseAccount = props => {
  const {data} = props;

  const onPress = item => {};

  const onFollowed = () => {};

  return (
    <Pressable style={styles.wrapper} onPress={() => onPress(data)}>
      <Avator account={data} size={40} handleClick={() => onPress(data)} />
      <Text style={styles.nickname}>{data.nickname}</Text>
      <Text
        style={[styles.rightText, {color: data.followed ? '#bdbdbd' : '#000'}]}
        onPress={onFollowed}>
        {data.followed && data.following ? '互相关注' : data.followed ? '已关注' : '关注'}
      </Text>
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  nickname: {
    fontSize: 14,
    marginLeft: 10,
  },
  rightText: {
    marginLeft: 'auto',
    fontWeight: '500',
    marginRight: 4,
  },
});

export default BaseAccount;
