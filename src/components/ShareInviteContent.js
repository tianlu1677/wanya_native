import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Modal, Button, Dimensions, Image, StyleSheet} from 'react-native';
import ViewShot from 'react-native-view-shot';
import FastImg from '@/components/FastImg';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@/utils/navbar"

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const ShareInviteContent = props => {
  const {imgUrl} = props;

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <FastImg source={{uri: imgUrl}} style={styles.wrapper} />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    // height: '100%',
    backgroundColor: '#ff193a',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 40,
    paddingBottom: 16,
  },
});

export default ShareInviteContent;
