import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import ScrollList from '@/components/ScrollList';
import BaseHashtag from '@/components/Item/base-hashtag';

const HashtagList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const {type} = props;

  const renderItem = ({item}) => {
    return <BaseHashtag data={item} type={type} />;
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.spaces;
    setHeaders(res.headers);
    if (type === 'add-hashtag' && data.length === 0) {
      setListData([{name: params.name, id: 0}]);
    } else {
      setListData(page === 1 ? data : [...listData, ...data]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [props.request]);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      headers={headers}
      renderItem={renderItem}
      renderSeparator={renderSeparator}
      itemKey={'name'}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  hashtagWrap: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hashtagName: {
    height: 45,
    lineHeight: 45,
    marginLeft: 15,
    color: '#FF8D00',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
  },
  newHashTag: {
    marginLeft: 'auto',
    marginRight: 15,
    fontSize: 13,
    color: '#bdbdbd',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 14,
  },
});

export default HashtagList;
