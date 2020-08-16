import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native';

export const HeaderStyle = {
  HeaderView: styled(View)`
    flex-direction: row;
    align-items: center;
    height: 40px;
  `,
  ContentView: styled(View)`
    margin-left: 12px;
  `,
  ContentNameText: styled(Text)`
    line-height: 20px;
    margin-bottom: 4px;
    color: #9c9c9c;
  `,
  ContentInfoView: styled(View)`
    flex-direction: row;
    align-items: center;
    color: #9c9c9c;
  `,
  ContentInfoTimeText: styled(Text)`
    color: #9c9c9c;
    margin-right: 6px;
  `,
  ContentInfoNodeText: styled(Text)`
    font-weight: 500;
  `,
  JoinButtonText: styled(Text)`
    width: 75px;
    height: 34px;
    line-height: 34px;
    background: #fafafa;
    margin-left: auto;
    text-align: center;
    border-radius: 17px;
    font-size: 11px;
    overflow: hidden;
  `,
};

export const BottomStyle = {
  BottomView: styled(View)`
    flex-direction: row;
    height: 54px;
    align-items: center;
  `,
  BottomContentView: styled(View)`
    flex-direction: row;
    align-items: center;
  `,
  BottomContentNum: styled(Text)`
    margin-left: 5px;
    margin-right: 30px;
    color: #bdbdbd;
  `,
};

export const BaseTopicStyle = {
  MultiLineText: styled(Text)`
    font-size: 14px;
    line-height: 24px;
    color: #1f1f1f;
  `,
  VideoPlayImage: styled(Image)`
    width: 30px;
    height: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -15px;
    margin-top: -15px;
  `,
};

export const BaseArticleStyle = {
  ArtitleTitleText: styled(Text)`
    position: absolute;
    top: 7px;
    left: 11px;
    right: 11px;
    color: white;
    font-size: 16px;
    line-height: 25px;
  `,
};
