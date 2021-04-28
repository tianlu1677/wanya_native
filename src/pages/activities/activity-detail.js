import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView, Platform, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchPreviewImage} from '@/redux/actions';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import MapLinking from '@/components/MapLink';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import * as WeChat from 'react-native-wechat-lib';
import {SCREEN_WIDTH} from '@/utils/navbar';
import {scaleFixedWidth} from '@/utils/scale';
import ActionSheet from '@/components/ActionSheet.android';
import {Avator, JoinAccounts, BottomModal} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import {
  getActivityDetail,
  joinAccountsActivity,
  joinActivity,
  exitActivity,
} from '@/api/activity_api';
import wxIcon from '@/assets/images/wx-icon.png';

const ActivityDetail = props => {
  const dispatch = useDispatch();
  const {route, navigation} = props;
  const activityId = route.params.activityId;
  const {currentAccount} = useSelector(state => state.account);
  const [detail, setDetail] = useState(null);
  const [joinAccounts, setJoinAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const loadData = async () => {
    const res = await getActivityDetail(activityId);
    setDetail(res.data.activity);
  };

  const loadJoinAccounts = async () => {
    const res = await joinAccountsActivity(activityId);
    const accounts = res.data.activity_enrollments.slice(0, 4).map(v => v.account);
    setJoinAccounts(accounts);
  };

  const handelJoin = async e => {
    await joinActivity(activityId);
    Toast.showError('报名成功');
    loadJoinAccounts();
    loadData();
  };

  // 分享微信
  const onShareActivity = () => {
    WeChat.shareMiniProgram({
      title: detail.name,
      userName: 'gh_c2b50fe8e928',
      thumbImageUrl: detail.cover_url,
      webpageUrl: 'https://vanyah.cn',
      path: '/packageactivity/pages/activity-detail?activity_id=' + activityId,
      scene: 0,
    });
  }

  const handelExit = async () => {
    await exitActivity(activityId);
    Toast.showError('已取消报名');
    loadJoinAccounts();
    loadData();
  };

  const goOutsideDetail = () => {
    navigation.navigate('WebView', {sourceUrl: detail.out_link_url, title: '活动详情'});
  };

  const onReviewImage = () => {
    const data = {index: 0, visible: true, images: [{url: detail.cover_url}]};
    dispatch(dispatchPreviewImage(data));
  };

  const onIntroImagePreview = index => {
    const data = {index, visible: true, images: detail.medias};
    dispatch(dispatchPreviewImage(data));
  };

  const overTime = () => {
    const finish = new Date(detail.finish_at).getTime();
    const date = new Date().getTime();
    return date > finish ? true : false;
  };

  const goAddress = () => {
    // 起点坐标信息
    const startLocation = {lng: 106.534892, lat: 29.551891, title: '我的位置'};
    const destLocation = {
      lat: detail.space.latitude,
      lng: detail.space.longitude,
      title: detail.space.name,
    };
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

  useEffect(() => {
    loadJoinAccounts();
    loadData();
  }, []);

  const isSelf = detail?.account_id === currentAccount.id;

  return detail ? (
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <Pressable onPress={onReviewImage}>
          <FastImg source={{uri: detail.cover.url}} style={scaleFixedWidth(detail.cover)} />
        </Pressable>
        <View style={styles.infoWrapper}>
          <Text style={styles.name} numberOfLines={2}>
            {detail.name}
          </Text>
          <View style={styles.accountWrapper}>
            <Avator account={detail.account} size={25} />
            <Text style={styles.nickname}>{detail.account.nickname} · 已发布</Text>
          </View>
          <View style={styles.btnWrapper}>
            {/* 过不过期都可以编辑 */}
            {isSelf ? (
              <Text style={[styles.commenBtn, styles.detailBtn]}>编辑活动</Text>
            ) : overTime() ? (
              <Text style={[styles.commenBtn, styles.overBtn]}>活动已结束</Text>
            ) : detail.source_type === 'inside' ? (
              detail.joined ? (
                <Pressable style={[styles.commenBtn, styles.joinedBtn]} onPress={handelExit}>
                  <Text style={styles.joinedBtn}>已报名参加</Text>
                </Pressable>
              ) : (
                <Pressable style={[styles.commenBtn, styles.detailBtn]} onPress={handelJoin}>
                  <Text style={styles.detailBtn}>报名参加</Text>
                </Pressable>
              )
            ) : (
              <Pressable style={[styles.commenBtn, styles.detailBtn]} onPress={goOutsideDetail}>
                <Text style={styles.detailBtn}>查看详情</Text>
              </Pressable>
            )}
            <Pressable style={[styles.commenBtn, styles.wxShareBtn, {marginLeft: 5}]} onPress={onShareActivity}>
              <FastImg source={wxIcon} style={{width: RFValue(25), height: RFValue(25)}} />
              <Text style={{color: '#fff', fontWeight: '500'}}>分享好友</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.slideWrapper}>
        {/* 活动场地 */}
        {detail.activity_way === 'on_space' && (
          <Pressable style={styles.slide} onPress={goAddress}>
            <IconFont name="space-point" size={RFValue(15)} color="#000" />
            <Text style={styles.slideTitle}>活动场地</Text>
            <Text style={styles.slideValue}>{detail.space.name}</Text>
            <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
          </Pressable>
        )}
        {/* 活动时间 */}
        <View style={styles.slide}>
          <IconFont name="calendar" size={RFValue(16)} color="#000" />
          <Text style={styles.slideTitle}>活动时间</Text>
          <Text style={styles.slideValue}>
            {detail.start_at_text} - {detail.finish_at_text}
          </Text>
        </View>
        {/* 活动人数 */}
        {detail.max_limit_people > 0 && (
          <View style={styles.slide}>
            <IconFont name="people" size={RFValue(16)} color="#000" />
            <Text style={styles.slideTitle}>活动人数</Text>
            <Text style={styles.slideValue}>{detail.max_limit_people}人</Text>
          </View>
        )}
        {/* 报名参加 */}
        <View style={styles.slide}>
          <IconFont name="join" size={RFValue(16)} color="#000" />
          <Text style={styles.slideTitle}>报名参加</Text>
          <View style={[styles.slideValue, styles.accountsWrapper]}>
            <JoinAccounts accounts={joinAccounts} size={25} />
            <Text style={{marginLeft: 5}}>{`共${detail.join_accounts_count}人`}</Text>
          </View>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </View>
        {/* 活动标签 */}
        <Pressable style={styles.slide} onPress={() => setShowModal(true)}>
          <IconFont name="biaoqian" size={RFValue(16)} color="#000" />
          <Text style={styles.slideTitle}>活动标签</Text>
          <View style={[styles.slideValue, styles.tagWrapper]}>
            {detail.tag_list.length > 0 &&
              detail.tag_list.slice(0, 4).map((tag, index) => (
                <Text style={styles.tag} key={index}>
                  {tag}
                </Text>
              ))}
          </View>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </Pressable>
      </View>
      <Text style={styles.intro}>活动简介</Text>
      <View style={styles.speator} />
      <Text style={styles.introContent}>{detail.intro}</Text>
      <View style={styles.imageWrapper}>
        {detail.medias.map((media, index) => (
          <Pressable
            onPress={() => onIntroImagePreview(index)}
            style={{marginTop: 10}}
            key={media.id}>
            <FastImg source={{uri: media.url}} style={scaleFixedWidth(media, SCREEN_WIDTH - 28)} />
          </Pressable>
        ))}
      </View>

      {/* 活动标签 */}
      {detail.tag_list.length > 0 && (
        <BottomModal
          visible={showModal}
          cancleClick={() => setShowModal(false)}
          title={'活动标签'}
          content={
            <View style={styles.tagWrapper}>
              {detail.tag_list.map((tag, index) => (
                <Text style={styles.tag} key={index}>
                  {tag}
                </Text>
              ))}
            </View>
          }
        />
      )}

      {/* 地图 */}
      <ActionSheet
        actionItems={itemList}
        showActionSheet={showActionSheet}
        changeModal={() => {
          setShowActionSheet(false);
        }}
      />
    </ScrollView>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 14,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 14,
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '500',
  },
  accountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  nickname: {
    fontSize: 11,
    color: '#3D3D3D',
    marginLeft: 7,
  },
  btnWrapper: {
    flexDirection: 'row',
    marginTop: 17,
  },
  commenBtn: {
    flex: 1,
    height: RFValue(40),
    lineHeight: RFValue(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '500',
    borderRadius: 4,
  },
  detailBtn: {
    backgroundColor: '#000',
    color: '#fff',
  },
  overBtn: {
    backgroundColor: '#F8F8F8',
    color: '#BDBDBD',
  },
  joinedBtn: {
    color: '#FF8D00',
    backgroundColor: '#F8F8F8',
  },
  wxShareBtn: {
    backgroundColor: '#48CD47',
  },
  slideWrapper: {
    paddingTop: RFValue(13),
    paddingHorizontal: 14,
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
  accountsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tagWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tag: {
    height: RFValue(20),
    lineHeight: RFValue(20) - 2,
    paddingHorizontal: 8,
    fontSize: 10,
    color: '#FF8D00',
    borderWidth: 1,
    borderColor: '#FF8D00',
    borderRadius: 2,
    marginRight: 7,
  },
  intro: {
    height: RFValue(45),
    lineHeight: RFValue(45),
    fontWeight: '500',
    paddingLeft: 14,
  },
  speator: {
    height: 9,
    backgroundColor: '#fafafa',
  },
  introContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    lineHeight: RFValue(22),
  },
  imageWrapper: {
    paddingHorizontal: 14,
    flexDirection: 'column',
  },
});

export default ActivityDetail;
