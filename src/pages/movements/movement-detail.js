import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, Dimensions} from 'react-native';
import Loading from '@/components/Loading';
import {JoinButton, JoinAccounts, BlurView} from '@/components/NodeComponents';
import SingleList from '@/components/List/single-list';
import TopicList from '@/components/List/topic-list';
import CollapsibleHeader from '@/components/CollapsibleHeaders';
import Toast from '@/components/Toast';
import {RFValue} from '@/utils/response-fontsize';
import {
  getMovementDetail,
  getMovementJoinAccounts,
  getMovementJoined,
  getMovementExit,
  getMovementsPosts,
} from '@/api/movement_api';

const {width} = Dimensions.get('window');
const Height = parseInt((width * 420) / 750);

const MovementDetail = ({navigation, route}) => {
  const {movementId} = route.params;
  const [detail, setDetail] = useState(null);
  const [joined, setJoined] = useState(false);
  const [joinAccounts, setJoinAccounts] = useState([]);
  const [currentKey, setCurrentKey] = useState('topic');

  const goJoinAccounts = () => {
    navigation.navigate('JoinAccountsList');
  };

  const handleJoined = async () => {
    joined ? await getMovementExit(movementId) : await getMovementJoined(movementId);
    Toast.showError(joined ? '已取消收藏' : '已收藏');
    setJoined(!joined);
    loadJoinAccounts();
  };

  const PublishListPage = () => {
    const params = {id: movementId, type: 'published_order'};
    return <SingleList request={{api: getMovementsPosts, params}} />;
  };

  const loadJoinAccounts = async () => {
    const params = {from: 'detail', sort: 'publish_order'};
    const res = await getMovementJoinAccounts(1, params);
    const accounts = res.data.accounts.slice(0, 4);
    setJoinAccounts(accounts);
  };

  const loadData = async () => {
    const res = await getMovementDetail(movementId);
    setJoined(res.data.joined);
    setDetail(res.data.movement);
  };

  useEffect(() => {
    loadJoinAccounts();
    loadData();
  }, []);

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>
          {detail.category_subset_name} / {detail.level_text}
        </Text>
        <Text style={styles.name}>{detail.name}</Text>
        <Text style={styles.intro}>
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
    );
  };

  return detail ? (
    <View style={styles.wrapper}>
      <CollapsibleHeader
        headerHeight={Height}
        currentKey={currentKey}
        onKeyChange={key => setCurrentKey(key)}
        renderHeader={<Header />}
        separator={true}
        tabData={[
          {
            key: 'topic',
            title: '帖子',
            component: PublishListPage,
          },
          {
            key: 'lessons',
            title: '教程',
            component: PublishListPage,
          },
        ]}
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
  header: {
    height: Height,
    paddingHorizontal: 14,
    paddingTop: RFValue(20),
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
