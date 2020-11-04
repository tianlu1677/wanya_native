import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
  View,
  RefreshControl,
  FlatList,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconFont from '@/iconfont';
import {pagination} from '@/components/ScrollList';
import {Avator} from '@/components/NodeComponents';
import {getRecommendTopPosts} from '@/api/home_api';
import {PlainContent} from '@/components/Item/single-list-item';
import VideoPlayImg from '@/assets/images/video-play.png';
import ExcellentImage from '@/assets/images/excellent.png';
import TopImage from '@/assets/images/top.png';
import FastImageGif from '@/components/FastImageGif';
import {createArticleAction, destroyArticleAction} from "@/api/article_api"
import {createTopicAction, destroyTopicAction} from "@/api/topic_api"

const SingleItem = props => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const halfWidth = (width - 10 - 5) / 2; // 屏幕去掉两边后的宽度
  const {data, type} = props;

  const [praiseForm, setPraiseForm] = useState({
    praise: data.praise,
    praises_count: data.praises_count,
  });

  const onGoDetail = v => {
    console.log('data', data)
    switch (props.type) {
      case 'Topic':
        navigation.push('TopicDetail', {topicId: data.id});
        break;
      case 'Article':
        navigation.navigate('ArticleDetail', {articleId: data.id});
        break;
    }
  };

  const onPraise = async () => {
    console.log('pro', data)
    switch (type) {
      case 'Article':
        if (praiseForm.praise) {
          await destroyArticleAction({id: data.id, type: 'praise'});
        } else {
          await createArticleAction({id: data.id, type: 'praise'});
        }
        break;
      case 'Topic':
        if (praiseForm.praise) {
          await destroyTopicAction({id: data.id, type: 'praise'});
        } else {
          await createTopicAction({id: data.id, type: 'praise'});
        }
        break;
    }
    const praiseCount = praiseForm.praises_count + (praiseForm.praise === true ? -1 : 1);
    const params = {
      praise: !praiseForm.praise,
      praises_count: praiseCount,
    };
    setPraiseForm(params);
  };

  return (
    <Pressable onPress={() => onGoDetail(data)}>
      {data.single_cover.cover_url && (
        <FastImageGif
          source={{uri: data.single_cover.cover_url}}
          gif_url={data.single_cover.link_url}
          style={{
            height: (data.single_cover.height * halfWidth) / data.single_cover.width,
            width: halfWidth,
            backgroundColor: '#F1F1F1',
          }}
        />
      )}
      {data.has_video && (
        <Image resizeMethod={'resize'} style={styles.videoPlay} source={VideoPlayImg} />
      )}
      {data.type === 'topic' && (
        <PlainContent
          data={data}
          style={[styles.multiLineText, {width: halfWidth - 15}]}
          numberOfLines={2}
        />
      )}
      {data.type === 'article' && <Text style={styles.multiLineText}>{data.title}</Text>}

      {props.isTop && (
        <Image
          source={TopImage}
          style={{width: 30, height: 17, position: 'absolute', top: 8, left: 8}}
          resizeMode={'contain'}
          resizeMethod={'resize'}
        />
      )}

      {!props.isTop && data.excellent && (
        <Image
          source={ExcellentImage}
          style={{width: 30, height: 17, position: 'absolute', top: 8, left: 8}}
          resizeMode={'contain'}
          resizeMethod={'resize'}
        />
      )}

      <View style={styles.singleBottom}>
        <Avator account={data.account} size={16} />
        <Pressable
          style={{marginRight: 'auto'}}
          onPress={() => {
            navigation.push('AccountDetail', {accountId: data.account.id});
          }}>
          <Text style={styles.singleName}>
            {data.account.nickname && data.account.nickname.toString().substr(0, 16)}
          </Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onPraise}
          hitSlop={{left: 5, top: 5, bottom: 5}}>
          <IconFont name="like" size={14} color={praiseForm.praise ? '#000' : '#bdbdbd'} />
          <Text
            style={{marginLeft: 5, fontSize: 10, color: praiseForm.praise ? '#000' : '#bdbdbd'}}>
            {praiseForm.praises_count > 0 ? praiseForm.praises_count : ''}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const DoubleListColunm = props => {
  return (
    <FlatList
      {...props}
      windowSize={3}
      style={{marginRight: 5}}
      removeClippedSubviews={false}
      keyExtractor={item => `item-${item.id}`}
      renderItem={({item, index}) => {
        return (
          <View key={item.id} onLayout={item.onLayout}>
            {props.renderItem({item, index})}
          </View>
        );
      }}
    />
  );
};

