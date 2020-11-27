import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, FlatList, View, ActivityIndicator, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {throttle} from 'lodash';
import FastImg from '@/components/FastImg';
import {EmptyImg} from '@/utils/default-image';
import TabViewList from '@/components/TabView';
import {getFollowedPosts} from '@/api/home_api';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';

export const pagination = (headers = {}) => {
  const currentPage = Number(headers['x-current-page']);
  const perPage = Number(headers['x-per-page'] || headers['X-Page-Items']);
  const total = Number(headers['x-total']);
  const hasMore = currentPage * perPage < total;
  const nextPage = hasMore ? currentPage + 1 : currentPage;
  return {hasMore: hasMore, nextPage: nextPage, page: currentPage, total: total};
};

const ScrollList = props => {
  const isRefresh = () => {
    const page = pagination(props.headers).page;
    if (page === 1 && props.enableRefresh === false) {
      return true;
    } else {
      return false;
    }
  };

  // console.log(props);
  const [enableLoadMore] = useState(props.enableLoadMore === false ? false : true);
  // const [enableRefresh] = useState(props.enableRefresh === false ? false : true);
  const [enableRefresh, setEnableRefresh] = useState(isRefresh() === false ? false : true);

  // console.log(enableRefresh);

  const [pagin, setPagin] = useState(null);
  const [refreshing, setRefreshing] = useState(true);

  // const [data, setData] = useState([]);

  const RenderEmpty = () => {
    return (
      <View style={styles.emptyWrap}>
        <FastImg source={{uri: EmptyImg}} style={styles.emptyImage} />
        <Text style={styles.emptyText}>{'暂时还没有内容哦'}</Text>
      </View>
    );
  };

  const RenderFooter = () => {
    let footer = null;
    footer = (
      <View style={styles.footerWrap}>
        <ActivityIndicator animating={true} color={'#000'} />
        <Text style={styles.footerText}>正在加载更多</Text>
      </View>
    );
    return footer;
  };

  const RenderSeparator = () => <View style={styles.spearator} />;

  const KeyExtractor = useCallback(item => {
    return props.keyExtractor ? `item-${item[props.keyExtractor]}` : `item-${item.id}`;
  }, []);

  const RenderItem = React.memo(({item, index}) => {
    return props.renderItem({item, index});
  });

  const RenderItemMemo = useCallback(({item, index}) => <RenderItem item={item} index={index} />, [
    refreshing,
  ]);

  const onRefresh = () => {
    if (props.loading) {
      return;
    }
    props.onRefresh();
  };

  const onEndReached = () => {
    // if (!pagin || !pagin.hasMore) {
    //   setState(loadState.EMPTY);
    //   return;
    // }
    // if(!finishContent) {
    //   return
    // }
    // if (refreshing || state === loadState.LOADING) {
    //   return;
    // }
    // setState(loadState.LOADING);
    // console.log('onEndReached ===============', pagin, refreshing);
    // try {
    //   props.onRefresh(pagin.nextPage);
    // } catch {
    //   setState(loadState.ERROR);
    // }
  };

  useEffect(() => {
    if (props.headers) {
      if (pagination(props.headers).nextPage === 2 && props.enableRefresh === false) {
        setEnableRefresh(false);
      }
      setPagin(pagination(props.headers));
    }
  }, [props.headers]);

  useEffect(() => {
    setRefreshing(props.loading);
  }, [props.loading]);

  // console.log(enableRefresh);
  // console.log(pagin);
  // console.log(enableRefresh === false && !pagin);

  console.log(enableRefresh);
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={props.data}
        keyExtractor={KeyExtractor}
        renderItem={RenderItemMemo}
        ItemSeparatorComponent={RenderSeparator}
        // ListFooterComponent={RenderFooter}
        // ListEmptyComponent={RenderEmpty}
        onEndReached={enableLoadMore ? throttle(onEndReached, 500) : null}
        refreshControl={
          enableRefresh ? (
            <RefreshControl
              refreshing={props.loading}
              onRefresh={enableRefresh ? onRefresh : null}
              tintColor="black"
              style={{backgroundColor: 'white'}}
            />
          ) : null
        }
        // refreshControl={
        //   enableRefresh || (enableRefresh === false && !pagin) ? (
        //     <RefreshControl
        //       refreshing={props.loading}
        //       onRefresh={enableRefresh ? onRefresh : null}
        //       tintColor="black"
        //       style={{backgroundColor: 'white'}}
        //     />
        //   ) : null
        // }
        // contentContainerStyle={{flex: 1}} //导致不能滑动 //为了empty居中
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
  enableLoadMore: PropTypes.bool, //是否可以加载更多，默认true
  enableRefresh: PropTypes.bool, //是否可以下拉刷新，默认true
  onRefresh: PropTypes.func, // 下拉刷新，加载更多，执行方法
  emptyTitle: PropTypes.string, //数据为空时提示
  renderSeparator: PropTypes.func, // 分割线
  ListHeaderComponent: PropTypes.object, //
  settings: PropTypes.object, // 一些其他的默认限制
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: '#F5F5DC',
    // backgroundColor: 'pink',
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

export const SingleList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState({'x-current-page': 1});
  const [listData, setListData] = useState([]);

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.posts;
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
    setHeaders(res.headers);
  };

  // const RenderItem = ({item}) => {
  //   if (item.id === 955) {
  //     console.log(item.id);
  //   }
  //   if (item.item_type === 'Topic') {
  //     return <BaseTopic data={item.item} />;
  //   } else if (item.item_type === 'Article') {
  //     return <BaseArticle data={item.item} />;
  //   }
  // };

  const RenderItem = ({item}) => {
    return <Text style={{backgroundColor: 'green', height: 40}}>3232</Text>;
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollList
      keyExtractor={'id'}
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={RenderItem}
      enableRefresh={false}
    />
  );
};

export const Recommend = () => {
  const [currentKey, setCurrentKey] = useState('recommend');

  const RecommendList = () => {
    return <SingleList request={{api: getFollowedPosts}} />;
  };

  return (
    <TabViewList
      size="big"
      lazy={true}
      currentKey={currentKey}
      tabData={[
        {
          key: 'recommend',
          title: '推荐',
          component: RecommendList,
        },
      ]}
      onChange={key => setCurrentKey(key)}
    />
  );
};

export default Recommend;
