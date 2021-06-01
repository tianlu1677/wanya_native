import React, {useState, useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {getChatGroups, getChatGroupsDetail} from '@/api/chat_api';

const ChatList = props => {
  const {navigation} = props;
  const {currentAccount} = useSelector(state => state.account);
  const [listData, setListData] = useState([]);

  // const createChat = async () => {
  //   const params = {receiver_id: 1106};
  //   const res = await getChatGroupsDetail(params);
  //   console.log(res);
  // };

  const loadData = async () => {
    const res = await getChatGroups();
    console.log(res.data.chat_groups);
    setListData(res.data.chat_groups);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      {listData.map(item => {
        return (
          <Pressable
            key={item.uuid}
            onPress={() => {
              navigation.push('ChatDetailCommon', {uuid: item.uuid});
            }}>
            <Text style={{height: 50, lineHeight: 50, backgroundColor: 'pink', marginBottom: 10}}>
              {currentAccount.id === item.creator.id
                ? item.receiver.nickname
                : item.creator.nickname}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ChatList;