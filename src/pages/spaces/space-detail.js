import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getSpaceDetail, getSpacePosts} from '@/api/space_api';
import Loading from '@/components/Loading';
import {PlayScore, Avator, JoinActivity, BottomModal, TopBack} from '@/components/NodeComponents';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import {dispatchPreviewImage} from '@/redux/actions';
import {BarHeight, SCREEN_WIDTH} from '@/utils/navbar';
import * as action from '@/redux/constants';
import FastImg from '@/components/FastImg';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import StickTopHeader from '@/components/StickTopHeader';
import {dispatchShareItem} from '@/redux/actions';

const HEADER_HEIGHT = Math.ceil((SCREEN_WIDTH * 550) / 750);

const SpaceDetail = ({navigation, route}) => {
  const home = useSelector(state => state.home);
  const {spaceDetail} = useSelector(state => state.space);
  const dispatch = useDispatch();
  const [spaceId] = useState(route.params.spaceId);
  const [detail, setDetail] = useState(null);
  const [currentKey, setCurrentKey] = useState('lasted');
  const [showModal, setShowModal] = useState(false);

  const loadData = async () => {
    const res = await getSpaceDetail(spaceId);
    setDetail(res.data.space);
    dispatch({type: action.UPDATE_SPACE_DETAIL, value: res.data.space});
    navigation.setOptions({
      title: res.data.space.name,
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
    Toast.show('顽力值代表你的影响力 \n顽力值越多收获就越多', {duration: 1000});
  };

  const onPreview = () => {
    const data = {
      index: 0,
      visible: true,
      images: detail.medias.map(v => {
        return {url: v};
      }),
    };
    dispatch(dispatchPreviewImage(data));
  };

  const joinNewTopic = () => {
    const topics = {...home.savetopic, space: {id: detail.id, name: detail.name}};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.navigate('NewTopic');
  };

  const handleOnShare = () => {
    const shareContent = {item_type: 'Space', item_id: detail.id, visible: true};
    dispatch(dispatchShareItem(shareContent));
  };

  useEffect(() => {
    setDetail(spaceDetail);
  }, [spaceDetail]);

  useEffect(() => {
    loadData();
    return () => {
      dispatch({type: action.UPDATE_SPACE_DETAIL, value: null});
    };
  }, []);

  const RenderHeader = () => {
    return (
      <>
        <View style={{height: BarHeight, backgroundColor: 'black'}} />
        <TopBack top={BarHeight + RFValue(12)} handleShare={handleOnShare} />
        <Pressable style={styles.header} onPress={onPreview}>
          <FastImg source={{uri: detail.cover_url}} style={styles.imageCover} />
          <View style={styles.coverOpacity} />
          <View style={styles.info}>
            <View>
              <Text style={[styles.name, {fontSize: detail.name.length > 10 ? 16 : 25}]}>
                {detail.name}
              </Text>
              <Text style={styles.intro} onPress={() => setShowModal(true)}>
                {detail.intro
                  ? detail.intro.length > 20
                    ? `${detail.intro.substring(0, 20)}...`
                    : detail.intro
                  : '暂无简介'}{' '}
                | {detail.medias.length}张图片
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
            <View style={{marginLeft: 35}}>
              <PlayScore score={detail.play_score} onPress={onPlay} />
            </View>
          </View>
        </Pressable>
      </>
    );
  };

  return detail ? (
    <View style={styles.wrapper}>
      <CollapsibleHeader
        tabBarHeight={BarHeight}
        headerHeight={HEADER_HEIGHT + BarHeight}
        currentKey={currentKey}
        onKeyChange={key => setCurrentKey(key)}
        renderTopHeader={<StickTopHeader title={detail.name} />}
        renderHeader={<RenderHeader />}
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
      />

      <BottomModal
        visible={showModal}
        cancleClick={() => setShowModal(false)}
        title={detail.name}
        content={detail.intro}
      />
      <JoinActivity type={'node'} text={'立即打卡'} handleClick={joinNewTopic} />
    </View>
  ) : (
    <Loading />
  );
};

const position = {width: SCREEN_WIDTH, height: HEADER_HEIGHT, position: 'absolute'};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: HEADER_HEIGHT,
    paddingTop: RFValue(40),
    paddingLeft: 14,
    paddingRight: 24,
    position: 'relative',
    backgroundColor: 'pink',
  },
  imageCover: {
    zIndex: -1,
    ...position,
  },
  coverOpacity: {
    ...position,
    backgroundColor: '#000',
    opacity: 0.4,
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
    color: '#fff',
    marginTop: RFValue(8),
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
    marginTop: RFValue(25),
  },
  addressText: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 8,
  },
  descWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFValue(30),
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
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