const DoubleLists = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const [columns, setColumns] = useState(
    Array(2)
      .fill('')
      .map(() => [])
  );
  const columnsHeight = useMemo(() => Array(2).fill(0), [2]);
  const keysList = useMemo(() => [], []);

  //首页推荐
  const indexLoadData = async (page = 1, onRefresh = false) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.posts;

    // 加载首页置顶的
    let itemList = [];
    let top_posts_res = await getRecommendTopPosts();
    itemList = top_posts_res.data.posts;
    itemList = itemList.map(item => ({...item, is_top: true}));

    const loadData = onRefresh ? [...itemList, ...data] : [...itemList, ...listData, ...data];
    setHeaders(res.headers);
    setListData(loadData);
    setLoading(false);
  };

  const renderItem = ({item, index}) => (
    <SingleItem key={item.id} data={item.item} isTop={item.is_top} type={item.item_type} />
  );

  const renderFooter = () => {
    const pagin = pagination(headers);
    const storeData = columns.flat();
    if (storeData.length !== listData.length) {
      // 还未加载完
      return null;
    }

    if (pagin && pagin.hasMore) {
      return (
        <View style={styles.listFooter}>
          <ActivityIndicator
            size={'small'}
            animating={true}
            color={'#000'}
            style={{marginBottom: 5}}
          />
          <Text>正在加载更多</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const addItem = (item, cb) => {
    const tempColumns = [...columns];
    // 获取总高度最小列
    const minColumnsIndex = [...columnsHeight].indexOf(Math.min.apply(Math, [...columnsHeight]));
    // 获取当前renderItem高度,获取后渲染下一个renderItem,直到全部渲染完毕
    if (typeof cb === 'function') {
      item.onLayout = async e => {
        // 触发一次后销毁
        item.onLayout = null;
        const height = e.nativeEvent.layout.height;
        columnsHeight[minColumnsIndex] += height;
        cb();
      };
    }
    const currentColumn = tempColumns[minColumnsIndex];
    currentColumn.push(item);
    return {tempColumns, minColumnsIndex};
  };

  // 通过 id 检查是否已经渲染
  const checkIsExist = React.useCallback(
    key => {
      const check = keysList.includes(key);
      // 如果未渲染则保存key
      if (!check) {
        keysList.push(key);
      }
      return check;
    },
    [columns, keysList]
  );

  const addItems = (data, isSyncHeightForItem = false) => {
    const item = data.shift();
    item._keyForItem_ = item.id;
    // 已经渲染则跳过
    if (checkIsExist(item._keyForItem_)) {
      return addItems(data);
    }
    const {tempColumns} = addItem(item, addItems.bind(addItems, data), isSyncHeightForItem);
    setColumns(tempColumns);
  };

  // 清除所有renderItem
  const clear = () => {
    for (let index = 0; index < columnsHeight.length; index++) {
      columnsHeight[index] = 0;
    }
    keysList.splice(0, keysList.length);
    setColumns(
      Array(2)
        .fill([])
        .map(() => [])
    );
  };

  const onEndReached = () => {
    const storeData = columns.flat();
    if (storeData.length === listData.length) {
      const pagin = pagination(headers);
      indexLoadData(pagin.nextPage);
      console.log('加载更多');
    }
  };

  const onRefresh = () => {
    console.log('下拉刷新');
    const pagin = pagination(headers);
    indexLoadData(pagin.nextPage, true);
  };

  useEffect(() => {
    indexLoadData();
  }, []);

  useEffect(() => {
    if (!listData.length) {
      return;
    }

    addItems(listData.slice());
  }, [listData]);

  return (
    <FlatList
      data={columns}
      numColumns={2}
      windowSize={20}
      removeClippedSubviews={false}
      onEndReachedThreshold={0.2}
      onEndReached={onEndReached}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {
            clear();
            onRefresh();
          }}
        />
      }
      ListFooterComponent={renderFooter}
      keyExtractor={(item, index) => `item-${index}`}
      style={{flex: 1, paddingLeft: 5, paddingRight: 5}}
      renderItem={({item, index}) => {
        return (
          <DoubleListColunm
            listKey={`column-${index}`}
            key={`column-${index}`}
            data={item}
            renderItem={renderItem}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  singleWrap: {
    flex: 1,
    backgroundColor: '#fff',
    marginRight: 5,
    marginLeft: 5,
  },
  videoPlay: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  multiLineText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#1f1f1f',
    marginLeft: 5,
    marginRight: 10,
    marginTop: 7,
  },
  singleBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 8,
    paddingLeft: 5,
    paddingRight: 5,
    height: 17,
  },
  singleName: {
    marginLeft: 5,
    color: '#bdbdbd',
    fontSize: 10,
  },
  listFooter: {
    height: 140,
    backgroundColor: '#fafafa',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
  },
});

export default DoubleLists;
