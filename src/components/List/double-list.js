import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
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

const topImage = 'http://file.meirixinxue.com/assets/2020/13cc2946-2a92-4b75-a779-a20a485b1a57.png';

// const labelList = {'course': '课程', excellent: '精选', is_top: '置顶'}

const SingleItem = props => {
  const [height, setheight] = useState(200);
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const halfWidth = (width - 10) / 2; // 屏幕去掉两边后的宽度

  const {data} = props;

  // console.log('data', props)
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

  useEffect(() => {
    if (data.single_cover.height) {
      const h = data.single_cover
        ? (data.single_cover.height * halfWidth) / data.single_cover.width
        : 500;
      setheight(h);
    }
  });

  return (
    <Pressable key={data.id} onPress={() => onGoDetail(data)}>
      <View style={{backgroundColor: 'white'}}>
        {data.single_cover.link_url && (
          <FastImg
            source={{uri: data.single_cover.link_url}}
            style={{height: height, width: '100%', backgroundColor: '#F1F1F1'}}
          />
        )}
        {data.has_video && <FastImg style={styles.videoPlay} source={VideoPlayImg} />}
        {data.type === 'topic' && (
          <PlainContent data={data} style={styles.multiLineText} numberOfLines={2} />
        )}

        {data.type === 'article' && <Text style={styles.multiLineText}>{data.title}</Text>}
        {props.isTop && <FastImg source={{uri: topImage}} style={styles.imageLabel} />}
        {!props.isTop && data.excellent && <Text style={styles.excellentLabel}>精选{data.is_top}</Text>}

        <View style={styles.singleBottom}>
          <Avator account={data.account} size={16} />
          <Text style={styles.singleName}>{data.account.nickname.toString().substr(0, 16)}</Text>
          <Pressable style={{flexDirection: 'row', alignItems: 'center'}} onPress={onPraise}>
            <IconFont name="like" size={14} color={praiseForm.praise ? '#000' : '#bdbdbd'} />
            <Text
              style={{marginLeft: 5, color: praiseForm.praise ? '#000' : '#bdbdbd', fontSize: 12}}>
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
    <View style={[styles.singleWrap, {marginLeft: props.index === 0 ? 0 : 5}]}>
      {data.map((v, index) => {
        return <SingleItem key={v.id} data={v.item} isTop={v.is_top} type={v.item_type} />;
      })}
    </View>
  );
};

const DoubleList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);
  const [leftHeight, setLeftHeight] = useState(0);
  const [rightHeight, setRightHeight] = useState(0);
  const [leftPosts, setLeftPosts] = useState([]);
  const [rightPosts, setRightPosts] = useState([]);


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
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
  };

  //首页推荐
  const indexLoadData = async (page = 1) => {
    setLoading(true);
    let itemList = []
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.posts;

    // 加载首页置顶的
    let top_posts_res = await getRecommendTopPosts()
    itemList = top_posts_res.data.posts
    itemList = itemList.map((item) => ({...item, is_top: true }))

    setHeaders(res.headers);
    setListData(itemList.concat(data));
    setLoading(false);
  };

  const onRefresh = (page = 1) => {
    // console.log('props', props)
    if (props.type === 'recommend' && (page === 1 || !page) ) {
      indexLoadData(pagination(headers).nextPage);
    } else {
      loadData(page);
    }
  };

  useEffect(() => {
    if(props.type === 'recommend') {
      indexLoadData(1)
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
      renderItem={renderItem}
      numColumns={2}
      style={styles.wrapper}
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
  wrapper: {
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
  },
  singleWrap: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginRight: 'auto',
    marginLeft: 5,
    color: '#bdbdbd',
    fontSize: 10,
  },
  hashtagText: {
    color: '#ff8d00',
    marginRight: 3,
  },
  imageLabel: {
    width: 32,
    height: 16,
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
});

export default DoubleList;
