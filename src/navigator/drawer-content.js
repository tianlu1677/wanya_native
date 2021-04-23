import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {BarHeight} from '@/utils/navbar';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';

const DrawerContent = ({navigation}) => {
  const currentAccount = useSelector(state => state.account.currentAccount);

  const onEdit = () => {
    navigation.navigate('AccountContent');
  };

  const onDetail = () => {
    navigation.navigate('AccountDetail', {accountId: currentAccount.id});
  };

  const onFeedback = () => {
    navigation.navigate('Feedback');
  };

  const onSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.close}
        onPress={() => navigation.closeDrawer()}
        hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}>
        <IconFont name={'close'} size={18} />
      </Pressable>
      <Pressable style={styles.account} onPress={onEdit}>
        <FastImg style={styles.avator} source={{uri: currentAccount.avatar_url}} />
        <View style={styles.info}>
          <Text style={styles.name}>{currentAccount.nickname}</Text>
          <Text style={styles.editText}>编辑资料</Text>
        </View>
        <IconFont name="arrow-right" size={12} color={'#C2C2C2'} />
      </Pressable>
      <Pressable style={styles.drawerItem} onPress={onDetail}>
        <IconFont name="gerenzhuye" size={RFValue(18)} color={'#000'} />
        <Text style={styles.drawerText}>个人主页</Text>
      </Pressable>
      <Pressable style={styles.drawerItem} onPress={onFeedback}>
        <IconFont name="fankui" size={RFValue(18)} color={'#000'} />
        <Text style={styles.drawerText}>反馈</Text>
      </Pressable>
      <Pressable style={[styles.drawerItem, styles.drawerSetting]} onPress={onSettings}>
        <IconFont name="shezhi" size={RFValue(18)} color={'#000'} />
        <Text style={styles.drawerText}>设置</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop: BarHeight,
  },
  close: {
    height: RFValue(36),
    justifyContent: 'center',
  },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(6),
    marginBottom: RFValue(17),
  },
  info: {
    marginLeft: 10,
    marginRight: 'auto',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  editText: {
    color: '#959595',
    fontSize: 12,
    marginTop: 8,
  },
  avator: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(20),
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: RFValue(43),
    paddingLeft: 10,
  },
  drawerText: {
    marginLeft: 16,
    fontSize: 15,
  },
  drawerSetting: {
    marginTop: 'auto',
    marginBottom: RFValue(25),
  },
});

export default DrawerContent;
