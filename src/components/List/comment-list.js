import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import ScrollList from '@/components/ScrollList';
import {praiseComment, unpraiseComment} from '@/api/comment_api';
import {getAccountBaseInfo} from '@/api/account_api';
import * as action from '@/redux/constants';
import ActionSheet from '@/components/ActionSheet';

const CommentList = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionItems, setActionItems] = useState([]);

  const choseReplyComment = v => {
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
  };

  const choseAction = v => {
    let options = [];
    const isCurrentSelf = v.account.id === currentAccount.id;
    if (isCurrentSelf) {
      options = [
        {
          id: 1,
          label: '回复',
          onPress: () => {
            choseReplyComment(v);
          },
        },
        {
          id: 2,
          label: '删除',
          onPress: async () => {
            props.deleteComment(v.id);
          },
        },
      ];
    } else {
      options = [
        {
          id: 1,
          label: '回复',
          onPress: () => {
            choseReplyComment(v);
          },
        },
      ];
    }
    setActionItems(options);
    setShowActionSheet(true);
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
    const options = [
      {
        id: 1,
        label: '举报',
        onPress: () => {
          navigation.push('Report', {report_type: props.type, report_type_id: props.detail.id});
        },
      },
    ];

    setActionItems(options);
    setShowActionSheet(true);
  };

  const goAccountDetail = async nickname => {
    const res = await getAccountBaseInfo({name: nickname.replace('@', '')});
    navigation.push('AccountDetail', {accountId: res.data.account.id});
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
            {item.praises_count > 0 && (
              <Text style={[cstyles.numCount, {color: item.praise ? '#000' : '#bdbdbd'}]}>
                {item.praises_count}
              </Text>
            )}
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
          <Text numberOfLines={props.numberOfLines} style={cstyles.text}>
            {item.mention_content ? (
              item.mention_content.map((v, i) => {
                return (
                  <Text key={i}>
                    {v.is_mention && (
                      <Text style={cstyles.hashtagText} onPress={() => goAccountDetail(v.content)}>
                        {v.content}&nbsp;
                      </Text>
                    )}
                    {!v.is_mention && <Text space="nbsp">{v.content} </Text>}
                  </Text>
                );
              })
            ) : (
              <Text>{item.content}</Text>
            )}
          </Text>
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
    <>
      <ScrollList
        data={listData}
        loading={loading}
        onRefresh={loadData}
        headers={headers}
        renderItem={renderItem}
        enableRefresh={false}
        bounces={false}
        renderSeparator={renderSeparator}
        settings={{showsVerticalScrollIndicator: false}}
        from="comment"
        {...props}
      />
      <ActionSheet
        actionItems={actionItems}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
      />
    </>
  );
};

const cstyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
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
  },
  separator: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 49,
  },
});

export default CommentList;
