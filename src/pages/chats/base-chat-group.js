import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BadgeMessage, Avator, RecommendSearch} from '@/components/NodeComponents';
import {readSingleChatGroupMessage} from '@/api/chat_api';

const BaseChatGroup = ({navigation, chat_group}) => {
  const dispatch = useDispatch();
  const {currentAccount} = useSelector(state => state.account);
  const {uuid, send_message_account, last_conversation, last_message_at_text} = chat_group;
  let {unread_message} = chat_group;
  const goChatDetail = () => {
    console.log('navigation', uuid);
    navigation.navigate('ChatDetailCommon', {
      uuid: uuid,
      target_account_nickname: send_message_account.nickname,
    });
    readSingleChatGroupMessage({uuid: uuid});
    unread_message[currentAccount.id] = 0;
  };

  return (
    <View key={`chatgroup_${chat_group.uuid}`}>
      <Pressable style={styles.itemView} onPress={goChatDetail}>
        <View style={styles.coverWrapView}>
          <View>
            <Avator size={45} account={send_message_account} handleClick={() => {}} />
            <BadgeMessage
              value={unread_message[currentAccount.id]}
              containerStyle={styles.badgeContainer}
            />
          </View>
        </View>
        <View style={styles.notifyContent}>
          <Text style={styles.notifyContentTitle}>{send_message_account.nickname}</Text>
          {last_conversation && (
            <Text numberOfLines={3}
              style={styles.notifyContentDesc}>{last_conversation.content}</Text>
          )}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
          <Text style={styles.timeText}>{last_message_at_text}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -7,
    top: -3,
  },
  wrapper: {
    backgroundColor: '#fff',
    paddingLeft: 14,
  },
  itemView: {
    flexDirection: 'row',
    paddingVertical: 17,
  },
  coverWrapView: {
    marginRight: 12,
  },
  notifyContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notifyContentTitle: {
    height: 20,
    lineHeight: 20,
    fontSize: 15,
    letterSpacing: 1,
    fontWeight: '400',
  },
  notifyContentDesc: {
    marginTop: 6,
    color: '#BDBDBD',
    letterSpacing: 1,
    fontWeight: '400',
    fontSize: 13,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '300',
    color: '#bdbdbd',
  },
  speator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 45 + 12,
  },
});

export default BaseChatGroup;
