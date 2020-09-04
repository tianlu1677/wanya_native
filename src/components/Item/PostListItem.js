import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Avator} from '@/components/NodeComponents';
import IconFont from '@/iconfont';
import {HeaderStyle, BottomStyle, BaseTopicStyle, BaseArticleStyle} from '@/components/Item/style';
import FastImg from '@/components/FastImg';

const {
  HeaderView,
  ContentView,
  ContentNameText,
  ContentInfoView,
  ContentInfoTimeText,
  ContentInfoNodeText,
  JoinButtonText,
} = HeaderStyle;

import {useNavigation} from '@react-navigation/native';

export const Header = props => {
  const content = props.data;
  const account = content.account;

  const navigation = useNavigation();

  const rightClick = () => {
    navigation.navigate('NodeDetail', {nodeId: content.node_id});
  };

  const Content = () => {
    return (
      <ContentView>
        <ContentNameText>{account.nickname}</ContentNameText>
        <ContentInfoView>
          <ContentInfoTimeText>{content.published_at_text}</ContentInfoTimeText>
          <ContentInfoNodeText>{content.node_name}</ContentInfoNodeText>
        </ContentInfoView>
      </ContentView>
    );
  };

  return (
    <HeaderView>
      <Avator account={account} size={40} />
      <Content />
      <JoinButtonText
        onPress={() => {
          rightClick();
        }}>
        进入圈子
      </JoinButtonText>
    </HeaderView>
  );
};

const {BottomView, BottomContentView, BottomContentNum} = BottomStyle;

const Bottom = props => {
  const [praise, setPraise] = useState(false);

  useEffect(() => {
    setPraise(props.praise);
  }, [props.praise]);

  const onPraise = status => {
    setPraise(status);
  };

  const {data} = props;
  return (
    <BottomView>
      <BottomContentView
        onPress={() => {
          onPraise(!praise);
        }}>
        <IconFont name={praise ? 'praise-solid' : 'praise'} size={20} color={'#bdbdbd'} />
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

const calculateImg = (width, height) => {
  let newWidth = 500;
  let newHeight = 500;
  let x = (width / height).toFixed(2);
  let attr = {};
  if (x > 0 && x <= 0.33) {
    newHeight = 420;
    newWidth = newHeight / 3;
    attr = {width: newWidth, height: newHeight};
  } else if (x > 0.33 && x <= 1) {
    newHeight = 420;
    newWidth = newHeight * x;
    attr = {width: newWidth, height: newHeight};
  } else if (x > 1 && x <= 2) {
    newWidth = 480;
    newHeight = (height * newWidth) / width;
    attr = {width: newWidth, height: newHeight};
  } else if (x > 2 && x <= 2.89) {
    newHeight = 240;
    newWidth = newHeight * x;
    attr = {width: newWidth, height: newHeight};
  } else if (x > 2.89) {
    newHeight = 240;
    newWidth = newHeight * 2.89;
    attr = {width: newWidth, height: newHeight};
  }
  return {...attr, x: x};
};

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

// 帖子的图片样式
export const TopicVideoCenterContent = props => {
  // const {baseTopic} = props;
  const {id, single_cover} = props.data;
  const videoAttr = calculateImg(single_cover.width, single_cover.height);
  return (
    <View>
      <FastImg
        source={{uri: single_cover.link_url}}
        style={{width: videoAttr.width / 2, height: videoAttr.height / 2}}
      />
      <VideoPlayImage source={require('@/assets/images/video-play.png')} />
    </View>
  );
};

export const TopicImageCenterContent = props => {
  const {single_cover, medias} = props.data;
  const imgStyle = medias.length === 1 ? 'single' : 'multi';
  const imgAttr =
    medias.length === 1
      ? calculateImg(single_cover.width, single_cover.height)
      : {
          width: 500,
          height: 300,
        };

  return (
    <View>
      {imgStyle === 'single' && (
        <Image
          source={{uri: single_cover.cover_url}}
          style={{height: imgAttr.height / 2.0, width: imgAttr.width / 2.0}}
        />
      )}

      {imgStyle === 'multi' && (
        <ScrollView scrollX>
          <View className="image-multi">
            {medias.map((media, media_index) => {
              return (
                <Image
                  src={media}
                  mode="widthFix"
                  key={media_index}
                  style={{width: 167, height: 167, marginRight: 5, borderRadius: 2}}
                />
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export const BaseTopic = props => {
  const {data} = props;
  const navigation = useNavigation();
  const goTopicDetail = () => {
    navigation.navigate('ArticleDetail', {topicId: data.id, from: 'list'});
  };
  return (
    <TouchableOpacity
      style={styles.postSlide}
      onPress={() => {
        goTopicDetail();
      }}>
      <Header data={data} />
      <View style={{marginTop: 13, marginBottom: 13}}>
        {data.content_style === 'img' && <TopicImageCenterContent data={data} />}
        {data.content_style === 'video' && <TopicVideoCenterContent data={data} />}
      </View>
      <BaseTopicContent data={data} />
      <Bottom data={data} />
    </TouchableOpacity>
  );
};

const {ArticleTitleText} = BaseArticleStyle;

export const BaseArticle = props => {
  const {data} = props;

  return (
    <View style={styles.postSlide}>
      <Header data={data} />
      <View style={{marginTop: 13, position: 'relative'}}>
        <Image source={{uri: data.cover_url}} style={{width: '100%', height: 167}} />
        <ArticleTitleText>{data.title}</ArticleTitleText>
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
