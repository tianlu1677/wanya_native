import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Vibration} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import {RFValue} from '@/utils/response-fontsize';
import LocationBar from '@/components/LocationBar';
import {deleteTopic} from '@/api/topic_api';
import {getAccountBaseInfo} from '@/api/account_api';
import * as Animatable from 'react-native-animatable';
import {dispatchShareItem} from '@/redux/actions';
import ActionSheet from '@/components/ActionSheet';
import {cancelAction, createAction} from "@/api/action_api"

export const Header = props => {
  const {data} = props;
  const navigation = useNavigation();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const [star, setstar] = useState(data.star);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionItems, setActionItems] = useState([]);

  const goAccountDetail = () => {
    navigation.push('AccountDetail', {accountId: data.account.id});
  };

  const onStar = async () => {
    const params = {id: data.id, type: 'star'};
    switch (props.type) {
      case 'topic':
        if (star) {
          await cancelAction({target_id: data.id, target_type: 'Topic', type: 'star'});
        } else {
          await createAction({target_id: data.id, target_type: 'Topic', type: 'star'});
        }
        break;
      case 'article':
        if (star) {
          await cancelAction({target_id: data.id, target_type: 'Article', type: 'star'});
        } else {
          await createAction({target_id: data.id, target_type: 'Article', type: 'star'});
        }
        break;
    }
    setstar(!star);
    Toast.showError(star ? '已取消收藏' : '已收藏');
  };

  const onReportClick = () => {
    const isCurrentSelf = data.account.id === currentAccount.id;
    let options = [];
    if (isCurrentSelf) {
      switch (props.type) {
        case 'topic':
          options = [
            {
              id: 1,
              label: star ? '取消收藏' : '收藏',
              onPress: async () => onStar(),
            },
            {
              id: 2,
              label: '删除',
              onPress: async () => {
                try {
                  await deleteTopic(data.id);
                  Toast.showError('已删除');
                  props.onRemove();
                } catch (err) {
                  Toast.error('删除失败，请稍后再试');
                }
              },
            },
          ];
          break;
        case 'article':
          options = [
            {
              id: 1,
              label: star ? '取消收藏' : '收藏',
              onPress: async () => onStar(),
            },
          ];
          break;
      }
    } else {
      options = [
        {
          id: 1,
          label: star ? '取消收藏' : '收藏',
          onPress: async () => onStar(),
        },
        {
          id: 2,
          label: '投诉',
          onPress: async () => {
            navigation.push('Report', {report_type: props.type, report_type_id: data.id});
          },
        },
      ];
    }
    setActionItems(options);
    setShowActionSheet(true);
  };

  return (
    <View style={hstyles.headerView}>
      <Avator account={data.account} size={40} />
      <View style={hstyles.content}>
        <Pressable onPress={goAccountDetail}>
          <Text style={hstyles.nameText}>{data.account?.nickname}</Text>
          <View style={hstyles.info}>
            <Text style={hstyles.timeText}>{data.published_at_text}</Text>
            <LocationBar space={data.space} location={data.location} />
            {data.distance && data.distance > 0 && (
              <Text style={hstyles.spaceText}>· {(data.distance / 1000).toFixed(1)}km</Text>
            )}
          </View>
        </Pressable>
      </View>
      <Pressable
        onPress={onReportClick}
        hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
        style={{marginLeft: 'auto'}}>
        <IconFont name="gengduo" color="#bdbdbd" size={20} />
      </Pressable>

      <ActionSheet
        actionItems={actionItems}
        showActionSheet={showActionSheet}
        changeModal={() => setShowActionSheet(false)}
      />
    </View>
  );
};

