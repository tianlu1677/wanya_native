import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';
import {RateScore, JoinAccounts} from '@/components/NodeComponents';
import {ScaleDistance} from '@/utils';

const BaseSpceDetail = props => {
  const navigation = useNavigation();

  const {
    type,
    data: {
      id,
      cover_url,
      name,
      address,
      distance,
      store_type,
      tags,
      join_accounts_count,
      recent_join_accounts,
      publish_topics_count,
      publish_rate_topics_count,
      rate_score,
    },
  } = props;

  const goDetail = () => {
    if (type === 'list') {
      navigation.navigate('ShopStoreDetail', {shopStoreId: id});
    }
  };

  return (
    <Pressable style={styles.wrapper} onPress={goDetail}>
      <FastImg source={{uri: cover_url}} style={styles.image} />
      <View style={styles.infoWrapper}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.infoData}>
          <View style={styles.rateWrapper}>
            <RateScore score={rate_score} size={12} />
            <Text style={styles.rateText}>{rate_score}</Text>
          </View>
          <Text style={styles.infoCount}>{publish_rate_topics_count}条评价</Text>
          <Text style={styles.infoCount}>{publish_topics_count}条动态</Text>
        </View>

        <View style={styles.addressWrapper}>
          <Text style={styles.addressName}>
            {store_type === 'entity' && address}
            {store_type === 'website' && '网店'}
          </Text>

          {store_type === 'entity' && distance > 0 ? (
            <Text style={styles.addressName}>距离{ScaleDistance(distance)}</Text>
          ) : null}
        </View>

        {tags.length > 0 ? (
          <View style={styles.tagWrapper}>
            {tags.map((tag, index) => (
              <Text style={styles.tag} key={index}>
                {tag.name}
              </Text>
            ))}
          </View>
        ) : null}

        <View style={styles.accountWrapper}>
          {recent_join_accounts.length > 0 ? (
            <JoinAccounts accounts={recent_join_accounts} size={16} style={{marginRight: 4}} />
          ) : null}

          <Text style={styles.accountText}>{join_accounts_count}个顽友已收藏</Text>
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
  image: {
    width: 110,
    height: 85,
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  infoData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCount: {
    marginLeft: 5,
    fontSize: 11,
  },
  addressWrapper: {
    flexDirection: 'row',
    marginTop: RFValue(10),
  },
  addressName: {
    fontSize: 12,
    color: '#9C9C9C',
    marginRight: RFValue(10),
  },
  distance: {
    width: 70,
    fontSize: 12,
    lineHeight: 21,
    textAlign: 'right',
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: RFValue(10),
    marginBottom: -10,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontSize: 10,
    color: '#FF6633',
    backgroundColor: '#FFF2E7',
    borderRadius: 3,
    marginRight: 7,
    marginBottom: 7,
  },
  accountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(10),
  },
  accountText: {
    fontSize: 11,
  },
  rateWrapper: {
    flexDirection: 'row',
  },
  rateText: {
    color: '#FF2242',
  },
});

export default BaseSpceDetail;
