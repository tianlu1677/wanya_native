import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActionSheetIOS, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import ScrollList from '@/components/ScrollList';
import {praiseComment, unpraiseComment} from '@/api/comment_api';
import {useActionSheet} from '@expo/react-native-action-sheet';
import * as action from '@/redux/constants';

const CommentList = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {showActionSheetWithOptions} = useActionSheet();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const choseAction = v => {
    let options = {
      options: ['取消', '回复'],
      cancelButtonIndex: 0,
    };

    if (v.account.id === currentAccount.id) {
      options = {
        options: ['取消', '回复', '删除'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      };
    }

    // 区分删除和回复
    ActionSheetIOS.showActionSheetWithOptions(options, buttonIndex => {
      if (buttonIndex === 1) {
        const comment = {
          placeholder: `回复: @${v.account.nickname}`,
          comment_type: 'comment',
          commentable_type: props.type,
          commentable_id: props.detail.id,
          content: '',
          target_comment_id: v.id,
        };
        dispatch({type: action.SAVE_COMMENT_TOPIC, value: comment});
        props.changeVisible(true);
      } else if (buttonIndex === 2) {
        props.deleteComment(v.id);
      }
    });
  };

  const onPraise = async (item, index) => {
    if (item.praise) {
      await unpraiseComment(item.id);
    } else {
      await praiseComment(item.id);
    }

    const newItem = {
      ...item,
      praises_count: item.praises_count + (item.praise === true ? -1 : 1),
      praise: !item.praise,
    };
    listData[index] = newItem;
    setListData([...listData]);
  };

  const onReportClick = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['取消', '举报'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          navigation.push('Report', {report_type: props.type, report_type_id: props.detail.id});
        }
      }
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={item.id} style={[cstyles.wrapper, props.style]}>
        <View style={cstyles.info}>
          <Avator account={item.account} size={25} />
          <Text style={cstyles.nickname}>{item.account.nickname}</Text>
          <Pressable
            onPress={() => onPraise(item, index)}
            style={cstyles.numWrap}
            hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
            <IconFont name="like" size={16} color={item.praise ? '#000' : '#bdbdbd'} />
            <Text style={[cstyles.numCount, {color: item.praise ? '#000' : '#bdbdbd'}]}>
              {item.praises_count > 0 ? item.praises_count : ''}
            </Text>
          </Pressable>
        </View>
        <Pressable style={cstyles.comment} onPress={() => choseAction(item)}>
          {item.target_account_id && (
            <Text style={cstyles.more}>
              <Text style={cstyles.moreNickname}>{item.target_account_nickname}: </Text>
              <Text style={cstyles.moreText}>
                {item.target_comment_content ? item.target_comment_content : '评论已删除'}
              </Text>
            </Text>
          )}
          <Text style={cstyles.text}>{item.content}</Text>
          <View style={cstyles.replyWrap}>
            <Text style={cstyles.reply}>
              {item.created_at_text} · 回复{' '}
              {item.child_comments_count ? item.child_comments_count : ''}
            </Text>
            <Pressable
              onPress={onReportClick}
              hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
              style={{marginLeft: 'auto'}}>
              <IconFont name="gengduo" color="#bdbdbd" size={16} />
            </Pressable>
          </View>
        </Pressable>
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={cstyles.separator} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({id: params.id, page});
    const data = res.data.comments;
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [props.detail]);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      enableRefresh={false}
      bounces={false}
      renderSeparator={renderSeparator}
      {...props}
    />
  );
};

const cstyles = StyleSheet.create({
  wrapper: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    // padding: 16,
    // paddingBottom: 10,
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
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
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
  },
  separator: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 49,
  },
});

export default CommentList;
