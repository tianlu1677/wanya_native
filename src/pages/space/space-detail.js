import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {getSpaceDetail} from '@/api/space_api';
import Loading from '@/components/Loading';
import IconFont from '@/iconfont';
import {PlayScore, Avator} from '@/components/NodeComponents';

const SpaceDetail = () => {
  const [detail, setDetail] = useState(null);

  const loadData = async () => {
    const res = await getSpaceDetail(2);
    setDetail(res.data.space);
    console.log(res.data.space);
  };

  useEffect(() => {
    loadData();
  }, []);

  return detail ? (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Image style={styles.bgcover} source={{uri: detail.cover_url}} />
        <View style={styles.info}>
          <View>
            <Text style={styles.name}>{detail.name}</Text>
            <Text style={styles.intro}>
              <Text>{detail.intro}</Text> | <Text>{detail.medias.length}张图片</Text>
            </Text>
          </View>
          <View style={styles.creatorWrap}>
            <Avator account={detail.account} size={30} />
            <View style={styles.creator}>
              <Text style={styles.creatorName}>{detail.account.nickname}</Text>
              <Text style={styles.creatorDesc}>创建者</Text>
            </View>
          </View>
        </View>
        <View style={styles.address}>
          <IconFont name="changdiweizhi" size={13} color={'#fff'} />
          <Text style={styles.addressText}>{detail.address}</Text>
        </View>
        <View style={styles.descWrap}>
          <View style={styles.tagsWrap}>
            {detail.tag_list.map((v, index) => (
              <Text key={index} style={styles.tags}>
                {v}
              </Text>
            ))}
          </View>
          <PlayScore score={detail.play_score} />
        </View>
      </View>
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 24,
    paddingTop: 63,
    position: 'relative',
    height: 275,
    backgroundColor: 'pink',
  },
  bgcover: {
    height: 275,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    zIndex: -1,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 25,
    color: '#fff',
  },
  intro: {
    fontSize: 11,
    color: '#fff',
    marginTop: 8,
  },
  creatorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creator: {
    marginLeft: 5,
  },
  creatorName: {
    color: '#fff',
    fontSize: 11,
  },
  creatorDesc: {
    color: '#fff',
    fontSize: 8,
    marginTop: 5,
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  addressText: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 8,
  },
  descWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 36,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 260,
  },
  tags: {
    height: 21,
    lineHeight: 21,
    fontSize: 11,
    textAlign: 'center',
    backgroundColor: '#fff',
    opacity: 0.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 8,
    marginBottom: 8,
  },
});

export default SpaceDetail;
