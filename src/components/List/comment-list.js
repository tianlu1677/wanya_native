import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import {Header, BaseTopicContent} from '@/components/Item/PostListItem';
import {getTopic, createComment} from '@/api/home_api';
import {getTopicCommentList} from '@/api/comment_api';
import ScrollList from '@/components/ScrollList';
import BottomSheet from 'reanimated-bottom-sheet';

const CommentActionStyle = {
  ActionWrapper: styled(View)`
    background-color: #fff;
    height: 40px;
    flex-direction: row;
    padding-left: 30px;
    padding-right: 30px;
    align-items: center;
    border-top-color: #ebebeb;
    border-top-width: 1px;
  `,
  ActionText: styled(Text)`
    width: 174px;
    height: 35px;
    line-height: 35px;
    border-radius: 5px;
    background-color: #f2f3f5;
    color: #bdbdbd;
    padding-left: 19px;
  `,
  ActionInput: styled(TextInput)`
    flex: 1;
    height: 35px;
    align-items: center;
    border-radius: 5px;
    background-color: #f2f3f5;
    padding-left: 19px;
    border-radius: 15px;
    overflow: hidden;
  `,
  ActionBtn: styled(View)`
    margin-left: auto;
    flex-direction: row;
    height: 100%;
    align-items: center;
    line-height: 35px;
    border-radius: 15px;
    overflow: hidden;
    background-color: #fff;
  `,
  ActionSendBtn: styled(Text)`
    width: 60px;
    height: 35px;
    background-color: #f2f3f5;
    line-height: 35px;
    border-radius: 15px;
    overflow: hidden;
    text-align: center;
    color: #bdbdbd;
    font-size: 13px;
    margin-left: 10px;
    margin-right: 10px;
  `,
};

const {ActionWrapper, ActionText, ActionInput, ActionBtn, ActionSendBtn} = CommentActionStyle;

const CommentStyle = {
  CommentWrapper: styled(View)`
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 20px;
  `,
  CommentTitle: styled(Text)`
    font-size: 15px;
    font-weight: 500;
  `,
  CommentInfo: styled(View)`
    flex-direction: row;
    align-items: center;
  `,
  CommentContent: styled(View)`
    border-bottom-color: #ebebeb;
    border-bottom-width: 1px;
    padding-bottom: 10px;
  `,
  CommentText: styled(Text)`
    font-size: 13px;
    margin-top: 11px;
    margin-bottom: 11px;
  `,
  CommentMore: styled(Text)`
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 11px;
    padding-bottom: 11px;
    background-color: #f2f3f5;
    color: #bdbdbd;
    margin-bottom: 11px;
    font-size: 12px;
  `,
};
const {
  CommentWrapper,
  CommentTitle,
  CommentInfo,
  CommentContent,
  CommentText,
  CommentMore,
} = CommentStyle;

export const ActionComment = props => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(null);

  const [comment, setComment] = useState({
    commentable_type: '',
    commentable_id: '',
    content: '',
    comment_type: '',
    placeholder: '写点评论吧',
  });

  // 回复
  const onReplyComment = v => {
    if (v.id) {
      setComment({
        placeholder: `回复: @${v.account.nickname}`,
        comment_type: 'comment',
        commentable_type: props.type,
        commentable_id: props.detail.id,
        content: '',
        target_comment_id: v.id,
      });
    } else {
      setComment({
        placeholder: '写点评论吧',
        comment_type: 'topic',
        commentable_type: props.type,
        commentable_id: props.detail.id,
        content: '',
      });
      setVisible(true);
    }
    setValue(null);
    setVisible(true);
    // scrollRef.current.scrollTo({y: 23});
  };

  const publishComment = () => {
    const data = {...comment, content: value};
    props.publishComment(data);
  };

  return (
    <ActionWrapper>
      {!visible && (
        <>
          <ActionText onPress={onReplyComment}>快来评论吧</ActionText>
          <ActionBtn>
            <IconFont name="xihuan" size={16} />
            <Text style={{marginLeft: 5}}>{props.detail.praises_count}</Text>
          </ActionBtn>
          <ActionBtn>
            <IconFont name="xihuan" size={16} />
            <Text style={{marginLeft: 5}}>{props.detail.stars_count}</Text>
          </ActionBtn>
        </>
      )}

      {visible && (
        <>
          <ActionInput
            placeholder={comment.placeholder}
            onChangeText={text => setValue(text)}
            value={value}
            autoFocus
            onBlur={() => setVisible(false)}
          />
          <ActionSendBtn onPress={publishComment}>发送</ActionSendBtn>
        </>
      )}
    </ActionWrapper>
  );
};

export const CommentList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const sheetRef = useRef(null);

  const choseAction = v => {
    // onReplyComment(v);
    // 区分删除和回复
    sheetRef.current.snapTo(0);
    console.log(1);
    console.log(sheetRef);
  };

  const renderItem = ({item}) => {
    return (
      <View key={item.id} style={{marginTop: 16}}>
        <CommentInfo style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avator account={item.account} size={25} />
          <Text style={{marginLeft: 7}}>{item.account.nickname}</Text>
          <View style={{marginLeft: 'auto', flexDirection: 'row'}}>
            <IconFont name="xihuan" size={16} />
            <Text style={{marginLeft: 5}}>{item.praises_count}</Text>
          </View>
        </CommentInfo>
        <TouchableOpacity style={{marginLeft: 32}} onPress={() => choseAction(item)}>
          <CommentContent>
            <CommentText>{item.content}</CommentText>
            {item.target_account_id && (
              <CommentMore>
                <Text style={{fontWeight: '500'}}>{item.target_account_nickname}: </Text>
                <Text>
                  {item.target_comment_content ? item.target_comment_content : '评论已删除'}
                </Text>
              </CommentMore>
            )}
            <Text style={{color: '#bdbdbd', fontSize: 11}}>
              {item.created_at_text} · 回复{' '}
              {item.child_comments_count ? item.child_comments_count : ''}
            </Text>
          </CommentContent>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={{backgroundColor: '#FAFAFA', height: 2}} />;
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}>
      <Text>Swipe down to close</Text>
    </View>
  );

  const renderHeader = () => <Text>2</Text>;

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

  return (
    <>
      <CommentWrapper>
        <CommentTitle>全部评论</CommentTitle>
        <ScrollList
          data={listData}
          loading={loading}
          onRefresh={loadData}
          headers={headers}
          renderItem={renderItem}
          renderSeparator={renderSeparator}
          {...props}
        />
      </CommentWrapper>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </>
  );
};
