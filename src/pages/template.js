import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import SafeAreaPlus from '@/components/SafeAreaPlus';
import {sendPhoneCode, verifyPhoneCode} from '../../api/phone_sign_api';
import {getCurrentAccount} from '@/api/mine_api';
import styled from 'styled-components/native';
import Helper from '../../utils/helper';
import {dispatchSetAuthToken} from '@/redux/actions';

const Temp = ({navigation, route}) => {
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerBackTitleVisible: false,
      // headerTintColor: 'white',
      // title: '',
      // headerStyle: {
      //   backgroundColor: 'black',
      //   elevation: 0,
      //   shadowOpacity: 0,
      //   borderBottomWidth: 0,
      //   // color: 'white',
      // },
      // headerRight: () => (
      //   <Button
      //     onPress={() => {
      //       onVerifyPhoneCode();
      //     }}
      //     title="确定"
      //     color={phoneCode.length === 6 ? 'white' : '#353535'}
      //   />
      // ),
    });
  }, [navigation]);

  return (
    <SafeAreaPlus>
      <Text>xxxx</Text>
    </SafeAreaPlus>
  );
};

const styles = StyleSheet.create({
  //底部默认样式
  phoneContainer: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 30,
    letterSpacing: 1,
  },
});

const TitleText = styled(Text)`
  letter-spacing: 1px;
  font-size: 27px;
  color: white;
  font-weight: 600;
`;

export default Temp;