export const Bottom = props => {
  const {data} = props;
  const dispatch = useDispatch();
  const [praise, setPraise] = useState(props.data.praise);
  const [praiseCount, setPraiseCount] = useState(props.data.praises_count);

  const [an, setAn] = useState('');

  const onPraise = async () => {
    let res = null;
    switch (props.type) {
      case 'article':
        if (praise) {
          res = await cancelAction({target_id: data.id, target_type: 'Article', type: 'praise'});
        } else {
          res = await createAction({target_id: data.id, target_type: 'Article', type: 'praise'});
        }
        break;
      case 'topic':
        if (praise) {
          res = await cancelAction({target_id: data.id, target_type: 'Topic', type: 'praise'});
        } else {
          res = await createAction({target_id: data.id, target_type: 'Topic', type: 'praise'});
        }
        break;
    }
    if (res.data.status === 404) {
      Toast.showError('该帖子已删除');
      return false;
    }
    setPraise(!praise);
    const count = praiseCount + (praise === true ? -1 : 1);
    if (!praise) {
      setAn(zoomOut);
      Vibration.vibrate();
    } else {
      setAn('');
    }
    setPraiseCount(count);
  };

  const onShare = () => {
    let shareOptions = {
      item_type: '',
      item_id: '',
      visible: true
    };

    switch (props.type) {
      case 'article':
        shareOptions = {
          item_type: 'Article',
          item_id: data.id
        };
        break;
      case 'topic':
        shareOptions = {
          item_type: 'Topic',
          item_id: data.id
        };
        break;
      default:
        shareOptions;
        break;
    }

    const shareContent = {...shareOptions, visible: true};
    dispatch(dispatchShareItem(shareContent));
  };

  const zoomOut = {
    0: {
      opacity: 0,
      scale: 1,
    },
    0.5: {
      opacity: 1,
      scale: 1.5,
    },
    1: {
      opacity: 1,
      scale: 1,
    },
    duration: 600,
  };

  const hitSlop = {left: 10, right: 10, top: 10, bottom: 10};

  return (
    <View style={[bstyles.botView, props.style]}>
      <Pressable style={bstyles.botCon} onPress={onPraise} hitSlop={hitSlop}>
        <Animatable.View animation={an} useNativeDriver easing="ease-out" iterationCount={1}>
          <IconFont name={'like'} size={20} color={praise ? '#000' : '#bdbdbd'} />
        </Animatable.View>
        {praiseCount > 0 ? (
          <Animatable.Text style={{...bstyles.botNum, color: praise ? '#000' : '#bdbdbd'}}>
            {praiseCount}
          </Animatable.Text>
        ) : null}
      </Pressable>
      <View style={[bstyles.botCon, bstyles.botConComment]}>
        <IconFont name="comment" size={20} color={'#bdbdbd'} />
        {data.comments_count > 0 ? <Text style={bstyles.botNum}>{data.comments_count}</Text> : null}
      </View>
      {props.share ? (
        <Pressable style={{marginLeft: 'auto'}} onPress={onShare} hitSlop={hitSlop}>
          <IconFont name="zhuanfa" size={18} />
        </Pressable>
      ) : null}
    </View>
  );
};

export const PlainContent = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goHashTagDetail = name => {
    navigation.push('HashtagDetail', {hashtag: name.replace('#', '')});
  };

  const goAccountDetail = async nickname => {
    const res = await getAccountBaseInfo({name: nickname.replace('@', '')});
    navigation.push('AccountDetail', {accountId: res.data.account.id});
  };

  return (
    <Text numberOfLines={props.numberOfLines} style={[cstyles.plainWrap, props.style]}>
      {data.hashtag_content_json ? (
        data.hashtag_content_json.map((v, index) => {
          return (
            <Text key={index}>
              {v.is_hashtag && (
                <Text style={cstyles.hashtagText} onPress={() => goHashTagDetail(v.content)}>
                  {v.content}&nbsp;
                </Text>
              )}
              {v.is_mention && (
                <Text style={cstyles.hashtagText} onPress={() => goAccountDetail(v.content)}>
                  {v.content}&nbsp;
                </Text>
              )}
              {!v.is_hashtag && !v.is_mention && <Text space="nbsp">{v.content} </Text>}
            </Text>
          );
        })
      ) : (
        <Text>{data.plain_content}</Text>
      )}
    </Text>
  );
};

const hstyles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  content: {
    marginLeft: 12,
    paddingTop: 4,
  },
  nameText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#1F1F1F',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  timeText: {
    color: '#bdbdbd',
    fontSize: 11,
  },
  spaceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  spaceText: {
    color: '#9C9C9C',
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '400',
  },
});

const bstyles = StyleSheet.create({
  botView: {
    flexDirection: 'row',
    paddingBottom: 18,
    paddingTop: 15,
    alignItems: 'center',
  },
  botCon: {
    marginRight: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botConComment: {
    marginRight: 0,
  },
  botNum: {
    marginLeft: 5,
    color: '#bdbdbd',
    fontSize: 12,
  },
});

const cstyles = StyleSheet.create({
  plainWrap: {
    fontSize: 14,
    lineHeight: 23,
    color: '#1f1f1f',
    textAlign: 'justify',
  },
  hashtagText: {
    color: '#ff8d00',
    marginRight: 3,
  },
});

export const NoActionBottom = props => {
  const {node_name, praises_count, comments_count} = props.data;
  return (
    <Text style={nbstyles.infotext}>
      {node_name ? `${node_name}` : ''}
      {node_name && praises_count ? ' · ' : ''}
      {praises_count ? `赞${praises_count}` : ''}
      {(node_name || praises_count) && comments_count ? ' · ' : ''}
      {comments_count ? `评论${comments_count}` : ''}
    </Text>
  );
};

const nbstyles = StyleSheet.create({
  infotext: {
    color: '#BDBDBD',
    fontSize: 11,
  },
});
