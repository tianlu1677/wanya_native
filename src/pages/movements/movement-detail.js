import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import Loading from '@/components/Loading';
import {BarHeight, SCREEN_WIDTH} from '@/utils/navbar';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import Toast from '@/components/Toast';
import {RFValue} from '@/utils/response-fontsize';
import {
  JoinButton,
  JoinAccounts,
  BlurView,
  TopBack,
  BottomModal,
} from '@/components/NodeComponents';
import {
  getMovementDetail,
  getMovementJoinAccounts,
  getMovementJoined,
  getMovementExit,
} from '@/api/movement_api';

const HEADER_HEIGHT = Math.ceil((SCREEN_WIDTH * 440) / 750);

const MovementDetail = ({navigation, route}) => {
  const {movementId} = route.params;
  const [detail, setDetail] = useState(null);
  const [joined, setJoined] = useState(false);
  const [joinAccounts, setJoinAccounts] = useState([]);
  const [currentKey, setCurrentKey] = useState('topic');
  const [showModal, setShowModal] = useState(false);

  const goJoinAccounts = () => {
    navigation.navigate('JoinAccountsList');
  };

  const handleJoined = async () => {
    joined ? await getMovementExit(movementId) : await getMovementJoined(movementId);
    Toast.showError(joined ? '已取消Get' : '已Get');
    setJoined(!joined);
    loadJoinAccounts();
  };

  const loadJoinAccounts = async () => {
    const params = {from: 'detail', sort: 'publish_order'};
    const res = await getMovementJoinAccounts(1, params);
    const accounts = res.data.accounts.slice(0, 4);
    setJoinAccounts(accounts);
  };

  const loadData = async () => {
    const res = await getMovementDetail(movementId);
    setJoined(res.data.movement.joined);
    setDetail(res.data.movement);
  };

  useEffect(() => {
    loadJoinAccounts();
    loadData();
  }, []);

  const Header = () => {
    return (
      <>
        <View style={{height: BarHeight, backgroundColor: '#000'}} />
        <TopBack top={BarHeight + RFValue(10)} />
        <View style={styles.header}>
          <Text style={styles.title}>
            {detail.category_subset_name} / {detail.level_text}
          </Text>
          <Text style={styles.name}>{detail.name}</Text>
          <Text style={styles.intro} numberOfLines={2} onPress={() => setShowModal(true)}>
            {`${detail.nickname || detail.name}。`}
            {detail.intro ? `简介：${detail.intro}` : ''}
          </Text>
          <Pressable onPress={goJoinAccounts} style={styles.accountInfoWrap}>
            <BlurView
              style={styles.accountInfo}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white">
              <JoinAccounts accounts={joinAccounts} size={25} />
              <Text style={styles.count}>
                {detail.join_accounts_count
                  ? `${detail.join_accounts_count}个板友已get`
                  : '还没有板友get'}
              </Text>
              <JoinButton join={joined} text={joined ? '已Get' : 'Get'} onPress={handleJoined} />
            </BlurView>
          </Pressable>
        </View>
        <BottomModal
          visible={showModal}
          cancleClick={() => setShowModal(false)}
          title={'简介'}
          content={`简介：${detail.intro}`}
        />
      </>
    );
  };

  return detail ? (
    <View style={styles.wrapper}>
      <CollapsibleHeader
        tabBarHeitabBarHeightght={BarHeight}
        headerHeight={HEADER_HEIGHT + BarHeight}
        currentKey={currentKey}
        onKeyChange={key => setCurrentKey(key)}
        renderHeader={<Header />}
        separator={true}
        tabData={[]}
      />
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'pink',
  },
  header: {
    height: HEADER_HEIGHT,
    position: 'relative',
    paddingHorizontal: 14,
    paddingTop: RFValue(33),
    backgroundColor: '#61D3F0',
  },
  title: {
    fontSize: 11,
    color: '#fff',
  },
  name: {
    fontSize: 18,
    color: '#fff',
    marginTop: RFValue(10),
  },
  intro: {
    fontSize: 13,
    lineHeight: 20,
    color: '#fff',
    marginTop: RFValue(10),
  },
  accountInfoWrap: {
    position: 'absolute',
    bottom: RFValue(22),
    left: 14,
    right: 14,
  },
  accountInfo: {
    height: RFValue(45),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 2,
    overflow: 'hidden',
  },
  count: {
    color: '#000',
    marginRight: 'auto',
    marginLeft: 7,
    fontSize: 11,
  },
});

export default MovementDetail;
