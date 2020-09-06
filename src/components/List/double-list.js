import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import IconFont from '@/iconfont';
import ScrollList from '@/components/ScrollList';
import {Avator} from '@/components/NodeComponents';
import {DoubleSingleStyle} from './styles';

const {VideoPlayImage, SingleWrap, MultiLineText, SingleBottom, SingleName} = DoubleSingleStyle;

const DoubleSingle = props => {
  const {data} = props;
  return (
    <SingleWrap>
      {data.map(v => {
        let Height = 200;
        if (v.item.single_cover.height) {
          Height = v.item.single_cover
            ? (v.item.single_cover.height * 180) / v.item.single_cover.width
            : 500;
        }
        return (
          <View key={v.item.id}>
            {v.item.single_cover.link_url && (
              <Image source={{uri: v.item.single_cover.link_url}} style={{height: Height}} />
            )}

            {v.item.has_video && (
              <VideoPlayImage source={require('@/assets/images/video-play.png')} />
            )}
            <MultiLineText numberOfLines={2}>{v.item.plain_content}</MultiLineText>
            <SingleBottom>
              <Avator account={v.item.account} size={16} />
              <SingleName>{v.item.account.nickname}</SingleName>
              <IconFont name="praise-solid" size={20} color={'#bdbdbd'} />
              <Text style={{marginLeft: 5, color: '#bdbdbd'}}>{v.item.praises_count}</Text>
            </SingleBottom>
          </View>
        );
      })}
    </SingleWrap>
  );
};

const DoubleList = props => {
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item, index}) => {
    const leftPostList = listData.filter((v, index) => index % 2 === 0);
    const rightPostLIst = listData.filter((v, index) => index % 2 !== 0);
    return <DoubleSingle data={index === 0 ? leftPostList : rightPostLIst} />;
  };

  const loadData = async (page = 1) => {
    setLoading(true);
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = res.data.posts;
    setLoading(false);
    setHeaders(res.headers);
    setListData(page === 1 ? data : [...listData, ...data]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollList
      data={[1, 2]}
      loading={loading}
      onRefresh={loadData}
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
};

export default DoubleList;
