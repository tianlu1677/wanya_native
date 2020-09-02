import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {getSpaceDetail} from '@/api/space_api';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import {PlayScore, Avator} from '@/components/NodeComponents';
import SingleList from '@/components/List/SingleList';
import DoubleList from '@/components/List/DoubleList';
import TabViewList from '@/components/TabView';
import {getSpacePosts} from '@/api/space_api';

import {SpaceDetailStyles as styles} from './styles';

const SpaceDetail = ({navigation, route}) => {
  const [spaceId, setSpaceId] = useState('');
  const [detail, setDetail] = useState(null);
  const [currentKey, setCurrentKey] = useState('lasted');

  useLayoutEffect(() => {
    let spaceId = route.params.spaceId;

    setSpaceId(spaceId);
    navigation.setOptions({

    });
  }, [navigation]);


  const loadData = async () => {
    const space = await getSpaceDetail(spaceId);
    setDetail(space);
    navigation.setOptions({
      title: space.name,
    });
  };

  const LastedList = () => {
    return <SingleList request={{api: getSpacePosts, params: {id: route.params.spaceId, type: 'published_order'}}} />;
  };

  const HotList = () => {
    return <DoubleList request={{api: getSpacePosts, params: {id: route.params.spaceId, type: 'hot_order'}}} />;
  };

  useEffect(() => {
    loadData();
  }, [spaceId]);

  return detail ? (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Image style={styles.bgcover} source={{uri: detail.cover_url}} />
        <View style={styles.info}>
          <View>
            <Text style={styles.name}>{detail.name}</Text>
            <Text style={styles.intro}>
              <Text>{detail.intro}</Text> | <Text>{detail.medias.length}张图片</Text>
            </Text>
          </View>
          <View style={styles.creatorWrap}>
            <Avator account={detail.account} size={30} />
            <View style={styles.creator}>
              <Text style={styles.creatorName}>{detail.account.nickname}</Text>
              <Text style={styles.creatorDesc}>创建者</Text>
            </View>
          </View>
        </View>
        <View style={styles.address}>
          <IconFont name="changdiweizhi" size={13} color={'#fff'} />
          <Text style={styles.addressText}>{detail.address}</Text>
        </View>
        <View style={styles.descWrap}>
          <View style={styles.tagsWrap}>
            {detail.tag_list.map((v, index) => (
              <Text key={index} style={styles.tags}>
                {v}
              </Text>
            ))}
          </View>
          <PlayScore score={detail.play_score} />
        </View>
      </View>
      <TabViewList
        currentKey={currentKey}
        tabData={[
          {
            key: 'lasted',
            title: '最新',
            component: LastedList,
          },
          {
            key: 'hot',
            title: '热门',
            component: HotList,
          },
        ]}
        onChange={key => setCurrentKey(key)}
      />
    </View>
  ) : (
    <Loading />
  );
};

export default SpaceDetail;
