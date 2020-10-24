import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import TopHeader from '@/components/TopHeader';

const StickTopHeader = props => {
  return (
    <BlurView
      style={{flex: 1}}
      // blurType="light"
      // blurAmount={40}
    >
      <TopHeader
        LeftButton={props.showLeftButton ? null : () => <View />}
        Title={() => (
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>{props.title}</Text>
        )}
      />
    </BlurView>
  );
};

export default StickTopHeader;
