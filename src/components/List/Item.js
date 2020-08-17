import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import Avator from '@/components/NodeComponents/Avator';
import IconFont from '@/iconfont';

const Header = props => {
  const {item} = props;
  const Content = () => {
    return (
      <ContentView>
        <ContentNameText>{item.item.account.nickname}</ContentNameText>
        <ContentInfoView>
          <ContentInfoTimeText>刚刚</ContentInfoTimeText>
          <ContentInfoNodeText>{item.item.node_name}</ContentInfoNodeText>
        </ContentInfoView>
      </ContentView>
    );
  };

  return (
    <HeaderView>
      <Avator account={item.item.account} size={40} />
      <Content />
      <JoinButtonText>进入圈子</JoinButtonText>
    </HeaderView>
  );
};

const HeaderView = styled(View)`
  flex-direction: row;
  align-items: center;
  height: 40px;
`;

const ContentView = styled(View)`
  margin-left: 12px;
`;

const ContentNameText = styled(Text)`
  line-height: 20px;
  margin-bottom: 4px;
  color: #9c9c9c;
`;

const ContentInfoView = styled(View)`
  flex-direction: row;
  align-items: center;
  color: #9c9c9c;
`;
const ContentInfoTimeText = styled(Text)`
  color: #9c9c9c;
  margin-right: 6px;
`;

const ContentInfoNodeText = styled(Text)`
  font-weight: 500;
`;

const JoinButtonText = styled(Text)`
  width: 75px;
  height: 34px;
  line-height: 34px;
  background: #fafafa;
  margin-left: auto;
  text-align: center;
  border-radius: 17px;
  font-size: 11px;
  overflow: hidden;
`;

const Bottom = props => {
  return (
    <View style={BottomStyle.bottom}>
      <View style={BottomStyle.contentView}>
        <IconFont name="praise-solid" size={20} color={'#bdbdbd'} />
        <Text style={BottomStyle.contentNum}>{props.item.item.praises_count || ''}</Text>
      </View>
      <View style={BottomStyle.contentView}>
        <IconFont name="comments" size={20} color={'#bdbdbd'} />
        <Text style={BottomStyle.contentNum}>{props.item.item.comments_count || ''}</Text>
      </View>
      <IconFont name="fenxiang" size={20} style={{marginLeft: 'auto'}} />
    </View>
  );
};

const BottomStyle = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentNum: {
    marginLeft: 5,
    marginRight: 30,
    color: '#bdbdbd',
  },
});

export const BaseTopic = props => {
  const {item} = props;
  const content = props.item.item;
  console.log(content);

  const onPress = id => {
    // setSelectedId(id);
  };
  return (
    <View onPress={() => onPress(item.id)} style={styles.slide}>
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
            <Image
              source={require('@/assets/images/video-play.png')}
              style={{
                width: 30,
                height: 30,
                position: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: -15,
                margintop: -15,
              }}
            />
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

const styles = StyleSheet.create({
  slide: {
    padding: 14,
    backgroundColor: 'white',
  },
});

const MultiLineText = styled(Text)`
  font-size: 14px;
  line-height: 24px;
  color: #1f1f1f;
`;
