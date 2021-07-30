import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {throttle} from 'lodash';
import IconFont from '@/iconfont';
import ScrollList, {pagination} from '@/components/ScrollList';
import {Avator} from '@/components/NodeComponents';
import {PlainContent} from '@/components/Item/single-list-item';
import FastImg from '@/components/FastImg';
import {getRecommendTopPosts} from '@/api/home_api';
import VideoPlayImg from '@/assets/images/video-play.png';
import ExcellentImage from '@/assets/images/excellent.png';
import TopImage from '@/assets/images/top.png';
import {cancelAction, createAction} from '@/api/action_api';

const {width} = Dimensions.get('window');
const halfWidth = (width - 15) / 2; // 屏幕去掉两边后（5*2 中间5）的宽度

const SingleItem = props => {
  const navigation = useNavigation();
  const {
    isTop,
    data: {id, type, title, account, excellent, praise, praises_count, has_video, single_cover},
  } = props;

  const [praiseForm, setPraiseForm] = useState({
    praise: praise,
    praises_count: praises_count,
  });

  const onGoDetail = v => {
    switch (props.item_type) {
      case 'Topic':
        navigation.push('TopicDetail', {topicId: id});
        break;
      case 'Article':
        navigation.navigate('ArticleDetail', {articleId: id});
        break;
    }
  };

  const onPraise = async () => {
    switch (props.item_type) {
      case 'Article':
      case 'Topic':
        if (praiseForm.praise) {
          await cancelAction({target_id: id, target_type: props.item_type, type: 'praise'});
        } else {
          await createAction({target_id: id, target_type: props.item_type, type: 'praise'});
        }
        break;
    }
    const praiseCount = praiseForm.praises_count + (praiseForm.praise === true ? -1 : 1);
    const params = {praise: !praiseForm.praise, praises_count: praiseCount};
    setPraiseForm(params);
  };

  const defaultWidth = single_cover.width || 100;
  const defaultHeight = single_cover.height || 100;
  const height = Math.ceil((defaultHeight * halfWidth) / defaultWidth);

  return (
    <Pressable key={id} onPress={() => onGoDetail(props.data)} style={{backgroundColor: '#fff'}}>
      {single_cover.cover_url && (
        <FastImg
          source={{uri: single_cover.cover_url}}
          gif_url={single_cover.link_url}
          style={{width: halfWidth, height}}
        />
      )}
      {has_video && (
        <FastImg resizeMethod={'resize'} style={styles.videoPlay} source={VideoPlayImg} />
      )}
      {type === 'topic' && (
        <PlainContent data={props.data} style={styles.multiLineText} numberOfLines={2} />
      )}
      {type === 'article' && <Text style={styles.multiLineText}>{title}</Text>}

      {isTop && (
        <FastImg
          source={TopImage}
          style={{width: 30, height: 17, position: 'absolute', top: 8, left: 8}}
          resizeMode={'contain'}
          resizeMethod={'resize'}
        />
      )}

      {!isTop && excellent && (
        <FastImg
          source={ExcellentImage}
          style={styles.excellentImage}
          resizeMode={'contain'}
          resizeMethod={'resize'}
        />
      )}

      <View style={styles.singleBottom}>
        <Avator account={account} size={16} />
        <Pressable
          style={{marginRight: 'auto'}}
          onPress={() => {
            navigation.push('AccountDetail', {accountId: account.id});
          }}>
          <Text style={styles.singleName}>
            {account.nickname && account.nickname.toString().substr(0, 16)}
          </Text>
        </Pressable>
        <Pressable
          style={styles.likewrap}
          hitSlop={{left: 5, top: 5, bottom: 5}}
          onPress={onPraise}>
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

const DoubleList = props => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const compare = (pre, next) => {
    return true;
  };

  const Child = React.memo(({item}) => {
    return (
      <SingleItem
        data={item.item}
        key={`singleitem-${item.id}`}
        isTop={item.is_top}
        item_type={item.item_type}
      />
    );
  }, compare);

  const WrapChild = useCallback(({item}) => {
    return <Child key={item.id} item={item} />;
  }, []);

  const renderItemMemo = useCallback(
    ({item, index}) => {
      const leftPostList = listData.filter((v, i) => i % 2 === 0);
      const rightPostList = listData.filter((v, i) => i % 2 !== 0);
      return (
        <View style={[styles.singleWrap, {marginLeft: index === 0 ? 5 : 0}]}>
          {(item === 1 ? leftPostList : rightPostList).map((v, index) => {
            return <WrapChild key={`wrapchild-${v.id}`} item={v} />;
          })}
        </View>
      );
    },
    [listData]
  );

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

  //首页推荐
  const indexLoadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    let itemList = [];
    // 加载首页置顶的
    let top_posts_res = await getRecommendTopPosts();
    itemList = top_posts_res.data.posts;
    itemList = itemList.map(item => ({...item, is_top: true}));
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.posts;
    itemList = itemList.concat(data);
    setListData(itemList);
    setHeaders(res.headers);
    setLoading(false);
  };

  const onRefresh = (page = 1) => {
    if (props.type === 'recommend' && (page === 1 || !page)) {
      indexLoadData(pagination(headers).nextPage);
    } else {
      loadData(page);
    }
  };

  useEffect(() => {
    if (props.type === 'recommend') {
      indexLoadData(1);
    } else {
      loadData();
    }
  }, []);

  return (
    <ScrollList
      data={listData.length === 0 ? [] : [1, 2]}
      loading={loading}
      onRefresh={throttle(onRefresh, 300)}
      headers={headers}
      renderItem={renderItemMemo}
      numColumns={2}
      settings={{
        onEndReachedThreshold: 0.05,
        initialNumToRender: 5,
        windowSize: 8,
        progressViewOffset: 0,
        ...props.settings,
      }}
      {...props}
    />
  );
};

// List 属性继承scrollList 默认可下拉加载刷新
DoubleList.propTypes = {
  request: PropTypes.object.isRequired, //获取数据请求 {api: api, id: 1, params:params}
  type: PropTypes.string,
};

const styles = StyleSheet.create({
  likewrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleWrap: {
    flex: 1,
    width: halfWidth,
    marginRight: 5,
    marginTop: 5,
  },
  videoPlay: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  multiLineText: {
    flex: 1,
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
  excellentImage: {
    width: 30,
    height: 17,
    position: 'absolute',
    top: 8,
    left: 8,
  },
});

export default DoubleList;
