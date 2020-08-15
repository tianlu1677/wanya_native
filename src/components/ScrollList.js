import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {EmptyImg} from '@/utils/default-image';
import {Props} from 'react-native-image-zoom-viewer/built/image-viewer.type';

export const pagination = (headers = {}) => {
  const currentPage = Number(headers['x-current-page']);
  const perPage = Number(headers['x-per-page'] || headers['X-Page-Items']);
  const total = Number(headers['x-total']);
  const hasMore = currentPage * perPage < total;
  const nextPage = hasMore ? currentPage + 1 : currentPage;
  return {hasMore: hasMore, nextPage: nextPage, page: currentPage, total: total};
};

const loadState = {
  NORMAL: 0, //正常
  LOADING: 1, // 加载中
  SUCCESS: 2, //加载完成
  EMPTY: 3, //数据为空
  ERROR: 4, //加载失败
};

const ScrollList = props => {
  const [height, setHeight] = useState(null);
  const [enableLoadMore] = useState(props.enableLoadMore || true);
  const [enableRefresh] = useState(props.enableRefresh || true);
  const [state, setState] = useState(loadState.NORMAL);
  const [pagin, setPagin] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const {data, renderItem, itemKey, headers} = props;

  const onRefresh = () => {
    setRefreshing(true);
    setState(loadState.LOADING);
    try {
      props.onRefresh();
    } catch {
      setState(loadState.ERROR);
    }
  };

  const onEndReached = () => {
    if (!pagin.hasMore) {
      setState(loadState.EMPTY);
      return;
    }
    setRefreshing(true);
    setState(loadState.LOADING);
    try {
      props.onRefresh(pagin.nextPage);
    } catch {
      setState(loadState.ERROR);
    }
  };

  const renderFooter = () => {
    let footer = null;
    switch (state) {
      case loadState.LOADING:
        footer = <ActivityIndicator />;
        break;
      case loadState.EMPTY:
        footer = <Text>数据已全部完成</Text>;
        break;
      case loadState.ERROR:
        footer = <Text onPress={onRefresh}>点击重新加载</Text>;
        break;
    }
    return footer;
  };

  const renderEmpty = () => {
    return (
      <View style={[scrollStyle.footer, {height: height}]}>
        <Image style={scrollStyle.emptyImg} source={{uri: EmptyImg}} />
        <Text>{props.emptyTitle || '还没有内容哦'}</Text>
      </View>
    );
  };

  useEffect(() => {
    setRefreshing(false);
    setState(loadState.SUCCESS);
    setPagin(pagination(headers));
  }, [headers]);

  return (
    <FlatList
      data={data}
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
      renderItem={renderItem}
      keyExtractor={item => String(item[itemKey])}
      refreshing={refreshing}
      onRefresh={enableLoadMore ? onRefresh : null}
      onEndReached={enableRefresh ? onEndReached : null}
      ListFooterComponent={enableLoadMore ? renderFooter : null}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={renderEmpty}
      style={scrollStyle.containter}
    />
  );
};

const scrollStyle = StyleSheet.create({
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImg: {
    width: 128,
    height: 128,
    marginBottom: 10,
  },
});

ScrollList.propTypes = {
  data: PropTypes.array.isRequired, //List接收的数据
  itemKey: PropTypes.string.isRequired, // list 渲染唯一key
  renderItem: PropTypes.func.isRequired, // Item 组建
  headers: PropTypes.object, // 分页
  enableLoadMore: PropTypes.bool, //是否可以加载更多，默认true
  enableRefresh: PropTypes.bool, //是否可以下拉刷新，默认true
  onRefresh: PropTypes.func, // 下拉刷新，加载更多，执行方法
  emptyTitle: Props.string, //数据为空时提示
};

export default ScrollList;
