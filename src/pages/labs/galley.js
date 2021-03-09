import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import BaseTheory from '@/components/Item/base-theory';
import {Platform, Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {getRecommendPosts, getRecommendLatestPosts, getFollowedNodePosts} from '@/api/home_api';
import {SCREEN_WIDTH} from '@/utils/navbar';

const Galley = props => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const onRemove = index => {
    const data = JSON.parse(JSON.stringify(listData));
    data.splice(index, 1);
    setListData([...data]);
  };

  const renderItemMemo = useCallback(({item, index}) => <Child item={item} index={index} />, [
    listData,
  ]);

  const Child = React.memo(({item, index}) => {
    switch (item.item_type) {
      case 'Topic':
        return <BaseTopic data={item.item} onRemove={() => onRemove(index)} />;
      case 'Article':
        return <BaseArticle data={item.item} />;
      case 'Theory':
        return <BaseTheory data={item.item} onRemove={() => onRemove(index)} />;
      default:
        return <View />;
    }
  });

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const res = await getRecommendLatestPosts({page: page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.posts;
    setListData(page === 1 ? data : [...listData, ...data]);
    setLoading(false);
    setHeaders(res.headers);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{backgroundColor: 'black', height: 600, paddingTop: 20}}>
      <Carousel
        // ref={(c) => { this._carousel = c; }}
        data={listData}
        renderItem={renderItemMemo}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH - 50}
        sliderHeight={1000}
        itemHeight={1000}
        layout={'stack'}
      />
    </View>
  );
};

// List 属性继承scrollList 默认可下拉加载刷新
Galley.propTypes = {
  request: PropTypes.object.isRequired, //获取数据请求 {api: api, id: 1, params:params}
  dataKey: PropTypes.string, // single-list 默认posts
};

export default Galley;
