import React, {useState, useEffect, useCallback} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import ScrollList from '@/components/ScrollList';
import {RFValue} from '@/utils/response-fontsize';
import FastImg from '@/components/FastImg';
import LinearGradient from 'react-native-linear-gradient';
import {Bottom} from '@/components/Item/single-list-item';
import {Avator} from '@/components/NodeComponents';
import VideoPlayImg from '@/assets/images/video-play.png';

const LongVideoItem = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goAccountDetail = () => {
    navigation.push('AccountDetail', {accountId: data.account.id});
  };

  const goTopicDetail = () => {
    navigation.push('TopicDetail', {topicId: data.id});
  };

  return (
    <Pressable style={styles.itemWrap} onPress={goTopicDetail}>
      <View style={styles.imageWrap}>
        <FastImg style={styles.image} source={{uri: data.single_cover.cover_url}} mode={'cover'} />
        <LinearGradient
          style={styles.imageLinear}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}>
          <Text style={styles.title}>{data.title}</Text>
        </LinearGradient>
        <FastImg style={styles.playImage} source={VideoPlayImg} />
      </View>
      <View style={styles.userInfo}>
        <Avator account={data.account} size={40} />
        <Pressable onPress={goAccountDetail} style={styles.content}>
          <Text style={styles.nameText}>{data.account.nickname}</Text>
          <Text style={styles.timeText}>{data.published_at_text}</Text>
        </Pressable>
        <View style={{position: 'absolute', right: -16}}>
          <Bottom
            data={data}
            type="topic"
            share={false}
            style={{paddingBottom: 0, paddingTop: 0}}
          />
        </View>
      </View>
    </Pressable>
  );
};

const LongVideoList = props => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const RenderItem = React.memo(({item}) => <LongVideoItem data={item.item} />);

  const renderItemMemo = useCallback(itemProps => <RenderItem {...itemProps} />, [listData]);

  const loadData = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    const {api, params} = props.request;
    const res = await api({...params, page});
    const data = props.dataKey ? res.data[props.dataKey] : res.data.posts;
    setLoading(false);
    setListData(page === 1 ? data : [...listData, ...data]);
    setHeaders(res.headers);
  };

  useEffect(() => {
    loadData();
  }, [props.request]);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={loadData}
      headers={headers}
      renderItem={renderItemMemo}
      renderSeparator={() => <View style={{height: 5, backgroundColor: '#F9F9F9'}} />}
      style={styles.wrapper}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 100,
  },
  itemWrap: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  imageWrap: {
    height: RFValue(210),
    position: 'relative',
    backgroundColor: '#000',
  },
  imageLinear: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  image: {
    width: '100%',
    height: RFValue(210),
    borderRadius: 0,
  },
  playImage: {
    width: RFValue(40),
    height: RFValue(40),
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -RFValue(20),
    marginLeft: -RFValue(20),
  },
  title: {
    fontSize: 17,
    lineHeight: RFValue(22),
    fontWeight: '500',
    color: '#fff',
    // textAlign: 'justify',
  },
  userInfo: {
    paddingLeft: 14,
    paddingTop: RFValue(7),
    paddingBottom: RFValue(7),
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 100
  },
  content: {
    marginLeft: 12,
  },
  nameText: {
    fontSize: 12,
    lineHeight: RFValue(20),
  },
  timeText: {
    color: '#bdbdbd',
    fontSize: 11,
    marginTop: 2,
  },
});

LongVideoList.propTypes = {
  request: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  ref: PropTypes.any,
};

export default LongVideoList;
