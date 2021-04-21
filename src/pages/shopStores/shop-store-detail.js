import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import StickTopHeader from '@/components/StickTopHeader';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import SingleList from '@/components/List/single-list';
import TopicList from '@/components/List/topic-list';
import ArticleList from '@/components/List/article-list';
import {JoinAccounts, JoinButton} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import {
  getShopStoreDetail,
  getShopStoreJoinAccounts,
  shopStoreJoined,
  shopStoreExit,
  getShopStorePosts,
  getShopStoreTopics,
  getShopStoreArticles,
} from '@/api/shop_store_api';

const {width} = Dimensions.get('window');
const ImageHeight = parseInt((width * 230) / 750);
const HEADER_HEIGHTs = ImageHeight + parseInt(ImageHeight / 2) + 3 + RFValue(50) * 3;
const HEADER_HEIGHT = HEADER_HEIGHTs;

const RenderHeader = props => {
  const {detail} = props;
  const shopStoreId = detail.id;
  const [joined, setJoined] = useState(detail.joined);
  const [joinAccounts, setJoinAccounts] = useState([]);

  const loadJoinAccounts = async () => {
    const res = await getShopStoreJoinAccounts(shopStoreId, {sort: 'publish_order'});
    const accounts = res.data.accounts.slice(0, 4);
    setJoinAccounts(accounts);
  };

  const handleJoin = async () => {
    if (joined) {
      await shopStoreExit(shopStoreId);
      Toast.showError('已取消收藏');
    } else {
      await shopStoreJoined(shopStoreId);
      Toast.showError('已收藏');
    }
    loadJoinAccounts();
    setJoined(!joined);
  };

  return (
    <View style={styles.headerWrapper}>
      <View>
        <FastImg
          source={{uri: detail.medias.length > 0 ? detail.medias[0].url : ''}}
          style={styles.bgCoverImage}
        />
        <View style={styles.coverOpacity} />
      </View>
      <View style={styles.header}>
        <FastImg source={{uri: detail.cover_url}} style={styles.cover_url} />
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
          <View style={{marginBottom: RFValue(12)}}>
            <JoinAccounts accounts={joinAccounts} size={18} />
          </View>
        </View>
      </View>
      <View style={styles.slideWrapper}>
        {/* 所在位置 */}
        <View style={styles.slide}>
          <IconFont name="space-point" size={16} color="#000" />
          <Text style={styles.slideTitle}>所在位置</Text>
          <Text style={styles.slideValue} numberOfLines={1}>
            {detail.store_type === 'entity' && detail.address}
            {detail.store_type === 'website' && '网店'}
          </Text>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </View>
        {/* 营业时间 */}
        <View style={styles.slide}>
          <IconFont name="calendar" size={16} color="#000" />
          <Text style={styles.slideTitle}>营业时间</Text>
          <Text style={styles.slideValue} numberOfLines={1}>
            {detail.open_time}
          </Text>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </View>
        {/* 店铺标签 */}
        <View style={styles.slide}>
          <IconFont name="biaoqian" size={16} color="#000" />
          <Text style={styles.slideTitle}>店铺标签</Text>
          <View style={[styles.slideValue, styles.tagWrapper]}>
            {detail.tags.map(tag => (
              <Text style={styles.tag} key={tag.id}>
                {tag.name}
              </Text>
            ))}
          </View>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </View>
      </View>
    </View>
  );
};

const ShopStoreDetail = props => {
  const {shopStoreId} = props.route.params;
  const [currentKey, setCurrentKey] = useState('post');
  const [detail, setDetail] = useState(null);
  const [joined, setJoined] = useState(false);
  // const [joinAccounts, setJoinAccounts] = useState([]);

  const loadData = async () => {
    const res = await getShopStoreDetail(shopStoreId);
    setJoined(res.data.shop_store.joined);
    setDetail(res.data.shop_store);
  };

  // const loadJoinAccounts = async () => {
  //   const res = await getShopStoreJoinAccounts(shopStoreId, {sort: 'publish_order'});
  //   const accounts = res.data.accounts.slice(0, 4);
  //   setJoinAccounts(accounts);
  // };

  // const handleJoin = async () => {
  //   if (joined) {
  //     await shopStoreExit(shopStoreId);
  //     Toast.showError('已取消收藏');
  //   } else {
  //     await shopStoreJoined(shopStoreId);
  //     Toast.showError('已收藏');
  //   }
  //   // loadJoinAccounts();
  //   setJoined(!joined);
  // };

  useEffect(() => {
    // loadJoinAccounts();
    loadData();
  }, []);

  console.log('detail', detail);

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
      <View style={{flex: 1, backgroundColor: 'pink'}}>
        <CollapsibleHeader
          headerHeight={HEADER_HEIGHT}
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
          // renderTopHeader={<StickTopHeader title={currentAccount.nickname} showLeftButton={true} />}
          renderHeader={<RenderHeader detail={detail} />}
        />
      </View>
    </View>
  ) : (
    <Loading />
  );
};

const positionCenter = {position: 'absolute', top: 0, left: 0, right: 0};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    position: 'relative',
  },
  bgCoverImage: {
    width: width,
    height: ImageHeight,
  },
  coverOpacity: {
    // ...positionCenter,
    // height: ImageHeight,
    // backgroundColor: '#000',
    // opacity: 0.4,
    // zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    marginLeft: 19,
    marginRight: 17,
    marginTop: -RFValue(75 / 2),
    zIndex: 3,
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
    marginTop: 3,
    paddingHorizontal: 14,
    zIndex: 2,
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
