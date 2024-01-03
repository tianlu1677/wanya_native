import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {TabRouter, useNavigation} from '@react-navigation/native';
import {Avator, JoinButton} from '@/components/NodeComponents';
import {getChatGroupsDetail} from '@/api/chat_api';

const BaseMail = ({item}) => {
  const navigation = useNavigation();
  const {id, nickname, intro} = item;

  const handleGoDetail = () => {
    navigation.push('AccountDetail', {accountId: id});
  };

  const handleCreateChat = async () => {
    const params = {receiver_id: id};
    const res = await getChatGroupsDetail(params);
    const {uuid} = res.data.chat_group;
    navigation.navigate('ChatDetail', {uuid, targetAccountId: item.id, targetAccountNickname: item.nickname });
  };

  return (
    <Pressable style={bStyles.wrapper} onPress={handleGoDetail}>
      <Avator size={45} account={item} />
      <View style={bStyles.accountInfo}>
        <Text style={bStyles.nickname}>{nickname}</Text>
        <Text style={bStyles.intro} numberOfLines={1}>
          {intro || '探索与发现 记录与分享'}
        </Text>
      </View>
      <JoinButton join={false} text="私聊" onPress={handleCreateChat} borderRadius={true} />
    </Pressable>
  );
};

const bStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  accountInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nickname: {
    fontSize: 15,
  },
  intro: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 5,
  },
});

export default BaseMail;
