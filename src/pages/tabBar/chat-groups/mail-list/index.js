import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ScrollList, {pagination} from '@/components/ScrollList';
import BaseMail from '@/components/Item/base-mail';
import {BarHeight, IsIos} from '@/utils/navbar';
import {RFValue} from '@/utils/response-fontsize';
import {getAccountFollowEeach, getAccountFollowings, getAccountFollowers} from '@/api/account_api';

const TextData = [
  {text: '互相关注', key: '互关', api: getAccountFollowEeach},
  {text: '我的关注', key: '关注', api: getAccountFollowings},
  {text: '我的粉丝', key: '粉丝', api: getAccountFollowers},
];

const MailList = () => {
  const {account} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);
  const [pagin, setPagin] = useState({});
  const [current, setCurrent] = useState(0);

  const handleChange = index => {
    setCurrent(index);
  };

  const RenderItem = ({item}) => {
    return <BaseMail item={item} />;
  };

  const loadData = async (page = 1, params) => {
    if (page === 1) {
      setLoading(true);
    }

    const request = TextData[current].api;
    const res = await request({page, ...params});
    setPagin(pagination(res.headers));
    setListData(page === 1 ? res.data.accounts : [...listData, ...res.data.accounts]);
    setLoading(false);
    setHeaders(res.headers);
  };

  const onRefresh = page => {
    loadData(page, {id: account.currentAccount.id});
  };

  useEffect(() => {
    onRefresh(1);
  }, [current]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.followHeader}>
        <Text style={styles.introText}>
          {TextData[current].text}（{pagin.total}）
        </Text>
        <View style={styles.followWrap}>
          {TextData.map((item, index) => {
            return (
              <Text
                key={index}
                onPress={() => handleChange(index)}
                style={[styles.followText, current === index ? styles.active : {}]}>
                {item.key}
              </Text>
            );
          })}
        </View>
      </View>

      <ScrollList
        data={listData}
        loading={loading}
        onRefresh={onRefresh}
        headers={headers}
        renderItem={RenderItem}
        renderSeparator={() => <Text style={styles.separator} />}
        enableRefresh={false}
        style={{backgroundColor: '#fff'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  followHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  introText: {
    fontWeight: '500',
  },
  followWrap: {
    height: 25,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 14,
  },
  followText: {
    height: 21,
    lineHeight: 21,
    paddingHorizontal: 9,
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 11,
    color: '#BDBDBD',
  },
  active: {
    backgroundColor: '#ffe1e6',
    color: '#FF2242',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#fafafa',
    marginLeft: 14 + 45 + 12,
  },
});

export default MailList;
