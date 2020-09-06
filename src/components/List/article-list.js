import React, {useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseArticle from '@/components/Item/base-article';

const ArticleList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item}) => {
    return <BaseArticle data={item} key={item.id} />;
  };

  const renderSeparator = () => {
    return <Text style={styles.separator} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    console.log(res);
    const data = res.data.articles;
    setLoading(false);
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
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
      {...props}
      style={styles.wrapper}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
  },
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
    backgroundColor: '#ebebeb',
    height: 1,
    marginLeft: 60,
  },
});

ArticleList.propTypes = {
  request: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  ref: PropTypes.any,
};

export default ArticleList;
