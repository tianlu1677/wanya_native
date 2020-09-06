import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import SafeAreaPlus from '@/components/SafeAreaPlus';
import {sendPhoneCode, verifyPhoneCode} from '../../api/phone_sign_api';
import {getCurrentAccount} from '@/api/mine_api';
import Toast from 'react-native-root-toast';
import styled from 'styled-components/native';
import Helper from '../../utils/helper';
import {dispatchSetAuthToken} from '@/redux/actions';

const GoNewTopic = ({navigation, route}) => {
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({

    });
    navigation.navigate('NewTopic')
  }, [navigation]);

  return (
    <SafeAreaPlus>

    </SafeAreaPlus>
  );
};

export default GoNewTopic;
