import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
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
    navigation.navigate('ChatDetail', {uuid, targetAccount: item});
  };

  return (
    <Pressable style={bStyles.wrapper} onPress={handleGoDetail}>
      <Avator size={45} account={item} />
      <View style={bStyles.accountInfo}>
        <Text style={bStyles.nickname}>{nickname}</Text>
        <Text style={bStyles.intro}>{intro || '探索与发现 记录与分享'} </Text>
      </View>
      <Text style={bStyles.btn} onPress={handleCreateChat}>
        私聊
      </Text>
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
  btn: {
    marginLeft: 'auto',
    width: 54,
    height: 27,
    lineHeight: 27,
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: '#000',
    borderRadius: 13,
    overflow: 'hidden',
  },
});

export default BaseMail;
