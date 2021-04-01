import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseAccount from '@/components/Item/base-account';

// type === related 关注——相关推荐（显示前50位)
const AccountsList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const {type} = props;

  const renderItem = ({item}) => <BaseAccount type={type} data={item} />;

  const renderSeparator = () => <View style={styles.separator} />;

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const {api, params, right_text} = props.request;
    let data = [];
    const res = await api({...params, page});
    if (type === 'newfans') {
      data = props.dataKey ? res.data[props.dataKey] : res.data.follows;
      data = data.map(follow => ({
        ...follow.account,
        created_at_text: follow.created_at_text,
        right_text: right_text,
      }));
    } else {
      data = props.dataKey ? res.data[props.dataKey] : res.data.accounts || res.data.items;
    }
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [props.request]);

  return (
    <View style={{flex: 1, paddingBottom: type === 'related' && listData.length >= 5 ? 5 : 0}}>
      <ScrollList
        data={listData}
        loading={loading}
        onRefresh={loadData}
        headers={headers}
        renderItem={renderItem}
        renderSeparator={renderSeparator}
        {...props}
      />
      {type === 'related' && listData.length >= 5 && props.renderMoreAccounts}
    </View>
  );
};

AccountsList.propTypes = {
  request: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  ref: PropTypes.any,
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#ebebeb',
    height: StyleSheet.hairlineWidth,
    marginLeft: 16,
  },
});

export default AccountsList;
