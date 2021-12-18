import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import SingleList from '@/components/List/single-list';
import {
  PlayScore,
  RateScore,
  Avator,
  JoinAccounts,
  JoinButton,
  BottomModal,
} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';

import {
  getSpaceDetail,
  getSpacesJoinAccounts,
  getSpacesJoin,
  getSpacesExit,
  getSpacePosts,
} from '@/api/space_api';

import {SCREEN_WIDTH} from '@/utils/navbar';
import {ScrollView} from 'react-native-gesture-handler';

const SpaceDetail = ({navigation, route}) => {
  const {spaceId} = route.params;
  const [detail, setDetail] = useState(null);
  const [joinAccounts, setJoinAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loadAccounts = async () => {
    const res = await getSpacesJoinAccounts(spaceId);
    setJoinAccounts(res.data.accounts);
  };

  const loadData = async () => {
    loadAccounts();
    const res = await getSpaceDetail(spaceId);
    setDetail(res.data.space);
  };

  const handleFollowClick = async () => {
    detail.joined ? await getSpacesExit(spaceId) : await getSpacesJoin(spaceId);
    loadData();
    loadAccounts();
  };

  console.log(detail);

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.topContent}>
          <View style={styles.image}>
            <FastImg source={{uri: detail.cover_url}} style={styles.coverImage} />
            <View style={styles.scoreOpacity}>
              <PlayScore
                score={detail.play_score}
                imageStyle={{width: 12, height: 13}}
                text="顽力"
              />
            </View>
          </View>
          <Text style={styles.name}>{detail.name}</Text>
          <View style={styles.info}>
            <RateScore score={2.5} size={14} />
            <Text style={styles.infoCount}>{detail.publish_rate_topics_count}条评价</Text>
            <Text style={styles.infoCount}>{detail.publish_topics_count}条动态</Text>
          </View>
          <View style={styles.info}>
            <Avator account={detail.account} size={20} />
            <Text style={styles.accountText}>{detail.account.nickname} 创建</Text>
          </View>
          {detail.tag_list.length > 0 ? (
            <View style={[styles.info, styles.tagsInfo]}>
              {detail.tag_list.map((tag, index) => (
                <Text style={styles.tag} key={index}>
                  {tag}
                </Text>
              ))}
            </View>
          ) : null}
          <View style={[styles.info, styles.addressInfo]}>
            <Text style={styles.addressText}>{detail.address}</Text>
            <View style={styles.addressRight}>
              <View style={styles.addressIconWrap}>
                <IconFont name="ditu" size={16} />
                <Text style={styles.addressIconText}>地图</Text>
              </View>
              <View style={styles.addressIconWrap}>
                <IconFont name="dianhua" size={16} />
                <Text style={styles.addressIconText}>电话</Text>
              </View>
            </View>
          </View>
          <View style={[styles.info, styles.joinAccountsInfo]}>
            {joinAccounts.length > 0 ? (
              <JoinAccounts
                accounts={joinAccounts.slice(0, 4)}
                size={RFValue(25)}
                style={{marginRight: 4}}
              />
            ) : null}
            <Text style={styles.accountText}>
              {joinAccounts.length > 0 ? `${joinAccounts.length}个顽友已收藏` : '还没有顽友收藏'}
            </Text>
            <JoinButton
              join={detail.joined}
              text={detail.joined ? '已收藏' : '收藏'}
              borderRadius={13}
              onPress={handleFollowClick}
              joinedStyle={{color: '#BDBDBD', backgroundColor: '#fff'}}
              joineStyle={{color: '#000000', backgroundColor: '#fff'}}
            />
          </View>
        </View>

        <View style={[styles.intro]}>
          <View style={styles.introTitleInfo}>
            <Text style={styles.introTitle}>简介</Text>
            <Text style={styles.introTips}>查看全部</Text>
          </View>
          <View style={styles.introImageInfo}>
            {detail.medias.map((item, index) => {
              return (
                <View style={styles.introImageWrapper} key={index}>
                  <FastImg source={{uri: detail.cover_url}} style={styles.introImage} />
                  {index === detail.medias.length - 1 ? (
                    <Text style={styles.introImageOpacity}>{detail.medias.length}张图片</Text>
                  ) : null}
                </View>
              );
            })}
            <Text style={styles.introText} numberOfLines={2} onPress={() => setShowModal(true)}>
              {detail.intro}
            </Text>
          </View>
        </View>
        <View style={[styles.intro]}>
          <View style={styles.introTitleInfo}>
            <Text style={styles.introTitle}>评价</Text>
            <Text style={styles.introTips}>查看全部</Text>
          </View>
          <View style={styles.listWrapper}>
            <SingleList
              request={{api: getSpacePosts, params: {id: spaceId, type: 'published_order'}}}
            />
          </View>
        </View>
      </ScrollView>

      <BottomModal
        visible={showModal}
        cancleClick={() => setShowModal(false)}
        title={detail.name}
        content={detail.intro}
      />

      <View style={[styles.btnWrap]}>
        <View style={[styles.btn, styles.punchBtn]}>
          <IconFont name="takephoto" size={22} color="white" />
          <Text style={styles.btnText}>去打卡</Text>
        </View>
        <View style={[styles.btn, styles.commentBtn]}>
          <IconFont name="ditu" size={22} color="white" />
          <Text style={styles.btnText}>写评价</Text>
        </View>
      </View>
    </View>
  ) : (
    <Loading />
  );
};

