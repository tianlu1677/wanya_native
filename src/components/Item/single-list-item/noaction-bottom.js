import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Vibration} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {Avator} from '@/components/NodeComponents';
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

export const NoActionBottom = props => {
  const {
    avator,
    style,
    data: {node_name, praises_count, comments_count},
  } = props;

  return (
    <Text style={[nbstyles.infotext, style]}>
      {avator ? avator : ''}
      {avator && node_name ? ' · ' : ''}
      {node_name ? `${node_name}` : ''}
      {(avator || node_name) && praises_count ? ' · ' : ''}
      {praises_count ? `赞${praises_count}` : ''}
      {(avator || node_name || praises_count) && comments_count ? ' · ' : ''}
      {comments_count ? `评论${comments_count}` : ''}
    </Text>
  );
};

const nbstyles = StyleSheet.create({
  infotext: {
    color: '#BDBDBD',
    fontSize: 11,
  },
});

export default NoActionBottom;
