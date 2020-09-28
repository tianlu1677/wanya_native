import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import {useDispatch} from 'react-redux';
import {createTopicAction, destroyTopicAction} from '@/api/topic_api';
import {createArticleAction, destroyArticleAction} from '@/api/article_api';
import {getAccountBaseInfo} from '@/api/account_api';
import * as WeChat from 'react-native-wechat-lib';
import {dispatchPreviewImage, dispatchShareItem} from '@/redux/actions';

export const Header = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goNodeDetail = () => {
    navigation.push('NodeDetail', {nodeId: data.node_id});
  };

  const goAccountDetail = () => {
    navigation.push('AccountDetail', {accountId: data.account.id});
  };

  return (
    <View style={hstyles.headerView}>
      <Avator account={data.account} size={40} />
      <View style={hstyles.content}>
        <Text style={hstyles.nameText} onPress={goAccountDetail}>
          {data.account.nickname}
        </Text>
        <Pressable style={hstyles.infoView} onPress={goNodeDetail}>
          <Text style={hstyles.timeText}>{data.published_at_text}</Text>
          <IconFont name="node-solid" size={12} color={'#000'} />
          <Text style={hstyles.nodeName}>{data.node_name}</Text>
        </Pressable>
      </View>
      <Text style={hstyles.joinBtn} onPress={goNodeDetail}>
        进入圈子
      </Text>
    </View>
  );
};

export const Bottom = props => {
  const dispatch = useDispatch();
  const [praise, setPraise] = useState(props.data.praise);
  const [praiseCount, setPraiseCount] = useState(props.data.praises_count);

  const {data} = props;

  const onPraise = async () => {
    switch (props.type) {
      case 'article':
        if (praise) {
          await destroyArticleAction({id: data.id, type: 'praise'});
          setPraise(!praise);
        } else {
          await createArticleAction({id: data.id, type: 'praise'});
          setPraise(!praise);
        }
        break;
      case 'topic':
        if (praise) {
          await destroyTopicAction({id: data.id, type: 'praise'});
          setPraise(!praise);
        } else {
          await createTopicAction({id: data.id, type: 'praise'});
          setPraise(!praise);
        }
        break;
    }
    const count = praiseCount + (praise === true ? -1 : 1);
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

    const shareContent = {...shareOptions, visible: true}
    dispatch(dispatchShareItem(shareContent));
    // WeChat.shareMiniProgram(shareOptions);
  };

  return (
    <View style={bstyles.botView}>
      <Pressable style={bstyles.botCon} onPress={onPraise}>
        <IconFont name={'like'} size={20} color={praise ? '#000' : '#bdbdbd'} />
        <Text style={{...bstyles.botNum, color: praise ? '#000' : '#bdbdbd'}}>
          {praiseCount > 0 ? praiseCount : ''}
        </Text>
      </Pressable>
      <View style={bstyles.botCon}>
        <IconFont name="comment" size={20} color={'#bdbdbd'} />
        <Text style={bstyles.botNum}>{data.comments_count || ''}</Text>
      </View>
      <Pressable
        style={{marginLeft: 'auto'}}
        onPress={() => {
          onShare();
        }}>
        <IconFont name="fenxiang" size={18} style={{marginLeft: 'auto'}} />
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
    console.log(nickname);
    console.log(data);
    const res = await getAccountBaseInfo({name: nickname.replace('@', '')});
    console.log(res);
    navigation.push('AccountDetail', {accountId: res.data.account.id});
  };

  return (
    <Text numberOfLines={props.numberOfLines} style={[props.style, cstyles.plainWrap]}>
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
              {!v.is_hashtag && !v.is_mention && <Text space="nbsp">{v.content}</Text>}
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
