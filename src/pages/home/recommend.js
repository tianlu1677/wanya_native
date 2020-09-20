import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import TabViewList from '@/components/TabView';
import SingleList from '@/components/List/single-list';
import DoubleList from '@/components/List/double-list';
import IconFont from '@/iconfont';
import {useDispatch, useSelector} from 'react-redux';
import {getRecommendPosts, getFollowedPosts, getRecommendLatestPosts} from '@/api/home_api';
import {STATUS_BAR_HEIGHT, BOTTOM_HEIGHT, BASIC_HEIGHT} from '@/utils/navbar';
import {BadgeMessage} from '@/components/NodeComponents';
import {dispatchBaseCurrentAccount} from '@/redux/actions';

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

  useEffect(() => {
    dispatch(dispatchBaseCurrentAccount());
  }, []);

  const UnreadMessageCount = () => {
    // console.log('currentAccount', currentAccount)
    if (!currentAccount || currentAccount.new_message_count === 0) {
      return 0;
    }
    return currentAccount.new_message_count > 99 ? '99+' : currentAccount.new_message_count;
  };

  return (
    <View style={styles.wrapper}>
      <TabViewList
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
      <TouchableOpacity
        onPress={() => props.navigation.navigate('NotifyIndex')}
        style={styles.message}>
        <BadgeMessage
          value={UnreadMessageCount()}
          status={'error'}
          containerStyle={styles.badgeContainer}
          // badgeStyle={{width: 12, height: 12, borderRadius: 12}}
          // textStyle={{fontSize: 10}}
        />
        <View style={styles.message_icon}>
          <IconFont name="notice" size={20} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: 1,
    top: -8,
    // top: -10,
    // width: 3,
    // height: 3
  },
  wrapper: {
    flex: 1,
    position: 'relative',
    paddingTop: BASIC_HEIGHT,
    backgroundColor: 'white',
  },
  message: {
    position: 'absolute',
    right: 16,
    zIndex: 2,
    top: 15 + BASIC_HEIGHT,
  },
  message_icon: {
    position: 'absolute',
    top: 0,
    right: 18,
    zIndex: -1,
  },
});

export default Recommend;
