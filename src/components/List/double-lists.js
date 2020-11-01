import React, {useState, useEffect, useMemo} from 'react';
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
import {flat} from '@/components/waterflow/utils';

const SingleItem = props => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const halfWidth = (width - 10 - 5) / 2; // 屏幕去掉两边后的宽度
  const {data} = props;

  const [praiseForm, setPraiseForm] = useState({
    praise: data.praise,
    praises_count: data.praises_count,
  });

  const onGoDetail = v => {
    switch (props.type) {
      case 'Topic':
        navigation.push('TopicDetail', {topicId: data.id});
        break;
      case 'Article':
        navigation.navigate('ArticleDetail', {topicId: data.id});
        break;
    }
  };

  return (
    <Pressable key={data.id} onPress={() => onGoDetail(data)}>
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

const DoubleLists = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item, index}) => {
    return <SingleItem key={item.id} data={item.item} isTop={item.is_top} type={item.item_type} />;
  };

  //首页推荐
  const indexLoadData = async (page = 1) => {
    setLoading(true);
    let itemList = [];
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.posts;
    // 加载首页置顶的
    let top_posts_res = await getRecommendTopPosts({...params, page});

    itemList = top_posts_res.data.posts;
    itemList = itemList.map(item => ({...item, is_top: true}));

    setHeaders(res.headers);
    setListData(itemList.concat(data));
    setLoading(false);
  };

  const onRefresh = (page = 1) => {
    const pagin = pagination(headers);
    indexLoadData(pagin.nextPage);
  };

  const onEndReached = () => {
    const pagin = pagination(headers);
    indexLoadData(pagin.nextPage);
    console.log('laod ending');
  };

  const renderFooter = () => {
    const pagin = pagination(headers);
    if (pagin && pagin.hasMore) {
      return (
        <View
          style={{
            height: 140,
            backgroundColor: '#fafafa',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 70,
          }}>
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

  useEffect(() => {
    indexLoadData(1);
  }, []);

  return (
    <DoubleListColumns
      data={listData}
      keyForItem={item => item.id}
      numColumns={2}
      onEndReached={onEndReached}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
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
});

export default DoubleLists;

const DoubleListColumns = props => {
  const {numColumns} = props;
  const [storeData, setStoreData] = useState([]);
  const [columns, setColumns] = useState(
    Array(numColumns)
      .fill('')
      .map(() => [])
  );

  const columnsHeight = useMemo(() => Array(numColumns).fill(0), [numColumns]);
  const keysList = useMemo(() => [], []);

  const addItem = (item: T, cb?: () => typeof addItems, isSyncHeightForItem: boolean = false) => {
    const tempColumns = [...columns];

    // 获取总高度最小列
    const minColumnsIndex = [...columnsHeight].indexOf(Math.min.apply(Math, [...columnsHeight]));

    // 获取当前renderItem高度,获取后渲染下一个renderItem,直到全部渲染完毕
    if (typeof cb === 'function') {
      item.onLayout = async (e: LayoutChangeEvent) => {
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

  const addItems = (data, isSyncHeightForItem: boolean = false): any => {
    if (data.length === 0) {
      return;
    }
    const item = data.shift();

    item._keyForItem_ = props.keyForItem(item);
    // 已经渲染则跳过
    if (checkIsExist(item._keyForItem_)) {
      return addItems(data);
    }

    const {tempColumns, minColumnsIndex} = addItem(
      item,
      addItems.bind(addItems, data),
      isSyncHeightForItem
    );

    console.log(columnsHeight[minColumnsIndex]);
    console.log(Dimensions.get('window').height);

    if (columnsHeight[minColumnsIndex] <= Dimensions.get('window').height) {
      const store = JSON.parse(JSON.stringify(tempColumns));
      setStoreData(store);
      console.log(store);
      // console.log('set tempColumns');
    }

    setColumns(tempColumns);
  };

  // 通过 _keyForItem_ 检查是否已经渲染
  const checkIsExist = React.useCallback(
    (key: string) => {
      const check = keysList.indexOf(key) !== -1;
      // 如果未渲染则保存key
      if (!check) {
        keysList.push(key);
      }
      return check;
    },
    [columns, keysList]
  );

  const onEndReached = () => {
    console.log(storeData);

    console.log('onEndReached');
    return false;
  };

  useEffect(() => {
    if (!props.data.length) {
      return;
    }
    addItems(props.data.slice());
  }, [props.data]);

  return (
    <FlatList
      {...props}
      data={columns}
      removeClippedSubviews={false}
      onEndReachedThreshold={0.2}
      onEndReached={onEndReached}
      windowSize={20}
      columnWrapperStyle={{flex: 1}}
      style={{flex: 1, paddingLeft: 5, paddingRight: 5, backgroundColor: 'green'}}
      keyExtractor={(columnItem, index) => `item-${index}`}
      renderItem={({item, index}: {item: T, index: number}) => {
        return (
          <View style={{flex: 1, backgroundColor: 'pink'}} key={`column-${index}`}>
            <DoubleListColunm
              listKey={`column-${index}`}
              data={item}
              renderItem={props.renderItem}
            />
          </View>
        );
      }}
    />
  );
};

const DoubleListColunm = props => {
  return (
    <FlatList
      {...props}
      windowSize={3}
      style={{marginRight: 5, backgroundColor: 'yellow'}}
      removeClippedSubviews={true}
      keyExtractor={columnItem => `item-${columnItem._keyForItem_}`}
      renderItem={({item, index}) => {
        return (
          <View key={item._keyForItem_} onLayout={item.onLayout}>
            {props.renderItem({item, index})}
          </View>
        );
      }}
    />
  );
};
