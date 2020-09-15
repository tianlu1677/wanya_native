import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import {createTopicAction, destroyTopicAction} from '@/api/topic_api';
import {createArticleAction, destroyArticleAction} from '@/api/article_api';
import {getAccountBaseInfo} from '@/api/account_api';

export const Header = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goNodeDetail = () => {
    navigation.navigate('NodeDetail', {nodeId: data.node_id});
  };

  const goAccountDetail = () => {
    navigation.navigate('AccountDetail', {accountId: data.account.id});
  };

  return (
    <View style={hstyles.headerView}>
      <Avator account={data.account} size={40} />
      <View style={hstyles.content}>
        <Text style={hstyles.nameText} onPress={goAccountDetail}>
          {data.account.nickname}
        </Text>
        <TouchableOpacity style={hstyles.infoView} onPress={goNodeDetail}>
          <Text style={hstyles.timeText}>{data.published_at_text}</Text>
          <IconFont name="node-solid" size={14} color={'#000'} style={{marginRight: 2}} />
          <Text style={hstyles.nodeName}>{data.node_name}</Text>
        </TouchableOpacity>
      </View>
      <Text style={hstyles.joinBtn} onPress={goNodeDetail}>
        进入圈子
      </Text>
    </View>
  );
};

export const Bottom = props => {
  const [praise, setPraise] = useState(props.data.praise);
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
  };

  return (
    <View style={bstyles.botView}>
      <Pressable style={bstyles.botCon} onPress={onPraise}>
        <IconFont name={'like'} color={praise ? '#000' : '#bdbdbd'} />
        <Text style={{...bstyles.botNum, color: praise ? '#000' : '#bdbdbd'}}>
          {data.praises_count || ''}
        </Text>
      </Pressable>
      <View style={bstyles.botCon}>
        <IconFont name="comment" color={'#bdbdbd'} />
        <Text style={bstyles.botNum}>{data.comments_count || ''}</Text>
      </View>
      <IconFont name="fenxiang" style={{marginLeft: 'auto'}} />
    </View>
  );
};

export const PlainContent = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goHashTagDetail = name => {
    navigation.navigate('HashtagDetail', {hashtag: name});
  };

  const AccountDetail = async nickname => {
    const res = await getAccountBaseInfo({name: nickname.replace('@', '')});
    navigation.navigate('AccountDetail', {accountId: res.data.account.id});
  };

  return (
    <Text numberOfLines={props.numberOfLines} style={props.style}>
      {data.hashtag_content_json ? (
        data.hashtag_content_json.map((v, index) => {
          return (
            <Text key={index}>
              {v.is_hashtag && (
                <Text style={cstyles.hashtagText} onPress={() => goHashTagDetail(v.content)}>
                  {v.content}
                </Text>
              )}
              {v.is_mention && (
                <Text style={cstyles.hashtagText} onPress={() => AccountDetail(v.content)}>
                  {v.content}
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
  },
  nameText: {
    lineHeight: 20,
    marginBottom: 4,
    color: '#9c9c9c',
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#9c9c9c',
  },
  timeText: {
    color: '#9c9c9c',
    marginRight: 6,
  },
  nodeName: {
    fontWeight: '500',
  },
  joinBtn: {
    width: 75,
    height: 34,
    lineHeight: 34,
    backgroundColor: '#fafafa',
    marginLeft: 'auto',
    textAlign: 'center',
    borderRadius: 17,
    fontSize: 11,
    overflow: 'hidden',
  },
});

const bstyles = StyleSheet.create({
  botView: {
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
  },
  botCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botNum: {
    marginLeft: 5,
    marginRight: 30,
    color: '#bdbdbd',
  },
});

const cstyles = StyleSheet.create({
  hashtagText: {
    color: '#ff8d00',
    marginRight: 3,
  },
});
