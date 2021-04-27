import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, Platform, Linking} from 'react-native';
import {useDispatch} from 'react-redux';
import {dispatchPreviewImage} from '@/redux/actions';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import StickTopHeader from '@/components/StickTopHeader';
import MapLinking from '@/components/MapLink';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import ActionSheet from '@/components/ActionSheet.android';
import {BarHeight, SCREEN_WIDTH} from '@/utils/navbar';
import SingleList from '@/components/List/single-list';
import TopicList from '@/components/List/topic-list';
import ArticleList from '@/components/List/article-list';
import {JoinAccounts, JoinButton, TopBack, BottomModal} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import {
  getShopStoreDetail,
  getShopStoreJoinAccounts,
  getShopStoreJoined,
  getShopStoreExit,
  getShopStorePosts,
  getShopStoreTopics,
  getShopStoreArticles,
} from '@/api/shop_store_api';
import {Pressable} from 'react-native';

const HEADER_HEIGHT = Math.ceil((SCREEN_WIDTH * 230) / 750);
const TOP_HEADER_HEIGHT =
  BarHeight + HEADER_HEIGHT + RFValue(75 / 2) + RFValue(3) + RFValue(50) * 3;

const RenderHeader = props => {
  const dispatch = useDispatch();

  const {detail, joinAccounts, loadData} = props;
  const [joined, setJoined] = useState(detail.joined);
  const [showModal, setShowModal] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const handleJoin = async () => {
    joined ? await getShopStoreExit(detail.id) : await getShopStoreJoined(detail.id);
    Toast.showError(joined ? '已取消收藏' : '已收藏');
    setJoined(!joined);
    loadData();
  };

  const onPreview = type => {
    if (type === 'cover_url') {
      const data = {index: 0, visible: true, images: [{url: detail.cover_url}]};
      dispatch(dispatchPreviewImage(data));
    }

    if (type === 'bg_cover') {
      const data = {index: 0, visible: true, images: detail.medias};
      dispatch(dispatchPreviewImage(data));
    }
  };

  const goAddress = () => {
    // 起点坐标信息
    const startLocation = {lng: 106.534892, lat: 29.551891, title: '我的位置'};
    const destLocation = {lng: 116.407526, lat: 39.90403, title: '北京'};
    if (Platform.OS === 'ios') {
      MapLinking.planRoute({startLocation, destLocation, mode: 'drive'});
    } else {
      setShowActionSheet(true);
      const config = {mode: 'drive', type: 'gcj02', appName: 'MapLinking'};
      const maps = MapLinking.openUrl({...config, startLocation, destLocation});
      const list = maps.map((map, index) => ({
        id: index,
        label: map[0],
        onPress: () => {
          Linking.openURL(map[1]);
        },
      }));
      setItemList(list);
    }
  };

  console.log(detail);
  return (
    <>
      <View style={{height: BarHeight, backgroundColor: 'black'}} />
      <TopBack top={BarHeight + RFValue(12)} />
      <Pressable style={styles.header} onPress={() => onPreview('bg_cover')}>
        <FastImg
          source={{uri: detail.medias.length > 0 ? detail.medias[0].url : ''}}
          style={styles.imageCover}
        />
        <View style={styles.coverOpacity} />
        <Pressable onPress={() => onPreview('cover_url')}>
          <FastImg source={{uri: detail.cover_url}} style={styles.cover_url} />
        </Pressable>
        <View style={styles.nameContent}>
          <Text style={styles.name}>{detail.name}</Text>
          <Text style={styles.count}>
            {detail.publish_topics_count + detail.publish_articles_count}
            篇帖子 · {detail.join_accounts_count}位顽友收藏
          </Text>
        </View>
        <View style={styles.refrence}>
          <View style={{marginTop: 3}}>
            <JoinButton
              join={joined}
              text={joined ? '已收藏' : '收藏'}
              onPress={handleJoin}
              joinedStyle={{color: '#BDBDBD', backgroundColor: '#fff'}}
              joineStyle={{color: '#000000', backgroundColor: '#fff'}}
            />
          </View>
          <JoinAccounts
            accounts={joinAccounts}
            size={18}
            style={{marginBottom: RFValue(12), justifyContent: 'flex-end'}}
          />
        </View>
      </Pressable>
      <View style={styles.slideWrapper}>
        {/* 所在位置 */}
        <Pressable style={styles.slide} onPress={goAddress}>
          <IconFont name="space-point" size={16} color="#000" />
          <Text style={styles.slideTitle}>所在位置</Text>
          <Text style={styles.slideValue} numberOfLines={1}>
            {detail.store_type === 'entity' && detail.address}
            {detail.store_type === 'website' && '网店'}
          </Text>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </Pressable>
        {/* 营业时间 */}
        <View style={styles.slide}>
          <IconFont name="calendar" size={16} color="#000" />
          <Text style={styles.slideTitle}>营业时间</Text>
          <Text style={styles.slideValue} numberOfLines={1}>
            {detail.open_time}
          </Text>
        </View>
        {/* 店铺标签 */}
        <Pressable style={styles.slide} onPress={() => setShowModal(true)}>
          <IconFont name="biaoqian" size={16} color="#000" />
          <Text style={styles.slideTitle}>店铺标签</Text>
          <View style={[styles.slideValue, styles.tagWrapper]}>
            {detail.tags.slice(0, 3).map(tag => (
              <Text style={styles.tag} key={tag.id}>
                {tag.name}
              </Text>
            ))}
          </View>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </Pressable>
      </View>

      {/* 店铺标签 */}
      {detail.tags.length > 0 && (
        <BottomModal
          visible={showModal}
          cancleClick={() => setShowModal(false)}
          title={'店铺标签'}
          content={
            <View style={styles.tagWrapper}>
              {detail.tags.map(tag => (
                <Text style={styles.tag} key={tag.id}>
                  {tag.name}
                </Text>
              ))}
            </View>
          }
        />
      )}

      <ActionSheet
        actionItems={itemList}
        showActionSheet={showActionSheet}
        changeModal={() => {
          setShowActionSheet(false);
        }}
      />
    </>
  );
};

