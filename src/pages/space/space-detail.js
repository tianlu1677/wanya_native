import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getSpaceDetail, getSpacePosts} from '@/api/space_api';
import Loading from '@/components/Loading';
import {PlayScore, Avator, JoinActivity, GoBack, BottomModal} from '@/components/NodeComponents';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import TabViewList from '@/components/TabView';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import {dispatchPreviewImage} from '@/redux/actions';
import {NAVIGATION_BAR_HEIGHT} from '@/utils/navbar';
import * as action from '@/redux/constants';
import FastImg from '@/components/FastImg';

const SpaceDetail = ({navigation, route}) => {
  const home = useSelector(state => state.home);
  const dispatch = useDispatch();
  const [spaceId] = useState(route.params.spaceId);
  const [detail, setDetail] = useState(null);
  const [currentKey, setCurrentKey] = useState('lasted');
  const [showModal, setShowModal] = useState(false);

  const loadData = async () => {
    const res = await getSpaceDetail(spaceId);
    setDetail(res.data.space);
    navigation.setOptions({
      title: res.data.space.name,
    });
  };

  const onShowIntro = () => {
    setShowModal(true);
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
    Toast.show('顽力值代表你的影响力 \n顽力值越多收获就越多', {duration: 1000});
  };

  const onPreview = () => {
    const data = {
      images: detail.medias.map(v => {
        return {url: v};
      }),
      visible: true,
      index: 0,
    };
    dispatch(dispatchPreviewImage(data));
  };

  const joinNewTopic = () => {
    const topics = {...home.savetopic, space: {id: detail.id, name: detail.name}};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.navigate('NewTopic');
  };

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <View style={styles.wrapper}>
      <GoBack />
      <FastImg source={{uri: detail.cover_url}} style={styles.imageCover} />
      <View style={styles.imageCoverOpacity} />
      <Pressable onPress={onPreview} style={styles.header}>
        <View style={styles.info}>
          <View>
            <Text style={[styles.name, {fontSize: detail.name.length > 10 ? 16 : 25}]}>
              {detail.name}
            </Text>
            <Text style={styles.intro} onPress={onShowIntro}>
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
          <Pressable style={styles.creatorWrap} onPress={goAccountDetail}>
            <Avator account={detail.account} size={30} handleClick={goAccountDetail} />
          </Pressable>
        </View>
        <View style={styles.address}>
          <IconFont name="space-point" size={15} color={'#fff'} />
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
          <PlayScore score={detail.play_score} onPress={onPlay} />
        </View>
      </Pressable>
      <TabViewList
        currentKey={currentKey}
        separator={true}
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

      <BottomModal
        visible={showModal}
        cancleClick={() => setShowModal(false)}
        title={detail.name}
        content={detail.intro}
      />

      <JoinActivity type={'node'} text={'立刻参与'} handleClick={joinNewTopic} />
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingLeft: 14,
    paddingRight: 24,
    paddingTop: NAVIGATION_BAR_HEIGHT + 2,
    minHeight: 275,
    position: 'relative',
  },
  imageCover: {
    position: 'absolute',
    height: 275,
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  imageCoverOpacity: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '500',
  },
  intro: {
    fontSize: 11,
    lineHeight: 19,
    color: '#fff',
    marginTop: 6,
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
    marginTop: 32,
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
    paddingLeft: 11,
    paddingRight: 11,
    marginRight: 8,
    marginBottom: 8,
  },
});

export default SpaceDetail;
