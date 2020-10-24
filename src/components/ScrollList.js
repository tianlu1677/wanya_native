import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
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
  const [enableLoadMore] = useState(props.enableLoadMore === false ? false : true);
  const [enableRefresh] = useState(props.enableRefresh === false ? false : true);
  const [state, setState] = useState(loadState.NORMAL);
  const [pagin, setPagin] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    console.log('onRefresh start =============', state, refreshing);
    if (refreshing || state === loadState.LOADING) {
      return;
    }
    console.log('onRefresh end =============', state, refreshing);
    try {
      setState(loadState.LOADING);
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
    setState(loadState.LOADING);
    console.log('onEndReached ===============', pagin, refreshing);

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
        footer = (
          <View style={{height: 60, backgroundColor: '#FAFAFA', flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="small" />
          </View>
        );
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
      !refreshing &&
      pagin && (
        <View style={[scrollStyle.footer, {minHeight: 300}]}>
          <Image style={scrollStyle.emptyImg} source={{uri: EmptyImg}} />
          <Text style={{color: '#DADADA', fontSize: 13}}>
            {props.emptyTitle || '暂时还没有内容哦'}
          </Text>
        </View>
      )
    );
  };

  const renderSeparator = () => {
    return <View style={scrollStyle.separator} />;
  };

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
      horizontal={false}
      contentContainerStyle={[scrollStyle.containter, props.style]}
      keyExtractor={item => String(item[props.itemKey || 'id'])}
      renderItem={props.renderItem}
      ItemSeparatorComponent={props.renderSeparator || renderSeparator}
      data={props.data}
      onEndReached={enableLoadMore ? onEndReached : null}
      onEndReachedThreshold={0.2}
      ListFooterComponent={enableLoadMore ? renderFooter : null}
      ListHeaderComponent={props.ListHeaderComponent || null}
      ListEmptyComponent={renderEmpty}
      numColumns={props.numColumns || 1}
      refreshControl={
        enableRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={enableRefresh ? onRefresh.bind(this) : null}
            tintColor="black"
            style={{backgroundColor: 'white'}}
            title={'努力加载中...'}
          />
        ) : null
      }
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
    marginBottom: 18,
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
  settings: PropTypes.object, // 一些其他的默认限制
};

export default ScrollList;
