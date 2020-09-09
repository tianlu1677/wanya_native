import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import {getSpaceDetail, getSpacePosts} from '@/api/space_api';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import {PlayScore, Avator} from '@/components/NodeComponents';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import TabViewList from '@/components/TabView';
import Toast from '@/components/Toast';

const SpaceDetail = ({navigation, route}) => {
  const [spaceId] = useState(route.params.spaceId);
  const [detail, setDetail] = useState(null);
  const [currentKey, setCurrentKey] = useState('lasted');

  const loadData = async () => {
    const space = await getSpaceDetail(spaceId);
    setDetail(space);
    navigation.setOptions({
      title: space.name,
    });
  };

  const LastedList = () => (
    <SingleList
      request={{api: getSpacePosts, params: {id: route.params.spaceId, type: 'published_order'}}}
    />
  );

  const HotList = () => (
    <DoubleList
      request={{api: getSpacePosts, params: {id: route.params.spaceId, type: 'hot_order'}}}
    />
  );

  const goAccountDetail = () => {
    navigation.navigate('AccountDetail', {accountId: detail.account.id});
  };

  const onPlay = () => {
    Toast.show('顽力值代表你的影响力，顽力值越多收获就越多。');
  };

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <View style={styles.wrapper}>
      <ImageBackground source={{uri: detail.cover_url}} style={styles.header}>
        <View style={styles.info}>
          <View>
            <Text style={[styles.name, {fontSize: detail.name.length > 10 ? 16 : 25}]}>
              {detail.name}
            </Text>
            <Text style={styles.intro}>
              <Text>
                {detail.intro
                  ? detail.intro.length > 20
                    ? `${detail.intro.substring(0, 20)}...`
                    : detail.intro
                  : '暂无简介'}
              </Text>{' '}
              | <Text>{detail.medias.length}张图片</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.creatorWrap} onPress={goAccountDetail}>
            <Avator account={detail.account} size={30} />
            <View style={styles.creator}>
              <Text style={styles.creatorName}>{detail.account.nickname}</Text>
              <Text style={styles.creatorDesc}>创建者</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.address}>
          <IconFont name="space-point" size={13} color={'#fff'} />
          <Text style={styles.addressText}>{detail.address}</Text>
        </View>
        <View style={styles.descWrap}>
          <View style={styles.tagsWrap}>
            {detail.tag_list.map((v, index) => (
              <Text key={index} style={styles.tags}>
                {v}
              </Text>
            ))}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, index) => (
              <Text key={index} style={styles.tags}>
                免费
              </Text>
            ))}
          </View>
          <PlayScore score={detail.play_score} onPress={onPlay} />
        </View>
      </ImageBackground>
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    paddingLeft: 16,
    paddingRight: 24,
    paddingTop: 63,
    minHeight: 275,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 25,
    color: '#fff',
  },
  intro: {
    fontSize: 11,
    lineHeight: 20,
    color: '#fff',
    marginTop: 8,
  },
  creatorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creator: {
    marginLeft: 5,
  },
  creatorName: {
    color: '#fff',
    fontSize: 11,
  },
  creatorDesc: {
    color: '#fff',
    fontSize: 8,
    marginTop: 5,
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  addressText: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 8,
  },
  descWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 36,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 260,
  },
  tags: {
    height: 21,
    lineHeight: 21,
    fontSize: 11,
    textAlign: 'center',
    backgroundColor: '#fff',
    opacity: 0.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 8,
    marginBottom: 8,
  },
});

export default SpaceDetail;
