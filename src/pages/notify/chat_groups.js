import React, {useCallback} from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {syncAccountInfo} from '@/api/mine_api';
import {BadgeMessage, Avator, RecommendSearch} from '@/components/NodeComponents';
import {dispatchCurrentAccount, dispatchBaseCurrentAccount} from '@/redux/actions';
import {
  SystemNoticeImg,
} from '@/utils/default-image';

const ChatGroups = ({navigation}) => {
  const dispatch = useDispatch();
  const {currentAccount} = useSelector(state => state.account);
  const {
    unread_system_messages_count,
  } = currentAccount;

  const goPageMethod = async (type = '') => {
    if (!currentAccount.id) {
      return;
    }
    switch (type) {
      case 'notify_praise':
        syncAccountInfo({
          id: currentAccount.id,
          profile_attributes: {unread_insite_notifies_count: 0},
        });
        navigation.navigate('PraiseNotify');
        break;
      default:
        break;
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(dispatchCurrentAccount());
      dispatch(dispatchBaseCurrentAccount());
    }, [])
  );

  return (
    <View>
      <View style={styles.wrapView}>
        <Pressable style={styles.itemView} onPress={goPageMethod.bind(this, 'notify_system')}>
          <View style={styles.coverWrapView}>
            <View>
              <Avator
                size={45}
                account={{avatar_url: SystemNoticeImg, settled_type: 'brand'}}
                handleClick={goPageMethod.bind(this, 'notify_system')}
              />
              <BadgeMessage
                value={unread_system_messages_count}
                containerStyle={styles.badgeContainer}
              />
            </View>
          </View>
          <View style={styles.notifyContent}>
            <Text style={styles.notifyContentTitle}>顽鸦小助手</Text>
            <Text style={styles.notifyContentDesc}>
              ⚡️
              {unread_system_messages_count > 0
                ? `有${unread_system_messages_count}条新的消息`
                : '查看消息通知'}{' '}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -7,
    top: -3,
  },
  wrapView: {
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
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: '500',
  },
  notifyContentDesc: {
    marginTop: 4,
    color: '#BDBDBD',
    letterSpacing: 1,
    fontSize: 13,
  },
  speator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 45 + 12,
  },
});

export default ChatGroups;
