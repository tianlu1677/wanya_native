import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScrollList from '@/components/ScrollList';
import {Avator} from '@/components/NodeComponents';
import {getAccountFollowers} from '@/api/account_api';

export const AccountsIndex = () => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [accounts, setAccounts] = useState([]);

  const renderItem = ({item}) => {
    const renderStatus = () => {
      if (item.followed && item.following) {
        return '互相关注';
      }
      return item.followed ? '已关注' : '关注';
    };

    return (
      <View style={styles.follow}>
        <Avator account={item} size={40} />
        <Text style={styles.nickname}>{item.nickname}</Text>
        <Text style={[styles.btn, item.followed && {color: '#BDBDBD'}]}>{renderStatus()}</Text>
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const res = await getAccountFollowers(310);
    setLoading(false);
    setHeaders(res.headers);
    setAccounts(res.data.accounts);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollList
      data={accounts}
      loading={loading}
      headers={headers}
      renderItem={renderItem}
      onRefresh={loadData}
      renderSeparator={renderSeparator}
    />
  );
};

const styles = StyleSheet.create({
  follow: {
    flexDirection: 'row',
    paddingLeft: 14,
    paddingRight: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 14,
    paddingBottom: 14,
  },
  nickname: {
    fontSize: 14,
    marginLeft: 10,
  },
  btn: {
    marginLeft: 'auto',
  },
  separator: {
    backgroundColor: '#FAFAFA',
    height: 2,
  },
});

export default AccountsIndex;
