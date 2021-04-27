import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {scaleFixedWidth} from '@/utils/scale';
import {Avator} from '@/components/NodeComponents';
import PersonImg from '@/assets/images/personal.png';
import BrandImg from '@/assets/images/brand.png';

const BaseActivity = props => {
  const navigation = useNavigation();

  const {
    type,
    data: {
      id,
      cover,
      name,
      account: {nickname, settled_type},
      activity_way,
      space,
      start_at,
      finish_at,
      tags,
    },
  } = props;

  const goDetail = () => {
    if (type === 'list') {
      navigation.navigate('ActivityDetail', {activityId: id});
    }
  };

  return (
    <Pressable style={styles.wrapper} onPress={goDetail}>
      <FastImg source={{uri: cover.url}} style={scaleFixedWidth(cover)} />
      <View style={styles.infoWrapper}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.accountWrapper}>
          <Avator account={props.data.account} size={RFValue(20)} isShowSettledIcon={false} />
          <Text style={styles.nickname}>{nickname}</Text>
          {settled_type === 'personal' && <FastImg style={styles.settledIcon} source={PersonImg} />}
          {settled_type === 'brand' && <FastImg style={styles.settledIcon} source={BrandImg} />}
        </View>
        <View style={styles.addressWrapper}>
          <IconFont name="space-point" size={12} color={'#9C9C9C'} />
          {['on_space', 'on_website'].includes(activity_way) && (
            <Text style={styles.addressName}>
              {activity_way === 'on_space' && space ? space.name : '线上活动'}
            </Text>
          )}
        </View>
        <Text style={styles.time}>{`${start_at} - ${finish_at}`}</Text>
        <View style={styles.tagWrapper}>
          {tags.map(tag => (
            <Text style={styles.tag} key={tag.id}>
              {tag.name}
            </Text>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 14,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  accountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(10),
  },
  nickname: {
    marginHorizontal: 5,
  },
  settledIcon: {
    width: RFValue(10),
    height: RFValue(10),
  },
  addressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(7),
  },
  addressName: {
    color: '#9C9C9C',
    marginLeft: 5,
    fontSize: 12,
  },
  time: {
    color: '#9C9C9C',
    fontSize: 12,
    marginTop: RFValue(7),
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: RFValue(7),
  },
  tag: {
    height: RFValue(20),
    lineHeight: RFValue(20),
    paddingHorizontal: 8,
    fontSize: 10,
    color: '#FF8D00',
    borderWidth: 1,
    borderColor: '#FF8D00',
    borderRadius: 2,
    marginRight: 7,
    marginBottom: 7,
  },
  separator: {
    height: 9,
    backgroundColor: '#FAFAFA',
  },
});

export default BaseActivity;
