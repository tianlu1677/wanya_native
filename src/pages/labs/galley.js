import React, {useState, useEffect, useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import BaseTheory from '@/components/Item/base-theory';
import {Platform, Dimensions, Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {getRecommendPosts, getRecommendLatestPosts, getFollowedNodePosts} from '@/api/home_api';
import {SCREEN_WIDTH} from '@/utils/navbar';
import RecycleScrollList from '@/components/RecycScrollList';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

let {width, height} = Dimensions.get('window');

// WrapGridLayoutManager.prototype.getOffsetForIndex = function (index) {
//   if (this._layouts.length > index) {
//     return { x: this._layouts[index].x, y: this._layouts[index].y };
//   }
//   else {
//     return { x: 0, y: 0};
//     // Commented the part that throws exception
//     // throw new CustomError_1.default({
//     //     message: "No layout available for index: " + index,
//     //     type: "LayoutUnavailableException",
//     // });
//   }
// };

const Galley = props => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([{item_type: 'none'}]);

  const onRemove = index => {
    const data = JSON.parse(JSON.stringify(listData));
    data.splice(index, 1);
    setListData([...data]);
  };

  const Child = (({item, index}) => {
    switch (item.item_type) {
      case 'Topic':
        return <BaseTopic data={item.item} />;
      case 'Article':
        return <BaseArticle data={item.item} />;
      case 'Theory':
        return <BaseTheory data={item.item} />;
      default:
        return <View><Text color={'red'}>xxx</Text></View>;
    }
  })

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


  const provider = useMemo(() => {
    return new DataProvider(
      (left, right) => {
        return left.id !== right.id;
      },
      index => {
        // TODO: should be fetched from data
        return 'id'+ index;
      }
    );
  }, []);

  const dataProvider = useMemo(() => {
    return provider.cloneWithRows(listData);
  }, [listData, provider]);

  useEffect(() => {
    loadData();
  }, []);

  const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2,
  };

  const layoutProvider = new LayoutProvider(
    index => {
      return 'base_group'
    },
    (type, dim) => {
      console.log('type', type)
      switch (type) {
        case ViewTypes.HALF_LEFT:
          dim.width = width / 3;
          dim.height = 160;
          break;
        case ViewTypes.HALF_RIGHT:
          dim.width = width / 2;
          dim.height = 160;
          break;
        case 'base_group':
          dim.width = width;
          dim.height = 250;
          break;
        default:
          dim.width = width;
          dim.height = 50;
      }
    }
  );

  const rowRenderer = (type, data) => {
    return <Child item={data}/>
  };

  return (
    <View style={{flex: 1}}>
      {
        listData.length <= 1 ? <View /> : <RecycleScrollList
          layoutProvider={layoutProvider}
          loading={loading}
          renderItem={rowRenderer}
          onRefresh={loadData}
          headers={headers}
          data={dataProvider}
          style={{flex: 1}}
        />
      }

      {/*<Text>{listData.length}</Text>*/}
      {/*<Carousel*/}
      {/*  // ref={(c) => { this._carousel = c; }}*/}
      {/*  data={listData}*/}
      {/*  renderItem={renderItemMemo}*/}
      {/*  sliderWidth={SCREEN_WIDTH}*/}
      {/*  itemWidth={SCREEN_WIDTH - 50}*/}
      {/*  sliderHeight={1000}*/}
      {/*  itemHeight={1000}*/}
      {/*  layout={'stack'}*/}
      {/*/>*/}
    </View>
  );
};

// List 属性继承scrollList 默认可下拉加载刷新
Galley.propTypes = {
  request: PropTypes.object.isRequired, //获取数据请求 {api: api, id: 1, params:params}
  dataKey: PropTypes.string, // single-list 默认posts
};

const styles = {
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#00a1f1"
  },
  containerGridLeft: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffbb00"
  },
  containerGridRight: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#7cbb00"
  }
};

export default Galley;
