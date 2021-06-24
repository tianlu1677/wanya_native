import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {RecommendSearch} from '@/components/NodeComponents';
import {dispatchCurrentAccount, dispatchBaseCurrentAccount} from '@/redux/actions';
import {getChatGroups} from '@/api/chat_api';
import ScrollList from '@/components/ScrollList';
import BaseChatGroup from './base-chat-group';
import {useSelector} from 'react-redux';
import JPush from 'jpush-react-native';

const ChatGroups = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);
  const {currentBaseInfo} = useSelector(state => state.account);

  const renderItemMemo = useCallback(
    ({item, index}) => <BaseChatGroup navigation={navigation} chat_group={item} key={item.uuid} />,
    []
  );

  const loadData = async (page = 1) => {
    // setLoading(true);
    const res = await getChatGroups({page: page});
    setHeaders(res.headers);
    setListData(page === 1 ? res.data.chat_groups : [...listData, ...res.data.chat_groups]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
      dispatch(dispatchCurrentAccount());
      dispatch(dispatchBaseCurrentAccount());
      JPush.setBadge({badge: currentBaseInfo.new_message_count + currentBaseInfo.unread_chat_messages_count, appBadge: currentBaseInfo.new_message_count + currentBaseInfo.unread_chat_messages_count});
    }, [])
  );

  return (
    <View style={styles.wrapper}>
      <RecommendSearch />
      <ScrollList
        keyExtractor={useCallback(item => `${item.uuid}`, [])}
        data={listData}
        loading={loading}
        onRefresh={loadData}
        headers={headers}
        renderItem={renderItemMemo}
        renderSeparator={() => <View style={styles.speator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  speator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: 45 + 12,
  },
});

export default ChatGroups;
