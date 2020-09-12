import React, {Component, useState, useLayoutEffect, useEffect, useSelector} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Pressable, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import Helper from '@/utils/helper';
import {contentBlank} from '../../styles/commonStyles';
import {Button, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
// import ListItem from '@/components/ListItem';

const Settings = ({navigation, route}) => {
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  const goPages = type => {
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
      case 'logout':
        console.log('logout');
        Helper.clearAllData()
        navigation.reset({
          index: 0,
          routes: [{name: 'SocialLogin'}],
        })
        break;
      default:
        console.log('others');
    }
    console.log('type', type);
  };

  const ForwardRight = () => {
    return (
      <Icon color={'#C2C2C2'} name={'chevron-forward'} size={20} />
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fafafa'}}>
      <Text style={contentBlank} />
      <ItemView
        onPress={() => {
          goPages('edit');
        }}>
        <ItemTitle>编辑个人资料</ItemTitle>
        <ForwardRight />
      </ItemView>

      <Text style={contentBlank} />
      <ItemView
        style={[styles.topBorder1px]}
        onPress={() => {
          goPages('about');
        }}>
        <ItemTitle>关于顽鸦</ItemTitle>
        <ForwardRight />
      </ItemView>
      <ItemView
        style={{...styles.topBorder1px, ...styles.bottomBorder1px, marginLeft: 14, paddingLeft: 0}}
        onPress={() => {
          goPages('feedback');
        }}>
        <ItemTitle>意见反馈</ItemTitle>
        <ForwardRight />
      </ItemView>
      <ItemView
        style={{...styles.bottomBorder1px}}
        onPress={() => {
          goPages('invite');
        }}>
        <ItemTitle>邀请码</ItemTitle>
        <ForwardRight />
      </ItemView>

      <LoginView
        onPress={() => {
          goPages('logout');
        }}>
        <ItemTitle>退出</ItemTitle>
      </LoginView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBorder1px: {
    borderColor: '#ebebeb',
    borderTopWidth: 1,
  },
  bottomBorder1px: {
    borderColor: '#ebebeb',
    borderBottomWidth: 1,
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
