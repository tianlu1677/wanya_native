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
    return currentAccount.new_message_count > 99 ? '99+' : currentAccount.new_message_count;
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(dispatchBaseCurrentAccount());
    }, [])
  );

  return (
    <SafeAreaPlus style={{flex: 1}} edges={['right', 'bottom', 'left']}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <View style={styles.wrapper}>
        <TabViewList
          size="big"
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
        <Pressable onPress={() => props.navigation.navigate('NotifyIndex')} style={styles.message}>
          <BadgeMessage
            value={UnreadMessageCount()}
            status={'error'}
            containerStyle={styles.badgeContainer}
            badgeStyle={{width: 20, height: 20, borderRadius: 10}}
            textStyle={{fontSize: 9}}
          />
          <View style={styles.message_icon}>
            <IconFont name="notice" size={19} />
          </View>
        </Pressable>
      </View>
    </SafeAreaPlus>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    height: 18,
    position: 'absolute',
    right: 5,
    top: -9,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    paddingTop: BASIC_HEIGHT,
  },
  message: {
    position: 'absolute',
    right: -3,
    zIndex: 2,
    top: BASIC_HEIGHT + 21,
  },
  message_icon: {
    position: 'absolute',
    top: 0,
    right: 18,
    zIndex: -1,
  },
});

export default Recommend;
