import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {dispatchPreviewImage} from '@/redux/actions';
import Loading from '@/components/Loading';
import FastImg from '@/components/FastImg';
import Toast from '@/components/Toast';
import IconFont from '@/iconfont';
import {Avator, JoinAccounts} from '@/components/NodeComponents';
import {RFValue} from '@/utils/response-fontsize';
import {getActivityDetail, joinAccountsActivity, exitActivity} from '@/api/activity_api';
import wxIcon from '@/assets/images/wx-icon.png';

const ActivityDetail = props => {
  const dispatch = useDispatch();
  const {route, navigation} = props;
  const activityId = route.params.activityId;
  const {currentAccount} = useSelector(state => state.account);
  const [detail, setDetail] = useState(null);
  const [joinAccounts, setJoinAccounts] = useState([]);

  const loadData = async () => {
    const res = await getActivityDetail(activityId);
    setDetail({
      ...res.data.activity,
      // account_id: 310,
      joined: false,
      finish_at: '2021-10-31T20:34:00.000+08:00',
      max_limit_people: 10,
      // source_type: 'outside',
    });
    // setDetail(res.data.activity);
  };

  const loadJoinAccounts = async () => {
    const res = await joinAccountsActivity(activityId);
    const accounts = res.data.activity_enrollments.slice(0, 4).map(v => v.account);
    setJoinAccounts(accounts);
  };

  const getPhoneNumber = async e => {};

  const handelExit = async () => {
    await exitActivity(this.state.detail.id);
    Toast.showError('已取消报名');
    loadJoinAccounts();
    loadData();
  };

  const goOutsideDetail = () => {
    navigation.navigate('WebView', {sourceUrl: detail.out_link_url});
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

  const isSelf = detail?.account_id === currentAccount.id;

  useEffect(() => {
    loadJoinAccounts();
    loadData();
  }, []);

  console.log('detail', detail);

  return detail ? (
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <Pressable onPress={onReviewImage}>
          <FastImg source={{uri: detail.cover_url}} styles={styles.cover_url} />
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
                <Pressable style={[styles.commenBtn, styles.detailBtn]} onPress={getPhoneNumber}>
                  <Text style={styles.detailBtn}>报名参加</Text>
                </Pressable>
              )
            ) : (
              <Pressable style={[styles.commenBtn, styles.detailBtn]} onPress={goOutsideDetail}>
                <Text style={styles.detailBtn}>查看详情</Text>
              </Pressable>
            )}
            <View style={[styles.commenBtn, styles.wxShareBtn, {marginLeft: 5}]}>
              <FastImg source={wxIcon} style={{width: RFValue(25), height: RFValue(25)}} />
              <Text style={{color: '#fff', fontWeight: '500'}}>分享好友</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.slideWrapper}>
        {/* 活动场地 */}
        {detail.activity_way === 'on_space' && (
          <View style={styles.slide}>
            <IconFont name="space-point" size={RFValue(15)} color="#000" />
            <Text style={styles.slideTitle}>活动场地</Text>
            <Text style={styles.slideValue}>{detail.space.name}</Text>
            <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
          </View>
        )}
        {/* 活动时间 */}
        <View style={styles.slide}>
          <IconFont name="calendar" size={RFValue(16)} color="#000" />
          <Text style={styles.slideTitle}>活动时间</Text>
          <Text style={styles.slideValue}>
            {detail.start_at_text} - {detail.finish_at_text}
          </Text>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </View>
        {/* 活动人数 */}
        {detail.max_limit_people > 0 && (
          <View style={styles.slide}>
            <IconFont name="people" size={RFValue(16)} color="#000" />
            <Text style={styles.slideTitle}>活动人数</Text>
            <Text style={styles.slideValue}>{detail.max_limit_people}</Text>
          </View>
        )}
        {/* 报名参加 */}
        <View style={styles.slide}>
          <IconFont name="join" size={RFValue(16)} color="#000" />
          <Text style={styles.slideTitle}>报名参加</Text>
          <View style={[styles.slideValue, {flexDirection: 'row', alignItems: 'center'}]}>
            <JoinAccounts accounts={joinAccounts} size={25} />
            <Text style={{marginLeft: 5}}>{`共${detail.join_accounts_count}人`}</Text>
          </View>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </View>
        {/* 活动标签 */}
        <View style={styles.slide}>
          <IconFont name="biaoqian" size={RFValue(16)} color="#000" />
          <Text style={styles.slideTitle}>活动标签</Text>
          <View style={[styles.slideValue, styles.tagWrapper]}>
            {[...detail.tag_list, '你好吗', '奖品丰厚', '你好吗'].map((tag, index) => (
              <Text style={styles.tag} key={index}>
                {tag}
              </Text>
            ))}
          </View>
          <IconFont name="arrow-right" size={11} color="#c2cece" style={styles.slideRight} />
        </View>
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
            <FastImg source={{uri: media.url}} style={styles.introImage} />
          </Pressable>
        ))}
      </View>
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
  cover_url: {
    width: 104,
    height: 75,
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
  },
  slideValue: {
    marginLeft: 'auto',
    marginRight: 14,
    fontWeight: '400',
  },
  slideRight: {
    position: 'absolute',
    right: 0,
  },
  tagWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginLeft: 15,
    overflow: 'hidden',
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
  introImage: {
    width: '100%',
    height: 200,
  },
});

export default ActivityDetail;
