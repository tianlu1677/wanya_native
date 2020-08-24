import React, {Component} from 'react';
import {View, Text, Image, Button} from 'react-native';
import styled from 'styled-components/native';
import {CommentNoticeImg, LogoImg} from '@/utils/default-image';
import {Avator} from '../../../components/NodeComponents';

class AccountFollow extends Component {
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
        {/*<Avator account={this.props.account} size={40}></Avator>*/}
        <CardDescView>
          <View style={{display: 'flex', flexDirection: 'row', width: '80%'}}>
            <AccountNameTitle>sss</AccountNameTitle>
            <AccountActionDesc>关注了你</AccountActionDesc>
          </View>
          <ActionTime>1小时前</ActionTime>
        </CardDescView>
        <RightWrapView>
          <RightText>关注</RightText>
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
  height: 70px;
  line-height: 70px;
  letter-spacing: 1px;
  display: flex;
  flex-direction: row;
`;

const CardDescView = styled(View)`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 400;
  width: 65%;
  height: 40px;
  line-height: 40px;
  justify-content: center;
  flex: 1;
`;
const AccountNameTitle = styled(Text)`
  padding-right: 6px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 1px;
`;
const AccountActionDesc = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: #bdbdbd;
  letter-spacing: 1px;
`;
const ActionTime = styled(Text)`
  font-size: 11px;
  font-weight: 300;
  line-height: 20px;
  color: #bdbdbd;
  letter-spacing: 1px;
`;

const RightWrapView = styled(View)``;

const RightText = styled(Text)`
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  font-weight: 400;
  padding-right: 10px;
  color: ${props => props.color || 'red'};
`;

export default AccountFollow;
