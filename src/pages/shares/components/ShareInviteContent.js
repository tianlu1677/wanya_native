import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Modal, Button, Dimensions, Image, StyleSheet} from 'react-native';
import ViewShot from 'react-native-view-shot';
import FastImg from '@/components/FastImg';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "@/utils/navbar"

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const ShareInviteContent = props => {
  const {imgUrl} = props;
  const [imgHeight, setimgHeight] = useState(SCREEN_HEIGHT);

  const loadCoverStyle = () => {
    if (!imgUrl) {
      return;
    }    
    
    Image.getSize(imgUrl, (width, height) => {      
      setimgHeight(height * (SCREEN_WIDTH / width));
    });
  };


  useEffect(() => {
    loadCoverStyle();
  }, [imgUrl]);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <FastImg source={{uri: imgUrl}} style={{...styles.wrapper, height: imgHeight }} />
      {/*<Text style={{color: 'white'}}>{ imgHeight } {SCREEN_WIDTH}</Text>*/}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,    
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