const opacity = {
  paddingVertical: 5,
  paddingHorizontal: 10,
  position: 'absolute',
  bottom: 14,
  right: 14,
  borderRadius: 15,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  overflow: 'hidden',
  color: '#fff',
  fontSize: 11,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  topContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingBottom: 15,
  },
  coverImage: {
    width: SCREEN_WIDTH - 28,
    height: ((SCREEN_WIDTH - 28) * 390) / 690,
  },
  scoreOpacity: {
    ...opacity,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 14,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(10),
  },
  infoCount: {
    marginLeft: 9,
    fontSize: 13,
  },
  accountText: {
    fontSize: 12,
    marginLeft: 5,
    marginRight: 'auto',
  },
  tagsInfo: {
    marginBottom: -10,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontSize: 10,
    color: '#FF6633',
    backgroundColor: '#FFF2E7',
    borderRadius: 3,
    marginRight: 7,
    marginBottom: 7,
  },
  addressInfo: {
    justifyContent: 'space-between',
  },
  addressText: {
    fontSize: 13,
  },
  addressRight: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  addressIconWrap: {
    alignItems: 'center',
    marginLeft: 30,
  },
  addressIconText: {
    color: '#8B8B8B',
    fontSize: 10,
    marginTop: 3,
  },
  joinAccountsInfo: {
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#bdbdbd',
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    elevation: 10,
    zIndex: -1,
  },
  intro: {
    marginTop: 15,
    marginHorizontal: 14,
    paddingVertical: 15,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  introTitleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  introTips: {
    color: '#AAAAAA',
    fontSize: 12,
  },
  introImageInfo: {
    marginTop: 16,
  },
  introImageWrapper: {
    position: 'relative',
  },
  introImage: {
    width: 108,
    height: 108,
    marginRight: 3,
  },
  introImageOpacity: {
    ...opacity,
    left: 16,
    top: 42,
    width: 75,
    height: 23,
    borderRadius: 13,
  },
  introText: {
    lineHeight: RFValue(14),
    marginTop: RFValue(12),
  },
  listWrapper: {
    marginHorizontal: -14,
    marginBottom: RFValue(40) + 20,
  },
  btnWrap: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ebebeb',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  btn: {
    width: (SCREEN_WIDTH - 70) / 2,
    height: RFValue(40),
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 13,
  },
  punchBtn: {
    backgroundColor: '#000',
  },
  commentBtn: {
    backgroundColor: '#FF2242',
    marginLeft: 20,
  },
});

export default SpaceDetail;
