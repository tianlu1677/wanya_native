import React, {useState, useEffect} from 'react';
import {View, RefreshControl, Text, Image, Pressable, StyleSheet, Dimensions} from 'react-native';
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
import {IColumnsHandles} from '@/components/waterflow/Columns';
import WaterFlow from '@/components/waterflow/index';

// const width = (Dimensions.get('screen').width - 30) / 2;

// const labelList = {'course': '课程', excellent: '精选', is_top: '置顶'}

const SingleItem = props => {
  const [height, setheight] = useState(200);
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const halfWidth = (width - 10) / 2; // 屏幕去掉两边后的宽度
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
    switch (props.item_type) {
      case 'Article':
        if (praiseForm.praise) {
          await destroyArticleAction({id: props.detail.id, type: 'praise'});
        } else {
          await createArticleAction({id: props.detail.id, type: 'praise'});
        }
        break;
      case 'Topic':
        if (praiseForm.praise) {
          await destroyTopicAction({id: data.id, type: 'praise'});
        } else {
          await createTopicAction({id: data.id, type: 'type'});
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

  const IsTopIcon = () => {
    return (
      <View style={styles.isTopLabel}>
        <View style={{flexDirection: 'row', position: 'relative'}}>
          <Text style={styles.topText}>置顶</Text>
          <View style={styles.sanjia} />
        </View>
      </View>
    );
  };

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
          <Image resizeMethod={'resize'} style={styles.videoPlay} source={VideoPlayImg} />
        )}
        {data.type === 'topic' && (
          <PlainContent data={data} style={styles.multiLineText} numberOfLines={2} />
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
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
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
        return <SingleItem key={v.id} data={v.item} isTop={v.is_top} type={v.item_type} />;
      })}
    </View>
  );
};

const numColumns = 2
const WaterFlowList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);
  const [leftHeight, setLeftHeight] = useState(0);
  const [rightHeight, setRightHeight] = useState(0);
  const [leftPosts, setLeftPosts] = useState([]);
  const [rightPosts, setRightPosts] = useState([]);

  // 列的高度存储
  const columnsHeight = React.useMemo(() => Array(numColumns).fill(0), [numColumns]);
  const keysList = React.useMemo(() => [], []);

  // const checkIsExist = React.useCallback(
  //   (key: string) => {
  //     const check = keysList.indexOf(key) !== -1
  //     // 如果未渲染则保存key
  //     if (!check) {
  //       keysList.push(key)
  //     }
  //     return check
  //   },
  //   [columns, keysList],
  // )
  const WaterFlowRef = React.useRef('');

  // listData.forEach((content) => {
  //   console.log('cccc', content)
  //   if(leftHeight <= rightHeight) {
  //     setLeftHeight(leftHeight + content.item.single_cover.height)
  //     setLeftPosts(leftPosts + [content])
  //   } else {
  //     setRightHeight(rightHeight + content.item.single_cover.height)
  //     setRightPosts(rightPosts + [content])
  //   }
  // })
  //
  // const renderItem = ({item, index}) => {
  //   const leftPostList = listData.filter((v, i) => i % 2 === 0);
  //   const rightPostList = listData.filter((v, i) => i % 2 !== 0);
  //   return (
  //     <DoubleSingle key={index} data={index === 0 ? leftPostList : rightPostList} index={index} />
  //   );
  // };

  const renderItem = ({item, index}) => {
    const v = item;
    // console.log('renderitem', item)
    return <SingleItem key={v.id} data={v.item} isTop={v.is_top} type={v.item_type} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.posts;
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
    setHeaders(res.headers);
  };

  //首页推荐
  const indexLoadData = async (page = 1) => {
    setLoading(true);
    let itemList = [];
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.posts;

    // 加载首页置顶的
    let top_posts_res = await getRecommendTopPosts();
    itemList = top_posts_res.data.posts;
    itemList = itemList.map(item => ({...item, is_top: true}));

    setHeaders(res.headers);
    setListData(itemList.concat(data));
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

      <WaterFlow
        ref={WaterFlowRef}
        data={listData}
        keyForItem={item => item.id}
        numColumns={2}
        onEndReached={onRefresh}
        /** 允许 heightForItem 为异步函数 */
        // asyncHeightForItem={async item => {
        //   let height = 0
        //   try {
        //     height = await (new Promise<number>((resolve, reject) => {
        //       Image.getSize(item.image_path, (_, imageHeight) => {
        //         resolve(imageHeight)
        //       }, reject)
        //     }))
        //   } catch (err) { console.log({ err }); }
        //   return height;
        // }}
        /** 如果高度已知则传此方法 */
        // heightForItem={item => {
        //   return item.height;
        // }}
        columnFlatListProps={{
          style: {},
        }}
        columnsFlatListProps={{
          refreshControl: (
            <RefreshControl
              style={{zIndex: 10}}
              refreshing={loading}
              onRefresh={() => {
                WaterFlowRef.current?.clear();
                loadData();
              }}
              tintColor={'gray'}
            />
          ),
          style: {paddingLeft: 5, paddingRight: 5},
        }}
        renderItem={renderItem}
      />

  );
};

// List 属性继承scrollList 默认可下拉加载刷新
WaterFlowList.propTypes = {
  request: PropTypes.object.isRequired, //获取数据请求 {api: api, id: 1, params:params}
  type: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: 'pink',
    // paddingLeft: 5,
    // paddingRight: 5,
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

export default WaterFlowList;
