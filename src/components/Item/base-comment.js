import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Platform, ActionSheetIOS} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import {ActionSheet} from '@/components';
import {Avator} from '@/components/NodeComponents';
import {praiseComment, unpraiseComment} from '@/api/comment_api';
import {getAccountBaseInfo} from '@/api/account_api';

const hitSlop = {left: 10, right: 10, top: 10, bottom: 10};

const BaseComment = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {currentAccount} = useSelector(state => state.account);
  const [actionItems, setActionItems] = useState([]);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const {index, handlePraise, handleReply, deleteComment, topicId, commentable_type, data} = props;

  const {
    id,
    account,
    praise,
    praises_count,
    target_account_id,
    target_account_nickname,
    target_comment_content,
    mention_content = [],
    content,
    created_at_text,
    child_comments_count,
  } = data;

  const isCurrentSelf = account.id === currentAccount.id;

  const goAccountDetail = async nickname => {
    const res = await getAccountBaseInfo({name: nickname.replace('@', '')});
    navigation.push('AccountDetail', {accountId: res.data.account.id});
  };

  const onPraise = async () => {
    praise ? unpraiseComment(id) : praiseComment(id);
    const count = praises_count + (praise === true ? -1 : 1);
    const item = {...props.data, praises_count: count, praise: !praise};
    handlePraise(item, index);
  };

  const choseReplyComment = () => {
    const comment = {
      placeholder: `回复: @${account.nickname}`,
      comment_type: 'comment',
      commentable_type,
      commentable_id: topicId,
      target_comment_id: id,
      content: '',
    };
    dispatch({type: action.SAVE_COMMENT_CONTENT, value: comment});
    handleReply();
  };

  const choseAction = () => {
    const options = isCurrentSelf
      ? [
          {id: 1, label: '回复', onPress: () => choseReplyComment()},
          {id: 2, label: '删除', onPress: async () => deleteComment(id)},
        ]
      : [{id: 1, label: '回复', onPress: () => choseReplyComment()}];

    if (Platform.OS === 'ios') {
      const cancelItem = {id: '#cancel', label: '取消', type: 'cancel', onPress: () => {}};
      const actions = [...options, cancelItem];
      ActionSheetIOS.showActionSheetWithOptions(
        {options: actions.map(x => x.label), cancelButtonIndex: actions.length - 1},
        buttonIndex => actions[buttonIndex].onPress()
      );
    } else {
      setActionItems(options);
      setShowActionSheet(true);
    }
  };

  const onReportClick = () => {
    const params = {report_type: commentable_type, report_type_id: topicId};
    const options = [{id: 1, label: '投诉', onPress: () => navigation.push('Report', params)}];
    setActionItems(options);
    setShowActionSheet(true);
  };

  const Color = state => (state ? '#000' : '#bdbdbd');

  return (
    <View style={[styles.wrapper, props.style]}>
      <View style={styles.info}>
        <Avator account={account} size={25} />
        <Text style={styles.nickname}>{account.nickname}</Text>
        <Pressable onPress={onPraise} style={styles.numWrap} hitSlop={hitSlop}>
          <IconFont name="like" size={16} color={Color(praise)} />
          {praises_count > 0 && (
            <Text style={[styles.numCount, {color: Color(praise)}]}>{praises_count}</Text>
          )}
        </Pressable>
      </View>
      <Pressable style={styles.comment} onPress={choseAction}>
        {target_account_id && (
          <Text style={styles.more}>
            <Text style={styles.moreNickname}>{target_account_nickname}: </Text>
            <Text style={styles.moreText}>{target_comment_content || '评论已删除'}</Text>
          </Text>
        )}
        <Text numberOfLines={props.numberOfLines} style={styles.text}>
          {mention_content ? (
            mention_content.map((item, i) => (
              <Text key={i}>
                {item.is_mention ? (
                  <Text style={styles.hashtagText} onPress={() => goAccountDetail(item.content)}>
                    {item.content}&nbsp;
                  </Text>
                ) : null}
                {item.is_mention ? null : <Text space="nbsp">{item.content}</Text>}
              </Text>
            ))
          ) : (
            <Text>{content}</Text>
          )}
        </Text>
        <View style={styles.replyWrap}>
          <Text style={styles.reply}>
            {created_at_text} · 回复 {child_comments_count || ''}
          </Text>
          <Pressable onPress={onReportClick} hitSlop={hitSlop}>
            <IconFont name="gengduo" color="#bdbdbd" size={16} />
          </Pressable>
        </View>
      </Pressable>
      <ActionSheet
        actionItems={actionItems}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  nickname: {
    marginLeft: 7,
    color: '#9c9c9c',
    fontSize: 12,
  },
  numWrap: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  numCount: {
    marginLeft: 5,
    textAlign: 'center',
    fontSize: 12,
  },
  comment: {
    marginLeft: 32,
  },
  text: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'justify',
    marginBottom: 5,
  },
  hashtagText: {
    color: '#ff8d00',
    marginRight: 3,
  },
  more: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#f2f3f5',
    color: '#bdbdbd',
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 10,
  },
  moreNickname: {
    fontWeight: '500',
    color: '#bdbdbd',
    textAlign: 'justify',
  },
  moreText: {
    color: '#bdbdbd',
    textAlign: 'justify',
  },
  replyWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reply: {
    color: '#bdbdbd',
    fontSize: 11,
    lineHeight: 19,
    marginRight: 'auto',
  },
});

export default BaseComment;
