import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, RefreshControl, ActivityIndicator, StyleSheet, Animated} from 'react-native';
import PropTypes from 'prop-types';
import {throttle} from 'lodash';
import FastImg from '@/components/FastImg';
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
  // LOADING: 1, // 加载中
  // SUCCESS: 2, //加载完成
  EMPTY: 3, //数据为空
  // ERROR: 4, //加载失败
};

const ScrollList = props => {
  const [enableRefresh, setEnableRefresh] = useState(true);
  const [enableLoadMore] = useState(props.enableLoadMore === false ? false : true);
  const [pagin, setPagin] = useState({page: 1, nextPage: 2, hasMore: true, total: 0});
  const [refreshing, setRefreshing] = useState(true); //默认true 看有没用问题
  const [state, setState] = useState(loadState.NORMAL);

  const RenderSeparator = () =>
    props.renderSeparator ? props.renderSeparator : <View style={styles.spearator} />;

  const RenderEmpty = () => {
    let empty = null;
    if (props.data.length === 0 && !props.loading) {
      empty = (
        <View style={styles.emptyWrap}>
          <FastImg source={{uri: EmptyImg}} style={styles.emptyImage} />
          <Text style={styles.emptyText}>{props.emptyTitle || '暂时还没有内容哦'}</Text>
        </View>
      );
    }
    return empty;
  };

  const RenderFooter = () => {
    let footer = null;
    if (refreshing) {
      return;
    }

    if (enableLoadMore && state === loadState.EMPTY) {
      footer = <Text style={styles.noMore}>没有更多了</Text>;
    }

    if (enableLoadMore && pagin.hasMore && props.data.length > 0) {
      footer = props.ListFooterComponent ? (
        props.ListFooterComponent
      ) : (
        <View style={styles.footerWrap}>
          <ActivityIndicator animating={true} color={'#000'} size="small" />
          <Text style={styles.footerText}>正在加载更多</Text>
        </View>
      );
    }
    return footer;
  };

  const onRefresh = () => {
    console.log('onRefresh start');
    if (props.loading === false) {
      props.onRefresh();
    }
  };

  const onEndReached = () => {
    console.log('onEndReached start');
    if (!pagin.hasMore) {
      setState(loadState.EMPTY);
      return;
    }

    if (props.loading === false) {
      props.onRefresh(pagin.nextPage);
    }
  };

  const KeyExtractor = useCallback(item => {
    return props.itemKey ? `item-${item[props.itemKey]}` : `item-${item.id}`;
  });

  const RenderItem = React.memo(itemProps => props.renderItem({...itemProps}));

  const RenderItemMemo = useCallback(itemProps => <RenderItem {...itemProps} />, [props.data]);

  const RenderItemMemoNumColumns2 = useCallback(itemProps => props.renderItem({...itemProps}), [
    props.data,
  ]);

  useEffect(() => {
    if (props.headers) {
      setPagin(pagination(props.headers));
    }
  }, [props.headers]);

  useEffect(() => {
    // loading最后执行
    setRefreshing(props.loading);
    if (props.headers) {
      const nextPage = pagination(props.headers).nextPage;
      if (nextPage === 2 && props.enableRefresh === false) {
        setEnableRefresh(false); //只有不下拉加载会render两遍
        console.log('只有不下拉加载会render两遍');
      }
    }
  }, [props.loading]);

  return (
    <View style={styles.wrapper}>
      <Animated.FlatList
        ref={props.getRref}
        horizontal={false}
        initialNumToRender={6}
        removeClippedSubviews={false}
        windowSize={6}
        progressViewOffset={1}
        numColumns={props.numColumns || 1}
        data={props.data}
        keyExtractor={KeyExtractor}
        renderItem={props.numColumns === 2 ? RenderItemMemoNumColumns2 : RenderItemMemo}
        ItemSeparatorComponent={RenderSeparator}
        ListFooterComponent={RenderFooter}
        ListEmptyComponent={RenderEmpty}
        ListHeaderComponent={props.ListHeaderComponent || null}
        onEndReachedThreshold={0.2}
        onEndReached={enableLoadMore ? throttle(onEndReached, 500) : null}
        contentContainerStyle={{flex: props.data.length === 0 ? 1 : 0}} //flex:1 页面不能滑动 //为了empty居中
        refreshControl={
          enableRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={enableRefresh ? onRefresh.bind(this) : null}
              tintColor="black"
              style={{backgroundColor: 'white'}}
            />
          ) : null
        }
        {...props.settings}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  spearator: {
    height: 9,
    backgroundColor: '#fafafa',
  },
  footerWrap: {
    height: 70,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#bdbdbd',
    marginTop: 5,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  emptyImage: {
    width: 64,
    height: 64,
  },
  emptyText: {
    color: '#DADADA',
    fontSize: 13,
    marginTop: 20,
  },
  noMore: {
    height: 80,
    fontSize: 11,
    color: '#CACACA',
  },
});

ScrollList.defaultProps = {
  data: [],
  loading: true,
  headers: {},
  enableLoadMore: true,
  enableRefresh: true,
  emptyTitle: '暂时还没有内容哦',
};

ScrollList.propTypes = {
  data: PropTypes.array.isRequired, //List接收的数据
  loading: PropTypes.bool.isRequired, // loading 状态
  renderItem: PropTypes.func.isRequired, // Item 组建
  itemKey: PropTypes.string, // list 渲染唯一key 默认id
  headers: PropTypes.object, // 分页
  numColumns: PropTypes.number, //列表列数 //双排2列
  enableLoadMore: PropTypes.bool, //是否可以加载更多，默认true
  enableRefresh: PropTypes.bool, //是否可以下拉刷新，默认true
  onRefresh: PropTypes.func, // 下拉刷新，加载更多，执行方法
  emptyTitle: PropTypes.string, //数据为空时提示
  renderSeparator: PropTypes.func, // 分割线 默认9px #D3D3D3
  ListHeaderComponent: PropTypes.object, // header 头部
  settings: PropTypes.object, // 一些其他的默认限制
};

export default ScrollList;
