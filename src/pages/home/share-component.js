import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';

export const FollowShareComponent = () => {
  const dispatch = useDispatch();
  const {shareStatus} = useSelector(state => state.home);

  const onShareClose = () => {
    dispatch({type: action.CHANGE_SHARE_STATUS, value: false});
  };

  const onShare = () => {};

  return shareStatus ? (
    <Pressable style={styles.followShareWrap}>
      <View style={styles.followShare} onPress={onShare}>
        <FastImg style={styles.followShareImage} source={require('@/assets/images/share.png')} />
        <View>
          <Text>获取更多好友动态</Text>
          <Text style={styles.shareText}>分享给身边好友，邀请小伙伴一起玩呀！</Text>
        </View>
        <Pressable
          style={styles.deleteIcon}
          hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
          onPress={onShareClose}>
          <IconFont name="closed" size={16} />
        </Pressable>
      </View>
    </Pressable>
  ) : null;
};

export const NearbyShareComponent = () => {
  const dispatch = useDispatch();
  const {shareStatus} = useSelector(state => state.home);

  const onShareClose = () => {
    dispatch({type: action.CHANGE_SHARE_STATUS, value: false});
  };

  const onShare = () => {};

  return shareStatus ? (
    <Pressable style={styles.followShareWrap}>
      <View style={styles.followShare} onPress={onShare}>
        <FastImg style={styles.followShareImage} source={require('@/assets/images/share.png')} />
        <View>
          <Text>获取更多好友动态</Text>
          <Text style={styles.shareText}>分享给身边好友，邀请小伙伴一起玩呀！</Text>
        </View>
        <Pressable
          style={styles.deleteIcon}
          hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
          onPress={onShareClose}>
          <IconFont name="closed" size={16} />
        </Pressable>
      </View>
    </Pressable>
  ) : null;
};

const styles = StyleSheet.create({
  followShareWrap: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#efefef',
  },
  followShare: {
    height: RFValue(75),
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 2,
  },
  followShareImage: {
    width: RFValue(42),
    height: RFValue(40),
    marginRight: 16,
  },
  shareText: {
    fontSize: 11,
    color: '#BDBDBD',
    marginTop: 7,
  },
  deleteIcon: {
    marginLeft: 'auto',
  },
});
