import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import IconFont from '@/iconfont';
import ScrollList, {pagination} from '@/components/ScrollList';
import {Avator} from '@/components/NodeComponents';
import {createTopicAction, destroyTopicAction} from '@/api/topic_api';
import {createArticleAction, destroyArticleAction} from '@/api/article_api';
import {PlainContent} from '@/components/Item/single-list-item';
import FastImg from '@/components/FastImg';

const SingleItem = props => {
  const [height, setheight] = useState(200);
  const navigation = useNavigation();

  const {data} = props;

  const [praiseForm, setPraiseForm] = useState({
    praise: data.praise,
    praises_count: data.praises_count,
  });

  const onGoDetail = v => {
    switch (props.type) {
      case 'Topic':
        navigation.navigate('TopicDetail', {topicId: data.id});
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
        ? (data.single_cover.height * 180) / data.single_cover.width
        : 500;
      setheight(h);
    }
  });

  return (
    <TouchableWithoutFeedback key={data.id} onPress={() => onGoDetail(data)}>
      <View style={{backgroundColor: 'white'}}>
        {data.single_cover.link_url && (
          <FastImg source={{uri: data.single_cover.link_url}} style={{height: height}} />
        )}
        {data.has_video && (
          <FastImg style={styles.videoPlay} source={require('@/assets/images/video-play.png')} />
        )}
        <PlainContent data={data} style={styles.multiLineText} numberOfLines={2} />
        <View style={styles.singleBottom}>
          <Avator account={data.account} size={16} />
          <Text style={styles.singleName}>{data.account.nickname.toString().substr(0, 16)}</Text>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={onPraise}>
            <IconFont name="like" size={14} color={praiseForm.praise ? '#000' : '#bdbdbd'} />
            <Text
              style={{marginLeft: 5, color: praiseForm.praise ? '#000' : '#bdbdbd', fontSize: 12}}>
              {praiseForm.praises_count}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const DoubleSingle = props => {
  const {data} = props;

  return (
    <View style={styles.singleWrap}>
      {data.map((v, index) => {
        return <SingleItem key={v.id} data={v.item} type={v.item_type} />;
      })}
    </View>
  );
};

const DoubleList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item, index}) => {
    const leftPostList = listData.filter((v, index) => index % 2 === 0);
    const rightPostLIst = listData.filter((v, index) => index % 2 !== 0);
    return <DoubleSingle key={index} data={index === 0 ? leftPostList : rightPostLIst} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.posts;
    setLoading(false);
    setHeaders(res.headers);
    setListData(data);
  };

  const onRefresh = () => {
    if (props.type === 'recommend') {
      loadData(pagination(headers).nextPage);
    } else {
      loadData();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollList
      data={listData.length === 0 ? [] : [1, 2]}
      loading={loading}
      onRefresh={onRefresh}
      headers={headers}
      renderItem={renderItem}
      numColumns={2}
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
  singleWrap: {
    flex: 1,
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
    marginRight: 'auto',
    marginLeft: 5,
    color: '#bdbdbd',
    fontSize: 10,
  },
  hashtagText: {
    color: '#ff8d00',
    marginRight: 3,
  },
});

export default DoubleList;
