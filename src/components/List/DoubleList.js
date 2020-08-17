import React from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native';
import IconFont from '@/iconfont';
import ScrollList from '@/components/ScrollList';
import Avator from '@/components/NodeComponents/Avator';

export const DoubleSingleStyle = {
  SingleWrap: styled(View)`
    flex: 1;
    margin: 0 5px;
  `,
  VideoPlayImage: styled(Image)`
    width: 16px;
    height: 16px;
    position: absolute;
    right: 8px;
    top: 8px;
  `,
  MultiLineText: styled(Text)`
    font-size: 12px;
    line-height: 17px;
    color: #1f1f1f;
    margin-left: 5px;
    margin-right: 10px;
    margin-top: 7px;
  `,
  SingleBottom: styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    margin-top: 8px;
    padding-left: 5px;
    height: 17px;
  `,
  SingleName: styled(Text)`
    margin-right: auto;
    margin-left: 5px;
    color: #bdbdbd;
  `,
};

const {VideoPlayImage, SingleWrap, MultiLineText, SingleBottom, SingleName} = DoubleSingleStyle;

const DoubleSingle = props => {
  const {data} = props;
  return (
    <SingleWrap>
      {data.map(v => {
        const Height = v.item.single_cover
          ? (v.item.single_cover.height * 180) / v.item.single_cover.width
          : 500;
        return (
          <View key={v.item.id}>
            <Image source={{uri: v.item.single_cover.link_url}} style={{height: Height}} />
            {v.item.has_video && (
              <VideoPlayImage source={require('@/assets/images/video-play.png')} />
            )}
            <MultiLineText numberOfLines={2}>{v.item.plain_content}</MultiLineText>
            <SingleBottom>
              <Avator account={v.item.account} size={16} />
              <SingleName>{v.item.account.nickname}</SingleName>
              <IconFont name="praise-solid" size={20} color={'#bdbdbd'} />
              <Text style={{marginLeft: 5, color: '#bdbdbd'}}>{v.item.praises_count}</Text>
            </SingleBottom>
          </View>
        );
      })}
    </SingleWrap>
  );
};

// List 属性继承scrollList
const DoubleList = props => {
  const leftPostList = props.data.filter((v, index) => index % 2 === 0);
  const rightPostLIst = props.data.filter((v, index) => index % 2 !== 0);

  const renderItem = ({item, index}) => {
    return <DoubleSingle data={index === 0 ? leftPostList : rightPostLIst} />;
  };

  return <ScrollList {...props} data={[1, 2]} renderItem={renderItem} numColumns={2} />;
};

export default DoubleList;
