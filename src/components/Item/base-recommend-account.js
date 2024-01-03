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
    navigation.navigate('ChatDetail', {
      uuid,
      targetAccountId: data.id,
      targetAccountNickname: data.nickname,
    });
  };

  const goAccountDetail = () => {
    navigation.navigate('AccountDetail', {accountId: id});
  };

  const lablelList = label_list.slice(0, 5);
  const mediaList = media.slice(0, 5);

  return (
    <View style={styles.wrap}>
      <Avator size={VWValue(45)} account={data} />
      <Pressable style={styles.accountInfo} onPress={goAccountDetail}>
        <Text style={styles.nickname}>{nickname}</Text>
        {lablelList.length > 0 ? (
          <View style={styles.labelWrap}>
            {lablelList.map((label, index) => (
              <View key={`recommend-account-label-${label}`} style={{flexDirection: 'row'}}>
                <Text style={styles.label}>{label}</Text>
                {lablelList.length - 1 !== index && <Text style={styles.labelLine}>|</Text>}
              </View>
            ))}
          </View>
        ) : null}

        <Text style={styles.intro}>{intro || '探索与发现 记录与分享'}</Text>

        {mediaList.length > 0 ? (
          <View style={styles.imageWrap}>
            {mediaList.map(item => (
              <FastImg
                source={{uri: item.url}}
                key={`recommend-account-media-${item.id}`}
                style={styles.image}
                mode="cover"
              />
            ))}
          </View>
        ) : (
          <View />
        )}

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
    paddingBottom: RFValue(11),
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
    marginTop: 10,
  },
  label: {
    fontSize: 12,
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
    color: '#3d3d3d',
    marginTop: 10,
  },
  imageWrap: {
    flexDirection: 'row',
    marginTop: 10,
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

export default React.memo(BaseRecommendAccount);
