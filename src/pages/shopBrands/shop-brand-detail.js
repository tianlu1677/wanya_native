import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import {dispatchPreviewImage} from '@/redux/actions';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import StickTopHeader from '@/components/StickTopHeader';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import {SCREEN_WIDTH, BarHeight} from '@/utils/navbar';
import SingleList from '@/components/List/single-list';
import TopicList from '@/components/List/topic-list';
import ProductList from '@/components/List/product-list';
import {getProducts} from '@/api/product_api';
import ArticleList from '@/components/List/article-list';

import {
  BlurView,
  JoinAccounts,
  JoinButton,
  Avator,
  BottomModal,
  TopBack,
  JoinActivity,
} from '@/components/NodeComponents';
import {
  getShopBrandDetail,
  getShopBrandJoinAccounts,
  getShopBrandJoined,
  getShopBrandExit,
  getShopBrandPosts,
  getShopBrandTopics,
  getShopBrandArticles,
} from '@/api/shop_brand_api';
import PersonImg from '@/assets/images/personal.png';
import BrandImg from '@/assets/images/brand.png';

const HEADER_HEIGHT = Math.ceil((SCREEN_WIDTH * 485) / 750);

const RenderHeader = props => {
  const dispatch = useDispatch();
  const {navigation, detail, joinAccounts, loadData} = props;
  const [joined, setJoined] = useState(detail.joined);
  const [showModal, setShowModal] = useState(false);

  const handleJoin = async () => {
    joined ? await getShopBrandExit(detail.id) : await getShopBrandJoined(detail.id);
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

  const goJoinAccounts = () => {
    navigation.navigate('JoinAccountsList', {
      title: detail.name,
      request: {api: getShopBrandJoinAccounts, params: {id: detail.id}},
    });
  };

  const handleGet = () => {};

  return (
    <>
      <View style={{height: BarHeight, backgroundColor: 'black'}} />
      <TopBack top={BarHeight + RFValue(10)} />
      <Pressable style={styles.header} onPreview={() => onPreview('bg_cover')}>
        <View style={styles.headerOpacity} />
        {detail.medias.length > 0 && (
          <FastImg source={{uri: detail.medias[0].url}} style={styles.headerCover} />
        )}
        <View style={styles.headerInfo}>
          <Pressable onPreview={() => onPreview('cover_url')}>
            <FastImg source={{uri: detail.cover_url}} style={styles.coverImage} />
          </Pressable>
          <View style={styles.content}>
            <Text style={styles.name}>{detail.name}</Text>
            <Text style={styles.count}>
              {detail.publish_topics_count + detail.publish_articles_count}
              篇动态
            </Text>
          </View>
          {detail.account ? (
            <View style={styles.headerAccount}>
              <Avator account={detail.account} size={RFValue(30)} isShowSettledIcon={false} />
              <View style={styles.accountContent}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.accountName}>{detail.account.nickname}</Text>
                  {detail.account.settled_type === 'personal' && (
                    <FastImg style={styles.settledIcon} source={PersonImg} />
                  )}
                  {detail.account.settled_type === 'brand' && (
                    <FastImg style={styles.settledIcon} source={BrandImg} />
                  )}
                </View>
                <Text style={styles.accountText}>已认领</Text>
              </View>
            </View>
          ) : (
            <Pressable style={styles.headerAccount} onPress={handleGet}>
              <IconFont name="question" size={16} color={'#fff'} />
              <Text style={styles.noAccount}>未认领</Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.intro} numberOfLines={2} onPress={() => setShowModal(true)}>
          简介：{detail.intro}
        </Text>
        <Pressable style={styles.accountsWrapper} onPress={goJoinAccounts}>
          <BlurView style={styles.accountsMain} blurAmount={5}>
            <JoinAccounts accounts={joinAccounts} size={25} />
            <Text style={styles.accountsCount}>
              {detail.join_accounts_count
                ? `${detail.join_accounts_count}位板友已收藏`
                : '还没有板友收藏'}
            </Text>
            <JoinButton join={joined} text={joined ? '已收藏' : '收藏'} onPress={handleJoin} />
          </BlurView>
        </Pressable>
      </Pressable>
      <BottomModal
        visible={showModal}
        cancleClick={() => setShowModal(false)}
        title={'简介'}
        content={`简介：${detail.intro}`}
      />
    </>
  );
};

const ShopBrandDetail = props => {
  const dispatch = useDispatch();
  const {navigation, route} = props;
  const {shopBrandId} = route.params;
  const [currentKey, setCurrentKey] = useState('product');
  const [detail, setDetail] = useState(null);
  const [joinAccounts, setJoinAccounts] = useState([]);

  const createGoods = () => {
    dispatch({type: action.CREATE_PRODUCT, value: {}});
    navigation.navigate('CreateProductLink', {pageKey: route.key});
  };

  const createTopic = () => {
    const topics = {shop_brand_ids: [detail]};
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.navigate('NewTopic', {pageKey: `ShopBrandDetail${shopBrandId}`});
  };

  const ProductListPage = () => {
    const apiPath = `q[shop_brand_id_eq]=${detail.id}`;
    return <ProductList request={{api: getProducts, params: {}, apiPath}} />;
  };

  const PostListPage = () => {
    const params = {api: getShopBrandPosts, params: {id: shopBrandId}};
    return <SingleList request={params} enableRefresh={false} />;
  };

  const TopicListPage = () => {
    const params = {api: getShopBrandTopics, params: {id: shopBrandId}};
    return <TopicList request={params} enableRefresh={false} />;
  };

  const ArticleListPage = () => {
    const params = {api: getShopBrandArticles, params: {id: shopBrandId}};
    return <ArticleList request={params} enableRefresh={false} />;
  };

  const loadData = async () => {
    const res = await getShopBrandDetail(shopBrandId);
    const ret = await getShopBrandJoinAccounts({id: shopBrandId, sort: 'publish_order'});
    setJoinAccounts(ret.data.accounts.slice(0, 4));
    setDetail(res.data.shop_brand);
  };

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <View style={styles.wrapper}>
      <CollapsibleHeader
        tabBarHeitabBarHeightght={BarHeight}
        headerHeight={HEADER_HEIGHT + BarHeight}
        currentKey={currentKey}
        onKeyChange={key => setCurrentKey(key)}
        separator={true}
        renderTopHeader={<StickTopHeader title={detail.name} />}
        renderHeader={
          <RenderHeader
            detail={detail}
            joinAccounts={joinAccounts}
            loadData={loadData}
            {...props}
          />
        }
        tabData={[
          {
            key: 'product',
            title: '顽物',
            component: ProductListPage,
          },
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
      />
      {currentKey === 'product' ? (
        <JoinActivity type="node" text="添加顽物" handleClick={createGoods} />
      ) : (
        <JoinActivity type="node" text="发布动态" handleClick={createTopic} />
      )}
    </View>
  ) : (
    <Loading />
  );
};

const positon = {width: SCREEN_WIDTH, height: HEADER_HEIGHT, position: 'absolute'};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: HEADER_HEIGHT,
    position: 'relative',
    paddingHorizontal: 14,
    paddingTop: RFValue(28),
  },
  headerOpacity: {
    ...positon,
    backgroundColor: '#000',
    opacity: 0.4,
  },
  headerCover: {
    ...positon,
    zIndex: -1,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverImage: {
    width: RFValue(69),
    height: RFValue(69),
  },
  content: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  count: {
    color: '#fff',
    fontSize: 11,
    marginTop: RFValue(12),
  },
  headerAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  accountContent: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  accountName: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
  accountText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '300',
    marginTop: RFValue(4),
  },
  settledIcon: {
    width: RFValue(8),
    height: RFValue(8),
    marginLeft: 3,
  },
  noAccount: {
    fontSize: 11,
    color: '#fff',
    marginLeft: 5,
  },
  intro: {
    color: '#fff',
    fontSize: 11,
    lineHeight: 18,
    marginTop: RFValue(16),
    width: '80%',
  },
  accountsWrapper: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: RFValue(22),
  },
  accountsMain: {
    height: RFValue(45),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 2,
  },
  accountsCount: {
    color: '#DBDBDB',
    fontSize: 11,
    marginRight: 'auto',
    marginLeft: 7,
  },
});

export default ShopBrandDetail;
