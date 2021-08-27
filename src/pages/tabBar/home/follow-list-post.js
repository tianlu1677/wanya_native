import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {Platform, View, Text, Pressable, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as action from '@/redux/constants';
import {throttle} from 'lodash';
import IconFont from '@/iconfont';
import {BlurView} from '@/components/NodeComponents';
import FastImg from '@/components/FastImg';
import ScrollList from '@/components/ScrollList';
import BaseTopic from '@/components/Item/base-topic';
import BaseArticle from '@/components/Item/base-article';
import BaseTheory from '@/components/Item/base-theory';
import {getFollowedPosts} from '@/api/home_api';
import {RFValue} from '@/utils/response-fontsize';
import {ShareWrapper as lstyles} from '@/styles/baseCommon';

export const FollowShareComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {shareStatus} = useSelector(state => state.home);

  const onShareClose = () => {
    dispatch({type: action.CHANGE_SHARE_STATUS, value: false});
  };

  const onShare = () => {
    navigation.navigate('InviteDetail');
  };

  return shareStatus ? (
    <Pressable style={lstyles.followShareWrap} onPress={onShare}>
      <BlurView
        blurType="light"
        blurAmount={100}
        reducedTransparencyFallbackColor="white"
        style={{backgroundColor: '#F2F3F5', borderRadius: 10}}>
        <View style={lstyles.followShare}>
          <FastImg style={lstyles.followShareImage} source={require('@/assets/images/share.png')} />
          <View>
            <Text style={lstyles.shareTitle}>获取更多好友动态</Text>
            <Text style={lstyles.shareText}>分享给身边好友，邀请小伙伴一起玩呀！</Text>
          </View>
          <Pressable
            style={lstyles.deleteIcon}
            hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
            onPress={onShareClose}>
            <IconFont name="qingkong" size={16} />
          </Pressable>
        </View>
      </BlurView>
    </Pressable>
  ) : null;
};

const FollowListPost = () => {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState();
  const [listData, setListData] = useState([]);

  const onRemove = index => {
    const data = JSON.parse(JSON.stringify(listData));
    data.splice(index, 1);
    setListData([...data]);
  };

  const RenderItem = React.memo(({item, index}) => {
    return useMemo(() => {
      switch (item.item_type) {
        case 'Topic':
          return <BaseTopic data={item.item} onRemove={() => onRemove(index)} bottom="comment" />;
        case 'Article':
          return <BaseArticle data={item.item} />;
        case 'Theory':
          return <BaseTheory data={item.item} onRemove={() => onRemove(index)} bottom="comment" />;
        default:
          return <View />;
      }
    }, [item.id]);
  });

  const renderItemMemo = useCallback(itemProps => <RenderItem {...itemProps} />, [listData]);

  const onRefresh = (page = 1) => {
    loadData(page);
  };

  const loadData = async (page = 1, params) => {
    if (page === 1) {
      setLoading(true);
    }
    const res = await getFollowedPosts({page, ...params});
    setListData(page === 1 ? res.data.posts : [...listData, ...res.data.posts]);
    setHeaders(res.headers);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollList
      data={listData}
      loading={loading}
      onRefresh={throttle(onRefresh, 300)}
      headers={headers}
      renderItem={renderItemMemo}
      initialNumToRender={6}
      onEndReachedThreshold={0.25}
      windowSize={Platform.OS === 'ios' ? 10 : 20}
      ListHeaderComponent={FollowShareComponent()}
      renderSeparator={() => <View style={styles.speator} />}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 14,
    backgroundColor: '#fafafa',
  },
  title: {
    height: RFValue(40),
    lineHeight: RFValue(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 14,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    width: RFValue(125),
    backgroundColor: '#F2F3F5',
    alignItems: 'center',
    paddingVertical: RFValue(16),
    marginRight: RFValue(10),
    borderRadius: 2,
    overflow: 'hidden',
  },
  cardtext: {
    lineHeight: 18,
    marginTop: RFValue(10),
    marginBottom: RFValue(15),
    marginLeft: RFValue(9),
    marginRight: RFValue(9),
  },
  cardbtn: {
    width: RFValue(90),
    height: RFValue(30),
    lineHeight: RFValue(30),
    textAlign: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    fontSize: 13,
    fontWeight: '500',
  },
  hasfollow: {
    backgroundColor: '#FAFAFA',
    color: '#BDBDBD',
  },
  notfollow: {
    backgroundColor: '#000',
    color: '#fff',
  },
  speator: {
    backgroundColor: '#ebebeb',
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 14,
  },
});

export default FollowListPost;
