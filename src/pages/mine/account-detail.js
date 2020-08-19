import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Avator from '@/components/NodeComponents/Avator';
import {getAccount} from '@/api/account_api';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import {AccountDetailBgImg} from '@/utils/default-image';

const AccountDetail = () => {
  const [account, setAccount] = useState(null);

  const loadData = async () => {
    const res = await getAccount(1106);
    console.log(res.data.account);

    setAccount(res.data.account);
  };

  useEffect(() => {
    loadData();
  });

  return account ? (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Image style={styles.bgcover} source={{uri: AccountDetailBgImg}} />
        <View style={{flexDirection: 'row'}}>
          <Avator account={account} size={50} />
          <View style={{marginLeft: 8}}>
            <Text style={styles.nickname}>{account.nickname}</Text>
            <Text style={styles.uid}>顽鸦号: {account.uid}</Text>
          </View>
          <Text style={styles.invite}>邀请好友</Text>
        </View>
        <Text style={styles.settled}>顽鸦认证：{account.settled_name}</Text>
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          {account.gender === 'man' && <IconFont name="icon1" size={16} />}
          {account.gender === 'women' && <IconFont name="qiuliao" size={16} />}
          <Text style={styles.tag}>{account.age || '18'}岁</Text>
          <Text style={styles.tag}>{account.province || '未知街区'}</Text>
        </View>
        <Text style={styles.intro}>{account.intro || '这个人很懒，还没有填写简介'}</Text>
        <View style={styles.number}>
          <View style={styles.numberItem}>
            <Text style={styles.numberCount}>{account.account_feeds_count}</Text>
            <Text style={styles.numberTitle}>动态</Text>
          </View>
          <View style={styles.numberItem}>
            <Text style={styles.numberCount}>{account.nodes_count}</Text>
            <Text style={styles.numberTitle}>圈子</Text>
          </View>
          <View style={styles.numberItem}>
            <Text style={styles.numberCount}>{account.following_count}</Text>
            <Text style={styles.numberTitle}>关注</Text>
          </View>
          <View style={styles.numberItem}>
            <Text style={styles.numberCount}>{account.followers_count}</Text>
            <Text style={styles.numberTitle}>粉丝</Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    position: 'relative',
  },
  bgcover: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
  },
  nickname: {
    height: 27,
    fontSize: 16,
    lineHeight: 27,
    color: '#fff',
  },
  uid: {
    height: 20,
    fontSize: 10,
    lineHeight: 20,
    color: '#fff',
  },
  invite: {
    width: 70,
    height: 28,
    lineHeight: 28,
    textAlign: 'center',
    fontSize: 13,
    borderRadius: 1,
    backgroundColor: '#fff',
    marginTop: 5,
    marginLeft: 'auto',
  },
  settled: {
    marginTop: 16,
    marginBottom: 19,
    lineHeight: 20,
    color: '#fff',
    fontSize: 12,
  },
  tag: {
    lineHeight: 18,
    textAlign: 'center',
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  intro: {
    lineHeight: 20,
    marginBottom: 17,
    color: '#fff',
  },
  number: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  numberItem: {
    width: 45,
    marginRight: 25,
  },
  numberCount: {
    lineHeight: 20,
    height: 20,
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  numberTitle: {
    fontSize: 10,
    color: '#fff',
  },
});

export default AccountDetail;
