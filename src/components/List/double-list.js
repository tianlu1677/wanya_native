import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, ScrllView, Image, Pressable, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import IconFont from '@/iconfont';
import ScrollList, {pagination} from '@/components/ScrollList';
import {Avator} from '@/components/NodeComponents';
import {createTopicAction, destroyTopicAction} from '@/api/topic_api';
import {createArticleAction, destroyArticleAction} from '@/api/article_api';
import {getRecommendTopPosts} from '@/api/home_api';
import {PlainContent} from '@/components/Item/single-list-item';
import FastImg from '@/components/FastImg';
import VideoPlayImg from '@/assets/images/video-play.png';
import {RFValue} from '@/utils/response-fontsize';

const topImage = 'http://file.meirixinxue.com/assets/2020/13cc2946-2a92-4b75-a779-a20a485b1a57.png';
import ExcellentImage from '@/assets/images/excellent.png';
import TopImage from '@/assets/images/top.png';
import FastImageGif from '@/components/FastImageGif';

// const labelList = {'course': '课程', excellent: '精选', is_top: '置顶'}
const width = Dimensions.get('window').width;
const halfWidth = (width - 10) / 2; // 屏幕去掉两边后的宽度
const SingleItem = props => {
  const navigation = useNavigation();
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

  const onPraise = async () => {
    console.log('onPraise', props.data)

    switch (props.item_type) {
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

  // useEffect(() => {
  //   if (data.single_cover.height) {
  //     const h = data.single_cover
  //       ? (data.single_cover.height * halfWidth) / data.single_cover.width
  //       : 500;
  //     setheight(h);
  //   }
  // });

  console.log('double list', data.id)
  return (
    <Pressable key={data.id} onPress={() => onGoDetail(data)}>
      <View style={{backgroundColor: 'white'}}>
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
        {/*<Text>{data.single_cover.cover_url}</Text>*/}
        {data.has_video && (
          <FastImg resizeMethod={'resize'} style={styles.videoPlay} source={VideoPlayImg} />
        )}
        {data.type === 'topic' && (
          <PlainContent data={data} style={styles.multiLineText} numberOfLines={2} />
        )}
        {data.type === 'article' && <Text style={styles.multiLineText}>{data.title}</Text>}

        {props.isTop && (
          <FastImg
            source={TopImage}
            style={{width: 30, height: 17, position: 'absolute', top: 8, left: 8}}
            resizeMode={'contain'}
            resizeMethod={'resize'}
          />
        )}

        {!props.isTop && data.excellent && (
          <FastImg
            source={ExcellentImage}
            style={{width: 30, height: 17, position: 'absolute', top: 8, left: 8}}
            resizeMode={'contain'}
            resizeMethod={'resize'}
          />
        )}

        {/* {props.isTop && <IsTopIcon />} */}
        {/* {!props.isTop && data.excellent && <Text style={styles.excellentLabel}>精选</Text>} */}
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
      </View>
    </Pressable>
  );
};

const DoubleSingle = props => {
  const {data} = props;

  return (
    <View style={[styles.singleWrap, {marginRight: props.index === 0 ? 0 : 5}]}>
      {data.map((v, index) => {
        return <SingleItem key={v.id} data={v.item} isTop={v.is_top} item_type={v.item_type} />;
      })}
    </View>
  );
};

const DoubleList = props => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const compare = () => {
    return true
  }
  const Child = React.memo(({item}) => {
    // console.log('child item', item)
    return <SingleItem data={item.item} isTop={item.is_top} item_type={item.item_type} />;
  }, compare);

  const WrapChild = useCallback(({item}) => {
    return <Child key={item.id} item={item} />
  }, [])

  const renderItemMemo = useCallback(
    ({item, index}) => {
      const leftPostList = listData.filter((v, i) => i % 2 === 0);
      const rightPostList = listData.filter((v, i) => i % 2 !== 0);
      return (
        <View style={[styles.singleWrap, {marginRight: props.index === 0 ? 0 : 5}]}>
          {(item === 1 ? leftPostList : rightPostList).map((v, index) => {
            return <WrapChild key={`wrapchild-${v.id}`} item={v}/>
          })}
        </View>
      );
    },
    [listData]
  );

  const renderItem = ({item, index}) => {
    const leftPostList = listData.filter((v, i) => i % 2 === 0);
    const rightPostList = listData.filter((v, i) => i % 2 !== 0);
    return (
      <DoubleSingle key={index} data={index === 0 ? leftPostList : rightPostList} index={index} />
    );
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.posts;
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
    setHeaders(res.headers);
  };

  //首页推荐
  const indexLoadData = async (page = 1) => {
    if(page === 1) {
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
    // console.log('props', props)
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
      onRefresh={onRefresh}
      headers={headers}
      renderItem={renderItemMemo}
      numColumns={2}
      settings={{onEndReachedThreshold: 0.1, initialNumToRender: 5, windowSize: 8, ...props.settings}}
      style={styles.wrapper}
    />
  );
};

// List 属性继承scrollList 默认可下拉加载刷新
DoubleList.propTypes = {
  request: PropTypes.object.isRequired, //获取数据请求 {api: api, id: 1, params:params}
  type: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    // width: '40%'
    // backgroundColor: 'pink',
    // paddingLeft: 5,
    // paddingRight: 5,
  },
  likewrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  hashtagText: {
    color: '#ff8d00',
    marginRight: 3,
  },
  imageLabel: {
    width: RFValue(33),
    height: RFValue(16),
    position: 'absolute',
    left: 8,
    top: 8,
  },
  excellentLabel: {
    width: 30,
    height: 16,
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 16,
    backgroundColor: '#FF2242',
    borderRadius: 2,
    overflow: 'hidden',
    color: 'white',
    position: 'absolute',
    left: 8,
    top: 8,
  },

  topText: {
    width: 30,
    height: 16,
    // flex: 1,
    textAlign: 'center',
    lineHeight: 16,
    backgroundColor: '#FFFF00',
    borderRadius: 2,
    overflow: 'hidden',
    color: 'black',
    fontSize: 10,
    alignItems: 'center',
  },
  //  sanjia
  isTopLabel: {
    position: 'absolute',
    left: 8,
    top: 8,
  },
  sanjia: {
    position: 'absolute',
    right: -15,
    top: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderTopWidth: 8,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: '#FFFF00', //右箭头颜色
    borderBottomColor: 'transparent', //上箭头颜色
    borderRightColor: 'transparent', //左箭头颜色
  },
});

export default DoubleList;
