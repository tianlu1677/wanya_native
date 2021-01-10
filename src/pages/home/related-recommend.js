import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import {Avator} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import {recommendAccounts} from '@/api/mine_api';
import {followAccount} from '@/api/account_api';

const RelatedRecommend = () => {
  const navigation = useNavigation();
  const [account, setAccount] = useState([]);

  const loadData = async () => {
    const res = await recommendAccounts();
    setAccount(res.data.accounts);
  };

  const onFollow = async (item, index) => {
    if (item.followed === false) {
      await followAccount(item.id);
      Toast.showError('关注成功');
      account[index].followed = true;
      setAccount([...account]);
    }

    setTimeout(() => {
      account.splice(index, 1);
      setAccount([...account]);
    }, 1000);
  };

  const goDetail = item => {
    navigation.navigate('AccountDetail', {accountId: item.id});
  };

  const goRelatedDetail = () => {
    navigation.navigate('RelatedAccounts');
  };

  useEffect(() => {
    loadData();
  }, []);

  return account.length > 0 ? (
    <View style={styles.wrapper}>
      <Pressable style={styles.title} onPress={goRelatedDetail}>
        <Text>为您推荐</Text>
        <View style={styles.right}>
          <Text style={{marginRight: 2}}>相关推荐</Text>
          <IconFont name="arrow-right" color={'#000'} size={RFValue(8)} />
        </View>
      </Pressable>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {account.map((item, index) => (
            <Pressable key={item.id} style={styles.card} onPress={() => goDetail(item)}>
              <Avator account={{avatar_url: item.avatar_url, id: item.id}} size={70} />
              <Text style={styles.cardtext} numberOfLines={1}>
                {item.nickname}
              </Text>
              <Text
                style={[styles.cardbtn, item.followed ? styles.hasfollow : styles.notfollow]}
                onPress={() => onFollow(item, index)}>
                {item.followed ? '已关注' : '关注'}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 14,
    backgroundColor: '#fafafa',
  },
  title: {
    height: RFValue(40),
    lineHeight: RFValue(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 14,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    width: RFValue(125),
    backgroundColor: '#F2F3F5',
    alignItems: 'center',
    paddingVertical: RFValue(16),
    marginRight: RFValue(10),
    borderRadius: 2,
    overflow: 'hidden',
  },
  cardtext: {
    lineHeight: 18,
    marginTop: RFValue(10),
    marginBottom: RFValue(15),
    marginLeft: RFValue(9),
    marginRight: RFValue(9),
  },
  cardbtn: {
    width: RFValue(90),
    height: RFValue(30),
    lineHeight: RFValue(30),
    textAlign: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    fontSize: 13,
    fontWeight: '500',
  },
  hasfollow: {
    backgroundColor: '#FAFAFA',
    color: '#BDBDBD',
  },
  notfollow: {
    backgroundColor: '#000',
    color: '#fff',
  },
});

export default RelatedRecommend;
