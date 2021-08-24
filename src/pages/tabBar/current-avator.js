import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';

const CurrentAvator = () => {
  const navigation = useNavigation();
  const {currentAccount} = useSelector(state => state.account);

  return (
    <Pressable onPress={() => navigation.openDrawer()} style={styles.avatorWrap}>
      <FastImg style={styles.avator} source={{uri: currentAccount.avatar_url}} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  avatorWrap: {
    zIndex: 2,
  },
  avator: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RFValue(15),
  },
});

export default CurrentAvator;
