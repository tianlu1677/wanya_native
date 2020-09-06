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
  TouchableOpacity,
  Pressable,
} from 'react-native';
import styled from 'styled-components/native';
import {Avator} from '../../../components/NodeComponents';
import {CommentNoticeImg, LogoImg} from '@/utils/default-image';

class NotifyContent extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
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

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  handleRight = () => {
    this.props.handleClickRight();
  };

  componentDidCatch(error, info) {}

  render() {
    const {account, notify_type, notify_content, item, showRight, time} = this.props;
    return (
      <CardView>
        <Avator size={40} account={this.props.account} />
        <CardDescView>
          <View style={{display: 'flex', flexDirection: 'row', width: '80%'}}>
            <AccountNameTitle>{account.nickname}</AccountNameTitle>
            <AccountActionDesc>{notify_type}</AccountActionDesc>
          </View>
          <ActionTime>{time}</ActionTime>
          {notify_content.length > 0 && <ContentText>{notify_content}</ContentText>}
        </CardDescView>

        {showRight === true && (
          <RightWrapView onPress={this.handleRight}>
            {item.image_url.length > 0 && item.has_video === true && (
              <>
                <Image source={{uri: item.image_url}} />
                <Image source={require('../../../assets/images/play-video.png')} />
              </>
            )}
            {item.image_url.length > 0 && !item.has_video === false && (
              <View>
                <Image source={{uri: item.image_url}} />
              </View>
            )}

            {item.image_url.length <= 0 && <RightText>{item.content}</RightText>}
          </RightWrapView>
        )}
      </CardView>
    );
  }
}

const CardView = styled(View)`
  margin-left: 14px;
  padding: 14px 15px 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
  min-height: 90px;
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
