import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ActionSheetIOS} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import ScrollList from '@/components/ScrollList';
import {praiseComment, unpraiseComment} from '@/api/comment_api';
import {useActionSheet} from '@expo/react-native-action-sheet';
import * as action from '@/redux/constants';

const CommentList = props => {
  const dispatch = useDispatch();
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

  const renderItem = ({item, index}) => {
    return (
      <View key={item.id} style={cstyles.wrapper}>
        <View style={cstyles.info}>
          <Avator account={item.account} size={25} />
          <Text style={{marginLeft: 7}}>{item.account.nickname}</Text>
          <TouchableOpacity
            onPress={() => onPraise(item, index)}
            style={{marginLeft: 'auto', flexDirection: 'row'}}>
            <IconFont name="like" size={16} color={item.praise ? '#000' : '#bdbdbd'} />
            <Text style={{marginLeft: 5, color: item.praise ? '#000' : '#bdbdbd'}}>
              {item.praises_count}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{marginLeft: 32}} onPress={() => choseAction(item)}>
          <View style={cstyles.comment}>
            <Text style={cstyles.text}>{item.content}</Text>
            {item.target_account_id && (
              <View style={cstyles.more}>
                <Text style={{fontWeight: '500'}}>{item.target_account_nickname}: </Text>
                <Text>
                  {item.target_comment_content ? item.target_comment_content : '评论已删除'}
                </Text>
              </View>
            )}
            <Text style={{color: '#bdbdbd', fontSize: 11}}>
              {item.created_at_text} · 回复{' '}
              {item.child_comments_count ? item.child_comments_count : ''}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={{backgroundColor: '#ebebeb', height: 1, marginLeft: 49}} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({id: params.id, page});
    const data = res.data.comments;
    setLoading(false);
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
  };

  useEffect(() => {
    loadData();
  }, []);

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
      renderSeparator={renderSeparator}
      {...props}
      style={{backgroundColor: '#fff'}}
    />
  );
};

const cstyles = StyleSheet.create({
  wrapper: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    paddingBottom: 10,
  },
  text: {
    fontSize: 13,
    marginTop: 11,
    marginBottom: 11,
  },
  more: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 11,
    paddingBottom: 11,
    backgroundColor: '#f2f3f5',
    color: '#bdbdbd',
    marginBottom: 11,
    fontSize: 12,
  },
});

export default CommentList;
