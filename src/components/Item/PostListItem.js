import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import Avator from '@/components/NodeComponents/Avator';
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

const Header = props => {
  const content = props.item.item;
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
  return (
    <BottomView>
      <BottomContentView>
        <IconFont name="praise-solid" size={20} color={'#bdbdbd'} />
        <BottomContentNum>{props.item.item.praises_count || ''}</BottomContentNum>
      </BottomContentView>
      <BottomContentView>
        <IconFont name="comments" size={20} color={'#bdbdbd'} />
        <BottomContentNum>{props.item.item.comments_count || ''}</BottomContentNum>
      </BottomContentView>
      <IconFont name="fenxiang" size={20} style={{marginLeft: 'auto'}} />
    </BottomView>
  );
};

const {MultiLineText, VideoPlayImage} = BaseTopicStyle;

export const BaseTopic = props => {
  const {item} = props;
  const content = props.item.item;

  return (
    <View style={styles.postSlide}>
      <Header item={item} />
      <View style={{marginTop: 13, marginBottom: 13}}>
        {content.content_style === 'img' && (
          <View>
            {content.medias.map((v, index) => (
              <Image
                key={index}
                source={{uri: v}}
                style={{width: 167, height: 167, marginRight: 5}}
              />
            ))}
          </View>
        )}
        {content.content_style === 'video' && (
          <View style={{width: 167, height: 167}}>
            <Image
              source={{uri: content.single_cover.link_url}}
              style={{width: 167, height: 167}}
            />
            <VideoPlayImage source={require('@/assets/images/video-play.png')} />
          </View>
        )}
      </View>
      <MultiLineText numberOfLines={2}>{content.plain_content}</MultiLineText>
      <View>{content.content_style === 'link' && <Text>外链</Text>}</View>
      <View>{content.content_style === 'text' && <Text>文字</Text>}</View>
      <Bottom item={item} />
    </View>
  );
};

const {ArtitleTitleText} = BaseArticleStyle;

export const BaseArticle = props => {
  const {item} = props;
  const content = props.item.item;

  return (
    <View style={styles.postSlide}>
      <Header item={item} />
      <View style={{marginTop: 13, position: 'relative'}}>
        <Image source={{uri: content.cover_url}} style={{width: '100%', height: 167}} />
        <ArtitleTitleText>{content.title}</ArtitleTitleText>
      </View>
      <Bottom item={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  postSlide: {
    padding: 14,
    backgroundColor: 'white',
  },
});
