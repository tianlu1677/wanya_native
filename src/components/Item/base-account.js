import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {Avator} from '@/components/NodeComponents';
import {followAccount, unfollowAccount} from '@/api/account_api';

// list     关注列表
// normal   粉丝列表
// related  关注——相关推荐（显示前50位）
// newfans  新增粉丝text
// add-node 发布帖子
// comment  评论
// search   搜索
const BaseAccount = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const savetopic = useSelector(state => state.home.savetopic);
  const savecomment = useSelector(state => state.home.commentContent);

  const {data, type} = props;
  const [followed, setFollowed] = useState(data.followed);
  const [following] = useState(data.following);

  const onFollowed = async () => {
    followed ? await unfollowAccount(data.id) : await followAccount(data.id);
    setFollowed(!followed);
  };

  const goDetail = () => {
    if (['list', 'normal', 'related', 'newfans', 'search'].includes(type)) {
      navigation.push('AccountDetail', {accountId: data.id});
    }

    if (type === 'add-node') {
      const topics = {
        ...savetopic,
        plan_content: savetopic.plan_content
          ? `${savetopic.plan_content} @${data.nickname} `
          : `@${data.nickname} `,
        mention: savetopic.mention ? [...savetopic.mention, data] : [data],
      };
      dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
      navigation.goBack();
    }

    if (type === 'comment') {
      const comments = {
        ...savecomment,
        content: savecomment.content
          ? `${savecomment.content} @${data.nickname} `
          : `@${data.nickname} `,
        mention_ids: savecomment.mention_ids ? [...savecomment.mention_ids, data.id] : [data.id],
      };
      dispatch({type: action.SAVE_COMMENT_CONTENT, value: comments});
      navigation.goBack();
    }
  };

  const AccountRight = () => {
    return (
      <Text
        onPress={onFollowed}
        style={[styles.followText, {color: followed ? '#bdbdbd' : '#000'}]}>
        {followed && following ? '互相关注' : followed ? '已关注' : '关注'}
      </Text>
    );
  };

  const AccountCenter = () => {
    return (
      <View style={styles.accountCenter}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.nickname}>{data.nickname}</Text>
          <Text style={styles.right_text}>{data.right_text}</Text>
        </View>
        {data.created_at_text && <Text style={styles.created_at_text}>{data.created_at_text}</Text>}
      </View>
    );
  };

  return (
    <Pressable style={styles.wrapper} onPress={goDetail}>
      <Avator account={data} size={40} />

      {/* center */}
      {['list', 'related', 'add-node', 'comment', 'normal', 'search'].includes(type) && (
        <View style={styles.accountCenter}>
          <Text style={styles.nickname}>{data.nickname}</Text>
        </View>
      )}

      {/* center */}
      {['newfans'].includes(type) && <AccountCenter />}

      {['list', 'related', 'newfans', 'search'].includes(type) && <AccountRight />}
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#fff',
  },
  accountCenter: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  nickname: {
    fontSize: 14,
  },
  right_text: {
    fontSize: 13,
    color: '#BDBDBD',
    marginLeft: 10,
  },
  created_at_text: {
    fontSize: 11,
    color: '#BDBDBD',
    marginTop: 8,
  },
  followText: {
    marginLeft: 'auto',
    fontWeight: '500',
    marginRight: 4,
  },
});

export default BaseAccount;
