import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-root-toast';
import styled from 'styled-components/native';
import Helper from '@/utils/helper';
import {dispatchCurrentAccount} from '../../../redux/actions';
import {contentBlank} from '@/styles/commonStyles';

const AccountContent = ({navigation, route}) => {
  const [phone, setPhone] = useState('');
  const currentAccount = useSelector(state => state.account.currentAccount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatchCurrentAccount());
  }, [navigation]);

  const goPages = (type = '') => {
    switch (type) {
      case 'nickname':
        navigation.navigate('EditAccountContent', { editKey: 'nickname', content: currentAccount.nickname})
        break;
      case 'gender':
        break;
      case 'birthday':
        break;
      case 'intro':
        navigation.navigate('EditAccountContent', { editKey: 'intro', content: currentAccount.intro})
        break;
      default:
        console.log("not")

    }
  };

  return (
    <SafeAreaView>
      <Text style={contentBlank} />
      <ItemView
        onPress={() => {
          goPages('edit');
        }}>
        <ItemTitle>头像</ItemTitle>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Image
            source={{uri: currentAccount.avatar_url}}
            style={{
              width: 35,
              height: 35,
              borderRadius: 20
            }}
          />
        </View>
      </ItemView>
      <Text style={contentBlank} />
      <ItemView
        style={{}}
        onPress={() => {
          goPages('nickname');
        }}>
        <ItemTitle>昵称{currentAccount.id}</ItemTitle>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <ItemTitle>{currentAccount.nickname}</ItemTitle>
        </View>
      </ItemView>
      <ItemView
        style={[styles.topBorder1px]}
        onPress={() => {
          goPages('gender');
        }}>
        <ItemTitle>性别</ItemTitle>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <ItemTitle>{currentAccount.gender_text}</ItemTitle>
        </View>
      </ItemView>
      <ItemView
        style={[styles.topBorder1px, styles.bottomBorder1px]}
        onPress={() => {
          goPages('birthday');
        }}>
        <ItemTitle>生日</ItemTitle>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <ItemTitle>{currentAccount.birthday}</ItemTitle>
        </View>
      </ItemView>
      <ItemView
        style={{}}
        onPress={() => {
          goPages('intro');
        }}>
        <ItemTitle>简介</ItemTitle>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <ItemTitle>{currentAccount.intro}</ItemTitle>
        </View>
      </ItemView>
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
  padding-right: 21px;
  background-color: white;
  color: rgba(0, 0, 0, 1);
`;

const ItemTitle = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  height: 50px;
  line-height: 50px;
`;

export default AccountContent;
