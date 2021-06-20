import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import FastImg from '@/components/FastImg';
import {BadgeMessage, Avator} from '@/components/NodeComponents';
import {readSingleChatGroupMessage} from '@/api/chat_api';
import {RFValue} from '@/utils/response-fontsize';
import {EMOJIS_DATA} from '@/plugins/react-native-easy-chat-ui';

const PATTERNS = {
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
  phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}/,
  emoji: new RegExp('\\/\\{[a-zA-Z_]{1,14}\\}'),
};

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

  const _matchContentString = (textContent, views) => {
    // 匹配得到index并放入数组中
    if (textContent.length === 0) {
      return;
    }
    let emojiIndex = textContent.search(PATTERNS.emoji);
    let checkIndexArray = [];

    // 若匹配不到，则直接返回一个全文本
    if (emojiIndex === -1) {
      views.push(
        <Text key={'emptyTextView' + Math.random() * 100} style={styles.notifyContentText}>
          {textContent}
        </Text>
      );
    } else {
      if (emojiIndex !== -1) {
        checkIndexArray.push(emojiIndex);
      }
      // 取index最小者
      let minIndex = Math.min(...checkIndexArray);
      // 将0-index部分返回文本
      views.push(
        <Text key={'firstTextView' + Math.random() * 100} style={styles.notifyContentText}>
          {textContent.substring(0, minIndex)}
        </Text>
      );

      // 将index部分作分别处理
      _matchEmojiString(textContent.substring(minIndex), views);
    }
  };

  const _matchEmojiString = (emojiStr, views) => {
    let castStr = emojiStr.match(PATTERNS.emoji);
    let emojiLength = castStr[0].length;

    let emojiImg = EMOJIS_DATA[castStr[0]];

    if (emojiImg) {
      views.push(
        <FastImg key={emojiStr} style={styles.subEmojiStyle} mode={'contain'} source={emojiImg} />
      );
    }

    _matchContentString(emojiStr.substring(emojiLength), views);
  };

  const _getActualText = textContent => {
    let views = [];
    _matchContentString(textContent, views);
    return views;
  };

  return (
    <Pressable style={styles.itemView} key={chat_group.uuid} onPress={goChatDetail}>
      <View style={styles.coverWrapView}>
        <Avator size={45} account={send_message_account} />
        <BadgeMessage
          value={unread_message[currentAccount.id]}
          containerStyle={styles.badgeContainer}
        />
      </View>
      <View style={styles.notifyContent}>
        <Text style={styles.notifyContentTitle}>{send_message_account.nickname}</Text>
        {last_conversation ? (
          <View style={styles.notifyContentDesc}>
            {last_conversation.category === 'text' ? (
              _getActualText(last_conversation.content)
            ) : (
              <Text style={styles.notifyContentText}>{last_conversation.payload.text}</Text>
            )}
          </View>
        ) : (
          <Text style={styles.notifyContentDesc} />
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
    fontSize: 15,
    letterSpacing: 1,
  },
  notifyContentDesc: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  notifyContentText: {
    color: '#BDBDBD',
    letterSpacing: 1,
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
  subEmojiStyle: {
    width: 18,
    height: 18,
  },
});

export default BaseChatGroup;
