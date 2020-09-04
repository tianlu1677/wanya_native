import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import {Header, BaseTopicContent} from '@/components/Item/PostListItem';
import {getTopic, createComment} from '@/api/home_api';
import {getTopicCommentList} from '@/api/comment_api';

import ScrollList from '@/components/ScrollList';
const CommentActionStyle = {
  ActionWrapper: styled(View)`
    height: 57px;
    z-index: 2;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top-color: #ebebeb;
    border-top-width: 1px;
    background-color: #fff;
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

export const PublishAccount = props => {
  // console.log(props);
  return (
    <View style={{paddingLeft: 16, paddingRight: 16, marginTop: 20}}>
      <Header data={props.data} />
      <BaseTopicContent data={props.data} style={{marginBottom: 16}} />
    </View>
  );
};

const PostDetailStyle = {
  SpaceWrapper: styled(View)`
    flex-direction: row;
    align-items: center;
    margin-left: 16px;
  `,
  SpaceText: styled(Text)`
    color: #45ea6a;
    margin-left: 6px;
    font-size: 14px;
  `,
  TagsWrapper: styled(View)`
    flex-direction: row;
    margin-bottom: 20px;
    margin-top: 18px;
    padding-left: 18px;
  `,
  TagsText: styled(Text)`
    padding-left: 9px;
    padding-right: 9px;
    line-height: 24px;
    background-color: #f2f3f5;
    margin-right: 8px;
    font-size: 11px;
  `,
  FromWrapper: styled(View)`
    margin-bottom: 5px;
    flex-direction: row;
    padding-left: 16px;
    padding-right: 19px;
  `,
  FromTitle: styled(Text)`
    font-size: 15px;
    line-height: 20px;
    font-weight: 500;
    margin-bottom: 7px;
  `,
  FromImage: styled(Image)`
    width: 50px;
    height: 50px;
    border-width: 3px;
    border-color: #ffff00;
    margin-left: auto;
  `,
};
const {
  SpaceWrapper,
  SpaceText,
  TagsWrapper,
  TagsText,
  FromWrapper,
  FromTitle,
  FromImage,
} = PostDetailStyle;

export const PublishRelated = props => {
  const {data} = props;
  console.log(data);
  return (
    <View>
      <SpaceWrapper>
        <IconFont name="changdiweizhi" size={16} color={'#45ea6a'} />
        <SpaceText>heooo</SpaceText>
      </SpaceWrapper>
      <TagsWrapper>
        {data.FromTitletag_list &&
          data.FromTitletag_list.map((v, index) => <TagsText key={index}>{v}</TagsText>)}
      </TagsWrapper>
      <FromWrapper>
        <View>
          <FromTitle>来自{data.node.name}</FromTitle>
          <Text>
            {data.node.topics_count}篇帖子 · {data.node.accounts_count}位
            {data.node.nickname || '圈友'}
          </Text>
        </View>
        <FromImage source={{uri: data.node.cover_url}} />
      </FromWrapper>
    </View>
  );
};
