import React, {useState} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
import {followAccount, unfollowAccount} from '@/api/account_api';

const BaseAccount = props => {
  const navigation = useNavigation();
  const {data, type} = props;
  const [followed, setFollowed] = useState(data.followed);
  const [following] = useState(data.following);

  const onFollowed = async () => {
    followed ? await unfollowAccount(data.id) : await followAccount(data.id);
    setFollowed(!followed);
  };

  const goDetail = () => {
    if (type === 'list') {
      navigation.push('AccountDetail', {accountId: data.id});
    }
  };

  return (
    <Pressable style={styles.wrapper} onPress={goDetail}>
      <Avator account={data} size={40} />
      <Text style={styles.nickname}>{data.nickname}</Text>
      <Text style={[styles.rightText, {color: followed ? '#bdbdbd' : '#000'}]} onPress={onFollowed}>
        {followed && following ? '互相关注' : followed ? '已关注' : '关注'}
      </Text>
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
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