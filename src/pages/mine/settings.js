import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
  StyleSheet,
  View,
  Pressable,
  Text,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import Helper from '@/utils/helper';
import Icon from 'react-native-vector-icons/Ionicons';
import CodePush from 'react-native-code-push';
import checkHotUpdate from '@/utils/codepush';
import {BaseApiUrl} from '@/utils/config';
import {IsIos} from '@/utils/navbar';
import {WANYA_VERSION} from '@/utils/config';
import {logoutCurrentAccount} from '@/redux/actions';
import {blockedAccount } from '@/api/account_api'

const Settings = ({navigation, route}) => {
  const currentAccount = useSelector(state => state.account.currentAccount);
  const dispatch = useDispatch();

  const goPages = async type => {
    switch (type) {
      case 'edit':
        navigation.navigate('AccountContent');
        break;
      case 'about':
        navigation.navigate('About');
        break;
      case 'feedback':
        navigation.navigate('Feedback');
        break;
      case 'invite':
        navigation.navigate('InviteDetail');
        break;
      case 'private':
        navigation.navigate('WebView', {
          sourceUrl: `${BaseApiUrl}/home/private_policy`,
          title: '顽鸦隐私政策',
          bgColor: 'black',
        });
        break;
      case 'user_agreement':
        navigation.navigate('WebView', {
          sourceUrl: `${BaseApiUrl}/home/user_agreement`,
          title: '顽鸦用户协议',
          bgColor: 'black',
        });
        break;
      case 'lab':
        navigation.navigate('Report');

        break;
      case 'checkupdate':
        checkHotUpdate(CodePush); // 开始检查更新
        break;
      case 'goFir':
        let url = 'http://app.firim.cn/vanyah';
        if (!IsIos) {
          url = 'http://app.firim.cn/vanyah111';
        }
        Linking.openURL(url);
        break;
      case 'logout':
        await Helper.clearAllData();
        await dispatch(logoutCurrentAccount());
        navigation.reset({
          index: 0,
          routes: [{name: 'SocialLogin'}],
        });
        break;
      case 'cancel_account':
        Alert.alert(
          `您确定要注销您的账号 ${currentAccount.nickname} 吗?`,
          '一旦您注销账号，则此账号的相关数据则会删除',
          [
            {
              text: '确定',
              onPress: () => {
                Alert.alert(`您要注销的用户用户名是: ${currentAccount.nickname}`, '', [
                  {
                    text: '确定',
                    onPress: () => cancelAccount(),
                  },
                  {
                    text: '取消注销',
                    onPress: () => '',
                  },
                ]);
              },
              style: 'cancel',
            },
            {
              cancelable: true,
              text: '取消',
              onPress: () => {},
            },
          ]
        );
      default:
        break;
    }
  };

  const cancelAccount = async () => {
    // await Helper.clearAllData();
    // await dispatch(logoutCurrentAccount());
    await blockedAccount({id: currentAccount.id});
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'SocialLogin'}],
    // });
  };

  const ForwardRight = () => {
    return <Icon color={'#C2C2C2'} name={'chevron-forward'} size={20} />;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      {/*<StatusBar barStyle="dark-content" backgroundColor={'white'} />*/}
      <View style={{backgroundColor: 'white'}}>
        <ItemView
          style={[styles.bottomBorder1px]}
          onPress={() => {
            goPages('about');
          }}>
          <ItemTitle>关于顽鸦</ItemTitle>
          <ForwardRight />
        </ItemView>
        {/* <ItemView
          style={[styles.bottomBorder1px, styles.topBorder1px, styles.nestLine]}
          onPress={() => {
            goPages('feedback');
          }}>
          <ItemTitle>意见反馈</ItemTitle>
          <ForwardRight />
        </ItemView> */}
        <ItemView
          style={[styles.bottomBorder1px, styles.nestLine]}
          onPress={() => {
            goPages('user_agreement');
          }}>
          <ItemTitle>用户协议</ItemTitle>
          <ForwardRight />
        </ItemView>
        <ItemView
          style={[styles.bottomBorder1px, styles.nestLine]}
          onPress={() => {
            goPages('private');
          }}>
          <ItemTitle>隐私政策</ItemTitle>
          <ForwardRight />
        </ItemView>
        <ItemView
          style={[styles.bottomBorder1px, styles.nestLine]}
          onPress={() => {
            goPages('invite');
          }}>
          <ItemTitle>邀请码</ItemTitle>
          <ForwardRight />
        </ItemView>

        {currentAccount.role === 'admin' && (
          <>
            {IsIos && (
              <ItemView
                style={[styles.bottomBorder1px, styles.nestLine]}
                onPress={() => {
                  goPages('checkupdate');
                }}>
                <ItemTitle>检测更新</ItemTitle>
                <ForwardRight />
              </ItemView>
            )}
            <ItemView
              style={[styles.bottomBorder1px, styles.nestLine]}
              onPress={() => {
                goPages('goFir');
              }}>
              <ItemTitle>Fir更新</ItemTitle>
              <ForwardRight />
            </ItemView>
          </>
        )}
        {currentAccount.role === 'admin' && (
          <ItemView
            style={[styles.bottomBorder1px, styles.nestLine]}
            onPress={() => {
              navigation.navigate('LabIndex');
            }}>
            <ItemTitle>实验室</ItemTitle>
            <ForwardRight />
          </ItemView>
        )}
        <ItemView
          style={[styles.bottomBorder1px, styles.nestLine]}
          onPress={() => {
            goPages('logout');
          }}>
          <ItemTitle>退出</ItemTitle>
          <ForwardRight />
        </ItemView>

        {
          !IsIos &&  <ItemView
            style={[styles.bottomBorder1px, styles.nestLine]}
            onPress={() => {
              goPages('cancel_account');
            }}>
            <ItemTitle>注销</ItemTitle>
            <ForwardRight />
          </ItemView>
        }

      </View>
      <Text style={styles.version}>current Version {WANYA_VERSION}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topBorder1px: {
    borderColor: '#ebebeb',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  bottomBorder1px: {
    borderColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  nestLine: {
    marginLeft: 14,
    paddingLeft: 0,
  },
  version: {
    marginTop: 50,
    fontSize: 10,
    textAlign: 'center',
    color: '#aea9a9',
  },
});

const ItemView = styled(Pressable)`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 14px;
  padding-right: 14px;
  background-color: white;
  color: rgba(0, 0, 0, 1);
`;

const ItemTitle = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  height: 50px;
  line-height: 50px;
`;

const LoginView = styled(ItemView)`
  margin-top: 45px;
  text-align: center;
  align-content: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default Settings;
