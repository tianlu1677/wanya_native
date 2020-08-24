import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  Button,
} from 'react-native';
import styled from 'styled-components/native';
import {Avator} from '../../../components/NodeComponents';
import {CommentNoticeImg, LogoImg} from '@/utils/default-image';

class NotifyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  static defaultProps = {
    account: {},
    item: {},
  };

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  componentDidCatch(error, info) {}

  render() {
    return (
      <CardView>
        {/*<Avator size={40} />*/}
        <CardDescView>
          <View style={{display: 'flex', flexDirection: 'row', width: '80%'}}>
            <AccountNameTitle>喜洋洋喜洋洋</AccountNameTitle>
            <AccountActionDesc>评论了你</AccountActionDesc>
          </View>
          <ActionTime>1小时前</ActionTime>
          <ContentText>
            {' '}
            很多人都喜欢你很多人都喜欢你很多人都喜欢你很多人都喜欢你很多人都喜欢你很多人都喜欢你很多人都喜欢你
          </ContentText>
        </CardDescView>
        <RightWrapView>
          <RightText>春天到了春天到了春天到了春天到了春天到了</RightText>

          {/*<ImageBackground source={{uri: CommentNoticeImg}} style={{width: 60, height: 60}} />*/}
          {/*<VideoPlayImage source={{url: LogoImg}} />*/}
        </RightWrapView>
      </CardView>
    );
  }
}

const CardView = styled(View)`
  margin-left: 14px;
  padding: 14px 15px 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
  min-height: 64px;
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

const RightWrapView = styled(View)`
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(248, 248, 248, 1);
  height: 60px;
  width: 60px;
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
