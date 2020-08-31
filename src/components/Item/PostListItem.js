import React from 'react';
import {View, Text, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import {HeaderStyle, BottomStyle, BaseTopicStyle, BaseArticleStyle} from '@/components/Item/style';

const {
  HeaderView,
  ContentView,
  ContentNameText,
  ContentInfoView,
  ContentInfoTimeText,
  ContentInfoNodeText,
  JoinButtonText,
} = HeaderStyle;

export const Header = props => {
  const content = props.data;
  const Content = () => {
    return (
      <ContentView>
        <ContentNameText>{content.account.nickname}</ContentNameText>
        <ContentInfoView>
          <ContentInfoTimeText>刚刚</ContentInfoTimeText>
          <ContentInfoNodeText>{content.node_name}</ContentInfoNodeText>
        </ContentInfoView>
      </ContentView>
    );
  };

  return (
    <HeaderView>
      <Avator account={content.account} size={40} />
      <Content />
      <JoinButtonText>进入圈子</JoinButtonText>
    </HeaderView>
  );
};

const {BottomView, BottomContentView, BottomContentNum} = BottomStyle;

const Bottom = props => {
  const {data} = props;
  return (
    <BottomView>
      <BottomContentView>
        <IconFont name="praise-solid" size={20} color={'#bdbdbd'} />
        <BottomContentNum>{data.praises_count || ''}</BottomContentNum>
      </BottomContentView>
      <BottomContentView>
        <IconFont name="comments" size={20} color={'#bdbdbd'} />
        <BottomContentNum>{data.comments_count || ''}</BottomContentNum>
      </BottomContentView>
      <IconFont name="fenxiang" size={20} style={{marginLeft: 'auto'}} />
    </BottomView>
  );
};

const {MultiLineText, VideoPlayImage, HashtagText} = BaseTopicStyle;

export const BaseTopicContent = props => {
  const {data} = props;
  return (
    <View style={props.style}>
      <MultiLineText numberOfLines={2}>
        {data.hashtag_content_json ? (
          data.hashtag_content_json.map((v, index) => {
            return (
              <Text key={index}>
                {v.is_hashtag && <HashtagText>{v.content}</HashtagText>}
                {v.is_mention && <HashtagText>{v.content}</HashtagText>}
                {!v.is_hashtag && !v.is_mention && <Text space="nbsp">{v.content}</Text>}
              </Text>
            );
          })
        ) : (
          <Text>{data.plain_content}</Text>
        )}
      </MultiLineText>
      <View>{data.content_style === 'link' && <Text>外链</Text>}</View>
      <View>{data.content_style === 'text' && <Text>文字</Text>}</View>
    </View>
  );
};

export const BaseTopic = props => {
  const navigation = useNavigation();
  const {data} = props;
  // console.log(data);
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('TopicIndex', {id: data.id})}>
      <View style={styles.postSlide}>
        <Header data={data} />
        <View style={{marginTop: 13, marginBottom: 13}}>
          {data.content_style === 'img' && (
            <View>
              {data.medias.map((v, index) => (
                <Image
                  key={index}
                  source={{uri: v}}
                  style={{width: 167, height: 167, marginRight: 5}}
                />
              ))}
            </View>
          )}
          {data.content_style === 'video' && (
            <View style={{width: 167, height: 167}}>
              <Image source={{uri: data.single_cover.link_url}} style={{width: 167, height: 167}} />
              <VideoPlayImage source={require('@/assets/images/video-play.png')} />
            </View>
          )}
        </View>
        <BaseTopicContent data={data} />
        <Bottom data={data} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const {ArtitleTitleText} = BaseArticleStyle;

export const BaseArticle = props => {
  const {data} = props;

  return (
    <View style={styles.postSlide}>
      <Header data={data} />
      <View style={{marginTop: 13, position: 'relative'}}>
        <Image source={{uri: data.cover_url}} style={{width: '100%', height: 167}} />
        <ArtitleTitleText>{data.title}</ArtitleTitleText>
      </View>
      <Bottom data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  postSlide: {
    padding: 14,
    backgroundColor: 'white',
  },
});
