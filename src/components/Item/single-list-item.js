import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Vibration, ActionSheetIOS} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import {useDispatch} from 'react-redux';
import {createTopicAction, destroyTopicAction} from '@/api/topic_api';
import {createArticleAction, destroyArticleAction} from '@/api/article_api';
import {getAccountBaseInfo} from '@/api/account_api';
import * as Animatable from 'react-native-animatable';
import {dispatchShareItem} from '@/redux/actions';

export const Header = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goNodeDetail = () => {
    navigation.push('NodeDetail', {nodeId: data.node_id});
  };

  const goAccountDetail = () => {
    navigation.push('AccountDetail', {accountId: data.account.id});
  };

  const onReportClick = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['取消', '举报'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          // console.log('data', data.id)
          navigation.push('Report', {report_type: props.type, report_type_id: data.id});
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
        </Pressable>
        <Pressable style={hstyles.infoView} onPress={goNodeDetail}>
          <Text style={hstyles.timeText}>{data.published_at_text}</Text>
          <IconFont name="node-solid" size={12} color={'#000'} />
          <Text style={hstyles.nodeName}>{data.node_name}</Text>
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
  const dispatch = useDispatch();
  const [praise, setPraise] = useState(props.data.praise);
  const [praiseCount, setPraiseCount] = useState(props.data.praises_count);

  const [an, setAn] = useState('');
  const {data} = props;

  const onPraise = async () => {
    // console.log('props.type', props.type)
    switch (props.type) {
      case 'article':
        if (praise) {
          await destroyArticleAction({id: data.id, type: 'praise'});
          setPraise(false);
        } else {
          await createArticleAction({id: data.id, type: 'praise'});
          setPraise(true);
        }
        break;
      case 'topic':
        if (praise) {
          await destroyTopicAction({id: data.id, type: 'praise'});
          setPraise(false);
        } else {
          await createTopicAction({id: data.id, type: 'praise'});
          setPraise(true);
        }
        break;
    }
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
    // WeChat.shareMiniProgram(shareOptions);
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
    // delay: 2000
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
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  timeText: {
    color: '#bdbdbd',
    marginRight: 6,
    fontSize: 11,
  },
  nodeName: {
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 4,
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
