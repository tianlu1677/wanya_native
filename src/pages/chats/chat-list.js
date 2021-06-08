import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import ScrollList from '@/components/ScrollList';
import {BadgeMessage, Avator, RecommendSearch} from '@/components/NodeComponents';

import {getChatGroups, getChatGroupsDetail} from '@/api/chat_api';
<<<<<<< HEAD
import {
  CommentNoticeImg,
  FollowNoticeImg,
  PraiseNoticeImg,
  SystemNoticeImg,
  MineMentionNoticeUserImg,
} from '@/utils/default-image';
=======
import {RFValue} from '@/utils/response-fontsize';
>>>>>>> 7bada54... add-photo

const ChatList = props => {
  const {navigation} = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const handleDetail = async item => {
    const params = {uuid: item.uuid};
    const res = await getChatGroupsDetail(params);
    navigation.push('ChatDetail', {uuid: item.uuid});
  };

  const RenderItem = React.memo(({item}) => {
    return useMemo(() => {
      console.log(item);
      return (
        <Pressable onPress={() => handleDetail(item)} style={styles.slideWrap}>
          <View style={{position: 'relative'}}>
            <Avator size={RFValue(50)} account={item.receiver} />
            <BadgeMessage size={'tab'} value={10} containerStyle={[styles.badge, {right: -10}]} />
          </View>
          <View style={styles.slideInfo}>
            <Text style={styles.nickname}>{item.receiver.nickname}</Text>
            <Text style={styles.message}>{item.last_conversation?.content || ''}</Text>
          </View>
        </Pressable>
      );
    }, [item.uuid]);
  });

  const RenderItemMemo = useCallback(itemProps => <RenderItem {...itemProps} />, [listData]);

  const loadData = async (page = 1) => {
    setLoading(true);
    const res = await getChatGroups();
    setHeaders(res.headers);
    setListData(page === 1 ? res.data.chat_groups : [...listData, ...res.data.chat_groups]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollList
      keyExtractor={useCallback(item => `${item.uuid}`, [])}
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={RenderItemMemo}
      enableRefresh={false}
      ListHeaderComponent={<RecommendSearch />}
      renderSeparator={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  slideWrap: {
    paddingVertical: RFValue(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slideInfo: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  nickname: {
    fontSize: 16,
  },
  message: {
    fontSize: 13,
    color: '#bdbdbd',
    marginTop: RFValue(5),
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginLeft: RFValue(50) + 12,
  },
  badge: {
    position: 'absolute',
    top: -7,
    zIndex: 1,
  },
});

export default ChatList;
