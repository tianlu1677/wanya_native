import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import ScrollList from '@/components/ScrollList';
import {getSpacesList} from '@/api/space_api';
import {getAccountFollowers} from '@/api/account_api';
import IconFont from '@/iconfont';
import {Search} from '@/components/NodeComponents';

const SpaceIndex = () => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [spaces, getSpaces] = useState([]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.follow}>
        <Text style={styles.nickname}>{item.nickname}</Text>
      </View>
    );
  };
  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const res = await getAccountFollowers(310, {page});
    setLoading(false);
    setHeaders(res.headers);
    getSpaces(res.data.accounts);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <Search placeholder="搜索更多场地" />
      <ScrollList
        data={spaces}
        loading={loading}
        headers={headers}
        renderItem={renderItem}
        onRefresh={loadData}
        renderSeparator={renderSeparator}
      />
    </View>
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

export default SpaceIndex;
