import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {BadgeMessage} from '@/components/NodeComponents';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';

const CurrentAvator = () => {
  const navigation = useNavigation();
  const {currentAccount, currentBaseInfo} = useSelector(state => state.account);

  const UnreadMessageCount = () => {
    if (!currentBaseInfo || currentBaseInfo.new_message_count === 0) {
      return 0;
    }
    return currentBaseInfo.new_message_count;
  };

  return (
    <Pressable onPress={() => navigation.openDrawer()} style={styles.avatorWrap}>
      <BadgeMessage
        size={'middle'}
        value={UnreadMessageCount()}
        containerStyle={[
          styles.badge,
          {
            right:
              UnreadMessageCount() >= 1 && UnreadMessageCount() < 10
                ? -VWValue(-4)
                : UnreadMessageCount() > 99
                ? -VWValue(4) * 1.75
                : -VWValue(1) * 1.45,
          },
        ]}
      />
      <FastImg style={styles.avator} source={{uri: currentAccount.avatar_url}} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  avatorWrap: {
    position: 'relative',
    zIndex: 2,
  },
  avator: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RFValue(15),
  },
  badge: {
    position: 'absolute',
    top: -5,
    zIndex: 1,
  },
});

export default CurrentAvator;
