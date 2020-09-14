import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {EmptyImg} from '@/utils/default-image';

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
  const [enableLoadMore, setEnableLoadMore] = useState(true);
  const [enableRefresh, setEnableRefresh] = useState(true);
  const [state, setState] = useState(loadState.NORMAL);
  const [pagin, setPagin] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    if (refreshing || state === loadState.LOADING) {
      return;
    }
    setRefreshing(true);
    setState(loadState.LOADING);
    console.log('onRefresh =============', state, refreshing);
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

    if (refreshing || state === loadState.LOADING) {
      return;
    }
    console.log('onEndReached ===============', state, refreshing);
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
        // footer = <Text>数据已全部完成</Text>;
        break;
      case loadState.ERROR:
        footer = <Text onPress={onRefresh}>点击重新加载</Text>;
        break;
    }
    return footer;
  };

  const renderEmpty = () => {
    return (
      !refreshing && (
        <View style={[scrollStyle.footer, {maxHeight: height}]}>
          <Image style={scrollStyle.emptyImg} source={{uri: EmptyImg}} />
          <Text>{props.emptyTitle || '还没有内容哦'}</Text>
        </View>
      )
    );
  };

  const renderSeparator = () => {
    return <View style={scrollStyle.separator} />;
  };

  useEffect(() => {
    setEnableLoadMore(props.enableLoadMore === false ? false : true);
    setEnableRefresh(props.enableRefresh === false ? false : true);
    setRefreshing(props.loading || false);
  });

  useEffect(() => {
    setState(loadState.SUCCESS);
    setPagin(pagination(props.headers));
  }, [props.headers]);

  useEffect(() => {
    setRefreshing(props.loading);
  }, [props.loading]);

  return (
    <FlatList
      ref={props.getRref}
      data={props.data}
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
      renderItem={props.renderItem}
      keyExtractor={item => String(item[props.itemKey || 'id'])}
      refreshing={refreshing ? refreshing : false}
      onRefresh={enableLoadMore ? onRefresh : null}
      onEndReached={enableRefresh ? onEndReached : null}
      ListFooterComponent={enableLoadMore ? renderFooter : null}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={renderEmpty}
      ItemSeparatorComponent={props.renderSeparator || renderSeparator}
      style={[scrollStyle.containter, props.style]}
      numColumns={props.numColumns || 1}
      horizontal={false}
      ListHeaderComponent={props.ListHeaderComponent || null}
    />
  );
};

const scrollStyle = StyleSheet.create({
  containter: {},
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  emptyImg: {
    width: 64,
    height: 64,
    marginBottom: 10,
  },
  separator: {
    backgroundColor: '#FAFAFA',
    height: 9,
  },
});

ScrollList.propTypes = {
  data: PropTypes.array.isRequired, //List接收的数据
  loading: PropTypes.bool, // loading 状态
  renderItem: PropTypes.func.isRequired, // Item 组建
  itemKey: PropTypes.string, // list 渲染唯一key 默认id
  headers: PropTypes.object, // 分页
  enableLoadMore: PropTypes.bool, //是否可以加载更多，默认true
  enableRefresh: PropTypes.bool, //是否可以下拉刷新，默认true
  onRefresh: PropTypes.func, // 下拉刷新，加载更多，执行方法
  emptyTitle: PropTypes.string, //数据为空时提示
  renderSeparator: PropTypes.func, // 分割线
  ListHeaderComponent: PropTypes.object, //
};

export default ScrollList;
