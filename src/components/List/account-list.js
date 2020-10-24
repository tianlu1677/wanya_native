import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import * as action from '@/redux/constants';
import ScrollList from '@/components/ScrollList';
import {Avator} from '@/components/NodeComponents';
import {followAccount, unfollowAccount} from '@/api/account_api';

export const MentionsAccountList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const savetopic = useSelector(state => state.home.savetopic);

  const onPress = item => {
    const topics = {
      ...savetopic,
      plan_content: savetopic.plan_content
        ? `${savetopic.plan_content} @${item.nickname} `
        : `@${item.nickname} `,
      mention: savetopic.mention ? [...savetopic.mention, item] : [item],
    };
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.goBack();
  };

  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={() => onPress(item)}>
        <View style={styles.follow}>
          <Avator account={item} size={40} handleClick={() => onPress(item)} />
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
    const data = params.name ? res.data.items : res.data.accounts;
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

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

MentionsAccountList.propTypes = {
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
    paddingLeft: 3,
    paddingRight: 3,
    fontWeight: '500',
  },
  separator: {
    backgroundColor: '#FAFAFA',
    height: 1,
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
    navigation.push('AccountDetail', {accountId: item.id});
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback onPress={() => goAccountDetail(item)}>
        <View style={styles.follow}>
          <Avator account={item} size={40} />
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.nickname}>{item.nickname}</Text>
              {item.right_text && <Text style={styles.right_text}>{item.right_text}</Text>}
            </View>
            {item.created_at_text && (
              <Text style={styles.created_at_text}>{item.created_at_text}</Text>
            )}
          </View>

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
    const {api, params, account_type, right_text} = props.request;
    let data = [];
    const res = await api({...params, page});
    if (account_type === 'account_recent_follow') {
      data = res.data.follows;
      data = data.map(follow => ({
        ...follow.account,
        created_at_text: follow.created_at_text,
        right_text: right_text,
      }));
    } else {
      data = res.data.accounts;
    }
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      renderSeparator={renderSeparator}
      initialNumToRender={15}
      style={{backgroundColor: '#fff'}}
    />
  );
};
