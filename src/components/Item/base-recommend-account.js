import React from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {getChatGroupsDetail} from '@/api/chat_api';

const {width} = Dimensions.get('window');
const imageWidth = (width - 14 * 2 - VWValue(45) - 12 - 4 * 2) / 3;

const BaseRecommendAccount = ({data}) => {
  const navigation = useNavigation();
  const {id, online, nickname, gender, age, province, intro, label_list, media} = data;

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

  const lablelList = label_list.slice(0, 3);
  const mediaList = media.slice(0, 2);

  const genderStyle = {backgroundColor: gender === 'man' ? '#b7f8ff' : '#fed9e6'};
  const genderTextColor = {color: gender === 'man' ? '#25c6d8' : '#ff6383'};

  return (
    <View style={styles.wrap}>
      <View style={styles.avatorWrap}>
        <Avator size={VWValue(45)} account={data} />
        {!online ? <IconFont name="zaixian" size={12} style={styles.online} /> : null}
      </View>
      <Pressable style={styles.accountInfo} onPress={goAccountDetail}>
        <View style={styles.accountWrap}>
          <Text style={styles.nickname}>{nickname}</Text>
          <View style={[styles.gender, genderStyle]}>
            {gender ? <IconFont name={`${gender}-icon`} size={9} style={{marginRight: 2}} /> : null}
            <Text style={[genderTextColor, {fontSize: 9}]}>{age}</Text>
          </View>
          {province ? (
            <View style={styles.province}>
              <IconFont name="space-point" size={9} color="#35cbbb" />
              <Text style={{color: '#35cbbb', fontSize: 9, marginLeft: 2}}>{province}</Text>
            </View>
          ) : null}
        </View>

        {lablelList.length > 0 ? (
          <View style={styles.labelWrap}>
            {lablelList.map((label, index) => (
              <View key={`${label}-${index}`} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.label}>{label}</Text>
                {lablelList.length - 1 !== index && <Text style={styles.labelLine} />}
              </View>
            ))}
          </View>
        ) : null}

        <Text style={styles.intro} numberOfLines={1}>
          {intro || '探索与发现 记录与分享'}
        </Text>

        {mediaList.length > 0 ? (
          <View style={styles.imageWrap}>
            {mediaList.map((item, index) => (
              <FastImg
                source={{uri: item.url}}
                key={`recommend-media-${item.id}`}
                style={{...styles.image, marginRight: index === 2 ? 0 : 4}}
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
    paddingBottom: RFValue(15),
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  avatorWrap: {
    position: 'relative',
    width: VWValue(45),
    height: VWValue(45),
  },
  online: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  accountInfo: {
    flex: 1,
    marginLeft: 12,
  },
  accountWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  nickname: {
    fontSize: 15,
    marginRight: 5,
  },
  gender: {
    height: 15,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  province: {
    height: 15,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c9fff9',
    borderRadius: 6,
    marginLeft: 5,
  },
  labelWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 12,
    color: '#aaa',
  },
  labelLine: {
    width: 1,
    height: 12,
    marginHorizontal: 5,
    backgroundColor: '#aaa',
  },
  intro: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 10,
  },
  imageWrap: {
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    width: imageWidth,
    height: imageWidth,
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
