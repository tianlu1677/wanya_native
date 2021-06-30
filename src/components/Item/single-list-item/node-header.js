import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Vibration} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {Avator} from '@/components/NodeComponents';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import LocationBar from '@/components/LocationBar';
import {deleteTopic} from '@/api/topic_api';
import {deleteTheory} from '@/api/theory_api';
import {getAccountBaseInfo} from '@/api/account_api';
import {dispatchShareItem} from '@/redux/actions';
import ActionSheet from '@/components/ActionSheet';
import {cancelAction, createAction} from '@/api/action_api';
import {VWValue} from '@/utils/response-fontsize';

export const NodeHeader = props => {
  const navigation = useNavigation();
  const {
    data: {account, node_name, published_at_text},
  } = props;

  const goAccountDetail = async nickname => {
    const res = await getAccountBaseInfo({name: nickname.replace('@', '')});
    navigation.push('AccountDetail', {accountId: res.data.account.id});
  };

  console.log(props.data);

  return (
    <View style={styles.headerView}>
      <FastImg source={{uri: account.avatar_url}} style={styles.nodeImage} />
      <Pressable style={styles.content} onPress={goAccountDetail}>
        <Text style={styles.nameText}>{node_name}</Text>
        <View style={styles.infoWrapper}>
          <Avator account={account} size={VWValue(17)} />
          <Text style={styles.nickname}>{account.nickname}</Text>
          <Text style={styles.timeText}>{published_at_text}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodeImage: {
    width: VWValue(40),
    height: VWValue(40),
  },
  content: {
    height: VWValue(40),
    marginLeft: 12,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1F1F1F',
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  nickname: {
    fontSize: 11,
    color: '#3C3C3C',
    marginHorizontal: VWValue(5),
  },
  timeText: {
    fontSize: 11,
    color: '#bdbdbd',
  },
});

export default NodeHeader;
