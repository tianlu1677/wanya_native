import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Image} from 'react-native';
import {Button} from 'react-native-elements';
import styled from 'styled-components/native';
import Helper from '../../utils/helper';
import Avatar from '../../components/NodeComponents/Avator';
import Modal from 'react-native-modal';
import InvitePoster from './components/invite-poster';

import {getInviteCode, getAccountInviteList} from '../../api/account_api';

class InviteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareModelVisible: false,
      inviteCode: '',
      accountList: [],
    };
  }

  componentDidMount() {
    this.loadInitInfo();
  }

  loadInitInfo = async () => {
    const codeRes = await getInviteCode();
    this.setState({
      inviteCode: codeRes.invite_code,
    });
    getAccountInviteList().then(res => {
      console.log('res', res);
      this.setState({
        accountList: res.invites,
      });
    });
  };

  onCopy = () => {
    let message = `我的顽鸦邀请码是 ${this.state.inviteCode}`;
    Helper.setClipboard(message);
  };

  onShare = () => {
    console.log('xxxxxxx');
    this.setState({shareModelVisible: true});
  };

  render() {
    const {inviteCode, accountList} = this.state;
    console.log('sta', this.state);
    return (
      <View style={{flex: 1}}>
        <SafeAreaView>
          <CardView>
            <View style={{flexDirection: 'row'}}>
              <Avatar size={20} account={{account: { avatar_url: Helper.getData('avatar_url')}}} />
              <CardTitleText>我的邀请码</CardTitleText>
            </View>

            <CardCodeText>{inviteCode}</CardCodeText>
            <CardCopyText onPress={this.onCopy}>复制</CardCopyText>
          </CardView>

          <DescView>
            <DescText>向朋友发送社区体验邀请，</DescText>
            <DescText>与朋友共建青年社区文化。</DescText>
          </DescView>

          <AccountCardView>
            {accountList.map(invite => {
              return <Avatar width={40} key={invite.id} account={invite.account} />;
            })}
            <Image
              source={require('../../assets/images/add-invite.png')}
              style={{width: 40, height: 40, borderRadius: 20}}
              onPress={this.onShare}
            />
          </AccountCardView>
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 11, color: '#bdbdbd'}}>已邀请{accountList.length}位</Text>
          </View>
        </SafeAreaView>
        <Button
          title="微信分享"
          titleStyle={{fontSize: 16, fontWeight: '500'}}
          buttonStyle={{height: 50, backgroundColor: 'black'}}
          onPress={this.onShare}
          containerStyle={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
          }}
        />
        {/*<Modal*/}
        {/*  isVisible={this.state.shareModelVisible}*/}
        {/*>*/}
        {/*  <ShareCardView>*/}
        {/*    <Image*/}
        {/*      source={require('../../assets/images/social-login.jpg')}*/}
        {/*      style={{width: 40, height: 40, borderRadius: 21, marginRight: 10}}*/}
        {/*    />*/}
        {/*    <Text>*/}
        {/*      微信好友*/}
        {/*    </Text>*/}

        {/*    <Image*/}
        {/*      source={require('../../assets/images/social-login.jpg')}*/}
        {/*      style={{width: 40, height: 40, borderRadius: 21, marginRight: 10}}*/}
        {/*    />*/}
        {/*    <Text>*/}
        {/*      分享朋友圈*/}
        {/*    </Text>*/}
        {/*  </ShareCardView>*/}
        {/*</Modal>*/}
      </View>
    );
  }
}

const CardView = styled(View)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 21px 25px 31px 25px;
  padding-top: 20px;
  height: 145px;
  background: black;
  border-radius: 6px;
`;

const CardTitleText = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  color: rgba(189, 189, 189, 1);
  letter-spacing: 1px;
`;

const CardCodeText = styled(Text)`
  color: white;
  font-weight: 600;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 1px;
  margin-top: 26px;
  margin-left: 8px;
`;

const CardCopyText = styled(Text)`
  margin-top: 8px;
  color: #bdbdbd;
`;

const DescView = styled(View)`
  margin-top: 31px;
  align-items: center;
`;

const DescText = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 23px;
  letter-spacing: 1px;
`;

const AccountCardView = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 45px;
  align-content: flex-start;
  justify-content: flex-start;
  margin-left: 52px;
  margin-right: 52px;
  margin-bottom: 23px;
`;

const ShareCardView = styled(View)`
  position: absolute;
  bottom: 0;
  height: 90px;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export default InviteDetail;
