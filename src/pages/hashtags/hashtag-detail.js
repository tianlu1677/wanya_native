import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT} from '@/utils/navbar';
import {getHashtagPosts} from '@/api/hashtag_api';
import {GoBack, JoinActivity} from '@/components/NodeComponents';
import * as action from '@/redux/constants';
import FastImg from '@/components/FastImg';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import CollapsibleHeader from '@/components/CollapsibleHeaders';

const rightLogo =
  'http://file.meirixinxue.com/assets/2020/77963058-7b42-46ea-bc6b-f969e81bbdfd.png';
const bgLogo = 'http://file.meirixinxue.com/assets/2020/ef47c0d6-39c2-4e99-988d-86332a12449e.jpg';

const HEADER_HEIGHT = 164;

const HashtagDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [hashtag] = useState(route.params.hashtag);
  const [currentKey, setCurrentKey] = useState('published_order');

  const PublishList = () => {
    const request = {
      api: getHashtagPosts,
      params: {hashtag: '滑板', hashtag_name: '滑板', type: 'published_order'},
    };
    return <SingleList request={request} />;
  };

  const HotList = () => {
    const request = {
      api: getHashtagPosts,
      params: {hashtag: '滑板', hashtag_name: '滑板', type: 'hot_order'},
    };
    return <DoubleList request={request} />;
  };

  const joinNewTopic = () => {
    const topics = {
      plan_content: `#${route.params.hashtag}`,
    };
    dispatch({type: action.SAVE_NEW_TOPIC, value: topics});
    navigation.navigate('NewTopic');
  };

  return (
    <View style={{flex: 1}}>
      <GoBack />
      <JoinActivity type={'node'} text={'参与话题'} handleClick={joinNewTopic} />
      <CollapsibleHeader
        headerHeight={HEADER_HEIGHT}
        currentKey={currentKey}
        onKeyChange={key => setCurrentKey(key)}
        tabData={[
          {
            key: 'published_order',
            title: '最新',
            component: PublishList,
          },
          {
            key: 'hot_order',
            title: '热门',
            component: HotList,
          },
        ]}
        renderHeader={
          <>
            <View style={styles.header}>
              <FastImg source={{uri: bgLogo}} style={styles.imageCover} />
              <FastImg source={{uri: rightLogo}} style={styles.rightCoverImage} />
              <Text style={styles.hashtagText}>#{hashtag}</Text>
            </View>
            <View style={styles.imageCoverOpacity} />
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: HEADER_HEIGHT,
    backgroundColor: '#ff8d00',
    position: 'relative',
  },
  imageCoverOpacity: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  imageCover: {
    height: HEADER_HEIGHT,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  rightCoverImage: {
    height: 60,
    width: 60,
    position: 'absolute',
    right: 0,
    top: STATUS_BAR_HEIGHT + 5,
  },
  hashtagText: {
    position: 'absolute',
    top: 53,
    left: 0,
    right: 0,
    marginLeft: 15,
    marginRight: 90,
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 1,
    zIndex: 2,
  },
});

export default HashtagDetail;
