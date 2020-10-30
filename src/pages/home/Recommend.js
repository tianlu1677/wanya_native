import React, {useState, useEffect, useCallback} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar, Pressable} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import TabViewList from '@/components/TabView';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import IconFont from '@/iconfont';
import {useDispatch, useSelector} from 'react-redux';
import {getRecommendPosts, getFollowedPosts, getRecommendLatestPosts} from '@/api/home_api';
import {STATUS_BAR_HEIGHT, BOTTOM_HEIGHT, BASIC_HEIGHT} from '@/utils/navbar';
import {BadgeMessage} from '@/components/NodeComponents';
import {dispatchBaseCurrentAccount} from '@/redux/actions';
import {dispatchCurrentAccount} from '@/redux/actions';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import SafeAreaPlus from '@/components/SafeAreaPlus';
import Helper from '@/utils/helper';

console.log(STATUS_BAR_HEIGHT);

const Recommend = props => {
  const [currentKey, setCurrentKey] = useState('recommend');
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account.currentBaseInfo);

  const RecommendList = () => {
    return <DoubleList request={{api: getRecommendPosts}} type="recommend" />;
  };

  const FollowList = () => {
    return <SingleList request={{api: getFollowedPosts}} />;
  };

  const LastedList = () => {
    return <SingleList request={{api: getRecommendLatestPosts}} />;
  };

  const UnreadMessageCount = () => {
    if (!currentAccount || currentAccount.new_message_count === 0) {
      return 0;
    }
    return currentAccount.new_message_count;
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(dispatchBaseCurrentAccount());
    }, [])
  );

  useEffect(() => {
    dispatch(dispatchCurrentAccount());
  }, []);

  return (
    <SafeAreaPlus style={{flex: 1}} edges={['right', 'left']}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <View style={styles.wrapper}>
        <TabViewList
          size="big"
          lazy={true}
          currentKey={currentKey}
          tabData={[
            {
              key: 'recommend',
              title: '推荐',
              component: RecommendList,
            },
            {
              key: 'follow',
              title: '关注',
              component: FollowList,
            },
            {
              key: 'lasted',
              title: '最新',
              component: LastedList,
            },
          ]}
          onChange={key => setCurrentKey(key)}
        />
        <View style={styles.message}>
          <Pressable
            style={styles.message_icon}
            hitSlop={{left: 20, right: 10, top: 10, bottom: 10}}
            onPress={() => props.navigation.navigate('NotifyIndex')}>
            <View style={{position: 'relative'}}>
              <IconFont name="notice" size={20} />
            </View>
            <BadgeMessage
              value={UnreadMessageCount()}
              containerStyle={{...styles.badgeContainer, left: UnreadMessageCount() > 9 ? 8 : 14}}
              size={'small'}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaPlus>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: -5,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    // paddingTop: BOTTOM_HEIGHT + 5,
    paddingTop: BOTTOM_HEIGHT + 10,
  },
  message: {
    position: 'absolute',
    right: 4,
    zIndex: 100,
    top: BOTTOM_HEIGHT + 3 + 22,
  },
  message_icon: {
    position: 'absolute',
    top: 0,
    right: 18,
    zIndex: -1,
  },
});

export default Recommend;
