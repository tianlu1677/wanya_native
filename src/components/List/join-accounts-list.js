import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import ScrollList from '@/components/ScrollList';
import {Avator, PlayScore} from '@/components/NodeComponents';
import PropTypes from 'prop-types';
import {RFValue} from '@/utils/response-fontsize';

const JoinAccountsList = ({navigation, route}) => {
  const {title, account} = route.params;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);
  const adminAccount = account.account;

  const renderItem = ({item}) => {
    return (
      <Pressable onPress={() => goAccountDetail(item)}>
        <View style={styles.follow}>
          <Avator account={item} size={RFValue(40)} />
          <Text style={styles.nickname}>{item.nickname}</Text>
          <PlayScore score={item.play_score} textStyle={styles.textScore} />
        </View>
      </Pressable>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const goAccountDetail = item => {
    navigation.push('AccountDetail', {accountId: item.id});
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = route.params.request;
    const res = await api({...params, page});
    const data = res.data.accounts;

    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    navigation.setOptions({title});
    console.log('route', route.params);
  }, []);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      renderSeparator={renderSeparator}
      enableRefresh={false}
      ListHeaderComponent={
        adminAccount && (
          <>
            <Text style={styles.title}>{account.title}</Text>
            <Pressable onPress={() => goAccountDetail(adminAccount)}>
              <View style={styles.follow}>
                <Avator account={adminAccount} size={RFValue(40)} />
                <Text style={styles.nickname}>{adminAccount.nickname}</Text>
                <PlayScore score={adminAccount.play_score} textStyle={styles.textScore} />
              </View>
            </Pressable>
            <Text style={styles.title}>已加入顽友</Text>
          </>
        )
      }
    />
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    height: RFValue(32),
    lineHeight: RFValue(32),
    backgroundColor: '#fafafa',
    paddingLeft: RFValue(16),
    color: '#bdbdbd',
    fontSize: RFValue(12),
  },
  follow: {
    flexDirection: 'row',
    paddingLeft: RFValue(16),
    paddingRight: RFValue(27),
    paddingVertical: RFValue(14),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  nickname: {
    fontSize: 14,
    marginLeft: 10,
    marginRight: 'auto',
  },
  textScore: {
    color: '#000',
    minWidth: 30,
    textAlign: 'center',
  },
  separator: {
    backgroundColor: '#ebebeb',
    height: StyleSheet.hairlineWidth,
    marginLeft: RFValue(16),
  },
});

JoinAccountsList.propTypes = {
  title: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
  listOption: PropTypes.any,
};

export default JoinAccountsList;
