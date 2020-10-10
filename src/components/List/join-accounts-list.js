import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import ScrollList from '@/components/ScrollList';
import {Avator, PlayScore} from '@/components/NodeComponents';
import PropTypes from 'prop-types';

const JoinAccountsList = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const goAccountDetail = item => {
    navigation.push('AccountDetail', {accountId: item.id});
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback onPress={() => goAccountDetail(item)}>
        <View style={styles.follow}>
          <Text style={styles.num}>{index + 1}</Text>
          <Avator account={item} size={40} />
          <Text style={styles.nickname}>{item.nickname}</Text>
          <PlayScore
            score={item.play_score}
            textStyle={{color: '#000', minWidth: 30, textAlign: 'center'}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
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
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItem}
      renderSeparator={renderSeparator}
      {...(route.params.listOption || {})}
      style={{backgroundColor: '#fff'}}
    />
  );
};

export const styles = StyleSheet.create({
  follow: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 27,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 14,
    paddingBottom: 14,
  },
  num: {
    marginRight: 18,
    fontSize: 14,
  },
  nickname: {
    fontSize: 14,
    marginLeft: 10,
    marginRight: 'auto',
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

JoinAccountsList.propTypes = {
  title: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
  listOption: PropTypes.any,
};

export default JoinAccountsList;
