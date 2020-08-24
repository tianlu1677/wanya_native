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
      <View style={styles.spaceWrapper}>
        <Text style={styles.name}>国家体育馆</Text>
        <Text style={styles.address}>北京市朝阳区国家体育场南路1号</Text>
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
        style={{backgroundColor: '#fff'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spaceWrapper: {
    justifyContent: 'flex-start',
    paddingTop: 12,
    paddingBottom: 12,
    marginLeft: 15,
  },
  name: {
    fontSize: 15,
    lineHeight: 20,
  },
  address: {
    fontSize: 11,
    lineHeight: 20,
    color: '#bdbdbd',
  },
  separator: {
    backgroundColor: '#FAFAFA',
    height: 2,
  },
});

export default SpaceIndex;
