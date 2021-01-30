import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import * as action from '@/redux/constants';
import ScrollList from '@/components/ScrollList';
import {Avator} from '@/components/NodeComponents';
import {followAccount, unfollowAccount} from '@/api/account_api';

// follow normal text
const AccountsNormalList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const navigation = useNavigation();

  const onFollowed = async (item, index) => {
    if (item.followed) {
      await unfollowAccount(item.id);
    } else {
      await followAccount(item.id);
    }
    listData[index] = {...item, followed: !item.followed};
    setListData([...listData]);
  };

  const renderItem = ({item, index}) => {
    return (
      <Pressable style={styles.follow} onPress={() => navigation.push('AccountDetail', { accountId: item.id})}>
        <Avator account={item} size={40} />
        <Text style={styles.nickname}>{item.nickname}</Text>
        {/*<View>*/}
        {/*  <View style={{flexDirection: 'row'}}>*/}
        {/*    <Text style={styles.nickname}>{item.nickname}</Text>*/}
        {/*    {item.right_text && <Text style={styles.right_text}>{item.right_text}</Text>}*/}
        {/*  </View>*/}
        {/*  {item.created_at_text && (*/}
        {/*    <Text style={styles.created_at_text}>{item.created_at_text}</Text>*/}
        {/*  )}*/}
        {/*</View>*/}
        <Text
          style={[styles.btn, {color: item.followed ? '#bdbdbd' : '#000'}]}
          onPress={() => onFollowed(item, index)}>
          {item.followed && item.following ? '互相关注' : item.followed ? '已关注' : '关注'}
        </Text>
      </Pressable>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const {api, params} = props.request;
    let data = [];
    const res = await api({...params, page});
    data = props.dataKey ? res.data[props.dataKey] : res.data.accounts;
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [props.request]);

  return (
    <View
      style={{flex: 1, paddingBottom: props.type === 'related' && listData.length >= 50 ? 50 : 0}}>
      <ScrollList
        data={listData}
        loading={loading}
        onRefresh={loadData}
        headers={headers}
        renderItem={renderItem}
        renderSeparator={renderSeparator}
        {...props}
      />
      {props.type === 'related' && listData.length >= 50 && props.renderMoreAccounts}
    </View>
  );
};

AccountsNormalList.propTypes = {
  request: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  ref: PropTypes.any,
};

export const styles = StyleSheet.create({
  follow: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 14,
    paddingBottom: 14,
  },
  nickname: {
    fontSize: 14,
    marginLeft: 10,
    lineHeight: 21,
  },
  right_text: {
    paddingLeft: 8,
    fontSize: 13,
    letterSpacing: 1,
    lineHeight: 21,
    color: '#BDBDBD',
  },
  created_at_text: {
    marginLeft: 10,
    fontSize: 11,
    lineHeight: 20,
    color: '#BDBDBD',
  },
  btn: {
    marginLeft: 'auto',
    paddingHorizontal: 3,
    fontWeight: '500',
  },
  separator: {
    backgroundColor: '#ebebeb',
    height: StyleSheet.hairlineWidth,
    marginLeft: 16,
  },
});

export default AccountsNormalList;
