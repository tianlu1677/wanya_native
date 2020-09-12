import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Pressable, Image, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Helper from '@/utils/helper';
import {dispatchCurrentAccount} from '../../../redux/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import commonStyles from '@/styles/commonStyles';

const AccountContent = ({navigation, route}) => {
  const [phone, setPhone] = useState('');
  const currentAccount = useSelector(state => state.account.currentAccount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatchCurrentAccount());
  }, [navigation]);

  const ForwardRight = () => {
    return <Icon color={'#C2C2C2'} name={'chevron-forward'} size={20} />;
  };

  const goPages = (type = '') => {
    switch (type) {
      case 'nickname':
        navigation.navigate('EditAccountContent', {
          editKey: 'nickname',
          content: currentAccount.nickname,
        });
        break;
      case 'gender':
        break;
      case 'birthday':
        break;
      case 'intro':
        navigation.navigate('EditAccountContent', {
          editKey: 'intro',
          content: currentAccount.intro,
        });
        break;
      default:
        console.log('not');
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <Text style={commonStyles.contentBlank} />
      <ItemView
        onPress={() => {
          goPages('edit');
        }}>
        <ItemTitle>头像</ItemTitle>
        <ItemWrap>
          <Image
            source={{uri: currentAccount.avatar_url}}
            style={{
              width: 35,
              height: 35,
              borderRadius: 20,
            }}
          />
          <ForwardRight />
        </ItemWrap>
      </ItemView>
      <Text style={commonStyles.contentBlank} />
      <ItemView
        style={{}}
        onPress={() => {
          goPages('nickname');
        }}>
        <ItemTitle>昵称{currentAccount.id}</ItemTitle>
        <ItemWrap>
          <ItemTitle>{currentAccount.nickname}</ItemTitle>
          <ForwardRight />
        </ItemWrap>
      </ItemView>
      <ItemView
        style={[commonStyles.topBorder1px, styles.nestLine]}
        onPress={() => {
          goPages('gender');
        }}>
        <ItemTitle>性别</ItemTitle>
        <ItemWrap>
          <ItemTitle>{currentAccount.gender_text}</ItemTitle>
          <ForwardRight />
        </ItemWrap>
      </ItemView>
      <ItemView
        style={[commonStyles.topBorder1px, commonStyles.bottomBorder1px, styles.nestLine]}
        onPress={() => {
          goPages('birthday');
        }}>
        <ItemTitle>生日</ItemTitle>
        <ItemWrap>
          <ItemTitle>{currentAccount.birthday}</ItemTitle>
          <ForwardRight />
        </ItemWrap>
      </ItemView>
      <ItemView
        style={{}}
        onPress={() => {
          goPages('intro');
        }}>
        <ItemTitle>简介</ItemTitle>
        <ItemWrap>
          <ItemTitle>{currentAccount.intro}</ItemTitle>
          <ForwardRight />
        </ItemWrap>
      </ItemView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nestLine: {
    marginLeft: 14,
    paddingLeft: 0,
  },
});

const ItemWrap = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const ItemView = styled(Pressable)`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 14px;
  padding-right: 14px;
  color: rgba(0, 0, 0, 1);
`;

const ItemTitle = styled(Text)`
  font-size: 14px;
  font-weight: 400;
`;

export default AccountContent;
