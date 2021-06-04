import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {syncAccountInfo} from '@/api/mine_api';
import {BadgeMessage, Avator, RecommendSearch} from '@/components/NodeComponents';
import {dispatchCurrentAccount, dispatchBaseCurrentAccount} from '@/redux/actions';
import {getChatGroups} from '@/api/chat_api';
// import BaseTopic from "@/components/Item/base-topic"
import ScrollList from '@/components/ScrollList';
import BaseChatGroup from './base-chat-group';

const ChatGroups = ({navigation}) => {
  const dispatch = useDispatch();
  const {currentAccount} = useSelector(state => state.account);
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const renderItem = ({item, index}) => {
    return <BaseChatGroup navigation={navigation} chat_group={item} key={item.uuid} />
  };

  const loadData = async () => {
    const res = await getChatGroups();
    // console.log(res.data.chat_groups);
    setListData(res.data.chat_groups);
    setHeaders(res.headers);
    // console.log('listData', listData)
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(dispatchCurrentAccount());
      dispatch(dispatchBaseCurrentAccount());
    }, [])
  );

  return (
    <View>
      <ScrollList
        data={listData}
        loading={loading}
        onRefresh={loadData}
        headers={headers}
        renderItem={renderItem}
        renderSeparator={() => <View style={styles.speator} />}
        style={styles.wrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -7,
    top: -3,
  },
  wrapper: {
    backgroundColor: '#fff',
    paddingLeft: 14,
  },
  itemView: {
    flexDirection: 'row',
    paddingVertical: 17,
  },
  coverWrapView: {
    marginRight: 12,
  },
  notifyContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notifyContentTitle: {
    height: 20,
    lineHeight: 20,
    fontSize: 15,
    letterSpacing: 1,
    fontWeight: '400',
  },
  notifyContentDesc: {
    marginTop: 6,
    color: '#BDBDBD',
    letterSpacing: 1,
    fontWeight: '400',
    fontSize: 13,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '300',
    color: '#bdbdbd'
  },
  speator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 45 + 12,
  },
});

export default ChatGroups;
