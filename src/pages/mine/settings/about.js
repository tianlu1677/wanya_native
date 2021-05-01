import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Image, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import FastImg from '@/components/FastImg';
import {StatusBar} from 'react-native';

const About = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  const logo_url =
    'http://file.meirixinxue.com/assets/2019/6840c9bd-73f0-497b-8239-ff9228935e9b.png';
  const qqnumber = '3354456216';

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="light-content" />
      <View>
        <LogoWrapView>
          <FastImg source={{uri: logo_url}} style={{height: 65, width: 65, borderRadius: 10}} />
          <FastImg
            source={{
              uri:
                'http://file.meirixinxue.com/assets/2019/ac1a1624-4145-4b1b-b4d5-63036ef3ec4c.png',
            }}
            style={{height: 28, width: 49, marginTop: 10, backgroundColor: '#FAFAFA'}}
          />
        </LogoWrapView>

        <ContentView>
          <ContentText>顽鸦是一个新青年潮流文化庇护所</ContentText>
          <ContentText>顽鸦的内容涵盖</ContentText>
          <ContentText>街头文化、极限运动、独立音乐、当代</ContentText>
          <ContentText>艺术、亚文化等青年文化领域</ContentText>
          <ContentText>通过社区的形式</ContentText>
          <ContentText>集结每一个与主流世界格格不入</ContentText>
          <ContentText>而又倔强、叛逆甚至顽固的个体</ContentText>
          <ContentText>构建属于每个顽友自己的精神乐园</ContentText>
          <ContentText>让自由的创意相互激发、碰撞</ContentText>
          <ContentText>共同探索这个不一样的世界</ContentText>
        </ContentView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //底部默认样式
  phoneContainer: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 30,
    letterSpacing: 1,
  },
});

const LogoWrapView = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 59px;
`;

const ContentView = styled(View)`
  margin: 27px 27px 0 27px;
`;
const ContentText = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  color: black;
  text-align: center;
`;

export default About;
