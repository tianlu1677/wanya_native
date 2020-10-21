import React, {Component, useState, useLayoutEffect, useEffect, useRef} from 'react';
import {
  Modal,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as WeChat from 'react-native-wechat-lib';
import styled from 'styled-components/native';
import Helper from '@/utils/helper';
import {Avator} from '@/components/NodeComponents';
import {BOTTOM_HEIGHT} from '@/utils/navbar';
import {getInviteCode, getAccountInviteList} from '../../api/account_api';
import Toast from '@/components/Toast';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AddFriendImg from '@/assets/images/add-invite.png';
import FastImg from '@/components/FastImg'

const InviteDetail = ({navigation, route}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [accountList, setAccountList] = useState([])
  const [shareModelVisible, setShareModelVisible] = useState(false);
  const [shareUri, setShareUri] = useState('');
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentAccount);

  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  useEffect(() => {
    loadInitInfo();
  }, []);

  const loadInitInfo = async () => {
    const codeRes = await getInviteCode();
    setInviteCode(codeRes.invite_code);
    setShareUri(codeRes.shareimg_url);

    getAccountInviteList().then(res => {
      console.log('res', res);
      setAccountList(res.invites);
    });
  };

  const onCopy = () => {
    let message = `我的顽鸦邀请码是 ${inviteCode}`;
    Helper.setClipboard(message);
    Toast.showError(`已复制 ${inviteCode}`);
  };

  //https://github.com/little-snow-fox/react-native-wechat-lib
  const shareFriend = e => {
    console.log('shareUri', shareUri)
    // e.stopPropagation();
    WeChat.shareImage(
      {
        imageUrl: shareUri,
        scene: 0,
      },
      error => {
        console.log('error', error);
      }
    );
  };
  const shareTimeline = () => {
    try {
      WeChat.shareImage(
        {
          imageUrl: shareUri,
          scene: 1,
        },
        error => {
          console.log('error', error);
        }
      );
    } catch (e) {
      console.log('e', e);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle={'default'} />
      <CardView colors={['#4e4e4e', '#181818']}>
        <View style={{flexDirection: 'row', height: 20, lineHeight: 20}}>
          <Avator size={20} account={{avatar_url: currentAccount.avatar_url}} />
          <CardTitleText>我的邀请码</CardTitleText>
        </View>
        <CardCodeText
          onPress={() => {
            onCopy();
          }}>
          {inviteCode}
        </CardCodeText>
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
          return (
            <AccountWrapView>
              <Avator
                size={45}
                key={invite.id}
                account={invite.account}
                // containerStyle={{marginRight: 15}}
              />
            </AccountWrapView>
          );
        })}
        {(accountList.length <= 0 || accountList.length < 5) &&
          [1, 2, 3, 4].slice(0, 4 - accountList.length).map(i => {
            return (
              <AccountWrapView
                key={i}
                onPress={() => {
                  setShareModelVisible(true);
                }}>
                <FastImg
                  source={AddFriendImg}
                  style={{width: 45, height: 45, borderRadius: 20}}
                />
              </AccountWrapView>
            );
          })}
        <AccountWrapView
          onPress={() => {
            setShareModelVisible(true);
          }}>
          <FastImg source={AddFriendImg} style={{width: 45, height: 45, borderRadius: 20}} />
        </AccountWrapView>
      </AccountCardView>
      <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 11, color: '#bdbdbd'}}>已邀请{accountList.length}位</Text>
      </View>
      <Button
        title="微信邀请"
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
          paddingBottom: BOTTOM_HEIGHT,
          borderRadius: 0,
          backgroundColor: 'black',
        }}
      />

      <Modal
        animationType=""
        transparent={true}
        visible={shareModelVisible}
        onRequestClose={() => {}}>

        <ModelWrap
          onPress={() => {
            setShareModelVisible(false);
          }}>
          {/*<FastImg*/}
          {/*  source={{uri: shareUri}} style={{width: useWindowDimensions().width, top: 100, position: 'absolute', height: 100, zIndex: 100}}*/}
          {/*  onLoad={(e) => {console.log('.', e.nativeEvent.height)}}*/}
          {/*/>*/}

          <ShareCardView style={{marginBottom: BOTTOM_HEIGHT}}>
            <Pressable
              style={{display: 'flex', alignItems: 'center'}}
              onPress={() => {
                shareFriend();
              }}>
              <Image
                source={require('../../assets/images/sharewchatfrient.png')}
                style={{width: 28, height: 22}}
                resizeMode={'contain'}
              />
              <ShareText>微信好友</ShareText>
            </Pressable>
            <TouchableOpacity
              style={{display: 'flex', alignItems: 'center'}}
              onPress={() => {
                shareTimeline();
              }}>
              <Image
                source={require('../../assets/images/sharewechattimeline.png')}
                style={{width: 20, height: 20}}
              />
              <ShareText>分享朋友圈</ShareText>
            </TouchableOpacity>
          </ShareCardView>
        </ModelWrap>
      </Modal>
    </View>
  );
};

const CardView = styled(LinearGradient)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 23px 25px 31px 25px;
  padding-top: 20px;
  height: 145px;
  background: black;
  border-radius: 6px;
`;

const CardTitleText = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  color: #bdbdbd;
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
  padding-top: 30px;
`;

const CardCopyText = styled(Text)`
  margin-top: 8px;
  font-size: 10px;
  color: #bdbdbd;
`;

const DescView = styled(View)`
  margin-top: 0px;
  align-items: center;
`;

const DescText = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
  letter-spacing: 1px;
`;

const AccountCardView = styled(View)`
  display: flex;
  flex-direction: row;
  margin-top: 45px;
  justify-content: space-between;
  margin-left: 52px;
  margin-right: 52px;
  margin-bottom: 23px;
  align-items: center;
`;

const AccountWrapView = styled(Pressable)`
  display: flex;
`
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
  padding-left: 98px;
  padding-right: 88px;
`;

const ShareText = styled(Text)`
  color: #24db5a;
  font-size: 12px;
  margin-top: 10px;
`;

export default InviteDetail;
