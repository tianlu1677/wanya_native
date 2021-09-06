import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import Loading from '@/components/Loading';
import {BarHeight, SCREEN_WIDTH} from '@/utils/navbar';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import Toast from '@/components/Toast';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {JoinAccounts, TopBack, BottomModal} from '@/components/NodeComponents';
import {
  getMovementDetail,
  getMovementJoinAccounts,
  getMovementJoined,
  getMovementExit,
  getPosts,
} from '@/api/movement_api';
import SingleList from '@/components/List/single-list';

const COVER_HEIGHT = Math.ceil((SCREEN_WIDTH * 264) / 750);

const MovementDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {savetopic} = useSelector(state => state.home);
  const {movementId} = route.params;
  const [headerHeight, setHeaderHeight] = useState(300);
  const [detail, setDetail] = useState(null);
  const [joinAccounts, setJoinAccounts] = useState([]);
  const [currentKey, setCurrentKey] = useState('theory');
  const [showModal, setShowModal] = useState(false);

  const publishTheory = () => {
    navigation.navigate('NewTheory', {movementId});
  };

  const publishLesson = () => {
    const value = {...savetopic, movement_ids: [detail], tag_list: ['教学']};
    dispatch({type: action.SAVE_NEW_TOPIC, value});
    navigation.navigate('NewTopic');
  };

  const publishPractice = () => {
    const value = {...savetopic, movement_ids: [detail], tag_list: ['练习']};
    dispatch({type: action.SAVE_NEW_TOPIC, value});
    navigation.navigate('NewTopic');
  };

  const TheoryListPage = () => {
    const query = `q[item_type_eq]=Theory&q[item_of_Theory_type_movements_id_eq]=${movementId}`;
    return <SingleList request={{api: getPosts, params: {}, apiPath: query}} />;
  };

  const LessonListPage = () => {
    const query = `q[item_type_eq]=Topic&q[item_of_Topic_type_movements_id_eq]=${movementId}&q[item_of_Topic_type_tags_name_eq]=教学`;
    return <SingleList request={{api: getPosts, params: {}, apiPath: query}} />;
  };

  const PracticeListPage = () => {
    const query = `q[item_type_eq]=Topic&q[item_of_Topic_type_movements_id_eq]=${movementId}&q[item_of_Topic_type_tags_name_eq]=练习`;
    return <SingleList request={{api: getPosts, params: {}, apiPath: query}} />;
  };

  const goJoinAccounts = () => {
    const params = {from: 'detail', sort: 'publish_order'};
    navigation.navigate('JoinAccountsList', {
      title: detail.name,
      request: {api: getMovementJoinAccounts, params: {id: movementId, params}},
    });
  };

  const handleJoined = async () => {
    detail.joined ? await getMovementExit(movementId) : await getMovementJoined(movementId);
    Toast.showError(detail.joined ? '已取消Get' : '已Get');
    loadData();
  };

  const loadData = async () => {
    const res = await getMovementDetail(movementId);
    const params = {from: 'detail', sort: 'publish_order'};
    const ret = await getMovementJoinAccounts({id: movementId, ...params});
    setJoinAccounts(ret.data.accounts.slice(0, 4));
    setDetail(res.data.movement);
  };

  useEffect(() => {
    loadData();
  }, []);

  const Header = () => {
    return (
      <View onLayout={e => setHeaderHeight(Math.ceil(e.nativeEvent.layout.height))}>
        <TopBack top={BarHeight + RFValue(10)} />
        <View style={styles.header}>
          <View style={styles.coverImageOpacity} />
          <FastImg source={{uri: detail.cover_url}} mode="cover" style={styles.coverImage} />
          <View style={styles.contentHeader}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>{detail.category_name}</Text>
              <Pressable style={styles.btnWrap} onPress={handleJoined}>
                <IconFont
                  size={12}
                  name={detail.joined ? 'chose-success' : 'plus'}
                  color={detail.joined ? '#BDBDBD' : '#2C2C2C'}
                />
                <Text style={[styles.btnText, {color: detail.joined ? '#BDBDBD' : '#2C2C2C'}]}>
                  {detail.joined ? '已Get' : 'Get'}
                </Text>
              </Pressable>
            </View>
            <Text style={styles.level}>
              {detail.category_name} / {detail.level_text}
            </Text>
            <Pressable onPress={goJoinAccounts} style={styles.accountInfoWrap}>
              <JoinAccounts accounts={joinAccounts} size={25} />
              <Text style={styles.count}>
                {detail.join_accounts_count
                  ? `${detail.join_accounts_count}个板友已get`
                  : '还没有板友get'}
              </Text>
            </Pressable>

            {detail.intro ? (
              <Text style={styles.intro} numberOfLines={3} onPress={() => setShowModal(true)}>
                {detail.intro.toString().replace(/(\r\n|\n|\r)/gm, '')}
                发布顽法
              </Text>
            ) : null}

            <View style={styles.createWrap}>
              <Text style={[styles.createbtn, styles.primarybtn]} onPress={publishTheory}>
                发布顽法
              </Text>
              <Text style={[styles.createbtn, styles.normalbtn]} onPress={publishLesson}>
                发布教学
              </Text>
              <Text style={[styles.createbtn, styles.normalbtn]} onPress={publishPractice}>
                发布练习
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return detail ? (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <CollapsibleHeader
        tabBarHeitabBarHeightght={BarHeight}
        headerHeight={headerHeight}
        currentKey={currentKey}
        align="left"
        onKeyChange={key => setCurrentKey(key)}
        renderHeader={<Header />}
        separator={true}
        tabData={[
          {
            key: 'theory',
            title: '顽法',
            component: TheoryListPage,
          },
          {
            key: 'lesson',
            title: '教学',
            component: LessonListPage,
          },
          {
            key: 'practice',
            title: '练习',
            component: PracticeListPage,
          },
        ]}
      />
      <BottomModal
        visible={showModal}
        cancleClick={() => setShowModal(false)}
        title={'简介'}
        content={`简介：${detail.intro}`}
      />
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  coverImage: {
    height: COVER_HEIGHT,
    width: SCREEN_WIDTH,
  },
  coverImageOpacity: {
    height: COVER_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#000',
    opacity: 0.3,
  },
  contentHeader: {
    paddingHorizontal: VWValue(18),
    paddingTop: 20,
    marginTop: -10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fff',
    zIndex: 2,
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
  },
  btnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    marginLeft: 7,
    fontSize: 14,
  },
  level: {
    fontSize: 10,
    color: '#3D3D3D',
    marginTop: 5,
  },
  name: {
    fontSize: 18,
    color: '#fff',
    marginTop: RFValue(10),
  },

  accountInfoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  count: {
    color: '#3D3D3D',
    fontSize: 11,
    marginLeft: 7,
  },
  intro: {
    fontSize: 13,
    color: '#3D3D3D',
    lineHeight: 20,
    textAlign: 'justify',
    marginTop: RFValue(10),
    marginRight: 70,
  },
  createWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  createbtn: {
    width: VWValue(104),
    height: Math.ceil((VWValue(104) * 35) / 104),
    lineHeight: Math.ceil((VWValue(104) * 35) / 104),
    textAlign: 'center',
    borderRadius: VWValue(17),
    overflow: 'hidden',
    fontWeight: '500',
    marginTop: 15,
  },
  primarybtn: {
    color: '#fff',
    backgroundColor: '#000',
  },
  normalbtn: {
    color: '#3D3D3D',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BDBDBD',
  },
});

export default MovementDetail;
