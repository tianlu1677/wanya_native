import React from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {getChatGroupsDetail} from '@/api/chat_api';
const {width} = Dimensions.get('window');

const imageWidth = (width - 14 * 2 - VWValue(45) - 12 - 4 * 4) / 5;

const BaseRecommendAccount = ({data}) => {
  const navigation = useNavigation();
  const {id, nickname, intro, label_list, media} = data;

  const handleCreateChat = async () => {
    const params = {receiver_id: id};
    const res = await getChatGroupsDetail(params);
    const {uuid} = res.data.chat_group;
    navigation.navigate('ChatDetail', {uuid, targetAccount: data});
  };

  const goAccountDetail = () => {
    navigation.navigate('AccountDetail', {accountId: id});
  };

  return (
    <View style={styles.wrap}>
      <Avator size={VWValue(45)} account={data} />
      <Pressable style={styles.accountInfo} onPress={goAccountDetail}>
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

        {media.length > 0 ? (
          <View style={styles.imageWrap}>
            {media.slice(0, 5).map(item => (
              <FastImg source={{uri: item.url}} style={styles.image} mode="cover" />
            ))}
          </View>
        ) : <View/>}

        <Text style={styles.btn} onPress={handleCreateChat}>
          打招呼
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 14,
    paddingTop: RFValue(14),
    // paddingBottom: RFValue(11),
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  accountInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nickname: {
    fontSize: 15,
    marginTop: 5,
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
    paddingBottom: RFValue(11)
  },
  image: {
    width: imageWidth,
    height: imageWidth,
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
