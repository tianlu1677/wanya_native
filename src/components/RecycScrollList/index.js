/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, {Component, useState, useEffect} from 'react';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {EmptyImg} from '@/utils/default-image';
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from 'react-native';

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

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

const RecycleScrollList = props => {
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
    if (!pagin || !pagin.hasMore) {
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
  };

  // const renderEmpty = () => {
  //   return (
  //     !props.loading &&
  //     pagin &&
  //     props.data.length === 0 &&
  //     (props.renderEmpty ? (
  //       props.renderEmpty
  //     ) : (
  //       <View style={[scrollStyle.footer, {minHeight: 300}]}>
  //         <Image style={scrollStyle.emptyImg} source={{uri: EmptyImg}} />
  //         <Text style={{color: '#DADADA', fontSize: 13}}>
  //           {props.emptyTitle || '暂时还没有内容哦'}
  //         </Text>
  //       </View>
  //     ))
  //   );
  // };

  // const renderSeparator = () => {
  //   return <View style={scrollStyle.separator} />;
  // };

  useEffect(() => {
    setState(loadState.SUCCESS);
    setPagin(pagination(props.headers));
  }, [props.headers]);

  useEffect(() => {
    setRefreshing(props.loading);
  }, [props.loading]);

  return (
    <RecyclerListView
      layoutProvider={props.layoutProvider}
      dataProvider={props.data}
      rowRenderer={props.renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={50}
      // onVisibleIndicesChanged={index => console.log('onVisibleIndicesChanged\t', index)}
      // renderFooter={renderFooter}
      renderAheadOffset={500}
      // initialRenderIndex={5}
      isHorizontal={false}
      forceNonDeterministicRendering={false}
      optimizeForInsertDeleteAnimations={true}
      style={props.style}
      canChangeSize={true}
      scrollViewProps={{
        renderSeparator: () => <View style={{height: 2, color: 'red'}} />
      }}
    />
  );
};

// export default class RecycleScrollList extends React.Component {
//   constructor(args) {
//     super(args);
//
//     let {width} = Dimensions.get('window');
//
//     //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
//     // //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
//     // let dataProvider = new DataProvider((r1, r2) => {
//     //   return r1 !== r2;
//     // });
//     this.state = {
//       refreshing: true,
//       loadMoreState: loadState.NORMAL,
//       pagin: null
//     }
//   }
//
//   setPagin = () => {
//     pagination(this.props.headers)
//   }
//
//   onRefresh = () => {
//     console.log('onRefresh start =============');
//     if (this.state.refreshing) {
//       return;
//     }
//
//     try {
//       this.setState({loadMoreState: loadState.LOADING});
//       this.props.onRefresh();
//     } catch {
//       this.setState({loadMoreState: loadState.ERROR});
//     }
//   };
//   onEndReached = () => {
//     if (!this.pagin || !this.pagin.hasMore) {
//       this.setState({loadMoreState: loadState.EMPTY});
//       return;
//     }
//     // if(!finishContent) {
//     //   return
//     // }
//
//     if (this.refreshing || this.state.loadMoreState === loadState.LOADING) {
//       return;
//     }
//     this.setState(loadState.LOADING);
//     // console.log('onEndReached ===============', pagin, refreshing);
//     try {
//       this.props.onRefresh(this.pagin.nextPage);
//     } catch {
//       this.setState({loadMoreState: loadState.ERROR});
//     }
//   };
//
//
//   render() {
//     return (
//       <RecyclerListView
//         layoutProvider={this.props.layoutProvider}
//         dataProvider={this.props.data}
//         rowRenderer={this.props.renderItem}
//         onEndReached={() => {
//           console.log('end');
//         }}
//         onEndReachedThreshold={50}
//         // onVisibleIndicesChanged={index => console.log('onVisibleIndicesChanged\t', index)}
//         renderFooter={() => (
//           <View>
//             <Text style={{color: 'red'}}>loadding</Text>
//           </View>
//         )}
//         initialRenderIndex={5}
//         forceNonDeterministicRendering={true}
//         optimizeForInsertDeleteAnimations={true}
//         style={this.props.style}
//         scrollViewProps={{}}
//         canChangeSize={true}
//       />
//     );
//   }
// }

export default RecycleScrollList;
