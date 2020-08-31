import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {SafeAreaView, Modal, StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Helper from '../../utils/helper';
import {Avator} from '../../components/NodeComponents';
// import Modal from 'react-native-modal';
import InvitePoster from './components/invite-poster';

import {getInviteCode, getAccountInviteList} from '../../api/account_api';
import SafeAreaPlus from '@/components/SafeAreaPlus';
import {getCurrentAccount} from '@/api/mine_api';
import Toast from 'react-native-root-toast';
import {Button} from 'react-native-elements';
import * as WeChat from 'react-native-wechat-lib';

const InviteDetail = ({navigation, route}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [accountList, setAccountList] = useState([]);
  const [shareModelVisible, setShareModelVisible] = useState(false);
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount)

  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  useEffect(() => {
    loadInitInfo();
  }, []);

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
    Toast.show('已复制', {position: Toast.positions.TOP});
  };

  //https://github.com/little-snow-fox/react-native-wechat-lib
  const shareFriend = (e) => {
    e.stopPropagation();
    WeChat.shareImage({
      imageUrl: 'https://google.com/1.jpg',
      scene: 0,
    });
  };
  const shareTimeline = (e) => {
    e.stopPropagation();
    console.log('xxxxxxxxxxx')
    WeChat.shareImage(
      {
        imageUrl: 'https://google.com/1.jpg',
        scene: 1,
      },
      error => {
        console.log('xxx', error);
      }
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CardView>
        <View style={{flexDirection: 'row', height: 20, lineHeight: 20}}>
          <Avator size={20} account={{avatar_url: currentAccount.avatar_url}}  />
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
          return <Avator width={40} key={invite.id} account={invite.account} />;
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
        buttonStyle={{height: 50, backgroundColor: 'black', borderRadius: 0}}
        onPress={() => {
          setShareModelVisible(true);
        }}
        containerStyle={{
          flex: 1,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 0,
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={shareModelVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <ModelWrap
          onPress={() => {
            setShareModelVisible(false);
          }}>
          <ShareCardView>
            <TouchableOpacity
              style={{display: 'flex', alignItems: 'center'}}
              onPress={(e) => {
                shareFriend(e);
              }}>
              <Image
                source={require('../../assets/images/add-invite.png')}
                style={{width: 20, height: 20, borderRadius: 20}}
              />
              <ShareText>微信好友</ShareText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{display: 'flex', alignItems: 'center'}}
              onPress={(e) => {
                shareTimeline(e);
              }}>
              <Image
                source={require('../../assets/images/add-invite.png')}
                style={{width: 20, height: 20, borderRadius: 20}}
              />
              <ShareText>分享朋友圈</ShareText>
            </TouchableOpacity>
          </ShareCardView>
        </ModelWrap>
      </Modal>
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
  line-height: 20px;
  margin-left: 10px;
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

const ModelWrap = styled(TouchableOpacity)`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ShareCardView = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 110px;
`;

const ShareText = styled(Text)`
  color: #24db5a;
  font-size: 12px;
  margin-top: 10px;
`;

export default InviteDetail;
