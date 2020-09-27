import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {Avator} from '@/components/NodeComponents';

const NotifyContent = ({
  account,
  notify_type,
  time,
  notify_content,
  showRight,
  item,
  handleClickRight,
}) => {
  const clickRight = () => {
    handleClickRight && handleClickRight();
  };

  return (
    <CardView style={{borderBottomWidth: StyleSheet.hairlineWidth}}>
      <Avator size={40} account={account} />
      <CardDescView>
        <View style={{display: 'flex', flexDirection: 'row', width: '80%'}}>
          <AccountNameTitle>{account.nickname}</AccountNameTitle>
          <AccountActionDesc>{notify_type}</AccountActionDesc>
        </View>
        <ActionTime>{time}</ActionTime>
        {notify_content.length > 0 && <ContentText>{notify_content}</ContentText>}
      </CardDescView>

      {showRight === true && (
        <RightWrapView
          onPress={() => {
            clickRight();
          }}>
          {!!item.image_url && item.has_video === true && (
            <>
              <Image source={{uri: item.image_url}} style={{width: 60, height: 60}} />
              <PlayVideoImg
                source={require('../../../assets/images/play-video.png')}
                style={{width: 20, height: 20}}
              />
            </>
          )}
          {!!item.image_url && item.has_video === false && (
            <View>
              <Image source={{uri: item.image_url}} style={{width: 60, height: 60}} />
            </View>
          )}
          {item.content.length > 0 && !item.image_url && <RightText>{item.content}</RightText>}
        </RightWrapView>
      )}
    </CardView>
  );
};

NotifyContent.defaultProps = {
  account: {
    avatar_url:
      'http://xinxuefile.meirixinxue.com/assets/2020/706739ac-7af0-4486-90f6-13ea83e63f09.jpeg',
  },
  notify_type: '',
  time: '',
  notify_content: '',
  currentAccount: {},
  showRight: true,
  item: {image_url: '', has_video: '', content: ''},
};

const CardView = styled(View)`
  margin-left: 14px;
  padding: 15px 15px 30px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
  min-height: 95px;
  letter-spacing: 1px;
  display: flex;
  flex-direction: row;
`;

const CardDescView = styled(View)`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 400;
  width: 65%;
  margin-top: 5px;
`;
const AccountNameTitle = styled(Text)`
  padding-right: 6px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;
const AccountActionDesc = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: #bdbdbd;
`;
const ActionTime = styled(Text)`
  font-size: 11px;
  font-weight: 300;
  line-height: 20px;
  color: #bdbdbd;
`;

const ContentText = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-top: 7px;
`;

const RightWrapView = styled(TouchableOpacity)`
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(248, 248, 248, 1);
  height: 60px;
  width: 60px;
`;

const PlayVideoImg = styled(Image)`
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 20px;
  right: 20px;
  height: 20px;
  width: 20px;
`;

const RightText = styled(Text)`
  position: absolute;
  font-size: 11px;
  font-weight: 400;
  color: rgba(189, 189, 189, 1);
  padding: 7px 7px 0 7px;
  line-height: 15px;
  height: 60px;
  width: 60px;
  background-color: #f8f8f8;
`;

const VideoPlayImage = styled(Image)`
  position: absolute;
  width: 30%;
  height: 30%;
  min-height: 50px;
  min-width: 50px;
  max-height: 50px;
  max-width: 50px;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
export default NotifyContent;
// {/*{item.image_url && item.has_video && (*/}
// {/*  <View style={{fontSize: 0}}>*/}
// {/*    <Image source={{uri: item.image_url}} />*/}
// {/*    <Image source={require('../../../assets/images/play-video.png')} />*/}
// {/*  </View>*/}
// {/*)}*/}
// {item.image_url && !item.has_video && (
//   <Image source={{uri: item.image_url}} />
// )}
// {/*{!item.image_url && <View>/!*<Text>{item.content}</Text>*!/</View>}*/}
// {/*<ImageBackground source={{uri: CommentNoticeImg}} style={{width: 60, height: 60}} />*/}
// {/*<VideoPlayImage source={{url: LogoImg}} />*/}
