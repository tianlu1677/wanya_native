import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, RefreshControl, Animated} from 'react-native';
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

const ScrollList = props => {
  const [enableRefresh, setEnableRefresh] = useState(true);
  const [enableLoadMore] = useState(props.enableLoadMore === false ? false : true);
  const [pagin, setPagin] = useState({page: 1, nextPage: 2, hasMore: false, total: 0});
  const [finishContent, setFinishContent] = useState(false);

  const RenderEmpty = () => {
    let empty = null;
    if (props.data.length === 0 && !props.loading) {
      empty = (
        <View style={styles.emptyWrap}>
          <FastImg source={{uri: EmptyImg}} style={styles.emptyImage} />
          <Text style={styles.emptyText}>{'暂时还没有内容哦'}</Text>
        </View>
      );
    }
    return empty;
  };

  const RenderFooter = () => {
    let footer = null;
    if (enableLoadMore && pagin.hasMore && props.data.length > 0) {
      footer = props.ListFooterComponent ? (
        props.ListFooterComponent
      ) : (
        <View style={styles.footerWrap}>
          <ActivityIndicator animating={true} color={'#000'} />
          <Text style={styles.footerText}>正在加载更多</Text>
        </View>
      );
    }
    return footer;
  };

  const RenderSeparator = () =>
    props.renderSeparator ? props.renderSeparator : <View style={styles.spearator} />;

  const KeyExtractor = useCallback(item => {
    return props.itemKey ? `item-${item[props.itemKey]}` : `item-${item.id}`;
  }, []);

  const RenderItem = React.memo(itemProps => props.renderItem({...itemProps}));

  const RenderItemMemo = useCallback(itemProps => <RenderItem {...itemProps} />, []);

  const onRefresh = () => {
    if (props.loading === false) {
      props.onRefresh();
    }
  };

  const onEndReached = () => {
    if (finishContent && props.loading === false) {
      props.onRefresh(pagin.nextPage);
    }
  };

  useEffect(() => {
    if (props.headers) {
      if (pagination(props.headers).nextPage === 2 && props.enableRefresh === false) {
        setEnableRefresh(false); //只有不下拉加载会render两遍
      }
      setPagin(pagination(props.headers));
    }
  }, [props.headers]);

  return (
    <View style={styles.wrapper}>
      <Animated.FlatList
        horizontal={false}
        bounces={props.bounces || true}
        initialNumToRender={6}
        removeClippedSubviews={false}
        windowSize={6}
        progressViewOffset={1}
        numColumns={props.numColumns || 1}
        data={props.data}
        keyExtractor={KeyExtractor}
        renderItem={RenderItemMemo}
        ItemSeparatorComponent={RenderSeparator}
        ListFooterComponent={RenderFooter}
        ListEmptyComponent={RenderEmpty}
        ListHeaderComponent={props.ListHeaderComponent || null}
        onEndReachedThreshold={0.2}
        onEndReached={enableLoadMore ? throttle(onEndReached, 500) : null}
        onScrollEndDrag={() => setFinishContent(true)}
        contentContainerStyle={{flex: props.data.length === 0 ? 1 : 0}} //导致不能滑动 //为了empty居中
        refreshControl={
          enableRefresh ? (
            <RefreshControl
              refreshing={props.loading}
              onRefresh={enableRefresh ? onRefresh : null}
              tintColor="black"
            />
          ) : null
        }
        {...props.settings}
      />
    </View>
  );
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
  bounce: PropTypes.bool, //?
  settings: PropTypes.object, // 一些其他的默认限制
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'green',
    height: '100%',
  },
  spearator: {
    height: 9,
    backgroundColor: '#D3D3D3',
  },
  footerWrap: {
    height: 70,
    backgroundColor: '#F08080',
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
});

export default ScrollList;
