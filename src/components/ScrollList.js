import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import {EmptyImg} from '@/utils/default-image';
import {debounce, throttle} from 'lodash';
import Loading from '@/components/Loading';
import PullToRefresh from '@/components/AnimatedPullToRefresh';

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

const MinHeight = 85;
const MaxHeight = 200;

const ScrollList = props => {
  const [enableLoadMore] = useState(props.enableLoadMore === false ? false : true);
  const [enableRefresh] = useState(props.enableRefresh === false ? false : true);
  const [state, setState] = useState(loadState.NORMAL);
  const [pagin, setPagin] = useState(null);
  const [finishContent, setFinishContent] = useState(false);
  // const [currentY, setCurrentY] = useState(0);
  // const [title, setTitle] = useState('努力加载中...');
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const onRefresh = () => {
    console.log('onRefresh start =============', state, refreshing);
    if (refreshing || state === loadState.LOADING) {
      return;
    }
    console.log('onRefresh end =============', state, refreshing);
    try {
      setState(loadState.LOADING);
      props.onRefresh();
      // setCurrentY(0);
      // setIsFree(true);
    } catch {
      setState(loadState.ERROR);
    }
  };

  const onEndReached = () => {
    if (!pagin || !pagin.hasMore) {
      setState(loadState.EMPTY);
      return;
    }
    // if(!finishContent) {
    //   return
    // }

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
    if (pagin && pagin.hasMore && props.loading) {
      footer = (
        <View
          style={{
            height: 70,
            backgroundColor: '#fafafa',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            size={'small'}
            animating={true}
            color={'#000'}
            style={{marginBottom: 5}}
          />
          <Text style={{fontSize: 12, color: '#bdbdbd'}}>正在加载更多</Text>
        </View>
      );
    }

    return footer;

    // let footer = null;
    // switch (state) {
    //   case loadState.LOADING:
    //     footer = (
    //       <View
    //         style={{height: 100, backgroundColor: '#FAFAFA', flex: 1, justifyContent: 'center'}}>
    //         <ActivityIndicator size="small" />
    //       </View>
    //     );
    //     break;
    //   case loadState.EMPTY:
    //     // footer = <Text>数据已全部完成</Text>;
    //     break;
    //   case loadState.ERROR:
    //     footer = <Text onPress={onRefresh}>点击重新加载</Text>;
    //     break;
    // }
    // return footer;
  };

  const renderEmpty = () => {
    return (
      !props.loading &&
      pagin &&
      props.data.length === 0 &&
      (props.renderEmpty ? (
        props.renderEmpty
      ) : (
        <View style={[scrollStyle.footer, {minHeight: 300}]}>
          <Image style={scrollStyle.emptyImg} source={{uri: EmptyImg}} />
          <Text style={{color: '#DADADA', fontSize: 13}}>
            {props.emptyTitle || '暂时还没有内容哦'}
          </Text>
        </View>
      ))
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

  // 不下拉的页面添加loading
  // if (props.enableRefresh === false && pagin && pagin.page === 1 && props.loading) {
  //   return <Loading />;
  // }

  // const onRelease = event => {
  //   console.log('event', event.nativeEvent);
  //   console.log('currentY', currentY);
  //   // console.log('scrollY', scrollY);
  //   if (currentY < -MinHeight && currentY >= -MaxHeight && isFree) {
  //     // setTitle('加载中....');
  //     setIsFree(false);
  //     onRefresh();
  //   } else {
  //     // setTitle('下拉加载');
  //   }
  // };

  // const onscroll = event => {
  //   const {nativeEvent} = event;
  //   const {contentOffset} = nativeEvent;
  //   const {y} = contentOffset;
  //   // console.log('y', y);
  //   // console.log('title努力加载数据', title);
  //   if (y < -MinHeight && y >= -MaxHeight && !refreshing) {
  //     // setTitle('放开刷新...');
  //     setCurrentY(y);
  //   } else if (y < 0 && !refreshing) {
  //   } else {
  //   }
  // };

  useEffect(() => {
    scrollY.addListener(({value}) => {
      // 滚动距离
      props.getScrollY && props.getScrollY(value);
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [scrollY]);

  const keyExtractor = useCallback(item => String(item[props.itemKey || 'id']), []);

  return (
    <Animated.FlatList
      ref={props.getRref}
      horizontal={false}
      contentContainerStyle={[
        scrollStyle.containter,
        props.style,
        {flex: props.data.length === 0 && props.from !== 'comment' ? 1 : 0},
      ]}
      columnWrapperStyle={props.columnWrapperStyle || null}
      keyExtractor={props.keyExtractor ? props.keyExtractor : keyExtractor}
      renderItem={props.renderItem}
      ItemSeparatorComponent={props.renderSeparator || renderSeparator}
      data={props.data}
      // scrollEventThrottle={60}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: true,
      })}
      // onScroll={onscroll}
      onScrollEndDrag={() => {
        setFinishContent(true);
      }}
      // onScrollBeginDrag={() => {
      //   setFinishContent(false)
      // }}
      // contentOffset={{y: props.loading ? -60 : 9, x: 0}}
      // contentInset={{top: 50}}
      onEndReached={enableLoadMore ? throttle(onEndReached, 500) : null}
      onEndReachedThreshold={0.2}
      // maxToRenderPerBatch={1} // 增量渲染最大数量
      // updateCellsBatchingPeriod={3000}
      ListFooterComponent={enableLoadMore ? renderFooter : null}
      ListHeaderComponent={props.ListHeaderComponent || null}
      ListEmptyComponent={renderEmpty}
      numColumns={props.numColumns || 1}
      bounces={props.bounces}
      initialNumToRender={6}
      removeClippedSubviews={false}
      windowSize={6}
      progressViewOffset={1}
      getItemLayout={props.getItemLayout}
      // debug
      {...props.settings}
      // onResponderRelease={onRelease}
      // onContentSizeChange={() => {
      //   // console.log('finish...')
      //   setFinishContent(true);
      // }}
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
    />
  );
};

const scrollStyle = StyleSheet.create({
  containter: {
    // marginTop: 20
  },
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
    height: 5,
  },
});

ScrollList.defaultProps = {
  data: [],
  loading: true,
  headers: {},
  bounces: true,
  enableLoadMore: true,
  enableRefresh: true,
  emptyTitle: '暂时还没有内容哦',
};

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
