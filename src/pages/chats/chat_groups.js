import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {RecommendSearch} from '@/components/NodeComponents';
import {dispatchCurrentAccount, dispatchBaseCurrentAccount} from '@/redux/actions';
import {getChatGroups, deleteChatGroup} from '@/api/chat_api';
import ScrollList from '@/components/ScrollList';
import BaseChatGroup from './base-chat-group';
import {useSelector} from 'react-redux';
import JPush from 'jpush-react-native';
import {IsIos} from '@/utils/navbar';

var BadgeAndroid = require('react-native-android-badge');

const ChatGroups = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [currentOpenId, setCurrentOpenId] = useState('');
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);
  const {currentBaseInfo} = useSelector(state => state.account);

  const renderItemMemo = useCallback(
    ({item, index}) => (
      <BaseChatGroup
        currentOpenId={currentOpenId}
        onOpen={onOpen}
        navigation={navigation}
        deleteChatgroup={deleteChatgroup}
        chat_group={item}
        key={item.uuid}
      />
    ),
    []
  );

  //TODO 更新
  const deleteChatgroup = (data = {}) => {
    console.log('real delete', data);
    deleteChatGroup({uuid: data.uuid});
  };

  const onOpen = openid => {
    setCurrentOpenId(openid);
  };

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
      JPush.setBadge({
        badge: currentBaseInfo.total_unread_messages_count,
        appBadge: currentBaseInfo.total_unread_messages_count,
      });
      if (!IsIos) {
        BadgeAndroid.setBadge(currentBaseInfo.total_unread_messages_count);
      }
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