const ShopStoreDetail = props => {
  const {shopStoreId} = props.route.params;
  const [currentKey, setCurrentKey] = useState('post');
  const [detail, setDetail] = useState(null);
  const [joinAccounts, setJoinAccounts] = useState([]);

  const loadData = async () => {
    const res = await getShopStoreDetail(shopStoreId);
    const ret = await getShopStoreJoinAccounts(shopStoreId, {sort: 'publish_order'});
    setJoinAccounts(ret.data.accounts.slice(0, 4));
    setDetail(res.data.shop_store);
  };

  useEffect(() => {
    loadData();
  }, []);

  const PostListPage = () => {
    const params = {api: getShopStorePosts, params: {id: shopStoreId}};
    return <SingleList request={params} enableRefresh={false} />;
  };

  const TopicListPage = () => {
    const params = {api: getShopStoreTopics, params: {id: shopStoreId}};
    return <TopicList request={params} enableRefresh={false} />;
  };

  const ArticleListPage = () => {
    const params = {api: getShopStoreArticles, params: {id: shopStoreId}};
    return <ArticleList request={params} enableRefresh={false} />;
  };

  return detail ? (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" />
      <View style={{flex: 1, backgroundColor: 'pink'}}>
        <CollapsibleHeader
          headerHeight={TOP_HEADER_HEIGHT}
          currentKey={currentKey}
          onKeyChange={key => setCurrentKey(key)}
          tabData={[
            {
              key: 'post',
              title: '动态',
              component: PostListPage,
            },
            {
              key: 'topic',
              title: '帖子',
              component: TopicListPage,
            },
            {
              key: 'article',
              title: '文章',
              component: ArticleListPage,
            },
          ]}
          renderTopHeader={<StickTopHeader title={detail.name} />}
          renderHeader={
            <RenderHeader detail={detail} joinAccounts={joinAccounts} loadData={loadData} />
          }
        />
      </View>
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
  imageCover: {
    zIndex: -1,
    ...position,
  },
  coverOpacity: {
    ...position,
    backgroundColor: '#000',
    opacity: 0.4,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingTop: HEADER_HEIGHT - RFValue(75 / 2),
  },
  cover_url: {
    width: RFValue(75),
    height: RFValue(75),
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameContent: {
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  name: {
    fontSize: RFValue(16),
    color: '#fff',
    marginTop: 3 + RFValue(3),
  },
  count: {
    fontSize: 12,
    color: '#BDBDBD',
    lineHeight: RFValue(20),
    marginBottom: RFValue(10),
  },
  refrence: {
    justifyContent: 'space-between',
    marginLeft: 'auto',
  },
  slideWrapper: {
    paddingHorizontal: 14,
    marginTop: RFValue(3),
  },
  slide: {
    height: RFValue(50),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  slideTitle: {
    marginLeft: 12,
    fontWeight: '400',
    marginRight: 15,
  },
  slideValue: {
    flex: 1,
    marginRight: 14,
    fontWeight: '400',
    textAlign: 'right',
  },
  slideRight: {
    position: 'absolute',
    right: 0,
  },
  tagWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tag: {
    height: RFValue(20),
    lineHeight: RFValue(20),
    paddingHorizontal: 8,
    fontSize: 10,
    color: '#FF8D00',
    borderWidth: 1,
    borderColor: '#FF8D00',
    borderRadius: 2,
    marginLeft: 7,
  },
});

export default ShopStoreDetail;
