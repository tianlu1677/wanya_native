import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
import {followAccount, unfollowAccount} from '@/api/account_api';
import LocationBar from '@/components/LocationBar';

const PublishAccount = props => {
  const navigation = useNavigation();
  const {data, showFollow} = props;
  const [followed, setFollowed] = useState(data.account.followed);

  const goAccountDetail = () => {
    navigation.push('AccountDetail', {accountId: data.account.id});
  };

  const onFollow = async () => {
    followed ? await unfollowAccount(data.account_id) : await followAccount(data.account_id);
    setFollowed(!followed);
  };

  return (
    <View style={styles.headerView}>
      <Avator account={data.account} size={40} />
      <Pressable style={styles.content} onPress={goAccountDetail}>
        <Text style={styles.nameText}>{data.account.nickname}</Text>
        <View style={styles.info}>
          <Text style={styles.timeText}>{data.published_at_text}</Text>
          <LocationBar space={data.space} location={data.location} />
        </View>
      </Pressable>
      {showFollow && (
        <Text style={[styles.joinBtn, {color: followed ? '#bdbdbd' : '#000'}]} onPress={onFollow}>
          {followed ? '已关注' : '关注'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  content: {
    marginLeft: 12,
  },
  nameText: {
    fontSize: 12,
    lineHeight: 20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  spaceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  spaceText: {
    color: '#9C9C9C',
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '400',
  },
  timeText: {
    color: '#bdbdbd',
    fontSize: 11,
  },
  joinBtn: {
    paddingLeft: 12,
    paddingRight: 12,
    height: 34,
    lineHeight: 34,
    marginLeft: 'auto',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default PublishAccount;
