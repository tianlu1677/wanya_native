import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {BadgeMessage, Avator} from '@/components/NodeComponents';
import {readSingleChatGroupMessage} from '@/api/chat_api';
import {RFValue} from '@/utils/response-fontsize';

const BaseChatGroup = ({navigation, chat_group}) => {
  const {currentAccount} = useSelector(state => state.account);
  const {
    uuid,
    send_message_account,
    last_conversation,
    last_message_at_text,
    unread_message,
  } = chat_group;

  const goChatDetail = () => {
    navigation.navigate('ChatDetail', {uuid, targetAccount: send_message_account});
    readSingleChatGroupMessage({uuid: uuid});
    unread_message[currentAccount.id] = 0;
  };

  return (
    <Pressable style={styles.itemView} key={chat_group.uuid} onPress={goChatDetail}>
      <View style={styles.coverWrapView}>
        <Avator size={45} account={send_message_account} handleClick={() => {}} />
        <BadgeMessage
          value={unread_message[currentAccount.id]}
          containerStyle={styles.badgeContainer}
        />
      </View>
      <View style={styles.notifyContent}>
        <Text style={styles.notifyContentTitle}>{send_message_account.nickname}</Text>
        {last_conversation && (
          <Text style={styles.notifyContentDesc}>
            {last_conversation.content || last_conversation.payload.text}
          </Text>
        )}
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.timeText}>{last_message_at_text}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -7,
    top: -3,
  },
  itemView: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: RFValue(12),
    backgroundColor: '#fff',
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
  messageContent: {
    flexDirection: 'row',
  },
});

export default BaseChatGroup;
