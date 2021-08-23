import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
import FastImg from '@/components/FastImg';
import {getChatGroupsDetail} from '@/api/chat_api';

const BaseRecommendAccount = ({data}) => {
  const navigation = useNavigation();
  console.log('data', data);
  const {id, nickname, intro, label_list, media} = data;

  const handleCreateChat = async () => {
    const params = {receiver_id: id};
    const res = await getChatGroupsDetail(params);
    const {uuid} = res.data.chat_group;
    navigation.navigate('ChatDetail', {uuid, targetAccount: data});
  };

  return (
    <View style={styles.wrap}>
      <Avator size={45} account={data} />
      <View style={styles.accountInfo}>
        <Text style={styles.nickname}>{nickname}</Text>
        {label_list.length > 0 ? (
          <View style={styles.labelWrap}>
            {label_list.map((label, index) => (
              <>
                <Text style={styles.label}>{label}</Text>
                {label_list.length - 1 !== index && <Text style={styles.labelLine}>|</Text>}
              </>
            ))}
          </View>
        ) : null}
        <Text style={styles.intro}>{intro || '探索与发现 记录与分享'}</Text>
        <View style={styles.imageWrap}>
          {media.map(item => (
            <FastImg source={{uri: item.url}} style={styles.image} />
          ))}
        </View>

        <Text style={styles.btn} onPress={handleCreateChat}>
          打招呼
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  accountInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nickname: {
    fontSize: 15,
  },
  labelWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 9,
  },
  label: {
    fontSize: 12,
    lineHeight: 14,
    color: '#3d3d3d',
    fontWeight: '300',
  },
  labelLine: {
    width: StyleSheet.hairlineWidth,
    height: 12,
    marginHorizontal: 5,
    backgroundColor: '#3d3d3d',
  },
  intro: {
    fontSize: 12,
    lineHeight: 20,
    color: '#3d3d3d',
    marginTop: 5,
  },
  imageWrap: {
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    width: 56,
    height: 56,
    marginRight: 4,
  },
  btn: {
    width: 54,
    height: 27,
    lineHeight: 27,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#FF2242',
    borderWidth: 1,
    borderColor: '#FF2242',
    borderRadius: 14,
    position: 'absolute',
    right: 0,
    top: 2,
  },
});

export default BaseRecommendAccount;
