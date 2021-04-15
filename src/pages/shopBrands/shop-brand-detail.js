import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import {NAV_BAR_HEIGHT} from '@/utils/navbar';
import {BlurView, JoinAccounts, JoinButton, Avator} from '@/components/NodeComponents';
import SingleList from '@/components/List/single-list';
import TopicList from '@/components/List/topic-list';
import ArticleList from '@/components/List/article-list';
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

const {width} = Dimensions.get('window');
const HEADER_HEIGHT = Math.ceil((width * 485) / 750);

console.log(HEADER_HEIGHT);
const ShopBrandDetail = props => {
  const {shopBrandId} = props.route.params;
  const [currentKey, setCurrentKey] = useState('post');
  const [detail, setDetail] = useState(null);
  const [joinAccounts, setJoinAccounts] = useState([]);

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
    const ret = await getShopBrandJoinAccounts(shopBrandId, {sort: 'publish_order'});
    setJoinAccounts(ret.data.accounts.slice(0, 4));
    setDetail(res.data.shop_brand);
  };

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <View style={styles.wrapper}>
      <CollapsibleHeader
        tabBarHeitabBarHeightght={NAV_BAR_HEIGHT}
        headerHeight={HEADER_HEIGHT}
        currentKey={currentKey}
        onKeyChange={key => setCurrentKey(key)}
        separator={true}
        renderHeader={
          <RenderHeader detail={detail} joinAccounts={joinAccounts} loadData={loadData} />
        }
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
      />
    </View>
  ) : (
    <Loading />
  );
};

const RenderHeader = props => {
  const {detail, joinAccounts, loadData} = props;
  const [joined, setJoined] = useState(detail.joined);

  const handleJoin = async () => {
    joined ? await getShopBrandExit(detail.id) : await getShopBrandJoined(detail.id);
    Toast.showError(joined ? '已取消收藏' : '已收藏');
    setJoined(!joined);
    loadData();
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerOpacity} />
      {detail.medias.length > 0 && (
        <FastImg source={{uri: detail.medias[0].url}} style={styles.headerCover} />
      )}
      <View style={styles.headerInfo}>
        <FastImg source={{uri: detail.cover_url}} style={styles.coverImage} />
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
          <View style={styles.headerAccount}>
            <IconFont name="question" size={16} color={'#fff'} />
            <Text style={styles.noAccount}>未认领</Text>
          </View>
        )}
      </View>
      <Text style={styles.intro}>
        简介：{detail.intro.length > 35 ? detail.intro.substr(0, 35) : detail.intro}
      </Text>
      <Pressable style={styles.accountsWrapper}>
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
    </View>
  );
};

const positon = {width: width, height: HEADER_HEIGHT, position: 'absolute'};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: HEADER_HEIGHT,
    position: 'relative',
    paddingHorizontal: 14,
    paddingTop: RFValue(25),
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
    marginTop: RFValue(21),
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
