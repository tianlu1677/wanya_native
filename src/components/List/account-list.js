import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import ScrollList from '@/components/ScrollList';
import {Avator} from '@/components/NodeComponents';
import {followAccount, unfollowAccount} from '@/api/account_api';

export const MentiosAccountList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={() => props.onPress(item)}>
        <View style={styles.follow}>
          <Avator account={item} size={40} />
          <Text style={styles.nickname}>{item.nickname}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.accounts;
    setLoading(false);
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [props.request]);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      renderSeparator={renderSeparator}
      {...props}
    />
  );
};

MentiosAccountList.propTypes = {
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
  },
  btn: {
    marginLeft: 'auto',
    paddingLeft: 3,
    paddingRight: 3,
    fontWeight: '500',
  },
  separator: {
    backgroundColor: '#FAFAFA',
    height: 2,
    marginLeft: 16,
  },
});

export const AccountList = props => {
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

  const goAccountDetail = item => {
    navigation.navigate('AccountDetail', {accountId: item.id});
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback onPress={() => goAccountDetail(item)}>
        <View style={styles.follow}>
          <Avator account={item} size={40} />
          <Text style={styles.nickname}>{item.nickname}</Text>
          <Text
            style={[styles.btn, {color: !item.followed ? '#000' : '#bdbdbd'}]}
            onPress={() => onFollowed(item, index)}>
            {item.followed && item.following ? '互相关注' : item.followed ? '已关注' : '关注'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.accounts;
    setLoading(false);
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [props.request]);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      renderSeparator={renderSeparator}
      {...props}
      style={{backgroundColor: '#fff'}}
    />
  );
};