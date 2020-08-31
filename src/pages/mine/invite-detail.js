import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Image, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import Helper from '../../utils/helper';
import {Avatar} from '../../components/NodeComponents';
import Modal from 'react-native-modal';
import InvitePoster from './components/invite-poster';

import {getInviteCode, getAccountInviteList} from '../../api/account_api';
import SafeAreaPlus from '@/components/SafeAreaPlus';
import {getCurrentAccount} from '@/api/mine_api';
import Toast from 'react-native-root-toast';

const InviteDetail = ({navigation, route}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [accountList, setAccountList] = useState([]);
  const [shareModelVisible, setShareModelVisible] = useState([]);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
    });
  }, [navigation]);

  useEffect(() => {
    loadInitInfo()
  }, [])

  const loadInitInfo = async () => {
    const codeRes = await getInviteCode();
    setInviteCode(codeRes.invite_code);

    getAccountInviteList().then(res => {
      console.log('res', res);
      setAccountList(res.invites);
    });
  };

  const onCopy = () => {
    let message = `我的顽鸦邀请码是 ${inviteCode}`;
    Helper.setClipboard(message);
    Toast.show("已复制", { position: Toast.positions.TOP })
  };

  const onShare = () => {
    // console.log('xxxxxxx');
    // this.setState({shareModelVisible: true});
  };

  return (
    <SafeAreaView>
      <CardView>
        <View style={{flexDirection: 'row'}}>
          {/*<Avatar size={20} account={{account: {avatar_url: Helper.getData('avatar_url')}}} />*/}
          <CardTitleText>我的邀请码</CardTitleText>
        </View>

        <CardCodeText>{inviteCode}</CardCodeText>
        <CardCopyText
          onPress={() => {
            onCopy();
          }}>
          复制
        </CardCopyText>
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
          onPress={() => {
            onCopy();
          }}
        />
      </AccountCardView>
      <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 11, color: '#bdbdbd'}}>已邀请{accountList.length}位</Text>
      </View>
      <Button
        title="微信分享"
        titleStyle={{fontSize: 16, fontWeight: '500'}}
        buttonStyle={{height: 50, backgroundColor: 'black'}}
        onPress={() => {
          onShare();
        }}
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
    </SafeAreaView>
  );
};

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
