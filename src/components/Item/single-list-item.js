import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import {createTopicAction, destroyTopicAction} from '@/api/topic_api';
import {createArticleAction, destroyArticleAction} from '@/api/article_api';

export const Header = props => {
  const {data} = props;
  const navigation = useNavigation();

  const goNodeDetail = () => {
    navigation.navigate('NodeDetail', {nodeId: data.node_id});
  };

  const goAccountDetail = () => {
    navigation.navigate('AccountDetail', {accountId: data.account.id});
  };

  const Content = () => {
    return (
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
    );
  };

  return (
    <View style={hstyles.headerView}>
      <Avator account={data.account} size={40} />
      <Content />
      <Text style={hstyles.joinBtn} onPress={goNodeDetail}>
        进入圈子
      </Text>
    </View>
  );
};

export const Bottom = props => {
  const [praise, setPraise] = useState(props.data.praise);
  const {data} = props;
  const navigation = useNavigation();

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

  const goDetail = () => {
    switch (props.type) {
      case 'article':
        navigation.navigate('ArticleDetail', {articleId: data.id});
        break;
      case 'topic':
        navigation.navigate('TopicDetail', {topicId: data.id});
        break;
    }
  };

  return (
    <View style={bstyles.botView}>
      <TouchableOpacity style={bstyles.botCon} onPress={onPraise}>
        <IconFont name={'like'} color={praise ? '#000' : '#bdbdbd'} />
        <Text style={bstyles.botNum}>{data.praises_count || ''}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={bstyles.botCon} onPress={goDetail}>
        <IconFont name="comment" color={'#bdbdbd'} />
        <Text style={bstyles.botNum}>{data.comments_count || ''}</Text>
      </TouchableOpacity>
      <IconFont name="fenxiang" style={{marginLeft: 'auto'}} />
    </View>
  );
};

export const PlainContent = props => {
  const {data} = props;
  const navigation = useNavigation();

  return (
    <Text numberOfLines={props.numberOfLines} style={props.style}>
      {data.hashtag_content_json ? (
        data.hashtag_content_json.map((v, index) => {
          return (
            <Text key={index}>
              {v.is_hashtag && (
                <Text
                  style={cstyles.hashtagText}
                  onPress={() => navigation.navigate('HashtagDetail', {hashtag: v.content})}>
                  {v.content}
                </Text>
              )}
              {v.is_mention && (
                <Text
                  style={cstyles.hashtagText}
                  onPress={() => navigation.navigate('AccountDetail', {accountId: v.content})}>
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
