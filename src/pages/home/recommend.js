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
    return currentAccount.new_message_count;
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(dispatchBaseCurrentAccount());
    }, [])
  );

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
          <BadgeMessage
            value={UnreadMessageCount()}
            containerStyle={{...styles.badgeContainer, right: UnreadMessageCount() > 10 ? 2 : 8}}
            size={'small'}
          />
          <Pressable
            style={styles.message_icon}
            hitSlop={{left: 20, right: 10, top: 10, bottom: 10}}
            onPress={() => props.navigation.navigate('NotifyIndex')}
          >
            <IconFont name="notice" size={19} />
          </Pressable>
        </View>
      </View>
    </SafeAreaPlus>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    height: 18,
    position: 'absolute',
    right: 8,
    top: -5,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FAFAFA',
    paddingTop: BASIC_HEIGHT,
  },
  message: {
    position: 'absolute',
    right: 4,
    zIndex: 100,
    top: BASIC_HEIGHT + 22,
  },
  message_icon: {
    position: 'absolute',
    top: 0,
    right: 18,
    zIndex: -1,
  },
});

export default Recommend;
