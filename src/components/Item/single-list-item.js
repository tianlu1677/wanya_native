import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Vibration, ActionSheetIOS} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import Toast from '@/components/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {createTopicAction, destroyTopicAction, deleteTopic} from '@/api/topic_api';
import {createArticleAction, destroyArticleAction} from '@/api/article_api';
import {getAccountBaseInfo} from '@/api/account_api';
import * as Animatable from 'react-native-animatable';
import {dispatchShareItem} from '@/redux/actions';

export const Header = props => {
  const {data} = props;
  const navigation = useNavigation();
  const currentAccount = useSelector(state => state.account.currentAccount);
  const [star, setstar] = useState(data.star);

  const goAccountDetail = () => {
    navigation.push('AccountDetail', {accountId: data.account.id});
  };

  const goSpaceDetail = () => {
    navigation.push('SpaceDetail', {spaceId: data.space.id});
  };

  const onStar = async () => {
    const params = {id: data.id, type: 'star'};
    switch (props.type) {
      case 'topic':
        if (star) {
          await destroyTopicAction(params);
        } else {
          await createTopicAction(params);
        }
        break;
      case 'article':
        if (star) {
          await destroyArticleAction(params);
        } else {
          await createArticleAction(params);
        }
        break;
    }
    setstar(!star);
    Toast.show(star ? '已取消收藏' : '已收藏');
  };

  const getOptions = () => {
    const isCurrentSelf = data.account.id === currentAccount.id;
    let options = [];
    if (isCurrentSelf) {
      switch (props.type) {
        case 'topic':
          options = ['取消', '删除', star ? '取消收藏' : '收藏'];
          break;
        case 'article':
          options = ['取消', star ? '取消收藏' : '收藏'];
          break;
      }
    } else {
      options = ['取消', '举报'];
    }
    return options;
  };

  const onReportClick = () => {
    const isCurrentTopic = data.account.id === currentAccount.id;
    const options = getOptions();
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options,
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      async buttonIndex => {
        if (buttonIndex === 1) {
          if (isCurrentTopic) {
            if (props.type === 'article') {
              onStar();
            }
            if (props.type === 'topic') {
              try {
                await deleteTopic(data.id);
                Toast.show('已删除');
                props.onRemove();
              } catch (err) {
                Toast.error('删除失败，请稍后再试');
              }
            }
          } else {
            navigation.push('Report', {report_type: props.type, report_type_id: data.id});
          }
        }
        if (buttonIndex === 2) {
          onStar();
        }
      }
    );
  };

  return (
    <View style={hstyles.headerView}>
      <Avator account={data.account} size={40} />
      <View style={hstyles.content}>
        <Pressable onPress={goAccountDetail}>
          <Text style={hstyles.nameText}>{data.account.nickname}</Text>
          <View style={hstyles.info}>
            <Text style={hstyles.timeText}>{data.published_at_text}</Text>
            {data.space && (
              <Pressable
                style={hstyles.spaceWrapper}
                onPress={goSpaceDetail}
                hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
                <IconFont name="space-point" size={11} color={'#9C9C9C'} />
                <Text style={hstyles.spaceText}>{data.space.name}</Text>
              </Pressable>
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
      {/* <Text style={hstyles.joinBtn} onPress={goNodeDetail}>
        进入圈子
      </Text> */}
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
          res = await destroyArticleAction({id: data.id, type: 'praise'});
        } else {
          res = await createArticleAction({id: data.id, type: 'praise'});
        }
        break;
      case 'topic':
        if (praise) {
          res = await destroyTopicAction({id: data.id, type: 'praise'});
        } else {
          res = await createTopicAction({id: data.id, type: 'praise'});
        }
        break;
    }
    if (res.data.status === 404) {
      Toast.show('该帖子已删除');
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
      title: '顽鸦',
      userName: 'gh_c2b50fe8e928',
      webpageUrl: '',
      path: '',
      thumbImageUrl: data.wx_share_image_url,
      scene: 0,
    };

    // console.log('props.type', props.type)
    switch (props.type) {
      case 'article':
        shareOptions = {
          ...shareOptions,
          title: data.plain_content,
          path: '/pages/articles/article-detail?article_id=' + data.id,
          thumbImageUrl: data.wx_share_image_url,
        };
        break;
      case 'topic':
        shareOptions = {
          ...shareOptions,
          title: data.plain_content,
          path: '/pages/topics/topic-detail?topic_id=' + data.id,
          thumbImageUrl: data.wx_share_image_url,
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

  return (
    <View style={bstyles.botView}>
      <Pressable style={bstyles.botCon} onPress={onPraise}>
        <Animatable.View animation={an} useNativeDriver easing="ease-out" iterationCount={1}>
          <IconFont name={'like'} size={20} color={praise ? '#000' : '#bdbdbd'} />
        </Animatable.View>
        <Animatable.Text style={{...bstyles.botNum, color: praise ? '#000' : '#bdbdbd'}}>
          {praiseCount > 0 ? praiseCount : ''}
        </Animatable.Text>
      </Pressable>
      <View style={bstyles.botCon}>
        <IconFont name="comment" size={20} color={'#bdbdbd'} />
        <Text style={bstyles.botNum}>{data.comments_count || ''}</Text>
      </View>
      <Pressable
        style={{marginLeft: 'auto'}}
        onPress={() => {
          onShare();
        }}
        hitSlop={{left: 10, right: 10, top: 5}}>
        <IconFont name="zhuanfa" size={18} style={{marginLeft: 'auto'}} />
      </Pressable>
    </View>
  );
};

export const PlainContent = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goHashTagDetail = name => {
    navigation.push('HashtagDetail', {hashtag: name.replace('#', '')});
  };

  const AccountDetail = async nickname => {
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
                <Text style={cstyles.hashtagText} onPress={() => AccountDetail(v.content)}>
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
    color: '#9c9c9c',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '400',
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
  joinBtn: {
    width: 75,
    height: 34,
    lineHeight: 34,
    backgroundColor: '#fafafa',
    borderRadius: 17,
    fontSize: 11,
    overflow: 'hidden',
    marginLeft: 'auto',
    textAlign: 'center',
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
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botNum: {
    marginLeft: 5,
    marginRight: 20,
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
