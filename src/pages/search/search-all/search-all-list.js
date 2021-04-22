import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ScrollList from '@/components/ScrollList';
import AllItem from '@/pages/search/search-all/all-item';
import {Type} from './meta';

const SearchAllList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const {api, params} = props.request;

  const renderItem = ({item, index}) => {
    const Props = {key: index, type: item.type, data: item.data};

    const onPress = key => {
      props.onChangeKey(key);
    };

    switch (item.type) {
      case Type.node:
        return <AllItem {...Props} title="圈子" onPress={() => onPress('node')} />;
      case Type.movement:
        return <AllItem {...Props} title="顽招" onPress={() => onPress('movement')} />;
      case Type.space:
        return <AllItem {...Props} title="场地" onPress={() => onPress('space')} />;
      case Type.activity:
        return <AllItem {...Props} title="活动" onPress={() => onPress('activity')} />;
      case Type.shopStore:
        return <AllItem {...Props} title="Van Store" onPress={() => onPress('shopStore')} />;
      case Type.shopBrand:
        return <AllItem {...Props} title="店铺" onPress={() => onPress('shopBrand')} />;
      case Type.hashtag:
        return <AllItem {...Props} title="话题" onPress={() => onPress('hashtag')} />;
      case Type.account:
        return <AllItem {...Props} title="用户" onPress={() => onPress('account')} />;
      case Type.theory:
        return <AllItem {...Props} title="顽法" onPress={() => onPress('theory')} />;
      case Type.longTopic:
        return <AllItem {...Props} title="长视频" onPress={() => onPress('long_video')} />;
      case Type.article:
        return <AllItem {...Props} title="文章" onPress={() => onPress('article')} />;
      case Type.topic:
        return <AllItem {...Props} title="帖子" onPress={() => onPress('topic')} />;
      default:
        return <View />;
    }
  };

  const loadData = async () => {
    const res = await api({...params, page: 1});
    if (!res.data.items) {
      const filterData = Object.entries(res.data).filter(data => data[1].items.length > 0);
      const newData = filterData.map((item, index) => {
        return {id: index, type: item[0], data: item[1]};
      });
      setListData(newData);
    }
    setHeaders(res.headers);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [props.request]);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollList
        data={listData}
        loading={loading}
        headers={headers}
        renderItem={renderItem}
        enableRefresh={false}
        enableLoadMore={false}
        scrollIndicatorInsets={0}
        renderEmpty={<View />}
      />
    </View>
  );
};

export default SearchAllList;
